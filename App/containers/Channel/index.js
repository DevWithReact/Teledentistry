import * as React from 'react';
import {
    SafeAreaView,
    Image,
    View,
    Text,
    FlatList
  } from 'react-native';
import { AuthContext } from '../../AuthProvider';
import AuthInput from '../../components/AuthInput';
import ChannelCard from '../../components/ChannelCard';
import IconButton from '../../components/IconButton';
import LinkButton from '../../components/LinkButton';
import OutlineButton from '../../components/OutlineButton';
import ApplicationStyles from '../../utils/ApplicationStyles';
import Images from '../../utils/Images';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import { getUserProfile } from '../../services/FirebaseService';
const templateActive = [{
    id: "1",
    avatar: Images.template_user,
    title: "Dr. Patricia Speidel, DMD",
    message: "Hey! Wanted to reach out regarding ...",
    time: "12:45 PM"
}, {
    id: "2",
    avatar: Images.template_user,
    title: "Susie Cassin, RDH",
    message: "Just make sure you’re flossing regularl...",
    time: "11/15/2021"
},{
    id: "3",
    avatar: Images.template_user,
    title: "Dr. Patricia Speidel, DMD",
    message: "Hey! Wanted to reach out regarding ...",
    time: "12:45 PM"
}, {
    id: "4",
    avatar: Images.template_user,
    title: "Susie Cassin, RDH",
    message: "Just make sure you’re flossing regularl...",
    time: "11/15/2021"
}];
const templateArchived = [{
    id: "1",
    avatar: Images.template_user,
    title: "Dr. Patricia Speidel, DMD",
    message: "Hey! Wanted to reach out regarding ...",
    time: "12:45 PM"
}, {
    id: "2",
    avatar: Images.template_user,
    title: "Susie Cassin, RDH",
    message: "Just make sure you’re flossing regularl...",
    time: "11/15/2021"
}, {
    id: "3",
    avatar: Images.template_user,
    title: "Dr. Patricia Speidel, DMD",
    message: "Hey! Wanted to reach out regarding ...",
    time: "12:45 PM"
}, {
    id: "4",
    avatar: Images.template_user,
    title: "Susie Cassin, RDH",
    message: "Just make sure you’re flossing regularl...",
    time: "11/15/2021"
}, {
    id: "5",
    avatar: Images.template_user,
    title: "Susie Cassin, RDH",
    message: "Just make sure you’re flossing regularl...",
    time: "11/15/2021"
}, {
    id: "6",
    avatar: Images.template_user,
    title: "Dr. Patricia Speidel, DMD",
    message: "Hey! Wanted to reach out regarding ...",
    time: "12:45 PM"
}, {
    id: "7",
    avatar: Images.template_user,
    title: "Susie Cassin, RDH",
    message: "Just make sure you’re flossing regularl...",
    time: "11/15/2021"
}];
const ChannelScreen = ({ navigation, parentNavigation }) => {
    const {user, userProfile}  = React.useContext(AuthContext);    
    const [activeChannels, setActiveChannels] = React.useState([]);
    const [archivedChannels, setArchivedChannels] = React.useState([]);

    React.useEffect(() => {
        console.log("Profile", userProfile)
        firestore()
            .collection('channels')
            .where(userProfile.type, '==', userProfile._id)
            .onSnapshot(async snapshot => {
                console.log("Updated channel");
                if (!snapshot)
                    return;
                console.log('Total channels: ', snapshot.docs.length);
                const savedUsers = {};
                const resultActiveChannels = [];
                const resultArchivedChannels = [];
                const channels = [];
                snapshot.forEach(async documentSnapshot => {
                    console.log('Channel ID: ', documentSnapshot.id, documentSnapshot.data());
                    var channel = documentSnapshot.data();
                    channel.id = documentSnapshot.id;
                    channels.push(channel);
                });
                for(var i = 0; i < channels.length; i ++) { 
                    var channel = channels[i];                   
                    if (!savedUsers[channel.dentist]) {
                        savedUsers[channel.dentist] = await getUserProfile(channel.dentist);                        
                    }
                    if (!savedUsers[channel.consumer]) {
                        savedUsers[channel.consumer] = await getUserProfile(channel.consumer);
                    }
                    var dentist = savedUsers[channel.dentist];
                    var consumer = savedUsers[channel.consumer];
                    if (userProfile.type === "dentist")
                        channel["other"] = consumer;
                    else
                        channel["other"] = dentist;
                    if (channel.active)
                        resultActiveChannels.push(channel);
                    else
                        resultArchivedChannels.push(channel);
                }
                setActiveChannels(resultActiveChannels);
                setArchivedChannels(resultArchivedChannels);
            });
    }, []);
    const renderItem = ({ item }) => (
      <ChannelCard
        avatar={item["other"].avatar}
        title={item["other"].name}
        message={item.lastMsg}
        time={new Date()}
        active={item["other"].online}
        onPress={() => {
            parentNavigation.navigate("Chat", { channel: item });
        }}
      />
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.appBar}>
                <Text style={[ApplicationStyles.primaryLabel, ApplicationStyles.textCenter]}>
                    Physician Chats
                </Text>
                <View style={styles.action}>
                    <IconButton
                        icon={Images.ic_search}
                        onPress={() => {
                        }}
                    />
                </View>
            </View>
            <FlatList
                style={styles.mainList}
                data={activeChannels}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Text
                style={[ApplicationStyles.primaryLabel, ApplicationStyles.textCenter, styles.archived]}
            >
                Archived
            </Text>
            <FlatList
                style={styles.archivedList}
                data={archivedChannels}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <Text style={[ApplicationStyles.textDesc, ApplicationStyles.textCenter]}>Nothing to see here</Text>
                }
            />
        </SafeAreaView>
    );
};

export default ChannelScreen;