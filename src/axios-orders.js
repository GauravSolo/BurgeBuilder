import axios from "axios";

const instance = axios.create({
    baseURL : 'https://burgerbuilder-39073-default-rtdb.firebaseio.com/'
});
export default instance;