import React, { useState, useEffect } from 'react';
import {
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConsumerProfileScreen from '../containers/Consumer/Profile';
import ConsumerMailScreen from '../containers/Consumer/Mail';
import ConsumerWatchScreen from '../containers/Consumer/Watch';
import DentistMailScreen from '../containers/Dentist/Mail';
import DentistProfileScreen from '../containers/Dentist/Profile';
import ChannelScreen from '../containers/Channel';
import Images from '../utils/Images';


const Tab = createBottomTabNavigator();

const consumerTabs = [
    {
        name: "Mail",
        icon: "ic_mail",
        component: ConsumerMailScreen
    }, {
        name: "Chat",
        icon: "ic_chat",
        component: ChannelScreen
    }, {
        name: "Watch",
        icon: "ic_watch",
        component: ConsumerWatchScreen
    }, {
        name: "Profile",
        icon: "ic_user",
        component: ConsumerProfileScreen
    }
];
const dentistTabs = [
    {
        name: "Mail",
        icon: "ic_mail",
        component: DentistMailScreen
    }, {
        name: "Chat",
        icon: "ic_chat",
        component: ChannelScreen
    }, {
        name: "Profile",
        icon: "ic_user",
        component: DentistProfileScreen
    }
]
const HomeNavigator = () => {
    const isConsumer = true;
    const activeTabs = 
        isConsumer ? consumerTabs : dentistTabs;

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >
        {
            activeTabs.map(t => (
                <Tab.Screen
                    key={t.name}
                    name={t.name}
                    component={t.component}
                    options={{                            
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused, color}) => <Image source={Images[focused ? t.icon : `${t.icon}_inactive`]}/>
                    }}
                />
            ))
        }
        </Tab.Navigator>
    );
};

export default HomeNavigator;