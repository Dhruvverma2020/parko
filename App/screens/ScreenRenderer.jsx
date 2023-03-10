import {useContext} from 'react';
import ScreenContext from '../Contexts/ScreenContext';
import Login from './Login';
import Home from './Home';

export default function ScreenRenderer() {
    const { currentScreen } = useContext(ScreenContext);

    switch (currentScreen) {
        case 0:
            return <Login />
        case 1:
            return <Home />
        default:
            return;
    }
}
