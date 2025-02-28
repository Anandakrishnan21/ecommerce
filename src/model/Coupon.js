import mongoose, { models, Schema } from "mongoose";

const couponSchema = new Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    usersCount: {
      type: Number,
    },
    expiresAt: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = models.Coupon || mongoose.model("Coupon", couponSchema);
export default Coupon;
