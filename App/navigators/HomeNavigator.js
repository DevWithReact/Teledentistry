import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConsumerProfileScreen from '../containers/Consumer/Profile';
import ConsumerMailScreen from '../containers/Consumer/Mail';
import ConsumerWatchScreen from '../containers/Consumer/Watch';
import DentistMailScreen from '../containers/Dentist/Mail';
import DentistProfileScreen from '../containers/Dentist/Profile';
import ChannelScreen from '../containers/Channel';


const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
    const isConsumer = false;
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >
        {
            isConsumer ? (
            <>
                <Tab.Screen name="Mail" component={ConsumerMailScreen} />
                <Tab.Screen name="Chat" component={ChannelScreen} />
                <Tab.Screen name="Watch" component={ConsumerWatchScreen} />
                <Tab.Screen name="Profile" component={ConsumerProfileScreen} />
            </>
            ) : (
            <>
                <Tab.Screen name="Mail" component={DentistMailScreen} />
                <Tab.Screen name="Chat" component={ChannelScreen} />
                <Tab.Screen name="Profile" component={DentistProfileScreen} />
            </>
            )
        }
        </Tab.Navigator>
    );
};

export default HomeNavigator;