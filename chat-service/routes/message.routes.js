import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { authentication } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", authentication, getMessages);
router.post("/send/:id", authentication , sendMessage);

export default router;
