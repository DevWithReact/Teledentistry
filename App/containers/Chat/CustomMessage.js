/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from 'prop-types'
import React from 'react'
import { View, ViewPropTypes, StyleSheet, Image } from 'react-native'

import { Bubble, Day, utils } from 'react-native-gifted-chat'
import CustomBubble from './CustomBubble'
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';
import IconButton from '../../components/IconButton'

const { isSameUser, isSameDay } = utils

export default class Message extends React.Component {
  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props
    return {
      ...props,
      isSameUser,
      isSameDay,
    }
  }

  renderBubble() {    
    const bubbleProps = this.getInnerComponentProps()
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps)
    }

    return (
      <CustomBubble
        {...bubbleProps}    
        wrapperStyle={{
          left: {
            borderColor: '#E9E8E6',
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: scale(20),
            paddingHorizontal: scale(19),
            paddingVertical: scale(10)
          },
          right: {
            backgroundColor: '#D2D9EE',
            borderRadius: scale(20),
            paddingHorizontal: scale(19),
            paddingVertical: scale(10)
          }
        }}
        renderTime={() => null}
      />
    )
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

  render() {
    return (
      <View>
        <View
          style={[
            styles.container,
            this.props.containerStyle,
          ]}
        >
          {this.renderBubble()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 0,
    marginBottom: 8,
  },
  slackAvatar: {
    // The bottom should roughly line up with the first line of message text.
    height: 40,
    width: 40,
    borderRadius: 3,
  },
  eye: {
    width: scale(15),
    height: scale(9),
    marginRight: scale(11)
  },
  options: {
    width: scale(20),
    height: scale(20),
  }
})

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
}

Message.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
}