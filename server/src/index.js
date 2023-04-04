const http = require('http');
const characters = require('./utils/data.js');

const PORT = 3001;

function responseCharacter(req, res){
    const characterId = req.url.split('/').pop();
    const characterRequested = characters.find((character) => character.id === parseInt(characterId));
    if(!characterRequested){
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.end('character not found');  
    }   
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(characterRequested));
}

http.createServer( (req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    switch(req.url){
        case '/rickandmorty/character/1':
            responseCharacter(req, res);
            return;
        case '/rickandmorty/character/2':
            responseCharacter(req, res);
            return;
        case '/rickandmorty/character/3':
            responseCharacter(req, res);
            return;
        case '/rickandmorty/character/4':
            responseCharacter(req, res);
            return;
        case '/rickandmorty/character/5':
            responseCharacter(req, res);
            return;
        default:
            return;
    }
}).listen(PORT, 'localhost');