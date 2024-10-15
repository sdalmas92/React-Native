import React, { PureComponent } from 'react';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import correctly
import { TouchableOpacity, Alert, StyleSheet, View, Text } from 'react-native';

export default class Camera extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            takingPic: false,
        };
    }

    takePicture = async () => {
        if (this.camera && !this.state.takingPic) {
            let options = {
                quality: 0.85,
                fixOrientation: true,
                forceUpOrientation: true,
            };

            this.setState({ takingPic: true });

            try {
                const data = await this.camera.takePictureAsync(options);
                Alert.alert('Success', JSON.stringify(data));
            } catch (err) {
                Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
            } finally {
                this.setState({ takingPic: false });
            }
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* Camera */}
                <RNCamera
                    ref={ref => { this.camera = ref; }}
                    captureAudio={false}
                    style={{ flex: 1 }}
                    type={RNCamera.Constants.Type.back}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                />

                {/* Debugging Text */}
                <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>
                    Camera View
                </Text>

                {/* Simplified Button */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.takePicture}
                    style={styles.captureButton}>
                    <Icon name="camera" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    captureButton: {
        backgroundColor: '#000',
        borderRadius: 50,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
        left: '40%',
    },
});
