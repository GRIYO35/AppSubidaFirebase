import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FileUploadComponent = ({ setImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permisos denegados para acceder a la biblioteca de medios.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setSelectedImage(selectedAsset.uri);
      setImage(selectedAsset.uri);
    }
  };

  const handleImageClear = () => {
    setSelectedImage(null);
  };

  return (
    <View style = {styles.borderImage}>
      {selectedImage ? (
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: selectedImage }} style = {styles.image} />
          <TouchableOpacity onPress={handleImageClear} style = {styles.boton}>
            <Text style = {styles.textBoton}>Eliminar imagen</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleImagePicker} style = {styles.boton}>
          <Text style = {styles.textBoton}>Seleccionar imagen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#1B22F8',
    borderColor: '#0D0F45',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    margin: 10
  },
  textBoton: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      padding: 10
    },
  borderImage: {
    paddingTop: 30, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    borderWidth: 1,
    borderColor: '#0D0F45',
    borderRadius: 5,
    width: 250, 
    height: 250
  }
});
export default FileUploadComponent;