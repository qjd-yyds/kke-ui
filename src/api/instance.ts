import qs from 'qs';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8888';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  timeout: 30 * 1000,
  transformRequest: (data, headers) => {
    const contentType = headers['Content-Type'];
    if (contentType === 'application/x-www-form-urlencoded') {
      return qs.stringify(data);
    }
    return data;
  }
});

// instance.defaults.baseURL = BASE_URL;
// instance.defaults.headers['Content-Type'] = 'multipart/form-data';
// instance.defaults.transformRequest = (data, headers) => {
//   const contentType = headers['Content-Type'];
//   if (contentType === 'application/x-www-form-urlencoded') {
//     return qs.stringify(data);
//   }
//   return data;
// };

instance.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    return Promise.reject(err);
  }
);
export default instance;
