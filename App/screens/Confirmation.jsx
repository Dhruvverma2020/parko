import React, { useContext, useEffect } from 'react';
import { Modal, Image } from 'react-native';
import ScreenContext from '../Contexts/ScreenContext';

export default function Confirmation() {
    const { setCurrentScreen } = useContext(ScreenContext);

    useEffect(() => {
        setTimeout(() => {
            setCurrentScreen(1);
        }, 3000)
    }, [])

    return (
        <Modal animationType='slide'>
            <Image className="h-full w-full" source={require('../assets/confirm.jpg')} />
        </Modal>
    )
}
