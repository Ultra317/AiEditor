// import { openai } from "./chatgpt.ts";
import { AiEditor } from "./core/AiEditor.ts";

import { TiptapCollabProvider } from '@hocuspocus/provider'

const provider = new TiptapCollabProvider({
    name: "实验文档2",
    baseUrl: "ws://127.0.0.1:4333",
})
let id = Math.round(Math.random() * 200).toString()
provider.setAwarenessField('user', {
    name: 'user' + id,
    id: id
})

provider.document.on('update', (update, origin) => {
    console.log('文档发生变化:', update);
    console.log('变化来源:', origin);

    const xmlFragment = provider.document.getXmlFragment('default');
    const content = xmlFragment.toJSON(); // 转换为 JSON 格式
    console.log(content);
    // 在这里执行自定义逻辑，例如将变化写入数据库
});

// @ts-ignore
window.aiEditor = new AiEditor({
    element: "#aiEditor",
    placeholder: "点击输入内容1...",
    toolbarExcludeKeys: ["source-code", "printer", "fullscreen", "ai"],
    fontSize: {
        defaultValue: 72
    },
    // contentRetention: true,
    // toolbarSize: 'small',
    // toolbarSize:'large',
    // pasteAsText: true,
    // draggable:false,
    // theme: "dark",
    // editable:false,
    content: '',
    collaboration: {
        document: provider.document
    },
    collaborationCursor: {
        provider: provider,
        user: {
            name: 'user' + id,
            color: getRandomHexColor()
        },
    }
})





function getRandomHexColor() {
    // 生成一个介于0到255之间的随机整数并转换为16进制字符串，
    // 确保总是得到两位数，不足两位前面补零。
    const randomPart = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    // 生成颜色的三个部分，并以#开头组成完整的十六进制颜色代码
    return `#${randomPart()}${randomPart()}${randomPart()}`;
}
