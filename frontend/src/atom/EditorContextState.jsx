import { atom } from "recoil";
const EditorContextState = atom({
    key: "editorContextState", // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export default EditorContextState;
