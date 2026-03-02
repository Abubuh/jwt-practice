import DBLocal from "db-local";

const { Schema } = new DBLocal({ path: "./db" });

export const User = Schema("User", {
  //preguntar que hace _   Se le asigna un valor si no lo hago yo
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, require: true },
});
//UserRepository- Se encarga de CRUD
export class UserRepository {
  static async findByUsername(username) {
    return await User.findOne({ username });
  }

  static async createUser({ id, username, hashedPassword }) {
    await User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save();
    return id;
  }
}
