import React,{useEffect, useRef} from 'react';
import { SafeAreaView, Image, View, Pressable, Touchable, TouchableOpacity , Text, Easing, Animated} from 'react-native';
import style from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Routes } from '../../navigation/Routes';

const Splash = ({ navigation }) =>{

    const scaleAnim = useRef(new Animated.Value(1)).current;


    useEffect(() => {

        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.3, // Zoom in scale
                duration: 900, // Duration of zoom in (1 second)
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1, // Zoom out to original scale
                duration: 900, // Duration of zoom out (1 second)
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();

        // Set a 2-second delay before navigating to Home
        const timer = setTimeout(() => {
            navigation.navigate(Routes.UserLogin); // Change 'Home' to the correct route name for your Home page
        }, 2000);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigation]);

    return(
        <SafeAreaView style = {style.background}>
            <View style = {style.splashImageContainer}>
            <Animated.Image
                    style={[
                        style.splashImage,
                        { transform: [{ scale: scaleAnim }] },
                    ]}
                    source={require('../../assets/images/splash.png')}
                />
            </View>
            <View style ={style.textContainer}>
                <Text style = {style.text}>
                    Nordstone
                </Text>
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.button} onPress={() => navigation.navigate('UserLogin')}>
                <FontAwesomeIcon icon={faArrowRight} size={30} color="white"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Splash;
