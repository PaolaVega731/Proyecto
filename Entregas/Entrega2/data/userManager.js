const fs = require("fs");
const path = require("path");

class UserManager {
  constructor() {
    this.filePath = path.join(__dirname, "..", "data", "users.json");
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async write(data) {
    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  }

  async readOne(id) {
    const items = await this.read();
    return items.find((item) => item.id === id);
  }

  async create(data) {
    const items = await this.read();
    const newItem = {
      id: items.length + 1,
      ...data,
    };
    items.push(newItem);
    await this.write(items);
    return newItem;
  }
}

const userManager = new UserManager();

userManager
  .create({
    name: "Pedro",
    photo: "foto_prueba.jpg",
    email: "pedro@gmail.com",
  })
  .then((newUser) => {
    return "Usuario creado:", newUser;

    return userManager.read();
  })
  .then((allUsers) => {
    return "Todos los usuarios:", allUsers;

    const userIdToRead = 1;
    return userManager.readOne(userIdToRead);
  })
  .then((userById) => {
    return "Usuario por ID:", userById;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
