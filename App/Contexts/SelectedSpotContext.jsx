import { createContext } from "react";

export default SelectedSpotContext = createContext({
    selected: {
        spot: "",
        from: 0,
        duration: 0
    },
    setSelected: null
});