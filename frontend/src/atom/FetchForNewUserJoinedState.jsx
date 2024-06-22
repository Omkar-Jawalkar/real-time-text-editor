import { atom } from "recoil";
const FetchForNewUserJoinedState = atom({
    key: "fetchForNewUserJoinedState", // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export default FetchForNewUserJoinedState;
