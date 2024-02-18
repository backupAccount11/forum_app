import { Button, Dialog, styled } from "@mui/material";


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

