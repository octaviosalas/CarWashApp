import axios from 'axios';
import { toast } from 'react-toastify';
import { errorRegisterMissedDataType } from 'types/UserTypes'

const handleError = (error: unknown, setLoad: (value: boolean) => void) => {
  setLoad(false);
  if (axios.isAxiosError(error)) {
        if (error.response && Array.isArray(error.response.data.errors)) {              
            const errorMessage = error.response.data.errors.map((er: errorRegisterMissedDataType) => er.msg)[0]
            toast.error(errorMessage, {
                style: { backgroundColor: 'white', color: 'red' },
                pauseOnHover: false,
                autoClose: 2500
            });
        setLoad(false)
    }  if (error.response && !Array.isArray(error.response)) {
    toast.error(error.response.data, {
        style: { backgroundColor: 'white', color: 'red' },
        pauseOnHover: false,
        autoClose: 2500
    });
    setLoad(false);
  } else { 
    console.log('Unexpected error:', error);
    setLoad(false)
  }
  } else {
    console.log('Unexpected error:', error);
  }
  setLoad(false);
};

export default handleError;


