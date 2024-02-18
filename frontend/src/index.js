import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { SnackbarProvider } from 'notistack';
import { UserProvider } from './utils/UserContext';

import { grey, blue, amber } from '@mui/material/colors';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#070223',
      button: blue[600]
    },
    components: {
      mnavbar: {
        searchbar: {
          color: grey[70],
          icon: grey[700],
        },
        main: grey[500],
        iconbuttons: {
          icon: blue[300]
        }
      },
      lnavbar: {
        background: '#061131',
        font: grey[300],
        icon: grey[400],
        listbox1: amber[500],
        listboxother: blue[500]
      },
      tdialog: {
        background: '#0b002f',
        border: 'rgb(1 41 65)',
        color: '#c1c1c1',
        scrollbar: '#090028'
      }
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={4} autoHideDuration={8000}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
