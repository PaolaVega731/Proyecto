import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => hashSync(password, genSaltSync(10));

const verifyHash = (password, hash) => compareSync(password, hash);


export {createHash, verifyHash};
