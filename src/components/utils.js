import axios from 'axios';
const url = "http://54.180.174.253/chuckflap/";
const ApiDefault = axios.create({ baseURL : url });

export default ApiDefault;