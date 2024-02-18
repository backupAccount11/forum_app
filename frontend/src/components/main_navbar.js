import { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Typography } from '@mui/material';

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { blue } from '@mui/material/colors';
import PostThreadDialog from './dialog_post_thread';
import { StyledBasicButton } from '../utils/styles';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderColor: theme.palette.components.mnavbar.searchbar.border,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.default, 0.70),
  },
  boxShadow: 0,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  color: theme.palette.components.mnavbar.searchbar.icon,
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: theme.palette.components.mnavbar.searchbar.color ,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    letterSpacing: '0.5px',
    margin: 'auto',
    color: theme.palette.components.mnavbar.main,
    padding: theme.spacing(0, 3, 0, 1)
}));

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: 34,
    height: 34,
    padding: 8,
    margin: 'auto 0',
    borderRadius: 12,
    borderWidth: '0.5px',
    fontSize: '1.5rem',
    color: theme.palette.components.mnavbar.iconbuttons.icon,
    backgroundColor: 'transparent',
    boxShadow: 'inset 0 1px 2px var(--muidocs-palette-grey-50),0 1px 0.5px rgba(229, 234, 242, 0.6)',
    '& .MuiSvgIcon-root': {
      fontSize: 20
    },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.default,
    boxShadow: 'none'
}));



export default function MainSearchAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  let { user, handleRemoveUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  const logout = () => {
    axios.post('/logout', {"userid": user.id}, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then((response) => {
        const { success } = response.data;

        if (success) {
          handleRemoveUser();
          navigate('/auth');
        }
    })
    .catch((error) => {
        if (error.response) {
            console.log(error.response);
        }
    })
  };


  let showLoginButton = () => {
    let temp = '';

    if (props.userInfo) {
      temp = <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <StyledBasicButton sx={{ marginRight: 7 }} variant="contained" onClick={handleOpen}>Dodaj post</StyledBasicButton>
                <PostThreadDialog interaction={handleClose} var={open} />
                <Avatar sx={{ bgcolor: blue[600], width: 35, height: 35 }}> {props.userInfo.username[0].toUpperCase()} </Avatar>
                <StyledTypography>
                    {props.userInfo.username}
                </StyledTypography>
                <StyledButton variant="outlined" onClick={logout}>
                    <ExitToAppOutlinedIcon fontSize="small" />
                </StyledButton>
              </Box>
    }
    else {
      temp = <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <StyledBasicButton variant="contained" onClick={() => navigate('/auth')}>Zaloguj się</StyledBasicButton>
              </Box>
    }

    return temp;
  };

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          { showLoginButton() }

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {renderMobileMenu}
    </Box>
  );
}