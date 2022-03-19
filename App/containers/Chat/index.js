import * as React from 'react';
import {
    SafeAreaView,
    Image,
    View,
    Text,
    FlatList
  } from 'react-native';
import ChannelCard from '../../components/ChannelCard';
import IconButton from '../../components/IconButton';
import { GiftedChat } from 'react-native-gifted-chat'
import ApplicationStyles from '../../utils/ApplicationStyles';
import Images from '../../utils/Images';
import firestore from '@react-native-firebase/firestore';
import emojiUtils from 'emoji-utils'
import {styles} from './styles';
import { AuthContext } from '../../AuthProvider';
import CustomMessage from './CustomMessage'

const ChatScreen = ({ route, navigation }) => {
    const { user, userProfile } = React.useContext(AuthContext);
    const { channel }  = route.params;
    console.log(channel, userProfile)
    const [messages, setMessages] = React.useState([]);    
    React.useEffect(() => {
        const subscriber = firestore()
            .collection('channels')
            .doc(channel.id)
            .collection('chats')
            .onSnapshot(snapshot => {
                console.log("change", snapshot)
                const result = snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }));
                setMessages(result);
            })
        return () => subscriber();
    }, [])

    const onSend = React.useCallback((messages = []) => {
        console.log(messages);
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user } = messages[0];
        firestore()
            .collection('channels')
            .doc(channel.id)
            .collection('chats')
            .add({
                _id,
                createdAt,
                text,
                user
            })
            .then(() => {
                console.log('chat added!');
            });   
    }, [])

    

    const renderMessage = (props) => {
        const {
            currentMessage: { text: currText },
        } = props

        let messageTextStyle

        // Make "pure emoji" messages much bigger than plain text.
        if (currText && emojiUtils.isPureEmojiString(currText)) {
            messageTextStyle = {
                fontSize: 28,
                // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
                lineHeight: Platform.OS === 'android' ? 34 : 30,
            }
        }

        return <CustomMessage {...props} messageTextStyle={messageTextStyle} />
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.appBar}>
                <View style={styles.left_actions}>
                    <IconButton
                        icon={Images.ic_chevron_left}
                        width={12}
                        height={21}
                        onPress={() => {
                            navigation.pop();
                        }}
                    />
                </View>
                <Text style={[ApplicationStyles.darkLabel, styles.appbarText]}>
                    Dr. Patricia Speidel
                </Text>
                <View style={styles.end_actions}>                    
                    <IconButton
                        icon={Images.ic_webcam}
                        width={24}
                        height={24}
                        onPress={() => {}}
                    />
                    <View style={styles.space}/>
                    <IconButton
                        icon={Images.ic_export}
                        width={20}
                        height={20}
                        onPress={() => {}}
                    />
                    <View style={styles.space}/>
                    <IconButton
                        icon={Images.ic_options_vertical}
                        width={20}
                        height={20}
                        onPress={() => {}}
                    />
                </View>
            </View>
           <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={userProfile}
                isTyping={true}
                renderMessage={renderMessage}
           />
        </SafeAreaView>
    );
};

export default ChatScreen;