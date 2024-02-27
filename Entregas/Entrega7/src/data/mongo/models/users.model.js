import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "users";
const schema = new Schema(
  { 
    email:{type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
    name: { type: String, required: true },
    last_name: { type: String },
    role: { type: Number, default: 0 },
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
