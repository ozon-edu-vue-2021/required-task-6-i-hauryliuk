const API_URL = 'http://192.168.99.50';
const API_PORT = '3001';
const API_END_POINT = 'users';

const getCount = (response) => {
  const header = response.headers.get('Link');
  if (!header) {
    return null;
  }
  return Number(
    header
      .split(', ')
      .filter((item) => item.includes('last'))[0]
      .match(/\?_page=(\d+)/)[1]
  );
};

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
      const count = getCount(response);
      const users = await response.json();
      return { count, users };
    } catch (error) {
      console.log(error);
      return { count: null, users: [] };
    }
  },
};
