import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import LeftNavbar from './left_navbar';
import MainSearchAppBar from './main_navbar';
import { Grid } from '@mui/material';
import Post from '../sites/post';
import AvatarContext from '../utils/AvatarContext';
import Home from '../sites/home';



const CommonParentComponent = ({ user }) => {
  const avatarContext = useContext(AvatarContext);
  const { post_id } = useParams();

  return (
    <Grid container spacing={4}>
      <Grid item md={2}>
        <LeftNavbar post_id={post_id} />
      </Grid>
      <Grid item md={10}>
        <MainSearchAppBar userInfo={user} avatarColors={avatarContext} />

        { post_id ? (<Post user={user} post_id={post_id} avatarColors={avatarContext} /> ) :
                    (<Home user={user} avatarColors={avatarContext} />) }

    </Grid>
    </Grid>
  );
};

export default CommonParentComponent;
