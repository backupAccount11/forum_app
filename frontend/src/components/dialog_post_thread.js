import { useEffect, useState } from 'react';
import { Chip, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import Box from '@mui/material/Box';
import { StyledBasicButton } from '../utils/styles';
import { StyledDialog } from '../utils/styles';



export default function PostThreadDialog(props) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            },
        },
    };

    const [categories, setCategories] = useState([]); // TODO: GET LIST OF CATEGORIES FROM SERVER

    const tempCategories = [
        { 'cid': 1, 'category_name': 'Networking', 'color': 'primary' },
        { 'cid': 2, 'category_name': 'Windows server', 'color': 'secondary' },
        { 'cid': 3, 'category_name': 'Cyberbezpieczeństwo', 'color': 'error' }
      ];

     // change to add whole list, instead of single elements to array

    // TODO: INSIDE USEEFFECT FETCH CATEGORIES FROM SERVER (ASYNC/AWAIT)

    // TODO: add limit to 4 categories
    const categoriesComponent = () => {
        const handleChange = (event) => {
            const {
                target: { value },
            } = event;
            setCategories(
                typeof value === 'string' ? value.split(',') : value,
            );
        };

        return <FormControl sx={{ my: 1, width: '100%' }}>
                    <InputLabel id="demo-multiple-chip-label">Kategorie</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={categories}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Kategorie" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        >  
                            {tempCategories.map(category => (
                                <MenuItem key={category.cid} 
                                    value={category.category_name}
                                    // style={getStyles()} // for color ?
                                >
                                    {category.category_name}
                                </MenuItem>
                            ))}
                    </Select>
            </FormControl>
    };



  return (
        <Box>
            <StyledDialog
                open={props.var}
                onClose={props.interaction}
                scroll='paper'
                PaperProps={{
                    component: 'form',
                    sx: { p: 4 },
                    onSubmit: (event) => {
                        event.preventDefault();
                        // TODO: axios request to flask endpoint to post thread
                        props.interaction(); // close dialog
                }
            }}>
                <DialogTitle>Utwórz nowy wątek</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pamiętaj, że każde ze znajdujących się poniżej pól jest konieczne do wypełnienia
                    </DialogContentText>

                    <Box sx={{ py: 2 }}>
                        <InputLabel htmlFor="title-input" sx={{ py: 2 }}>Tytuł</InputLabel>
                        <OutlinedInput id="title-input" color="primary" size="small" fullWidth multiline maxRows={4} />
                    </Box>

                    <Box sx={{ py: 2 }}>
                        <InputLabel htmlFor="description-input" sx={{ pb: 2 }}>Opis</InputLabel>
                        <OutlinedInput id="description-input" color="primary" size="small" fullWidth multiline minRows={6} />
                    </Box>

                    <Box sx={{ py: 2 }}>
                        <InputLabel htmlFor="description-input" sx={{ pb: 2 }}>Kategorie wpisu</InputLabel>
                        {categoriesComponent()}
                        <FormHelperText>Możesz wybrać max 4 dostępne kategorie</FormHelperText>
                    </Box>

                    {/* ADD TAGS */}
                        
                </DialogContent>
                <DialogActions sx={{ m: 'auto' }}>
                    <StyledBasicButton size='large' variant="contained" type="submit">Prześlij</StyledBasicButton>
                </DialogActions>
            </StyledDialog>
        </Box>
  );
}