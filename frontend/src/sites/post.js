import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import LeftNavbar from "../components/left_navbar";
import { Avatar, Box, Button, Card, CardContent, Chip, Divider, Grid, InputLabel, List, ListItem, OutlinedInput, Stack, Typography } from "@mui/material";
import MainSearchAppBar from "../components/main_navbar";
import { useParams } from "react-router-dom";
import { StyledBasicButton, StyledListBox, StyledListItemIcon, StyledListItemText } from "../utils/styles";
import { dateFormat } from "../utils/dateFormat";
import AvatarContext from "../utils/AvatarContext";

import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";


export default function Post(props) {
  const { 
    register, 
    handleSubmit,
    reset
  } = useForm({
      defaultValues: {
        comment: ''
    }
  });

  const { post_id } = useParams();

  const avatarContext = useContext(AvatarContext);

  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function showModalError(value) {
      enqueueSnackbar(value, { variant: 'error', anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom' 
      } });
  }

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);


  const onSubmit = e => {
    const data = {
      'comment': e.comment,
      'post_id': post_id
    };

    axios.post('/add_comment', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      },
      withCredentials: true
    })
    .then(response => {
      const { success, error } = response.data;

      if (success) {
        enqueueSnackbar("Post został dodany pomyślnie", { variant: 'success', anchorOrigin: {
            horizontal: 'right',
            vertical: 'bottom' 
        } });

        setLoading(false);
        reset();

        setTimeout(() => {
            closeSnackbar();
        }, 1500);
      } else {
        if (error != null) {
            showModalError(error);
        }
      }

    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      }
    })
  };


  useEffect(() => {
    console.log(post_id);
    axios.get('/get_current_post/'+post_id, {
      headers: {
          'Accept': 'application/json'
        }
    })
    .then(response => {
      let result = response.data;
        if (result) {
            setLoading(false);
            setPost(result.data.post);
            setComments(result.data.comments);
        }
    })
    .catch( _ => {
        showModalError("Błąd podczas pobierania danych");
        setLoading(false);
    });
  }, []);


  return (
    <Grid container spacing={4}>
      <Grid item md={2}>
        <LeftNavbar location="post" />
      </Grid>
      <Grid item md={10}>
        <MainSearchAppBar userInfo={props.user} avatarColors={avatarContext} />

        {!loading && post &&
            <Grid
                justifyContent="flex-start" 
                alignItems="flex-start" 
                rowGap={4} 
                sx={{ width: '90%', py: 4, px: 12 }}
             >
                <Typography variant="h5">{post.title}</Typography>
                <List dense style={{ display: 'flex', flexDirection: 'row' }}>
                    {post.categories.map(category => (
                        <Box key={category.id}>
                            <ListItem disablePadding>
                                <StyledListItemIcon>
                                    <StyledListBox sx={{ marginInline: 3, backgroundColor: category.color }}/>
                                </StyledListItemIcon>
                                <StyledListItemText primary={category.name} />
                            </ListItem>
                        </Box>
                        )
                    )}
                </List>
                {/* TODO: typography i list do grida i po prawo dodać ikone z lajkami */}
                <Divider orientation="horizontal"/>

                <Card sx={{ display: 'flex', background: 'none', boxShadow: 'none', my: 2 }}>
                  <Avatar sx={{ bgcolor: avatarContext[post.author.username[0].toUpperCase()], width: 50, height: 50, mx: 2, my: 4 }}> {post.author.username[0].toUpperCase()} </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '55%', pt: 2 }}>
                    <CardContent>
                        <Typography variant="body1" style={{ fontSize: '16px', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{post.description}</Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
                            {post.tags.map(tag => (
                                <Chip key={tag.id} label={tag.name} color="primary" size="medium" variant="outlined" />
                                )
                            )}
                        </Stack>
                        <Typography variant="overline">{dateFormat(post.created_at)}</Typography>
                    </CardContent>
                  </Box>
                </Card>

                {comments &&
                  <Box>
                    <Divider orientation="horizontal" />

                    {/* {comments.forEach(comment => (
                    ))} */}
                  </Box>
                }

                <Divider orientation="horizontal" />

                <Box sx={{ width: '70%', py: 5 }} component="form" onSubmit={handleSubmit(onSubmit)}>
                  <InputLabel htmlFor="description-input" sx={{ pb: 2 }}>Wprowadź poniżej treść swojego komentarza</InputLabel>
                  <OutlinedInput id="description-input" color="primary" size="small" fullWidth multiline minRows={8}
                    {...register("comment", { required: false })}
                  />
                  <Box sx={{ display: 'flex', mt: 3, mr: 3 }}>
                    <StyledBasicButton sx={{ marginLeft: 'auto' }} type="submit" variant="contained" endIcon={<SendIcon />}>Dodaj komentarz</StyledBasicButton>
                  </Box>
                </Box>
            </Grid>
        }
      </Grid>
    </Grid>
  );
};
