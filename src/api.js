const URL = 'https://countriesnow.space/api/v0.1/countries/flag/images';

export const getFlags = async () => {
  const response = await fetch(URL);
  if (!response.ok) throw new Error('Error al solicitar los países.');

  const result = await response.json();
  return result.data.filter((country) => country.name && country.flag);
};