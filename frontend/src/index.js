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
import AvatarContext from './utils/AvatarContext';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#dfdfdf'
    },
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

const avatarColors = {
  'A': '#1e88e5', 'B': '#b2d7e9', 'C': '#133c3e', 'D': '#f2819b', 'E': '#927681', 
  'F': '#e99184', 'G': '#5d8c1a', 'H': '#254f39', 'I': '#8497b5', 'J': '#f6d55c', 
  'K': '#ed553b', 'L': '#3caea3', 'M': '#20639b', 'N': '#173f5f', 'O': '#d0a228',
  'P': '#542843', 'Q': '#cc3033', 'R': '#a14d1f', 'S': '#9b58b5', 'T': '#ef2e33',
  'U': '#4f525d', 'V': '#4b1e19', 'W': '#680e03', 'X': '#fe8b4c', 'Y': '#ec9811', 
  'Z': '#fc5e1d'
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <AvatarContext.Provider value={avatarColors}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={4} autoHideDuration={7000}>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </AvatarContext.Provider>
      </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
