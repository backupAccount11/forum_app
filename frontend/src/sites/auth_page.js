import { Box, FormHelperText, Grid, Link } from '@mui/material';
import { useState } from 'react';

import { borders } from '@mui/system';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { SignUp } from './registration';
import { Login } from './login';


export default function AuthPage() {

    const backgroundVideo = require('../pexels-yaroslav-shuraev.mp4');

    const [ loginPage, setLoginPage ] = useState(true);
    const [ registerPage, setRegisterPage ] = useState(false);

    let showTextHelper = () => {
        let helperText = '';

        if (loginPage) {
            helperText = <FormHelperText id="my-helper-text" sx={{ textAlign: "center", pt: 1 }}> Nie masz konta? 
                            <Link component="button" variant="body2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginPage ? setLoginPage(false) : setLoginPage(true);
                                    registerPage ? setRegisterPage(false) : setRegisterPage(true);
                                }}>
                                Zarejestruj się
                            </Link>
                        </FormHelperText>
        }
        else {
            helperText = <FormHelperText id="my-helper-text" sx={{ textAlign: "center", pt: 1 }}> Masz konto? 
                            <Link component="button" variant="body2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginPage ? setLoginPage(false) : setLoginPage(true);
                                    registerPage ? setRegisterPage(false) : setRegisterPage(true);
                                }}>
                                Zaloguj się
                            </Link>
                        </FormHelperText>
        }
        return helperText;
    };


    return (
        <Box sx={{ width: 850, height: 700 }} margin="5% auto" style={{
            "borderRadius": "25px", 
            "backdropFilter": "blur(16px) saturate(180%)",
            "WebkitBackdropFilter": "blur(16px) saturate(180%)",
            "backgroundColor": "rgba(255, 255, 255, 0.8)",
        }}>
    
            <Grid container justify="center" style={{ width: "100%", height: "100%" }}>
              <Grid item xs={5} style={{ width: "100%", height: "100%", position: "relative" }}>
                <video src={(`${backgroundVideo}`)} style={{ 
                  objectFit: "cover", 
                  width: "100%", height: "100%", opacity: "65%", 
                  borderRadius: "25px 0 0 25px"
                  }} autoPlay muted loop />
              </Grid>

              <Grid item xs={7} sx={{ px: 9, py: 5 }} justify="center" style={{ width: "100%", height: "100%" }}>

                { registerPage ? <SignUp /> : <Login /> }
                { showTextHelper() }
    
              </Grid>
            </Grid>
    
        </Box>
    );
}