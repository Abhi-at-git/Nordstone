import React from 'react';

import style from './style';
import {Image, View, ScrollView} from 'react-native';

const ProfileTabContent = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={style.profileTabContentContainer}>
      <View style={style.profileTabContent}>
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
        <Image
          resizeMode={'contain'}
          style={style.image}
          source={require('../../assets/images/nordstone_logo.jpg')}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileTabContent;