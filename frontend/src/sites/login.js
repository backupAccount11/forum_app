import { useForm } from "react-hook-form";
import { Box, Button, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import axios from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



export function Login(props) {
  const { 
    register, 
    handleSubmit,
    reset
  } = useForm({
      defaultValues: {
          email: '',
          password: ''
      }
  });

  const { enqueueSnackbar } = useSnackbar();

  function showModalError(value) {
    console.log( value );
    enqueueSnackbar(value, { variant: 'error', anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom' 
    } });
  }

  const onSubmit = data => {
    axios.post('/login', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      },
    })
    .then((response) => {
      const { success, error, user_data } = response.data;

      if (success) {
        enqueueSnackbar("Logowanie przebiegło pomyślnie", { variant: 'success', anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom' 
        } });

        localStorage.setItem('user', JSON.stringify(user_data));
      }
      else {
        if (error['email']) {
          showModalError(error['email']);
        }
        if (error['password']) {
          showModalError(error['password']);
        }
        
        if (error['user_not_exist']) {
          showModalError(error['user_not_exist']);
        }
        if (error['password_incorrect']) {
          showModalError(error['password_incorrect']);
        }
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.error_messages);
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
      <Typography align="center" variant="h4" sx={{ mt: 3 }} gutterBottom> Logowanie </Typography>

      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}>

        <Box sx={{ px: 5, py: 7 }}>
            <InputLabel htmlFor="email-input" sx={{ pt: 2 }}>E-mail</InputLabel>
            <OutlinedInput id="email-input" color="success" size="small" fullWidth
              {...register("email", { required: true })} />

            <InputLabel htmlFor="my-input3" sx={{ pt: 2 }}>Password</InputLabel>
            <OutlinedInput id="my-input" color="success" size="small" fullWidth type="password"
              {...register("password", { required: true })} />
        </Box>

        <Box sx={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", px: 6 }} >
            <Button size="large" variant="contained" color="success" align="center" type="submit">Zaloguj się</Button>
        </Box>
          
      </form>
    </Box>
  );
}