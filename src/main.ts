// import { openai } from "./chatgpt.ts";
import { AiEditor } from "./core/AiEditor.ts";
import { getTiptapCollabProvider } from "./components/Collaboration.ts"

const provider = getTiptapCollabProvider({
    name: "test",
    baseUrl: "ws://127.0.0.1:4333",
    user: "miozd",
    connect: false
})

let id = Math.round(Math.random() * 200).toString()

provider.setAwarenessField('user', {
    name: 'user' + id,
    id: id
})



// @ts-ignore
window.aiEditor = new AiEditor({
    element: "#aiEditor",
    placeholder: "点击输入内容1...",
    toolbarExcludeKeys: ["source-code", "printer", "fullscreen", "ai"],
    // image: {
    //     uploadUrl: "http://localhost:8080/upload"
    // },
    // video: {
    //     uploadUrl: "http://localhost:8080/upload"
    // },
    // audio: {
    //     uploadUrl: "http://localhost:8080/upload"
    // },
    // fontSize: {
    //     defaultValue: 72
    // },
    // contentRetention: true,
    // toolbarSize: 'small',
    // toolbarSize:'large',
    // pasteAsText: true,
    // draggable:false,
    // theme: "dark",
    // editable:false,
    content: '123456',
    collaboration: {
        document: provider.document
    },
    collaborationCursor: {
        provider: provider,
        user: {
            name: 'user' + id,
            color: getRandomHexColor()
        },
    },
})

setTimeout(() => {
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.code === "KeyS") {
            event.preventDefault();
            console.log('Ctrl+C');
        }
        provider.connect()
    });
}, 1000)



function getRandomHexColor() {
    // 生成一个介于0到255之间的随机整数并转换为16进制字符串，
    // 确保总是得到两位数，不足两位前面补零。
    const randomPart = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    // 生成颜色的三个部分，并以#开头组成完整的十六进制颜色代码
    return `#${randomPart()}${randomPart()}${randomPart()}`;
}

