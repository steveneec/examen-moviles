import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { Image, StyleSheet, View } from 'react-native';

export default function App() {
    const [appIsReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare(){
            try{
                //
            } catch(e){
                console.log(e)
            } finally{
                setIsReady(true)
            }
        }

        prepare();
    },[])

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null
    }

    return (
        <View style={StyleSheet.absoluteFillObject} onLayout={onLayoutRootView}>
            <NavigationContainer>
                <Navigation/>
            </NavigationContainer>
        </View>
    );
}