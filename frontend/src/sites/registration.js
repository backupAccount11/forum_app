import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Box, Button, FormHelperText, InputLabel, OutlinedInput, Typography } from '@mui/material';

import axios from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



export function SignUp(props) {
  const { 
    register, 
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors }
} = useForm({
    defaultValues: {
        username: '',
        email: '',
        password: ''
    }
});

  const usernameHelperText = "Nazwa użytkownika może składać się z liter alfabetu, cyfr i znaku _";
  const passwordHelperText = "Hasło może zawierać co najmniej 8 znaków, w tym 2 cyfry";

  const [errorVisibility, setErrorVisibility] = useState({
      username: false,
      email: false,
      password: false
  });


  const onSubmit = data => {
    setErrorVisibility({
      username: false,
      email: false,
      password: false
    });

    axios({
      method: "POST",
      url: "/register",
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      const { success, error } = response.data;

      if (success) {
        console.log('Registration successful');
      } else {
        console.log('Registration failed:', error);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.error_messages)
      }
    })

    reset();
  };


  return (
    <Box>
      <Typography variant="h4" align="center"
          style={{ 
              fontFamily: "'Kalnia', serif",
              color: "rgb(34 110 39)"
          }}>
          Forum ogólne
      </Typography>
      <Typography align="center" variant="h4" sx={{ mt: 3 }} gutterBottom> Rejestracja </Typography>

      <form onSubmit={e => {
        clearErrors();
        handleSubmit(onSubmit)(e);
      }}>

        <Box sx={{ p: 5 }}>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <OutlinedInput id="my-input" color="success" size="small" fullWidth
            {...register("username", { required: true })} />
          <FormHelperText id="my-helper-text">{usernameHelperText}</FormHelperText>

          <InputLabel htmlFor="email-input" sx={{ pt: 2 }}>E-mail</InputLabel>
          <OutlinedInput id="email-input" color="success" size="small" fullWidth 
            {...register("email", { required: true })} />

          <InputLabel htmlFor="my-input3" sx={{ pt: 2 }}>Password</InputLabel>
          <OutlinedInput id="my-input" color="success" size="small" fullWidth type="password"
            {...register("password", { required: true })} />
          <FormHelperText id="my-helper-text">{passwordHelperText}</FormHelperText>
        </Box>

        <Box sx={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", px: 6 }} >
            <Button size="large" variant="contained" color="success" align="center" type="submit">Zarejestruj się</Button>
        </Box>

      </form>
    </Box>
  );
}