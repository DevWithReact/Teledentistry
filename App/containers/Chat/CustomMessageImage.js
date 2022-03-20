import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
// TODO: support web
// @ts-ignore
import Lightbox from 'react-native-lightbox';
import VideoModal from '../../components/VideoModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import { scale } from '../../utils/scale';

const styles = StyleSheet.create({
    container: {},
    image: {
        width: scale(150),
        height: scale(100),
        borderRadius: scale(13),
        margin: 3,
        resizeMode: 'cover',
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
    },
    playWrapper: {
      position: 'absolute',
      zIndex: 1000,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    playCircle: {
      borderRadius: scale(15),
      width: scale(30),
      height: scale(30),
      backgroundColor: Colors.actionButtonBackground,
      alignItems: 'center',
      justifyContent: 'center',
      
    }
});
export default class CustomMessageImage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        videoModal: false
      };
    }

    onOpenVideo = () => {
      this.setState({
        videoModal: true
      })
    }
    onCloseVideo = () => {
      this.setState({
        videoModal: false
      })
    }
    render() {
        const { containerStyle, lightboxProps, imageProps, imageStyle, currentMessage, } = this.props;
        if (!!currentMessage) {
            return (
            <View style={[styles.container, containerStyle]}>
              {currentMessage.video ? (
                  <>
                  <VideoModal
                    currentMessage={currentMessage}
                    visible={this.state.videoModal}
                    onClose={this.onCloseVideo}
                  />
                  <TouchableOpacity
                    onPress={this.onOpenVideo}
                    style={styles.videoWrapper}
                  >   
                    <View style={styles.playWrapper}>
                      <View style={styles.playCircle}>
                        <Icon
                          name="play"
                        />
                      </View>
                    </View>
                    <Image {...imageProps} style={[styles.image, imageStyle]} source={{ uri: currentMessage.image }}/>
                  </TouchableOpacity>
                  </>
                ) : (
                  <Lightbox swipeToDismiss={false} activeProps={{
                        style: styles.imageActive,
                    }} {...lightboxProps}>
                    <Image {...imageProps} style={[styles.image, imageStyle]} source={{ uri: currentMessage.image }}/>
                  </Lightbox>
                )
              }
            </View>
          );
        }
        return null;
    }
}
CustomMessageImage.defaultProps = {
    currentMessage: {
        image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
};
CustomMessageImage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
};