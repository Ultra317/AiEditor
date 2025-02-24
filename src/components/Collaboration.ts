import * as Y from "yjs"
import { TiptapCollabProvider, TiptapCollabProviderConfiguration } from '@hocuspocus/provider'

//  简易封装，yjs重复引入会报错
export const getDoc = (options: object): Y.Doc => {
    return new Y.Doc(options)
}

export const getProvider = (options: TiptapCollabProviderConfiguration): TiptapCollabProvider => {
    return new TiptapCollabProvider(options)
}