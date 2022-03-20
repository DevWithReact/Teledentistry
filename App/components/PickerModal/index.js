import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button
  } from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import {styles} from './styles';
import Colors from '../../utils/Colors';
import ApplicationStyles from '../../utils/ApplicationStyles';

const PickerModal = ({ type, visible, onHide, onSelect}) => {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => {
                onHide();
            }}
            onBackButtonPress={() => {
                onHide();
            }}
        >
          <View style={styles.container}>
            <Text style={[ApplicationStyles.primaryLabel ,styles.label]}>Select {type === "image" ? "Image" : "Video"}</Text>
            <Button
                title='Open Library'
                color={Colors.primaryColor}
                onPress={() => {
                    onSelect("library");
                }}
            />
            <View style={styles.gap}/>
            <Button
                title='Open Camera'
                color={Colors.primaryColor}
                onPress={() => {
                    onSelect("camera");
                }}
            />
            <View style={styles.gap}/>
            <Button
                title='Cancel'
                color={Colors.greyColor}
                onPress={() => {
                    onHide();
                }}
            />
          </View>
        </Modal>
    );
};

PickerModal.propTypes = {
    type: PropTypes.string,
    visible: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
}

export default PickerModal;