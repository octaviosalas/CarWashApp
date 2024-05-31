import axios from 'axios';
import { toast } from 'react-toastify';

const handleError = (error: unknown, setLoad: (value: boolean) => void) => {
  setLoad(false);
  if (axios.isAxiosError(error)) {
    if (error.response) {
      toast.error(error.response.data, {
        style: { backgroundColor: 'white', color: 'blue' },
        pauseOnHover: false,
        autoClose: 2000,
      });
    } else {
      console.log('Unexpected error:', error);
    }
  } else {
    console.log('Unexpected error:', error);
  }
  setLoad(false);
};

export default handleError;