import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

import { Chip, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { StyledBasicButton } from '../utils/styles';
import { StyledDialog } from '../utils/styles';
import { useSnackbar } from 'notistack';



export default function PostThreadDialog(props) {
    const { 
        register, 
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [chipInput, setChipInput] = useState('');  // for tags

    const tempCategories = [
        { cid: 1, category_name: 'Networking', color: 'green' },
        { cid: 2, category_name: 'Windows server', color: 'yellow' },
        { cid: 3, category_name: 'Cyberbezpieczeństwo', color: 'blue' }
      ];

    // TODO: INSIDE USEEFFECT FETCH CATEGORIES FROM SERVER (ASYNC/AWAIT)


    function showModalError(value) {
        enqueueSnackbar(value, { variant: 'error', anchorOrigin: {
            horizontal: 'right',
            vertical: 'bottom' 
        } });
    }

    const onSubmit = data => {
        data.categories = categories;
        data.tags = tags;

        axios.post('/create_forumpost', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json'
            },
            withCredentials: true
          })
          .then((response) => {
            const { success, error } = response.data;

            console.log(response.data);

            if (success) {
                enqueueSnackbar("Post został dodany pomyślnie", { variant: 'success', anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'bottom' 
                } });
        
                props.interaction(); // close dialog
                reset();

                setTimeout(() => {
                    closeSnackbar();
                }, 1500);
            } else {
                const keys = Object.keys(error);
                keys.forEach(key => {
                    if (error[key] != null) {
                        showModalError(error[key]);
                    }
                });
            }

          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
            }
          })
    };


    const categoriesComponent = () => {
        const handleChange = (event) => {
            const { target: { value } } = event;
            setCategories(
                typeof value === 'string' ? value.split(',') : value
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
                                {selected.map(value => {
                                    return <Chip key={value} label={value} />
                                })}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    > 
                            {tempCategories.map(category => (
                                <MenuItem key={category.cid} value={category.category_name}>
                                    {category.category_name}
                                </MenuItem>
                            ))}
                    </Select>
            </FormControl>
    };


    const tagsComponent = () => {
        const handleCreateTag = (event) => {
            const inputValue = event.target.value.trim();
            if (inputValue.endsWith(',')) {
                const chipName = inputValue.slice(0, -1);
                if (chipName && !tags.includes(chipName)) {
                  setTags([...tags, chipName]);
                  setChipInput('');
                }
            } else {
                setChipInput(inputValue);
            }
        };

        const handleDeleteTag = (tagToDelete) => () => {
            setTags((tags) => tags.filter(tag => tag !== tagToDelete));
        };

        return (
            <Box sx={{ my: 1, width: '100%' }}>
                <TextField
                    id="tag-input"
                    value={chipInput}
                    onChange={handleCreateTag}
                    placeholder={tags.length === 0 ? "Oddzielaj kolejne tagi przecinkami" : ""}
                    fullWidth
                    multiline
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', my: 1 }}>
                    <FormHelperText>Możesz dodać max. 8 tagów</FormHelperText>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            onDelete={handleDeleteTag(tag)}
                            sx={{ m: 0.5 }}
                        />
                    ))}
                </Box>
          </Box>
        );
    };



  return (
        <Box>
            <StyledDialog
                open={props.var}
                onClose={() => { props.interaction(); setTags([]); }}
                scroll='paper'
                PaperProps={{
                    component: 'form',
                    sx: { p: 4 },
                    onSubmit: (event) => {
                        event.preventDefault();
                        closeSnackbar();
                        handleSubmit(onSubmit)(event);
                    }
                }
            }>
                <DialogTitle>Utwórz nowy wątek</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pamiętaj, że każde ze znajdujących się poniżej pól jest konieczne do wypełnienia
                    </DialogContentText>

                    <Box sx={{ py: 2 }}>
                        <InputLabel htmlFor="title-input" sx={{ py: 2 }}>Tytuł</InputLabel>
                        <OutlinedInput id="title-input" color="primary" size="small" fullWidth multiline maxRows={4} 
                            {...register("title", { required: false })} /> 
                    </Box>

                    <Box sx={{ py: 2 }}>
                        <InputLabel htmlFor="description-input" sx={{ pb: 2 }}>Opis</InputLabel>
                        <OutlinedInput id="description-input" color="primary" size="small" fullWidth multiline minRows={6} 
                            {...register("description", { required: false })} />
                    </Box>

                    <Box sx={{ py: 2 }}>
                        <InputLabel htmlFor="description-input" sx={{ pb: 2 }}>Kategorie wpisu</InputLabel>
                        {categoriesComponent()}
                        <FormHelperText>Możesz wybrać max. 5 dostępne kategorie (min. 1 wymagana)</FormHelperText>
                    </Box>

                    <Box sx={{ py: 2 }}>
                        <InputLabel htmlFor="description-input" sx={{ pb: 2 }}>Tagi wpisu</InputLabel>
                        {tagsComponent()}
                    </Box>

                </DialogContent>
                <DialogActions sx={{ m: 'auto' }}>
                    <StyledBasicButton size='large' variant="contained" type="submit">Prześlij</StyledBasicButton>
                </DialogActions>
            </StyledDialog>
        </Box>
  );
}