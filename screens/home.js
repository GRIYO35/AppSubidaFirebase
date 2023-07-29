import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function home(props) {

  const initialState = {
    text: '',
    text1: '',
    text2: '',
    text3: '',
  };

  const [estado, setEstado] = useState(initialState);

  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const saveText = async () => {
    try {
      if (estado.text === '' || estado.text1 === '' || estado.text2 === '' || estado.text3 === '') {
        Alert.alert('Mensaje importante', 'Debes completar todos los campos');
        return;
      }

      const nota = {
        text: estado.text,
        text1: estado.text1,
        text2: estado.text2,
        text3: estado.text3,
      };

      await addDoc(collection(db, 'nota'), { ...nota });
      console.log(nota);

      handleChangeText('', 'text');
      handleChangeText('', 'text1');
      handleChangeText('', 'text2');
      handleChangeText('', 'text3');

      props.navigation.navigate('UploadImg')
      
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'Hubo un error al guardar los datos. Por favor, intenta nuevamente.');
    }
  };

  return (
    <View>
      <View style={styles.vista}>
        <View style={styles.borde}>
          <TextInput
            placeholder='Ingresa el texto'
            style={styles.textInput}
            value={estado.text}
            onChangeText={(value) => handleChangeText(value, 'text')}
          />
        </View>
        <View style={styles.borde}>
          <TextInput
            placeholder='Ingresa el texto'
            style={styles.textInput}
            value={estado.text1}
            onChangeText={(value) => handleChangeText(value, 'text1')}
          />
        </View>
        <View style={styles.borde}>
          <TextInput
            placeholder='Ingresa el texto'
            style={styles.textInput}
            value={estado.text2}
            onChangeText={(value) => handleChangeText(value, 'text2')}
          />
        </View>
        <View style={styles.borde}>
          <TextInput
            placeholder='Ingresa el texto'
            style={styles.textInput}
            value={estado.text3}
            onChangeText={(value) => handleChangeText(value, 'text3')}
          />
        </View>
        <TouchableOpacity style={styles.boton} onPress={saveText}>
          <Text style={styles.textBoton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#1B22F8',
    borderColor: '#0D0F45',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    margin: 170,
  },
  textBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: 10,
  },
  textInput: {
    padding: 7,
  },
  borde: {
    borderWidth: 1,
    borderColor: '#0D0F45',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 6,
    marginRight: 6,
  },
});