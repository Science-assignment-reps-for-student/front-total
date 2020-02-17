import axios from 'axios';
const url = "https://dsm-scars.hs.kr/chuckflap/";
const ApiDefault = axios.create({ baseURL : url });

export default ApiDefault;