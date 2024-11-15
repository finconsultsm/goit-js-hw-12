import axios from 'axios';

const PixabayApiKey = '30127977-afd00810882476e7ef9a8a757';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${PixabayApiKey}&image_type=photo&orientation=horizontal&safesearch=true`;

export const searchImages = async (query, perPage = 15, page = 1) => {
  // const url = `${baseUrl}&q=${query}&per_page=${perPage}`;

  // const response = fetch(url)
  //   .then(res => res.json())
  //   .catch(err => console.log(err));

  const { data } = await axios(`&q=${query}&per_page=${perPage}&page=${page}`);

  return data;
};
