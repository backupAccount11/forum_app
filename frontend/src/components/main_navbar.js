import { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PostThreadDialog from './dialog_post_thread';
import { StyledAppBar, StyledButton, StyledBasicButton, Search, SearchIconWrapper, StyledInputBase, StyledTypography } from '../utils/styles';



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
        }
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

    if (props.userInfo && props.avatarColors) {
      temp = <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <StyledBasicButton sx={{ marginRight: 7 }} variant="contained" onClick={handleOpen}>Dodaj post</StyledBasicButton>
                <PostThreadDialog interaction={handleClose} var={open} />
                <Avatar sx={{ bgcolor: props.avatarColors[props.userInfo.username[0].toUpperCase()], width: 35, height: 35 }}> {props.userInfo.username[0].toUpperCase()} </Avatar>
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
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
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