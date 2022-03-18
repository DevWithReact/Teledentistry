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
import {styles} from './styles';

const ChatScreen = ({ navigation }) => {    
    const [messages, setMessages] = React.useState([]);    
    React.useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            sent: true,
            received: true,
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.appBar}>
                <View style={styles.left_actions}>
                    <IconButton
                        icon={Images.ic_chevron_left}
                        width={12}
                        height={21}
                        onPress={() => {}}
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
                user={{
                    _id: 1,
                }}
                isTyping={true}
           />
        </SafeAreaView>
    );
};

export default ChatScreen;