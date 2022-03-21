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
import {
  Send,
  Composer,
  InputToolbar
} from 'react-native-gifted-chat'
import Spinner from 'react-native-loading-spinner-overlay';
import { scale } from '../../utils/scale';
import ActionButton from '../../components/ActionButton';
import Colors from '../../utils/Colors';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PickerModal from '../../components/PickerModal';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { getFileExt } from '../../utils/commonUtil';
import * as Progress from 'react-native-progress';
import { getDeviceWidth } from '../../utils/extension';
import { createThumbnail } from "react-native-create-thumbnail";
import DocumentPicker from 'react-native-document-picker';
import { RNVoiceRecorder } from 'react-native-voice-recorder';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { getUserProfile, setReadAll, setUserTyping } from '../../services/FirebaseService';

const ChatScreen = ({ route, navigation }) => {
  const { channel: paramChannel }  = route.params;
  const [channel, setChannel] = React.useState(paramChannel);
  const { user, userProfile } = React.useContext(AuthContext);
  const [messages, setMessages] = React.useState([]);
  const [mediaType, setMediaType] = React.useState("");
  const [imagePickerModal, setImagePickerModal] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [uploadingProgress, setUploadingProgress] = React.useState(0);
  const [userInput, setUserInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const typingTimer = React.useRef(0);

  const otherTyping = channel[`typing_${channel.other._id}`];
  const chatTitle = channel.other.type === "dentist" ? "Dr. " + channel.other.name : channel.other.name;

  React.useEffect(() => {
    const channelSubscriber = firestore()
      .collection('channels')
      .doc(channel.id)
      .onSnapshot(async snapshot => {
        if (snapshot.exists) {
          const result = snapshot.data();
          if (userProfile.type === "dentist")
            result["other"] = await getUserProfile(channel.consumer);
          else
            result["other"] = await getUserProfile(channel.dentist);
              
          setChannel(result);
        }
      });
    const subscriber = firestore()
      .collection('channels')
      .doc(channel.id)
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const result = snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          firebaseId: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          image: doc.data().image,
          video: doc.data().video,
          audio: doc.data().audio,
          file: doc.data().file,
          user: doc.data().user,
          sent: doc.data().sent,
          emoticon: doc.data().emoticon
        }));
        setMessages(result);
        if (result.length) {
          console.log(result[0]);
          setReadAll(channel.id, userProfile._id, result[0]._id);
        }
      })
    return () => {
      subscriber();
      channelSubscriber();
    };
  }, [])

  React.useEffect(() => {
    setUserTyping(channel.id, user.uid, typing);
  }, [typing]);

  const sendMessage = (message) => {    
    setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    firestore()
      .collection('channels')
      .doc(channel.id)
      .collection('chats')
      .add({
          ...message,
          sent: true,
      })
      .then(() => {
          console.log('chat added!');
      })
      .catch((e) => {
        console.error(e);
      });
    firestore()
      .collection('channels')
      .doc(channel.id)
      .set({
        ...channel,
        updatedAt: new Date(),
        lastMsg: message
      });
  }
  const onSend = React.useCallback((messages = []) => {
    sendMessage(messages[0]);
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

      return <CustomMessage {...props} channel={channel} messageTextStyle={messageTextStyle} />
  }

  const uploadFile = async (path, type, success = () => {}) => {    
    const ext = getFileExt(path);
    const refPath = `${type}/${channel.id}/${uuidv4()}.${ext}`;
    const reference = storage().ref(refPath);
    console.log("Uploading...");
    setUploading(true);
    setUploadingProgress(0);
    try {
      const task = reference.putFile(path);
      task.on('state_changed', taskSnapshot => {
        const currentBytes = taskSnapshot.bytesTransferred;
        const totalBytes = taskSnapshot.totalBytes;
        setUploadingProgress(currentBytes/totalBytes);
      });
      task.then(async () => {
        const ref = storage().ref(refPath);
        const url = await ref.getDownloadURL(refPath);
        console.log("Uploading completed!", url);
        setUploading(false);
        success(url);
      })
    } catch (e) {
      console.error("Uploading File to firebase", e);
    }
  }

  const openCamera = async (openType) => {
    const options = {
      mediaType: mediaType
    };
    const result = openType == "library" ? await launchImageLibrary(options) : await launchCamera(options);
    if (!result || result.didCancel)
      return;
    const image = result.assets[0];

    uploadFile(image.uri, "files", async (url) => {
      if (mediaType === 'video') {
        const thumbResp = await createThumbnail({
          url: image.uri,
          timeStamp: 10000,
          format: "png"
        })
        uploadFile(thumbResp.path, "files", async (thumbUrl) => {
          const message = {
            _id: uuidv4(),
            user: userProfile,
            text: "",
            video: url,
            image: thumbUrl,
            createdAt: new Date(),
          };
          sendMessage(message);
        });
      } else {
        const message = {
          _id: uuidv4(),
          user: userProfile,
          text: "",
          image: url,
          createdAt: new Date(),
        };
        sendMessage(message);
      }
    });
  };

  const openFilePicker = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      })
      console.log(pickerResult);
      const {fileCopyUri: path, name, size, type} = pickerResult;
      uploadFile(path, "files", async (url) => {        
        const message = {
          _id: uuidv4(),
          user: userProfile,
          text: "",
          file: {
            url,
            name,
            size,
            type
          },
          createdAt: new Date(),
        };
        sendMessage(message);
      });
    } catch (e) {
      console.error(e)
    }
  }

  const archiveChat = () => {
    firestore()
      .collection('channels')
      .doc(channel.id)
      .set({          
          active: false,
          archivedAt: new Date()
      }, {
        merge: true
      })
      .then(() => {
          console.log('Archive successfully!');
      })
      .catch((e) => {
        console.error(e);
      });    
  }

  const onTextChanged = (e) => {
    setUserInput(e);
    setTyping(true);
    if (typingTimer.current)
      clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      setTyping(false);
    }, 10000)
  }

  const onSoundRecord = () => {    
    RNVoiceRecorder.Record({
      format: 'wav',
      onDone: path => {
        console.log("Sound recorded", path);
        uploadFile(path, "files", async (url) => {        
          const message = {
            _id: uuidv4(),
            user: userProfile,
            text: "",
            audio: url,
            createdAt: new Date(),
          };
          sendMessage(message);
        });
      },
      onCancel: () => {
        console.log('Record audio cancel');
      },
    });
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
          {chatTitle}
        </Text>
        <View style={styles.end_actions}>                    
          {channel.active && (
            <>
              <IconButton
                icon={Images.ic_webcam}
                width={24}
                height={24}
                disabled={!channel.active}
                onPress={() => { 
                  setMediaType("video");
                  setImagePickerModal(true);
                }}
              />
              <View style={styles.space}/>
              <IconButton
                icon={Images.ic_export}
                width={20}
                height={20}
                disabled={!channel.active}
                onPress={() => {
                  openFilePicker();
                }}
              />
            </>
          )}
          <View style={styles.space}/>
          <Menu>
            <MenuTrigger>
              <Image
                source={Images.ic_options_vertical}
                width={20}
                height={20}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => {
                  archiveChat();
                }}
                disabled={!channel.active}
              >
                <Text style={styles.menuOption}>Archive</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>
      {uploading && (
        <Progress.Bar
          progress={uploadingProgress}
          width={getDeviceWidth()}
          borderRadius={0}
          color={Colors.primaryColor}
        />
      )}
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={userProfile}
        renderMessage={renderMessage}
        renderChatFooter={(props) => otherTyping ? (
          <Text style={styles.typing}>{channel.other.name} is typing...</Text>
        ) : <View style={styles.footer}/>}
        renderInputToolbar={(props) => !channel.active ? (
          <View>
            <Text style={styles.archivedText}>This chat is archived.</Text>
          </View>
          ) : (
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbar}
          />
        )}
        renderActions={(props) => (
          <View style={styles.actionStyles}
          >
            <ActionButton
              icon={Images.ic_camera}
              onPress={() => {                
                setMediaType("image");
                setImagePickerModal(true);
              }}
            />
          </View>
        )}
        renderComposer={(props) => (
          <View style={styles.composerStyle}>
            <Composer
              {...props}
              textInputStyle={styles.composerInput}
              textInputProps={{
                numberOfLines: 3
              }}
              onTextChanged={onTextChanged}
              text={userInput}
            />
            <Send
              {...props}
              containerStyle={styles.sendStyle}
              alwaysShowSend={true}
              disabled={!userInput}
              sendButtonProps={{
                onPress: () => {
                  sendMessage({
                    _id: uuidv4(),
                    user: userProfile,
                    text: userInput,
                    createdAt: new Date(),
                  });
                  setUserInput("");
                  setTyping(false);
                }
              }}
            >
              <Text style={[userInput ? ApplicationStyles.primaryLabel : ApplicationStyles.secondaryLabel, {fontSize: scale(14)}]}>Send</Text>
            </Send>
          </View>
        )}
        renderSend={(props) => null}
      />
      <PickerModal
        visible={imagePickerModal}
        type={mediaType}
        onHide={() => {
          setImagePickerModal(false);
        }}
        onSelect={(type) => {
          setImagePickerModal(false);
          openCamera(type);
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;