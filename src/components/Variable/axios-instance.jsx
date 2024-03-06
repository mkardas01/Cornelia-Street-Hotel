import axios from "axios";

const instance = axios.create({
    baseURL: 'https://srv26.mikr.us:20117/api/',
    timeout: 1000
});
export default instance;