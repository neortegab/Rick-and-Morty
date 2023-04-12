let myFavorites = [];

const errors = {
    no_data: "No se ingresaron datos",
    no_id: "No se ingresó un Id",
    not_in_favorites: "El personaje no está en favoritos"
};

const STATUS_ERROR = 400;
const STATUS_OK = 200;

const postFav = (req, res) => {
    const { body } = req;

    if(!body) res.status(STATUS_ERROR).json({error: errors.no_data});

    myFavorites.push(body);
    res.status(STATUS_OK).json(myFavorites);
}

const deleteFav = (req, res) => {

    const { id } = req.params;

    if(!id) res.status(STATUS_ERROR).json({error: errors.no_id});

    let originalLength = myFavorites.length;
    myFavorites = myFavorites.filter((character) => character.id !== parseInt(id));

    if(originalLength === myFavorites.length) res.status(STATUS_ERROR).json({error: errors.not_in_favorites});

    res.status(STATUS_OK).json(myFavorites);
}

module.exports = {
    postFav,
    deleteFav
}