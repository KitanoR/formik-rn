import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFormik } from 'formik';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Yup from 'yup';

// Se puede usar la libreria de yup
// en el caso de utilizar validaciones mas declarativas



export default function App() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object(
        { 
          email : Yup.string()
            .email('El correo es requerido')
            .required('Requerido')
        }
    ),
    onSubmit: x => console.warn(x)
  });
  return (
    <View style={styles.container}>
      <Text>Correo electronico</Text>
      <TextInput
        style={styles.input} 
        onBlur={formik.handleBlur('email')}
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
      />
      {formik.errors.email && formik.touched.email ? <Text>{formik.errors.email}</Text> : null}
      <Button title='Enviar' onPress={formik.handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#eee',
    width: 160
  }
});
