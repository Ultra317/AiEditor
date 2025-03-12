import { Node, nodeInputRule } from '@tiptap/core'
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import { resize } from "../util/resize";
import { uuid } from "../util/uuid.ts";
import { DecorationSet } from "prosemirror-view";
import { createMediaDecoration } from "../util/decorations.ts";
import { getUploader } from "../util/getUploader.ts";
import { Uploader, UploaderEvent } from "../core/AiEditor.ts";

export interface AudioOptions {
    HTMLAttributes: Record<string, any>,
    inline?: boolean,
    uploadUrl?: string,
    uploadHeaders?: (() => Record<string, any>) | Record<string, any>,
    uploader?: Uploader,
    uploaderEvent?: UploaderEvent,
    uploadFormName?: string,
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        audio: {
            setAudio: (src: string) => ReturnType,
            toggleAudio: (src: string) => ReturnType,
            uploadAudio: (file: File) => ReturnType,
        }
    }
}

const VIDEO_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export type AudioAction = {
    type: "add" | "remove";
    id: string;
    pos: number;
}

const key = new PluginKey("aie-audio-plugin");
const actionKey = "audio_action";

export const AudioExt = Node.create<AudioOptions>({
    name: 'audio',
    group: "block",

    addAttributes() {
        return {
            src: {
                default: null,
                parseHTML: (el) => {
                    const src = el.getAttribute('src');
                    if (src) return src;
                    const sourceEl = el.querySelector("source");
                    if (sourceEl) {
                        return sourceEl.getAttribute("src");
                    }
                    return null;
                },
                renderHTML: (attrs) => ({ src: attrs.src }),
            },
            width: {
                default: 350,
                parseHTML: (element) => `${element.getAttribute('width') ?? ''}`,
            },
            controls: {
                default: true,
                parseHTML: (element) => `${element.getAttribute('controls') ?? 'true'}`,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'audio',
                getAttrs: el => ({
                    src: (el as HTMLAudioElement).getAttribute('src'),
                }),
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'audio',
            { controls: 'true', ...HTMLAttributes, src: null },
            ['source', { src: HTMLAttributes.src }]
        ]
    },

    addCommands() {
        return {
            setAudio: (src: string) => ({ commands }) => commands.insertContent(`<audio controls="true" style="width: 100%" src="${src}" />`),
            toggleAudio: () => ({ commands }) => commands.toggleNode(this.name, 'paragraph'),
            uploadAudio: (file: File) => () => {

                const headers = (typeof this.options.uploadHeaders === "object") ? this.options.uploadHeaders :
                    ((typeof this.options.uploadHeaders === "function") ? this.options.uploadHeaders() : {});

                if (this.options.uploaderEvent && this.options.uploaderEvent.onUploadBefore) {
                    if (this.options.uploaderEvent.onUploadBefore(file, this.options.uploadUrl!, headers) === false) {
                        return false;
                    }
                }

                const id = uuid();
                const { state: { tr }, view, schema } = this.editor!
                if (!tr.selection.empty) tr.deleteSelection();

                view.dispatch(tr.setMeta(actionKey, {
                    type: "add",
                    id,
                    pos: tr.selection.from,
                }));


                const uploader = this.options.uploader || getUploader(this.options.uploadUrl!);
                const uploadFormName = this.options.uploadFormName || "audio";
                uploader(file, this.options.uploadUrl!, headers, uploadFormName)
                    .then(json => {

                        //process on success
                        if (this.options.uploaderEvent?.onSuccess) {
                            const result = this.options.uploaderEvent.onSuccess(file, json);
                            if (typeof result === "boolean" && !result) {
                                return;
                            }
                            if (typeof result === "object") {
                                json = result;
                            }
                        }

                        if (json.errorCode === 0 && json.data && json.data.src) {
                            const decorations = key.getState(this.editor.state) as DecorationSet;
                            let found = decorations.find(void 0, void 0, spec => spec.id == id)
                            view.dispatch(view.state.tr
                                .insert(found[0].from, schema.nodes.audio.create({
                                    src: json.data.src,
                                    width: json.data.width || 350,
                                    controls: json.data.controls || "true",
                                }))
                                .setMeta(actionKey, { type: "remove", id }));
                        } else {
                            view.dispatch(tr.setMeta(actionKey, { type: "remove", id }));
                            if (this.options.uploaderEvent && this.options.uploaderEvent.onFailed) {
                                this.options.uploaderEvent.onFailed(file, json);
                            }
                        }
                    }).catch((err) => {
                        const { state: { tr }, view } = this.editor!
                        view.dispatch(tr.setMeta(actionKey, { type: "remove", id }));
                        if (this.options.uploaderEvent && this.options.uploaderEvent.onError) {
                            this.options.uploaderEvent.onError(file, err);
                        }
                    })
                return true;
            }
        };
    },


    addNodeView() {
        return (props) => {
            const container = document.createElement('div')
            if (!this.editor.isEditable) {
                return {
                    dom: container
                }
            }
            const { src, width, align, controls } = props.node.attrs;
            container.classList.add(`align-${align}`)
            if (this.options?.inline) {
                container.style.display = "inline-flex"
            }

            container.innerHTML = `
                  <div class="aie-resize-wrapper">
                      <div class="aie-resize">
                          <div class="aie-resize-btn-top-left" data-position="left" draggable="true"></div>
                          <div class="aie-resize-btn-top-right" data-position="right" draggable="true"></div>
                          <div class="aie-resize-btn-bottom-left" data-position="left" draggable="true"></div>
                          <div class="aie-resize-btn-bottom-right" data-position="right" draggable="true"></div>
                      </div>
                      <audio controls="${controls}" width="${width}" class="resize-obj">
                          <source src="${src}">
                      </audio>
                  </div>
                `
            resize(container, this.editor.view.dom, (attrs) => this.editor.commands.updateAttributes("audio", attrs));
            return {
                dom: container,
            }
        }
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: VIDEO_INPUT_REGEX,
                type: this.type,
                getAttributes: (match) => {
                    const [, , src] = match

                    return { src }
                },
            })
        ]
    },


    addProseMirrorPlugins() {
        const editor = this.editor;
        return [
            new Plugin({
                key: key,
                state: {
                    init: () => DecorationSet.empty,
                    apply: (tr, set) => {

                        const action = tr.getMeta(actionKey) as AudioAction;

                        // update decorations position
                        set = set.map(tr.mapping, tr.doc);

                        // add decoration
                        if (action && action.type === "add") {
                            set = set.add(tr.doc, [createMediaDecoration(action)]);
                        }
                        // remove decoration
                        else if (action && action.type === "remove") {
                            set = set.remove(set.find(undefined, undefined,
                                spec => spec.id == action.id));
                        }
                        return set;
                    }
                },

                props: {
                    decorations(state) {
                        return this.getState(state);
                    },
                    handleDOMEvents: {
                        drop(view, event) {
                            const hasFiles = event.dataTransfer &&
                                event.dataTransfer.files &&
                                event.dataTransfer.files.length

                            if (!hasFiles) return false

                            const audios = Array
                                .from(event.dataTransfer.files)
                                .filter(file => (/audio/i).test(file.type))

                            if (audios.length === 0) return false

                            event.preventDefault()

                            const { state: { tr, doc }, dispatch } = view
                            const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
                            dispatch(tr.setSelection(TextSelection.create(doc, coordinates!.pos)).scrollIntoView())

                            audios.forEach(audio => {
                                editor.commands.uploadAudio(audio);
                            })

                            return true
                        }
                    }
                }
            }),
        ]
    },


})