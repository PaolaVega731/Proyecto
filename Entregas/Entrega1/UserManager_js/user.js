class UserManager {
  static #users = [];
  static #nextId = 1;

  createUser({ name, photo, email }) {
    if (name && photo && email) {
      const user = {
        id: UserManager.#nextId++,
        name,
        photo,
        email,
      };

      UserManager.#users.push(user);

      return user;
    } else {
      return "Error: el objeto data debe tener las propiedades name, photo y email";
    }
  }

  readUsers() {
    return UserManager.#users;
  }

  readOneUser(id) {
    const user = UserManager.#users.find((u) => u.id === id);
    return user ? user : `No se encontró un usuario con ID ${id}`;
  }
}

const userManager = new UserManager();

userManager.createUser({
  name: "Usuario 1",
  photo: "imagen_usuario1.jpg",
  email: "usuario1@example.com",
});

userManager.createUser({
  name: "Usuario 2",
  photo: "imagen_usuario2.jpg",
  email: "usuario2@example.com",
});

userManager.createUser({
  name: "Usuario 3",
  photo: "imagen_usuario3.jpg",
  email: "usuario3@example.com",
});

const listaUsuarios = userManager.readUsers();
const usuarioConId2 = userManager.readOneUser(2);

//console.log("Lista de usuarios", userManager.readUsers());
//console.log("Usuario con ID 2", userManager.readOneUser(2));
