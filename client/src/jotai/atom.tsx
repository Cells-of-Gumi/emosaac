import { atom, createStore } from "jotai";

const mainStore = createStore()

const myInfo = atom<any>(null);

export default mainStore
export {
    myInfo,
}