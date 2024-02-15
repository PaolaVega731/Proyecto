import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    photo: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.IkVGd2K48LGoJJ7qo4vXeAHaEt?rs=1&pid=ImgDetMain",
    },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);
schema.plugin(mongoosePaginate);
const User = model(collection, schema);
export default User;
