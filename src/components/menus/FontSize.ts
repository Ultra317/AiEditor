import { Editor, EditorEvents } from "@tiptap/core";
import { AbstractDropdownMenuButton } from "../AbstractDropdownMenuButton.ts";
import { AiEditorOptions, NameAndValue } from "../../core/AiEditor.ts";
import { t } from "i18next";


const fontSizes: NameAndValue[] = [
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "11", value: 11 },
    { name: "12", value: 12 },
    { name: "14", value: 14 },
    { name: "16", value: 16 },
    { name: "18", value: 18 },
    { name: "20", value: 20 },
    { name: "22", value: 22 },
    { name: "24", value: 24 },
    { name: "26", value: 26 },
    { name: "28", value: 28 },
    { name: "30", value: 30 },
    { name: "36", value: 36 },
    { name: "42", value: 42 },
    { name: "48", value: 48 },
    { name: "56", value: 56 },
    { name: "72", value: 72 },
]

export class FontSize extends AbstractDropdownMenuButton<NameAndValue> {

    defaultValue: number = 14;

    constructor() {
        super();
    }

    onCreate(_: EditorEvents["create"], options: AiEditorOptions) {
        super.onCreate(_, options);
        this.menuData = options.fontSize?.values || fontSizes;
        this.defaultValue = options.fontSize?.defaultValue || this.defaultValue;

        this.editor?.chain().focus().setFontSize(`${this.defaultValue}px`).run();
        for (let i = 0; i < this.menuData.length; i++) {
            if (this.menuData[i].value == this.defaultValue) {
                this.defaultMenuIndex = i;
                this.menuData[i].name = `${this.defaultValue}（${t("default")}）`
                break
            }
        }
    }

    onDropdownActive(editor: Editor, index: number): boolean {
        return editor.isActive('textStyle', { fontSize: `${this.menuData[index].value}px` });
    }

    onDropdownItemClick(index: number): void {
        const size = this.menuData[index].value;
        this.editor?.chain().focus().setFontSize(`${size}px`).run();
    }

    onDropdownItemRender(index: number): Element | string {
        return this.menuData[index].name;
    }

    onMenuTextRender(index: number): Element | string {
        const item = this.menuData[index];
        if (item.value == this.defaultValue) {
            return `${t("default-font-size")}`
        } else {
            return item.name;
        }
    }


}


