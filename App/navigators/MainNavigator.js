import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../containers/Splash';
import SignInScreen from '../containers/SignIn';


const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    const isSignedIn  = false;
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if (isLoading) {
        return <SplashScreen/>
    }

    return (
    <NavigationContainer>
        <Stack.Navigator>
        {
        isSignedIn ? (
            <>
                <Stack.Screen name="Home" component={SplashScreen} />
            </>
            ) : (
            <>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignInScreen} />
            </>
            )
        }
        </Stack.Navigator>
    </NavigationContainer>
    );
};

export default MainNavigator;