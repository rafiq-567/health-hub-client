import axios from 'axios';



const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Optional: only if you're planning to use cookies later
});


const useAxiosSecure = () => {
     // No interceptors needed yet — return the base axios instance
     return axiosSecure
};

export default useAxiosSecure;