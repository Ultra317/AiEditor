import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import * as awarenessProtocol from "y-protocols/awareness"
import { TiptapCollabProvider, TiptapCollabProviderConfiguration } from '@hocuspocus/provider'

//  简易封装，yjs重复引入会报错
export const getDoc = (options?: object): Y.Doc => {
    return new Y.Doc(options)
}

type WebsocketProviderOptions = {
    connect?: boolean;
    awareness?: awarenessProtocol.Awareness;
    params?: { [x: string]: string };
    protocols?: string[];
    WebSocketPolyfill?: {
        new(url: string | URL, protocols?: string | string[]): WebSocket;
        prototype: WebSocket;
        readonly CLOSED: number;
        readonly CLOSING: number;
        readonly CONNECTING: number;
        readonly OPEN: number;
    };
    resyncInterval?: number;
    maxBackoffTime?: number;
    disableBc?: boolean;
};

type WebsocketProviderConstructorParams = {
    serverUrl: string;
    roomname: string;
    doc?: Y.Doc;
    options?: WebsocketProviderOptions;
};

export const getProvider = (options: WebsocketProviderConstructorParams): WebsocketProvider => {
    if (options.doc)
        return new WebsocketProvider(options.serverUrl, options.roomname, options.doc, options.options)
    else
        return new WebsocketProvider(options.serverUrl, options.roomname, getDoc(), options.options)
}

export const getTiptapCollabProvider = (options: TiptapCollabProviderConfiguration): TiptapCollabProvider => {
    return new TiptapCollabProvider(options)
}