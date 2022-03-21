import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAudioTimeString } from '../../utils/commonUtil';
import { styles } from './styles';
import Colors from '../../utils/Colors';

const AudioPlayer = ({url, }) => {
  const [playState, setPlayState] = useState('paused'); //playing, paused
  const [playSeconds, setPlaySeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const sliderEditing = useRef(false);
  const sound = useRef(null);
  const timeout = useRef(0);

  useEffect(() => {
    const basePath = Platform.select({ios: "", android: Sound.MAIN_BUNDLE});   
    setLoading(true);

    sound.current = new Sound(url, basePath , error => {
      if (error) {
        console.errro('Failed to load the sound', error);
        setPlayState('paused');
      } else {
        try {
          setDuration(sound.current.getDuration());
        } catch (err) {
          console.error('AUDIOEXCEPTION: ' + err);
        }
      }
      setLoading(false);
    });
    
    return () => {
      if (sound.current) {
        sound.current.release();
        sound.current = null;
      }
    }
  }, []);

  React.useEffect(() => {
    timeout.current = setInterval(() => {
      if (
        sound.current &&
        sound.current.isLoaded() &&
        playState == 'playing' &&
        !sliderEditing.current
      ) {
        sound.current.getCurrentTime((seconds, isPlaying) => {
          setPlaySeconds(seconds);
        });
      }
    }, 100);
    
    return () => {
      if (timeout.current) {
        clearInterval(timeout.current);
      }
    }
  }, [playState]);
  
  onSliderEditStart = () => {
    sliderEditing.current = true;
  }

  onSliderEditEnd = () => {
    sliderEditing.current = false;
  }

  onSliderEditing = value => {
    console.log('onSlider', value, sound)
    if (sound.current) {
      sound.current.setCurrentTime(value);
      setPlaySeconds(value);
    }
  }

  play = async () => {
    if (sound.current &&
        sound.current.isLoaded()) {
      sound.current.play(playComplete);
      setPlayState('playing');
    } else {
      console.error('Not fully loaded audio file');
    }
  }

  playComplete = success => {
    if (sound.current) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.error('playback failed due to audio decoding errors');
      }
      setPlayState('paused');
      setPlaySeconds(0);
      sound.current.setCurrentTime(0);
    }
  };

  pause = () => {
    if (sound.current) {
      sound.current.pause();
    }
    setPlayState('paused');
  };

  const currentTimeString = getAudioTimeString(playSeconds);
  const durationString = getAudioTimeString(duration);

  return (
    <View
      style={styles.container}>
      <View style={styles.playerWrapper}>
        {loading ?
          <ActivityIndicator size="small" color={Colors.primaryColor} /> : 
          <>
            {playState == 'playing' && (
              <TouchableOpacity
                onPress={pause}
                style={{marginRight: 5}}>
                <FontAwesome name="pause" color={Colors.black} size={15} />
              </TouchableOpacity>
            )}
            {playState == 'paused' && (
              <TouchableOpacity
                onPress={play}
                style={{marginRight: 5}}>
                <FontAwesome name="play" color={Colors.black} size={15} />
              </TouchableOpacity>
            )}
            <Text style={{color: Colors.black, alignSelf: 'center'}}>
              {currentTimeString}
            </Text>
            <Text style={{color: Colors.black, marginHorizontal: 5}}>/</Text>
            <Text style={{color: Colors.black, alignSelf: 'center'}}>
              {durationString}
            </Text>
          </>}
        <Slider
          onTouchStart={onSliderEditStart}
          onTouchEnd={onSliderEditEnd}
          onValueChange={onSliderEditing}
          onSlidingComplete={onSliderEditing}
          value={playSeconds}
          maximumValue={duration}
          maximumTrackTintColor={Colors.black}
          minimumTrackTintColor={Colors.black}
          thumbTintColor={Colors.black}
          style={styles.slider}
        />
      </View>
    </View>
  );
}
export default AudioPlayer;