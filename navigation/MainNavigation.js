import { Routes } from "./Routes";
import {createStackNavigator} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Splash from "../Screens/Splash/Splash";
import UserLogin from "../Screens/UserLogin/UserLogin";
import SignUp from "../Screens/SignUp/SignUp";
import Home from "../Screens/Home/Home";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";

import ProfileTabTitle from "../components/ProfileTabTitle/ProfileTabTitle";
import ProfileTabContent from "../components/ProfileTabContent/ProfileTabComponent";
import { Notification } from "../Screens/Notification/Notification";
import TextUpload from "../Screens/TextUpload/TextUpload";
import Calculator from "../Screens/Calculator/Calculator";



const Stack = createStackNavigator();

const ProfileTabs = createMaterialTopTabNavigator();

export const ProfileTabsNavigation = () => { 
    return(
        <ProfileTabs.Navigator
        screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: 'transparent',
            },
            tabBarStyle: {
              zIndex: 0,
              elevation: 0,
            },
            tabBarScrollEnabled: true,
            tabBarItemStyle: { width: 160 },
            tabBarLabelStyle: { fontSize: 14 },
          }}>
            <ProfileTabs.Screen
            name={'Notification'}
            options={{
                tabBarLabel: ({focused}) => <ProfileTabTitle isFocused={focused} title={'Notification'} />
            }}
            component={Notification}/>
            <ProfileTabs.Screen
            name={'Photos'}
            options={{
                tabBarLabel: ({focused}) => <ProfileTabTitle isFocused={focused} title={'Photos'} />
            }}
            component={ProfileTabContent}/>
            <ProfileTabs.Screen
            name={'Tab3'}
            options={{
                tabBarLabel: ({focused}) => <ProfileTabTitle isFocused={focused} title={'WritePad'} />
            }}
            component={TextUpload}/>
            <ProfileTabs.Screen
            name={'Tab4'}
            options={{
                tabBarLabel: ({focused}) => <ProfileTabTitle isFocused={focused} title={'Calculator'} />
            }}
            component={Calculator}/>
        </ProfileTabs.Navigator>
    )
}

const MainNavigation = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name= {Routes.Splash} component={Splash} />
            <Stack.Screen name={Routes.UserLogin} component={UserLogin} />
            <Stack.Screen name={Routes.SignUp} component={SignUp} />
            <Stack.Screen name={Routes.ForgotPassword} component={ForgotPassword} />
            <Stack.Screen name={Routes.Home} component={Home} />
        </Stack.Navigator>
    )
}


export default MainNavigation;