import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const apiService = {
  get: async (data: any) => {
    const response = await axios.get(`${BASE_URL}/${data}`);
    return response.data;
  },

  post: async (data: any, payload: Object, setResponse: any, headers: any) => {
    const config = {
      headers,
    };
    const response = await axios.post(`${BASE_URL}/${data}`, payload, {
      headers,
    });
    setResponse(response);
  },
};
