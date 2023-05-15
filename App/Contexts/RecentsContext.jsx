import { createContext } from "react";

const recents = [];

export default RecentsContext = createContext({
    recents: recents
});

export { recents };