const API_URL = 'http://192.168.99.50';
const API_PORT = '3001';
const API_END_POINT = 'users';

export default {
  getUsersData: async (params) => {
    let requestURL = `${API_URL}:${API_PORT}/${API_END_POINT}`;
    if (params) {
      const opts = Object.keys(params);
      for (let i = 0; i < opts.length; i++) {
        i === 0
          ? (requestURL += `?${opts[i]}=${params[opts[i]]}`)
          : (requestURL += `&${opts[i]}=${params[opts[i]]}`);
      }
    }
    try {
      const response = await fetch(requestURL);
      const users = await response.json();
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
