import axios from "axios";


export const getImages = async (searchWord = "cats") =>
  //console.log(Config.API_KEY)
  await axios.get(`https://api.pexels.com/v1/search?query=${searchWord}`, {
    headers: {
      Authorization: '563492ad6f91700001000001342747deefa248aa8c918637f72bad6d',
    },
  });