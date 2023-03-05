import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

export default function Button({ title, onclick }) {
    const [pressed, setPressed] = useState(false);

    return (
        <View className={`border-2 border-white py-3 px-5 rounded-full ${pressed && "bg-black/20"}`}>
            <Pressable onPress={onclick}
            onPressIn={() => {setPressed(true)}}
            onPressOut={() => {setPressed(false)}}>
                <Text className="text-white font"> {title} </Text>
            </Pressable>
        </View>
    )
}
