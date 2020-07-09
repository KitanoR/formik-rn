import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Formik, useFormikContext, useField } from 'formik';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Yup from 'yup';


const MyInput = ({ fieldName, ...props }) => {
  const [ field, meta ] = useField(fieldName);
  return (
    <>
      <TextInput 
          style={styles.input}
          onChangeText={field.onChange(fieldName)}
          value={field.value}
          onBlur={field.onBlur(fieldName)}
          {...props}
        />
      { meta.error && meta.touched && (
        <Text style={{color: 'red'}}>{meta.error}</Text>
      )}
    </>
  );
}

const EmailForm = () => {
  const { submitForm } = useFormikContext();

  return (
    <>
        <Text>Correo electronico</Text>
        <MyInput fieldName="email" />
        <MyInput fieldName="nombre" />
        <Button onPress={submitForm} title='Enviar' />
    </>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={x => console.warn(x)}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Correo invalido')
            .required('Campo requerido'),
          nombre: Yup.string()
          .min(50)
          .required('CAmpo requerido')
        })}
        initialValues={{
          email: '',
          nombre: ''
        }}
      >
        <EmailForm />
      </Formik>
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
