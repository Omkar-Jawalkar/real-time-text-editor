import { atom } from "recoil";
const usersState = atom({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export default usersState;
