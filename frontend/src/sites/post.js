import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import LeftNavbar from "../components/left_navbar";
import { Avatar, Box, Card, CardContent, Chip, Divider, Grid, List, ListItem, Stack, Typography } from "@mui/material";
import MainSearchAppBar from "../components/main_navbar";
import { useParams } from "react-router-dom";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { StyledListBox, StyledListItemIcon, StyledListItemText } from "../utils/styles";
import { dateFormat } from "../utils/dateFormat";


export default function Post(props) {

    const { post_id } = useParams();

    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    function showModalError(value) {
        enqueueSnackbar(value, { variant: 'error', anchorOrigin: {
            horizontal: 'right',
            vertical: 'bottom' 
        } });
    }

  const [post, setPost] = useState([]);

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
            console.log(result);
            setLoading(false);
            setPost(result.data);
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
        <MainSearchAppBar userInfo={props.user} />

        {!loading && post &&
            <Grid
                justifyContent="flex-start" 
                alignItems="flex-start" 
                rowGap={4} 
                sx={{ py: 4, px: 12 }}
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
                <Divider orientation="horizontal" sx={{ width: '80%' }} />

                <Card sx={{ display: 'flex', background: 'none', boxShadow: 'none', my: 2 }}>
                  <Avatar sx={{ bgcolor: '#' + Math.floor(Math.random()*16777215).toString(16), width: 50, height: 50, mx: 2, my: 4 }}> {post.author.username[0].toUpperCase()} </Avatar>
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

                <Divider orientation="horizontal" sx={{ width: '80%' }} />

                <p>komentarze</p>
            </Grid>
        }
      </Grid>
    </Grid>
  );
};
