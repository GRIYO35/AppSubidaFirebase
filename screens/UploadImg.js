import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadString } from 'firebase/storage';
import appFirebase from '../credenciales';
import { FileSystem } from 'expo-file-system';

const ImageUploader = () => {
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
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setSelectedImage(selectedAsset.uri);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      console.log('No se ha seleccionado ninguna imagen.');
      return;
    }
  
    try {
      const blob = await convertUriToBlob(selectedImage);
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + Date.now() + '.png');
  
      await uploadString(storageRef, blob, 'data_url');
      console.log('Imagen subida exitosamente.');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };
  
  const convertUriToBlob = async (uri) => {
    const fileUri = FileSystem.documentDirectory + 'tempImage.png';
    await FileSystem.copyAsync({
      from: uri,
      to: fileUri,
    });
  
    const response = await fetch(fileUri);
    const blob = await response.blob();
    return blob;
  };

  const handleImageClear = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TouchableOpacity onPress={handleImageClear} style={styles.boton}>
            <Text style={styles.textBoton}>Eliminar imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUploadImage} style={styles.boton}>
            <Text style={styles.textBoton}>Subir imagen</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleImagePicker} style={styles.boton}>
          <Text style={styles.textBoton}>Seleccionar imagen</Text>
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
    marginTop: 10,
    padding: 10
  },
  textBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    borderWidth: 1,
    borderColor: '#0D0F45',
    borderRadius: 5,
    width: 250,
    height: 250,
    marginBottom: 20
  }
});

export default ImageUploader;