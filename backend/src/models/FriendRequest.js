import mongoose from "mongoose";
import {USER_SCHEMA_NAME} from "./User.js";

export const FRIEND_REQUEST_SCHEMA_NAME = "FriendRequest";

const friendRequestSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USER_SCHEMA_NAME,
            required: true,
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USER_SCHEMA_NAME,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const FriendRequest = mongoose.model(FRIEND_REQUEST_SCHEMA_NAME, friendRequestSchema);

export default FriendRequest;