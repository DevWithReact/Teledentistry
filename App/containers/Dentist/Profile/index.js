import * as React from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Button
} from 'react-native';
import Images from '../../../utils/Images';
import {styles} from './styles';
import Colors from '../../../utils/Colors';
import { AuthContext } from '../../../AuthProvider';

const DentistProfileScreen = ({ navigation }) => {
    const {logout} = React.useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
            <Image            
                source={Images.ic_logo}
                style={styles.logo}
                resizeMode={'contain'}
            />
            <View            
              style={{
                marginHorizontal: 10,
                marginBottom: 15,
              }}
            >
              <Button
                title="Log out"
                color={Colors.mintColor}
                onPress={() => {
                  logout();
                }}
              />
            </View>
        </SafeAreaView>
    );
};

export default DentistProfileScreen;