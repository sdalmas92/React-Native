import React, { useState } from 'react';
import Camera from './components/Camera';
import { SafeAreaView, Image, TouchableOpacity } from 'react-native';

const App = () => {
  const [img, setImg] = useState(null);  // State to store image URI

  // Function called when a picture is taken
  function onPicture({ uri }) {
    setImg(uri);  // Update the state with the image URI
  }

  // Function to go back to the camera view
  function onBackToCamera() {
    setImg(null);  // Reset the image URI, which shows the camera
  }

  return (
    <SafeAreaView style={{flex:1}}>
      {img ? (
        <TouchableOpacity
          style={{flex: 1}}
          onPress={onBackToCamera}  // Go back to camera when the image is pressed
        >
          <Image source={{uri: img}} style={{flex: 1}} />  /* Display the image */
        </TouchableOpacity>
      ) : (
        <Camera onPicture={onPicture} />  /* Show the camera if no image */
      )}
    </SafeAreaView>
  );
};

export default App;
