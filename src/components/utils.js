import axios from 'axios';
const url = "http://dsm-scarfs.hs.kr/chuckflap/";
const ApiDefault = axios.create({ baseURL : url });

export default ApiDefault;