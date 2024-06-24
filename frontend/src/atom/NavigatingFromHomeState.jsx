import { atom } from "recoil";
const navigatingFromHomeState = atom({
    key: "navigatingFromHomeState", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});

export default navigatingFromHomeState;
