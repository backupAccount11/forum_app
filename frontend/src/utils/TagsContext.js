import axios from "axios";
import { useSnackbar } from "notistack";
import { createContext, useEffect, useState } from "react";


const PopularTagsContext = createContext();


export const PopularTagsProvider = ({ children }) => {
    const [popularTags, setPopularTags] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    function showModalError(value) {
        enqueueSnackbar(value, { variant: 'error', anchorOrigin: {
            horizontal: 'right',
            vertical: 'bottom'
        } });
    }

    useEffect(() => {
        axios.get('/get_popular_tags', {
          headers: {
              'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.data) {
              setPopularTags(response.data.data);
            }
        })
        .catch( _ => {
            showModalError("Błąd podczas pobierania danych");
        });
      }, []);
    
  
    return (
      <PopularTagsContext.Provider value={ popularTags }>
        {children}
      </PopularTagsContext.Provider>
    );
  };

export default PopularTagsContext;
