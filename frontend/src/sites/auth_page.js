import { Box, FormHelperText, Link } from '@mui/material';
import { useState } from 'react';

import { borders } from '@mui/system';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { SignUp } from './registration';
import { Login } from './login';


export default function AuthPage() {

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
        <Box sx={{ width: 850, height: 710, px: 10, py: 5 }} margin="5% auto" style={{
            "borderRadius": "25px", 
            "backdropFilter": "blur(16px) saturate(180%)",
            "WebkitBackdropFilter": "blur(16px) saturate(180%)",
        }}>
            { registerPage ? <SignUp /> : <Login /> }
            { showTextHelper() }
        </Box>
    );
}