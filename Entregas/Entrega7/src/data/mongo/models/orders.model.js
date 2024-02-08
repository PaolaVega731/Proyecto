import { model, Schema, Types } from "mongoose";
import monoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {
    u_id: { type: Types.ObjectId, required: true, ref: "users" },
    p_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  { timestamps: true }
);
schema.pre("find", function () {
  this.populate("u_id", "-password -createAt -updateAt -__v");
});
schema.pre("find", function () {
  this.populate("p_id", "name photo price");
});
const Order = model(collection, schema);
export default Order;
