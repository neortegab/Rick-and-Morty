const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";

const STATUS_OK = 200;
const STATUS_ERROR = 400;

const errors = {
  no_id: "El id provisto no es válido. Debe ser un número",
  no_character: "El id provisto no corresponde a ningún personaje.",
};

async function getCharById(req, res) {
  const { id } = req.params;

  if (!id) res.status(STATUS_ERROR).json(errors.no_id);

  try {
    const response = await axios.get(`${URL}${id}`);

    if (!response.data) res.status(STATUS_ERROR).json(errors.no_character);

    const { name, gender, species, origin, image, status } = response.data;

    const character = {
      id,
      name,
      gender,
      species,
      origin,
      image,
      status,
    };
    res.status(STATUS_OK).json(character);
  } catch (error) {
    res.status(STATUS_ERROR).json(error);
  }
}

module.exports = {
  getCharById,
};
