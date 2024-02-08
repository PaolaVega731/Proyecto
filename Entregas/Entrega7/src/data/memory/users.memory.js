import fs from "fs";

class UsersManager {
  static #users = [];

  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        UsersManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      if (!data.name || !data.email) {
        throw new Error("Please, insert name & email");
      }
      const user = {
        id:
          UsersManager.#users.length === 0
            ? 1
            : UsersManager.#users[UsersManager.#users.length - 1].id + 1,
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      UsersManager.#users.push(user);
      return user.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  readUsers() {
    try {
      if (UsersManager.#users.length === 0) {
        throw new Error("Not found users!");
      } else {
        return UsersManager.#users;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  readOne(id) {
    try {
      let one = UsersManager.#users.find((each) => each.id === Number(id));
      if (one) {
        return one;
      } else {
        throw new Error("Not found user with id=" + id);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const users = new UsersManager();
