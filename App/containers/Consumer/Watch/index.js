import * as React from 'react';
import {
  SafeAreaView,
  Image,
  View,
} from 'react-native';
import Images from '../../../utils/Images';
import {styles} from './styles';

const ConsumerWatchScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image            
                source={Images.ic_logo}
                style={styles.logo}
                resizeMode={'contain'}
            />
        </SafeAreaView>
    );
};

export default ConsumerWatchScreen;