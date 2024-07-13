import {Router} from 'express'
import { registerUser , mail } from '../controllers/user.controller.js';
const router = Router();
router.route("/register").post(registerUser)

router.route("/me").post(mail)


export default router

