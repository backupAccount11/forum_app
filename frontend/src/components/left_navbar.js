import { useContext, useEffect } from "react";
import UserContext from "../utils/UserContext";

import { Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import AttachFileIcon from '@mui/icons-material/AttachFile';
import MovingIcon from '@mui/icons-material/Moving';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { StyledBox, StyledListBox, StyledOtherListBox, StyledListItemText, StyledListItemIcon } from "../utils/styles";
import SelectedItemContext from "../utils/FilterContext";
import AvailableCategoriesContext from "../utils/CategoriesContext";



export default function LeftNavbar({ post_id }) {
  let { user } = useContext(UserContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);
  const availableCategories = useContext(AvailableCategoriesContext);

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

  const firstBox = () => {
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
  }


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
            <StyledListItemText primary={"Wszystkie kategorie"} />
          </ListItemButton>
        </ListItem>
      </List>
  );


  const generateListItems = (title, items, isCategory) => (
      <List dense>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
            mb: '8px',
            ml: '18px'
          }}
        />
        {/* {isCategory && (
          <ListItem disablePadding>
              <ListItemButton selected={selectedItem === 'Aktualności'} 
                  onClick={() => handleItemClick('Aktualności')}>
                  <StyledListItemIcon>
                      <StyledListBox />
                  </StyledListItemIcon>
                  <StyledListItemText primary="Aktualności" />
              </ListItemButton>
          </ListItem>
          )} */}
        {items.map(element => (
          <ListItem disablePadding key={element}>
              <ListItemButton 
                  selected={selectedItem === `${element}`} 
                  onClick={() => handleItemClick(`${element}`)}>
              <StyledListItemIcon>
                {isCategory ? <StyledOtherListBox /> : <LocalOfferIcon fontSize="small" />}
              </StyledListItemIcon>
              <StyledListItemText primary={element} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
              selected={selectedItem === `Wszystkie ${title.toLowerCase()}`} 
              onClick={() => handleItemClick(`Wszystkie ${title.toLowerCase()}`)}>
            <StyledListItemIcon>
              <FormatListBulletedIcon />
            </StyledListItemIcon>
            <StyledListItemText primary={`Wszystkie ${title.toLowerCase()}`} />
          </ListItemButton>
        </ListItem>
      </List>
  );
    
  const thirdBox = () => {
      // TODO: to są tagi z initial wpisu, tagi mają być ogółem brane i segregowane (pierwsze 4)
      // zgodnie z tym jak najpopularniejsze są (obok dodać w jak wielu postach były już użyte)
      const tags = ["kryptografia", "SSL-podatnosc", "CVE-2022-38392"];
      return generateListItems("Tagi", tags, false);
  };

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
                { firstBox() }
            </Grid>
            <Grid item>
                { generateCategoriesList() }
            </Grid>
            <Grid item>
                { thirdBox() }
            </Grid>
        </Grid>
    </StyledBox>
  );
};