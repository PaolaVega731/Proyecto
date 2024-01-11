import fs from "fs";
import crypto from "crypto";

class UsersManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      console.log(exists);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        console.log(this.users);
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }
  async createUser(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo, emai are required");
      }
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      this.users.push(user);
      const jsonData = JSON.stringify(this.users, null, 2);
      //console.log(jsonData);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + user.id);
      return user.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readUsers() {
    try {
      if (this.users.length === 0) {
        throw new Error("There are not users!");
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readUserById(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error(`There isn't any user with id=${id}`);
      } else {
        console.log("read ", one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async removeUserById(id) {
    try {
      let one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any user with id=" + id);
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("deleted " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}
const users = new UsersManager("./src/data/fs/users.json");
export default users;
