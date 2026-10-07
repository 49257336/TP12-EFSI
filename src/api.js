import axios from "axios";

const URL = "https://countriesnow.space/api/v0.1/countries/flag/images";

export const getFlags = async () => {
  const response = await axios.get(URL);
  return response.data;
};