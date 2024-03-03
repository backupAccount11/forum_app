import { AppBar, Box, Button, Dialog, InputBase, ListItemIcon, ListItemText, Typography, styled } from "@mui/material";
import { alpha } from '@mui/material/styles';


export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        maxWidth: theme.breakpoints.values.md,
        width: '40%',
        backgroundColor: theme.palette.components.tdialog.background,
        backgroundImage: 'none',
        border: `1px solid ${theme.palette.components.tdialog.border}`,
        color: theme.palette.components.tdialog.color
      },
    '& .MuiDialogContent-root': {
        overflowY: 'auto',
        scrollbarWidth: 'thin', // for Firefox
        '&::-webkit-scrollbar': {
            width: '12px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.components.tdialog.scrollbar,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.components.tdialog.scrollbar,
            borderRadius: '6px',
            border: `3px solid ${theme.palette.components.tdialog.scrollbar}`
        },
    }
}));


export const StyledBasicButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.button
}));


export const StyledBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    paddingLeft: 8,
    background: theme.palette.components.lnavbar.background,
    boxShadow: 'none'
}));


export const StyledListBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    marginInline: 5,
    width: '15px',
    height: '15px',
    backgroundColor: theme.palette.components.lnavbar.listbox1
}));


export const StyledOtherListBox = styled(StyledListBox)(({ theme }) => ({
    backgroundColor: theme.palette.components.lnavbar.listboxother
}));


export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.components.lnavbar.font,
    marginInline: '-10px'
}));


export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.components.lnavbar.icon
}));


export const Search = styled('div')(({ theme }) => ({
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


export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    color: theme.palette.components.mnavbar.searchbar.icon,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));


export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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


export const StyledTypography = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    letterSpacing: '0.5px',
    margin: 'auto',
    color: theme.palette.components.mnavbar.main,
    padding: theme.spacing(0, 3, 0, 1)
}));


export const StyledButton = styled(Button)(({ theme }) => ({
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


export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.default,
    boxShadow: 'none'
}));
