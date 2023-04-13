const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin", e "image"', async () => {
      const res = await agent.get("/rickandmorty/character/1");
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("species");
      expect(res.body).toHaveProperty("gender");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("origin");
      expect(res.body).toHaveProperty("image");
    });
    it("Responde un error 400 cuando no se encuentra al personaje", async () => {
      const res = await agent.get("/rickandmorty/character/900");
      expect(res.status).toBe(400);
    });
  });
  describe("GET /rickandmorty/login", () => {
    const goodUser = "?username=test@test.com&password=123456";
    const badUserGoodPassword =
      "?username=I'm not an email@email.com&password=123456";
    const badPasswordGoodUser = "?username=test@test.com&password=134506";
    const wrongAll = "?username=bad@bad.com&password=654213";
    const noUserName = "?password=654213";
    const noPassword = "?username=test@test.com";
    it("Si el usuario es incorrecto y la contraseña es correcta, no da acceso y provee mensaje de error indicando que no existe usuario", async () => {
      const res = await agent.get(`/rickandmorty/login${badUserGoodPassword}`);
      expect(res.body).toEqual({
        access: false,
        error: "El usuario no existe",
      });
    });
    it("Si el usuario es correcto y la contraseña incorrecta, no da acceso y provee mensaje de error indicando que no existe usuario", async () => {
      const res = await agent.get(`/rickandmorty/login${badPasswordGoodUser}`);
      expect(res.body).toEqual({
        access: false,
        error: "El usuario no existe",
      });
    });
    it("Si todos los datos son incorrectos, no da acceso y provee mensaje de error indicando que no existe usuario", async () => {
      const res = await agent.get(`/rickandmorty/login${wrongAll}`);
      expect(res.body).toEqual({
        access: false,
        error: "El usuario no existe",
      });
    });
    it("Si no se provee usuario, no da acceso y provee mensaje de error indicando que No se recibió un nombre de usuario", async () => {
      const res = await agent.get(`/rickandmorty/login${noUserName}`);
      expect(res.body).toEqual({
        access: false,
        error: "No se recibió un nombre de usuario",
      });
    });
    it("Si no se provee contraseña, no da acceso y provee mensaje de error indicando que No se recibió una contraseña", async () => {
      const res = await agent.get(`/rickandmorty/login${noPassword}`);
      expect(res.body).toEqual({
        access: false,
        error: "No se recibió una contraseña",
      });
    });
    it("Si el usuario es correcto, responde con 200 y da acceso", async () => {
      const res = await agent.get(`/rickandmorty/login${goodUser}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ access: true });
    });
  });
  const character1 = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1"
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  };
  const character2 = {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: {
      name: "unknown",
      url: ""
    },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
  };
  let arrayWithCharacters = [];
  describe("POST /rickandmorty/favorite", () => {
    it("Debe devolver un array vacío si no se han agregado personajes", async () => {
        const res = await agent.get(`/rickandmorty/favorite/`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);        
    });
    it("Debe devolver un error si se intenta crear un personaje sin datos", async () => {
        const res = await agent.post(`/rickandmorty/favorite/`);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({error: "No se ingresaron datos"});    
    });
    it("Debe devolver un array con un elemento agregado", async () => {
        const res = await agent.post(`/rickandmorty/favorite/`).send(character1);
        expect(res.status).toBe(200);
        arrayWithCharacters.push(character1);
        expect(res.body).toEqual(arrayWithCharacters);        
    });
    it("Si se agrega más de un elemento devuelve el mismo array con ambos personajes", async ()=>{
        const res = await agent.post(`/rickandmorty/favorite/`).send(character2);
        expect(res.status).toBe(200);
        arrayWithCharacters.push(character2);
        expect(res.body).toEqual(arrayWithCharacters);
    })
  });
  describe("DELETE /rickandmorty/favorite/:id", ()=>{
    it("Debe devolver un error si el id indicado no existe dentro de favoritos", async () => {
        const res = await agent.delete(`/rickandmorty/favorite/3`);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({error: "El personaje no está en favoritos"});        
    });
    it("Debe devolver el array con los personajes restantes si el id indicado existe", async () => {
        const res = await agent.delete(`/rickandmorty/favorite/2`);
        expect(res.status).toBe(200);
        arrayWithCharacters.pop();
        expect(res.body).toEqual(arrayWithCharacters);        
    });
  });
});
