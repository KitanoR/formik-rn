import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFormik } from 'formik';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

// Se puede usar la libreria de yup
// en el caso de utilizar validaciones mas declarativas

const emailRegex  = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

const validate = values => {
  const errors = {};
  if(!values.email) {
    errors.email = 'Campo requerido';
  }else if (!emailRegex.test(values.email)){
    errors.email = 'No es un correo valido';
  }
  return errors;
}

export default function App() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
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
