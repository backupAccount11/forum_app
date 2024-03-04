import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Avatar, Box, Card, CardContent, Chip, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { StyledListBox, StyledListItemIcon, StyledListItemText } from "../utils/styles";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import SelectedItemContext from "../utils/FilterContext";
import { dateFormat } from "../utils/dateFormat";
import AvailableCategoriesContext from "../utils/CategoriesContext";
import PopularTagsContext from "../utils/TagsContext";



export default function Home({ user, avatarColors }) {
  const { selectedItem } = useContext(SelectedItemContext);
  const availableCategories = useContext(AvailableCategoriesContext);
  const popularTags = useContext(PopularTagsContext);

  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [posts, setPosts] = useState([]);

  const [route, setRoute] = useState(null);  // for backend

  function showModalError(value) {
      enqueueSnackbar(value, { variant: 'error', anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom' 
      } });
  }

  useEffect(() => {
    const foundCategory = availableCategories.find(category => category.name === selectedItem);
    const foundTag = popularTags.find(tag => tag.name === selectedItem);

    if (selectedItem == 'Najpopularniejsze') {
      setRoute('/get_popular_posts');
    }
    else if (user && selectedItem == 'Moje posty') {
      setRoute('/get_user_posts/' + user.id);
    }
    else if (foundCategory != null) {
      setRoute('/get_category_posts/' + foundCategory.id);
    }
    else if (selectedItem == 'Wszystkie kategorie' || selectedItem == 'Wszystkie tagi') {
      setRoute('/get_latest_posts');
    }
    else if (foundTag != null) {
      setRoute('/get_tag_posts/' + foundTag.id);
    }

    setLoading(true);

  }, [selectedItem]);


  useEffect(() => {
    if (route != null) {
      axios.get(route, {
        headers: {
            'Accept': 'application/json'
          }
      })
      .then(response => {
        let result = response.data;
          if (result) {
              console.log(result.data);
              setLoading(false);
              setPosts(result.data);
          }
      })
      .catch( _ => {
          showModalError("Błąd podczas pobierania danych");
          setLoading(false);
      });
    }
  }, [route]);


  return (
    <Box>
      {loading && <LinearProgress color="primary" />}

      {!loading && posts &&
        <Grid container 
          direction="column" 
          justifyContent="flex-start" 
          alignItems="flex-start" 
          rowGap={4} sx={{ py: 4, px: 12 }}
        >
          <Typography variant="h5">
            {selectedItem}
          </Typography>
          {posts.map(post => (
            <Grid item key={post.id} sx={{ width: '90%', height: '140px', my: 2 }}>
              <Divider orientation="horizontal" />
              <Card sx={{ display: 'flex', background: 'none', boxShadow: 'none', my: 1 }}>
                <Avatar sx={{ bgcolor: avatarColors[post.author.username[0].toUpperCase()], width: 50, height: 50, mx: 2, my: 4 }}> {post.author.username[0].toUpperCase()} </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                  <CardContent>
                    <Typography component="div" variant="h5" sx={{ width: '50%' }}> <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/post/${post.id}`}>{post.title} </Link></Typography>
                    <Typography component="div" variant="body2" sx={{ color: '#b3b3b3', pt: 1,
                      width: '50%', display: '-webkit-box', WebkitBoxOrient: 'vertical',
                      overflow: 'hidden', WebkitLineClamp: 2, lineHeight: 1.5, textOverflow: 'ellipsis'
                    }}> 
                      {post.description}
                    </Typography>
                    <List dense style={{ display: 'flex', flexDirection: 'row', padding: '10px 0' }}>
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
                    <Stack direction="row" spacing={1} sx={{ ml: 3 }}>
                      {post.tags.map(tag => (
                        <Chip key={tag.id} label={tag.name} color="primary" size="medium" variant="outlined" />
                        )
                      )}
                    </Stack>
                  </CardContent>
                </Box>
                <Box sx={{ width: '10%', margin: 'auto' }}>
                  <IconButton color="primary" aria-label="like this post" size="large" sx={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
                    <FavoriteBorderOutlinedIcon fontSize="inherit" />
                    <Typography variant="body1" gutterBottom> {post.likes} </Typography>
                  </IconButton>
                  <Typography variant="body2" gutterBottom sx={{ mr: 3 }}> {dateFormat(post.created_at)} </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      }
    </Box>
  );
};
