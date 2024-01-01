import { Box, Button, FormHelperText, InputLabel, OutlinedInput, Typography } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



export function SignUp(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log({
      username: data.get('uname'),
      email: data.get('email'),
      password: data.get('password')
    });
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

      <Box sx={{ p: 5 }}>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <OutlinedInput id="my-input" aria-describedby="my-helper-text" color="success" size="small" fullWidth="true" />

        <InputLabel htmlFor="email-input" sx={{ pt: 2 }}>E-mail</InputLabel>
        <OutlinedInput id="email-input" aria-describedby="my-helper-text" color="success" size="small" fullWidth="true" />

        <InputLabel htmlFor="my-input3" sx={{ pt: 2 }}>Password</InputLabel>
        <OutlinedInput id="my-input" aria-describedby="my-helper-text" color="success" size="small" fullWidth="true" />
        <FormHelperText id="my-helper-text">Hasło powinno mieć długość minimum 8 znaków i zawierać 2 cyfry</FormHelperText>
      </Box>

      <Box sx={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", px: 6 }} >
          <Button size="large" variant="contained" color="success" align="center">Zarejestruj się</Button>
      </Box>
    </Box>
  );
}