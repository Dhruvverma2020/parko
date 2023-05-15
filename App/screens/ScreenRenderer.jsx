import {useContext} from 'react';
import ScreenContext from '../Contexts/ScreenContext';
import Login from './Login';
import Home from './Home';
import ParkingSpot from './ParkingSpot';
import Signup from './Signup';
import Notifications from './Notifications';
import OrderDetail from './OrderDetail';

export default function ScreenRenderer() {
    const { currentScreen } = useContext(ScreenContext);

    switch (currentScreen) {
        case 0:
            return <Login />
        case 1:
            return <Home />
        case 2:
            return <ParkingSpot />
        case 3:
            return <Signup />
        case 4:
            return <Notifications />
        case 5:
            return <OrderDetail />
        default:
            return;
    }
}
