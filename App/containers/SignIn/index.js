import * as React from 'react';
import {
    SafeAreaView,
    Image,
    View,
    Text
  } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import AuthInput from '../../components/AuthInput';
import LinkButton from '../../components/LinkButton';
import OutlineButton from '../../components/OutlineButton';
import Images from '../../utils/Images';
import {styles} from './styles';

const SignInScreen = ({ navigation }) => {
    const {loading, login} = React.useContext(AuthContext);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <KeyboardAwareScrollView style={{flex: 1}}>
            <View style={styles.container}>
            <Image            
                source={Images.ic_logo}
                style={styles.logo}
                resizeMode={'contain'}
            />
            <Text style={styles.greetingText}>
                Make your best smile.
            </Text>
            <View style={styles.inputForm}>
                <AuthInput
                    placeholder='Username'
                    icon={Images.ic_user_simple}
                    value={userName}
                    onChangeText={(v) => setUserName(v)}
                    borderType={"roundTop"}
                />
                <AuthInput
                    placeholder='Password'
                    icon={Images.ic_edit}
                    value={password}
                    onChangeText={(v) => setPassword(v)}
                    borderType={"roundBottom"}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.loginWrapper}>
                <OutlineButton
                    title="Login"
                    loading={loading}
                    onPress={() => {        
                        login(userName, password);
                    }}
                />
            </View>
            <View style={styles.forgetWrapper}>
                <LinkButton
                    title="Forget password?"
                    underline={false}
                    onPress={() => {
                    }}
                />
            </View>
            <View style={styles.noteWrapper}>
                <Text style={styles.noteText}>Don't have an account? </Text>
                <LinkButton
                    title="Sign up here."
                    onPress={() => {
                        navigation.navigate("SignUp");
                    }}
                />
            </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default SignInScreen;