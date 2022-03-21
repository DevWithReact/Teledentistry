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
      if (sound.current) {
        sound.current.release();
        sound.current = null;
      }
      if (timeout.current) {
        clearInterval(timeout.current);
      }
    }
  }, []);
  onSliderEditStart = () => {
    sliderEditing.current = true;
  }

  onSliderEditEnd = () => {
    sliderEditing.current = false;
  }

  onSliderEditing = value => {
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
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 30,
        padding: 10,
      }}>
      <View style={{marginHorizontal: 5, flexDirection: 'row', alignItems: "center"}}>
        {loading ?
          <ActivityIndicator size="small" color="#ff6600" /> : 
          <>
            {playState == 'playing' && (
              <TouchableOpacity
                onPress={pause}
                style={{marginHorizontal: 10}}>
                <FontAwesome name="pause" color="#000" size={15} />
              </TouchableOpacity>
            )}
            {playState == 'paused' && (
              <TouchableOpacity
                onPress={play}
                style={{marginHorizontal: 10}}>
                <FontAwesome name="play" color="#000" size={15} />
              </TouchableOpacity>
            )}
            <Text style={{color: '#000', alignSelf: 'center'}}>
              {currentTimeString}
            </Text>
            <Text style={{color: '#000', marginHorizontal: 5}}>/</Text>
            <Text style={{color: '#000', alignSelf: 'center'}}>
              {durationString}
            </Text>
          </>}
        <Slider
          onTouchStart={onSliderEditStart}
          onTouchEnd={onSliderEditEnd}
          onValueChange={onSliderEditing}
          value={playSeconds}
          maximumValue={duration}
          maximumTrackTintColor="#000"
          minimumTrackTintColor="#000"
          thumbTintColor="#000"
          style={{
            flex: 1,
            alignSelf: 'center',
            marginHorizontal: Platform.select({ios: 5}),
          }}
        />
      </View>
    </View>
  );
}
export default AudioPlayer;