import * as React from 'react';
import {
    SafeAreaView,
    Image,
    View,
    Text,
    FlatList
  } from 'react-native';
import AuthInput from '../../components/AuthInput';
import ChannelCard from '../../components/ChannelCard';
import IconButton from '../../components/IconButton';
import LinkButton from '../../components/LinkButton';
import OutlineButton from '../../components/OutlineButton';
import ApplicationStyles from '../../utils/ApplicationStyles';
import Images from '../../utils/Images';
import {styles} from './styles';

const ChannelScreen = ({ navigation, parentNavigation }) => {
    const channels = [{
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
    const archivedChannels = [{
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
    const renderItem = ({ item }) => (
      <ChannelCard {...item} />
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
                            parentNavigation.navigate("Chat");
                        }}
                    />
                </View>
            </View>
            <FlatList
                style={styles.mainList}
                data={channels}
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