import { AbstractMenuButton } from "../AbstractMenuButton.ts";
import { InnerEditor } from "../../core/AiEditor.ts";

export class Audio extends AbstractMenuButton {

    fileInput?: HTMLInputElement;

    constructor() {
        super();
        this.template = `
        <div>
        <input type="file" accept="audio/*" style="display: none">
        <svg t="1741422987095" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5233" width="200" height="200"><path d="M587 0H160c-35.3 0-64 28.7-64 64v896c0 35.3 28.7 64 64 64h704c35.3 0 64-28.7 64-64V341c0-33.9-13.5-66.5-37.5-90.5l-213-213C653.5 13.5 620.9 0 587 0z m53 90.5L837.5 288H704c-35.3 0-64-28.7-64-64V90.5zM832 960H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h384v160c0 70.7 57.3 128 128 128h160v576c0 17.7-14.3 32-32 32z" p-id="5234" fill="#333333"></path><path d="M672 476.6v289.1c0 42.9-38.7 77.7-86.5 77.7S499 808.6 499 765.7c0-42.9 38.7-77.7 86.5-77.7 12.4 0 22.5-10.1 22.5-22.5V498.9c0-11-10.7-18.7-21.1-15.2l-143.8 48.5c-6.5 2.2-10.9 8.3-10.9 15.2l0.2 204.6h-0.4v65.6c0 43.4-39.4 78.6-88 78.6s-88-35.2-88-78.6c0-43.4 39.4-78.6 88-78.6h1.8c12.4 0 22.5-10.1 22.5-22.5l-0.2-180.6c0-27.5 17.5-51.9 43.6-60.7L587.6 416c41.4-14 84.4 16.8 84.4 60.6z" p-id="5235" fill="#333333"></path></svg>        </div>
        `;
        this.registerClickListener();
    }


    connectedCallback() {
        super.connectedCallback();
        if (this.options?.audio?.customMenuInvoke) {
            this.querySelector("input")!.remove();
        } else {
            this.fileInput = this.querySelector("input") as HTMLInputElement;
            this.fileInput!.addEventListener("change", () => {
                const files = this.fileInput?.files;
                if (files && files.length > 0) {
                    for (let file of files) {
                        this.editor?.commands.uploadAudio(file);
                    }
                }
                (this.fileInput as any).value = "";
            });
        }
    }


    // @ts-ignore
    onClick(commands) {
        if (this.options?.audio?.customMenuInvoke) {
            this.options.audio.customMenuInvoke((this.editor as InnerEditor).aiEditor);
        } else {
            this.fileInput?.click();
        }
    }

}


