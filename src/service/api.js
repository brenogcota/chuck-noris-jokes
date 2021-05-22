import axios from 'axios';

export const api = axios.create({
  baseURL: "https://api.chucknorris.io/jokes/",
});

export const postForm = axios.create({
  baseURL: "https://webhook.site/2ab95961-8e64-4378-bb90-9b9291036b97",
});