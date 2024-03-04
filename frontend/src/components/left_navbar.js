import { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";

import { Badge, Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import AttachFileIcon from '@mui/icons-material/AttachFile';
import MovingIcon from '@mui/icons-material/Moving';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { StyledBox, StyledOtherListBox, StyledListItemText, StyledListItemIcon } from "../utils/styles";
import SelectedItemContext from "../utils/FilterContext";
import AvailableCategoriesContext from "../utils/CategoriesContext";
import PopularTagsContext from "../utils/TagsContext";



export default function LeftNavbar({ post_id }) {
  let { user } = useContext(UserContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);
  const availableCategories = useContext(AvailableCategoriesContext);
  const popularTags = useContext(PopularTagsContext);


  useEffect(() => {
    if (post_id == null) {
      setSelectedItem('Najpopularniejsze');
    } else {
      setSelectedItem(null);
    }
  }, [post_id]);


  const handleItemClick = (index) => {
      setSelectedItem(index);
  };

  const firstSection = () => {
      return <List dense>
                  <ListItem disablePadding>
                      <ListItemButton href="/"
                          selected={selectedItem === 'Najpopularniejsze'} 
                          onClick={() => handleItemClick('Najpopularniejsze')}>
                          <StyledListItemIcon>
                              <MovingIcon />
                          </StyledListItemIcon>
                          <StyledListItemText primary="Najpopularniejsze" />
                      </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                      <ListItemButton disabled={!user}
                              selected={selectedItem === 'Moje posty'} 
                              onClick={() => handleItemClick('Moje posty')}>
                          <StyledListItemIcon>
                              <AttachFileIcon />
                          </StyledListItemIcon>
                          <StyledListItemText primary="Moje posty" />
                      </ListItemButton>
                  </ListItem>
              </List>
  };


  const generateCategoriesList = () => (
      <List dense>
        <ListItemText
          primary="Kategorie"
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
            mb: '8px',
            ml: '18px'
          }}
        />
        {availableCategories.map(element => (
          <ListItem disablePadding key={element.id}>
              <ListItemButton 
                  selected={selectedItem === `${element.name}`} 
                  onClick={() => handleItemClick(`${element.name}`)}>
              <StyledListItemIcon>
                <StyledOtherListBox sx={{ backgroundColor: element.color }} />
              </StyledListItemIcon>
              <StyledListItemText primary={element.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
              selected={selectedItem === "Wszystkie kategorie"} 
              onClick={() => handleItemClick("Wszystkie kategorie")}>
            <StyledListItemIcon>
              <FormatListBulletedIcon />
            </StyledListItemIcon>
            <StyledListItemText primary="Wszystkie kategorie" />
          </ListItemButton>
        </ListItem>
      </List>
  );


  const generateTagList = () => (
      <List dense>
        <ListItemText
          primary="Tagi"
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
            mb: '8px',
            ml: '18px'
          }}
        />
        {popularTags && popularTags.map(element => (
          <ListItem disablePadding key={element.id}>
              <ListItemButton 
                selected={selectedItem === `${element.name}`} 
                onClick={() => handleItemClick(`${element.name}`)}>
                <StyledListItemIcon>
                  <Badge badgeContent={element.counter} color="secondary" overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}>
                    <LocalOfferIcon fontSize="small" />
                  </Badge>
                </StyledListItemIcon>
                <StyledListItemText primary={element.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
              selected={selectedItem === "Wszystkie tagi"} 
              onClick={() => handleItemClick("Wszystkie tagi")}>
            <StyledListItemIcon>
              <FormatListBulletedIcon />
            </StyledListItemIcon>
            <StyledListItemText primary="Wszystkie tagi" />
          </ListItemButton>
        </ListItem>
      </List>
  );
    

  return (
    <StyledBox sx={{ width: '295px', display: { xs: 'none', sm: 'none', md: 'block' } }}>
      <Grid
          container
          direction="column"
          justifyContent="flex-start"
          paddingTop={5}
          rowGap={2}
      >
        <Grid item>
            { firstSection() }
        </Grid>
        <Grid item>
            { generateCategoriesList() }
        </Grid>
        <Grid item>
            { generateTagList() }
        </Grid>
      </Grid>
    </StyledBox>
  );
};