import { useContext } from "react";
import UserContext from "../utils/UserContext";

import styled from "@emotion/styled";
import { Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import AttachFileIcon from '@mui/icons-material/AttachFile';
import MovingIcon from '@mui/icons-material/Moving';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


const StyledBox = styled(Box)(({ theme }) => ({
    height: '100vh',
    paddingLeft: 8,
    background: theme.palette.components.lnavbar.background,
    boxShadow: 'none'
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.components.lnavbar.font,
    marginInline: '-10px'
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.components.lnavbar.icon
}));

const StyledListBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    marginInline: 5,
    width: '15px',
    height: '15px',
    backgroundColor: theme.palette.components.lnavbar.listbox1
}));

const StyledOtherListBox = styled(StyledListBox)(({ theme }) => ({
    backgroundColor: theme.palette.components.lnavbar.listboxother
}));


export default function LeftNavbar() {
    let { user } = useContext(UserContext);

    const firstBox = () => {
        return <List dense>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <StyledListItemIcon>
                                <MovingIcon />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Najpopularniejsze" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton disabled={!user}>
                            <StyledListItemIcon>
                                <AttachFileIcon />
                            </StyledListItemIcon>
                            <StyledListItemText primary="Moje posty" />
                        </ListItemButton>
                    </ListItem>
                </List>
    }

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
          {isCategory && (
            <ListItem disablePadding>
                <ListItemButton>
                    <StyledListItemIcon>
                        <StyledListBox />
                    </StyledListItemIcon>
                    <StyledListItemText primary="Aktualności" />
                </ListItemButton>
            </ListItem>
            )}
          {items.map(element => (
            <ListItem disablePadding key={element}>
              <ListItemButton>
                <StyledListItemIcon>
                  {isCategory ? <StyledOtherListBox /> : <LocalOfferIcon fontSize="small" />}
                </StyledListItemIcon>
                <StyledListItemText primary={element} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton>
              <StyledListItemIcon>
                <FormatListBulletedIcon />
              </StyledListItemIcon>
              <StyledListItemText primary={`Wszystkie ${title.toLowerCase()}`} />
            </ListItemButton>
          </ListItem>
        </List>
    );
      
    const secondBox = () => {
        const category = ["Maszyny wirtualne", "Administracja Linux", "Cyberbezpieczeństwo"];
        return generateListItems("Kategorie", category, true);
    };
      
    const thirdBox = () => {
        // TODO: to są tagi z initial wpisu, tagi mają być ogółem brane i segregowane (pierwsze 4)
        // zgodnie z tym jak najpopularniejsze są (obok dodać w jak wielu postach były już użyte)
        const tags = ["kryptografia", "SSL-podatnosc", "monitoring", "CVE-2022-38392"];
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
                    { secondBox() }
                </Grid>
                <Grid item>
                    { thirdBox() }
                </Grid>
            </Grid>
        </StyledBox>
  );
};