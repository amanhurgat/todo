import axios from 'axios';
export const axiosInstance = axios.create({
        headers:{'content-type':'application/json',
        'authorization': `${localStorage.getItem('token')}`
    }
});