/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from 'prop-types'
import React from 'react'
import {
  Text,
  Clipboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
  Image
} from 'react-native'

import {
  MessageText,
  MessageImage,
  Time,
  utils,
} from 'react-native-gifted-chat'
import Images from '../../utils/Images';
import IconButton from '../../components/IconButton'
import {scale} from '../../utils/scale';
import Fonts from '../../utils/Fonts';

const { isSameUser, isSameDay } = utils

export default class Bubble extends React.Component {
  constructor(props) {
    super(props)
    this.onLongPress = this.onLongPress.bind(this)
  }

  onLongPress() {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage)
    } else {
      if (this.props.currentMessage.text) {
        const options = ['Copy Text', 'Cancel']
        const cancelButtonIndex = options.length - 1
        this.context.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(this.props.currentMessage.text)
                break
            }
          },
        )
      }
    }
  }

  renderMessageText() {
    if (this.props.currentMessage.text) {
      const {
        containerStyle,
        wrapperStyle,
        messageTextStyle,
        ...messageTextProps
      } = this.props
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps)
      }
      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: [
              styles.standardFont,
              styles.slackMessageText,
              messageTextProps.textStyle && messageTextProps.textStyle.left,
              messageTextStyle,
            ],            
            right: [
              styles.standardFont,
              styles.slackMessageText,
              messageTextProps.textStyle && messageTextProps.textStyle.right,
              messageTextStyle,
            ],
          }}
        />
      )
    }
    return null
  }

  renderMessageImage() {
    if (this.props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = this.props
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps)
      }
      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      )
    }
    return null
  }

  renderTicks() {
    const { currentMessage } = this.props
    if (this.props.renderTicks) {
      return this.props.renderTicks(currentMessage)
    }
    if (currentMessage.user._id !== this.props.user._id) {
      return null
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.headerItem, styles.tickView]}>
          {currentMessage.sent && (
            <Text
              style={[styles.standardFont, styles.tick, this.props.tickStyle]}
            >
              ✓
            </Text>
          )}
          {currentMessage.received && (
            <Text
              style={[styles.standardFont, styles.tick, this.props.tickStyle]}
            >
              ✓
            </Text>
          )}
        </View>
      )
    }
    return null
  }

  renderUsername() {
    const username = this.props.currentMessage.user.name
    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = this.props
      if (this.props.renderUsername) {
        return this.props.renderUsername(usernameProps)
      }
      return (
        <Text
          style={[
            styles.standardFont,
            styles.headerItem,
            styles.username,
            this.props.usernameStyle,
          ]}
        >
          {username}
        </Text>
      )
    }
    return null
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = this.props
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps)
      }
      return (
        <Time
          {...timeProps}
          containerStyle={{ left: [styles.timeContainer] }}
          textStyle={{
            left: [
              styles.standardFont,
              styles.headerItem,
              styles.time,
              timeProps.textStyle,
            ],
          }}
        />
      )
    }
    return null
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props)
    }
    return null
  }

  renderEye() {
    return (
      <View>
        <Image
          source={Images.ic_seen}
          style={styles.eye}
        />
      </View>
    )
  }
  renderOption() {
    return (
      <View>
        <IconButton
          icon={Images.ic_options_vertical_inactive}
          width={20}
          height={20}
          onPress={() => {

          }}
        />
      </View>
    )
  }
  renderEmoticon() {
    const { emoticon } = this.props.currentMessage;
    if (!emoticon)
      return null;
    
    return (
      <Image
        source={Images.ic_react_smile}
        style={styles.emoticon}
      />
    )
  }

  render() {
    const isSameThread =
      isSameUser(this.props.currentMessage, this.props.previousMessage) &&
      isSameDay(this.props.currentMessage, this.props.previousMessage)
    const { position } = this.props;
    const messageHeader = isSameThread ? null : (
      <View style={styles.headerView}>
        {this.renderUsername()}
        {this.renderTime()}
        {this.renderTicks()}
      </View>
    )
    
    const containerStyle = 
      position == "left" ? {
        justifyContent: 'flex-start'
      } : {
        justifyContent: 'flex-end'
      };
    if (!this.props.previousMessage._id) {
      containerStyle.marginTop = scale(15);
    }
    return (
      <View style={[styles.container, this.props.containerStyle, containerStyle]}>        
        {this.renderEye()}
        <TouchableOpacity
          onLongPress={this.onLongPress}
          accessibilityTraits='text'
          {...this.props.touchableProps}
        >
          <View style={[styles.wrapper, this.props.wrapperStyle[position]]}>
            {this.renderEmoticon()}
            <View>
              {this.renderCustomView()}
              {this.renderMessageImage()}
              {this.renderMessageText()}
            </View>
          </View>
        </TouchableOpacity>        
        {this.renderOption()}
      </View>
    )
  }
}

// Note: Everything is forced to be "left" positioned with this component.
// The "right" position is only used in the default Bubble.
const styles = StyleSheet.create({
  standardFont: {
    color: '#636C69',
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '500',
    fontSize: scale(14)
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0,
  },
  eye: {
    width: scale(15),
    height: scale(9),
    marginRight: scale(11)
  },
  options: {
    width: scale(20),
    height: scale(20),
  },
  emoticon: {
    width: scale(28),
    height: scale(28),
    position: 'absolute',
    left: scale(-10),
    top: scale(-10)
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  wrapper: {
    minHeight: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(63, 95, 194, 0.2)'
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    textAlign: 'left',
    fontSize: 12,
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  headerItem: {
    marginRight: 10,
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    marginTop: Platform.OS === 'android' ? -2 : 0,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  /* eslint-disable react-native/no-color-literals */
  tick: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  /* eslint-enable react-native/no-color-literals */
  tickView: {
    flexDirection: 'row',
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
  },
})

Bubble.contextTypes = {
  actionSheet: PropTypes.func,
}

Bubble.defaultProps = {
  touchableProps: {},
  onLongPress: null,
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  renderTime: null,
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  tickStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
}

Bubble.propTypes = {
  touchableProps: PropTypes.object,
  onLongPress: PropTypes.func,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderCustomView: PropTypes.func,
  renderUsername: PropTypes.func,
  renderTime: PropTypes.func,
  renderTicks: PropTypes.func,
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  wrapperStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  messageTextStyle: Text.propTypes.style,
  usernameStyle: Text.propTypes.style,
  tickStyle: Text.propTypes.style,
  containerToNextStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  containerToPreviousStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
}