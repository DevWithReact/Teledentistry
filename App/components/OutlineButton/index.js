import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

const OutlineButton = ({ title, loading, onPress}) => {
	return (
		<TouchableOpacity
			style={styles.container}
			disabled={loading}
			onPress={onPress}
		>
				{loading ? (
					<ActivityIndicator size="small" color="white" />
				) : (
					<Text style={styles.text}>
						{title}
					</Text>
				)}
		</TouchableOpacity>
	);
};

OutlineButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}

export default OutlineButton;