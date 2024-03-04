import axios from "axios";
import { useSnackbar } from "notistack";
import { createContext, useEffect, useState } from "react";


const AvailableCategoriesContext = createContext();


export const AvailableCategoriesProvider = ({ children }) => {

    const [availableCategories, setAvailableCategories] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    function showModalError(value) {
        enqueueSnackbar(value, { variant: 'error', anchorOrigin: {
            horizontal: 'right',
            vertical: 'bottom' 
        } });
    }

    useEffect(() => {
        if (availableCategories.length === 0) {
            axios.get('/get_categories', {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.data) {
                    setAvailableCategories(response.data);
                }
            })
            .catch( _ => {
                showModalError("Błąd podczas pobierania danych");
            });
        }
    }, []);
  
    return (
      <AvailableCategoriesContext.Provider value={ availableCategories }>
        {children}
      </AvailableCategoriesContext.Provider>
    );
  };

export default AvailableCategoriesContext;
