import { BubbleMenuItem } from "../../types.ts";

export const Comment = {
    id: "comment",
    title: "comment",
    icon: '<svg t="1741490924344" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5160" width="200" height="200"><path d="M896 138.66666667H128c-38.4 0-64 25.6-64 64V746.66666667c0 38.4 25.6 64 64 64h128v128c83.2 0 166.4-44.8 256-128h384c38.4 0 64-25.6 64-64V202.66666667c0-38.4-25.6-64-64-64z m0 608H486.4l-19.2 19.2c-51.2 51.2-102.4 83.2-147.2 96V746.66666667H128V202.66666667h768V746.66666667z" p-id="5161" fill="#333333"></path><path d="M320 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="5162" fill="#333333"></path><path d="M512 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="5163" fill="#333333"></path><path d="M704 477.86666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="5164" fill="#333333"></path></svg>',
    onClick: ({ innerEditor }) => {
        innerEditor.chain().setComment("link")
    }
} as BubbleMenuItem;