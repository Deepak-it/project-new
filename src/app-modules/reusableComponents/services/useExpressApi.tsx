import axios, { AxiosError } from 'axios';
import { makeUseAxios } from 'axios-hooks';
// import localStorage from 'redux-persist/es/storage';
// import HttpStatusCode from './HttpStatusCode';
// import { renderErrors } from '../helper/error-message-helper';
// import { calcOffMins } from 'src/util/utility';


export const customAxios = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});


// customAxios.interceptors.request.use(
//   async (config) => {
//     const accessToken = await localStorage.getItem("token");
//     if (accessToken && config.headers) {
//       config.headers['Authorization'] = 'Bearer ' + accessToken;
//       config.headers['OffSetMins'] = calcOffMins();
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );


// customAxios.interceptors.response.use(
//   async (resp) => {
//     switch (resp.data.statusCode) {
//       case HttpStatusCode.OK:
//         return resp.data
//         break;

//       case HttpStatusCode.BAD_REQUEST:
//         renderErrors(resp.data.message)
//         break;

//       case HttpStatusCode.UNAUTHORIZED:
//         renderErrors(resp.data.message)

//       case HttpStatusCode.NOT_FOUND:
//         renderErrors(resp.data.message)
//         break;

//       case HttpStatusCode.INTERNAL_SERVER_ERROR:
//         renderErrors(resp.data.message)
//         break;

//       case HttpStatusCode.BAD_GATEWAY:
//         renderErrors('Unable to connect to server please try again...')
//         break;
//     }
//   },
//   (error: AxiosError) => {
//     try {
//       if(error.code=='NETWORK_ERROR'){
//         renderErrors('Unable to connect to server please try again...')
//       }
//       else{
//         renderErrors((error.response?.data as Object)['Message'])
//       }
//     } catch (E) {
//       Promise.reject(error);
//     }

//   }
// );



export const useExpressApi = makeUseAxios({
  cache: false,
  axios: customAxios,
});

