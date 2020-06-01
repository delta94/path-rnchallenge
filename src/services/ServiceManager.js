import axios from 'axios';

const ServiceManager = () => {
  const headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-type': 'multipart/form-data',
  };

  const instance = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public/',
    timeout: 60000,
    headers,
  });

  return instance;
};

export default ServiceManager;
