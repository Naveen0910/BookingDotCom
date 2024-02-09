import express from "express";
import {
  userRegistration,
  userLogin,
  tokenValidation,
} from "../controller/users";
import { check } from "express-validator";
import { verifyToken } from "../middlewares/verifyToken";
const router = express.Router();

/*   /api/users/register                                   */
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  userRegistration
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characteres required").isLength({
      min: 6,
    }),
  ],
  userLogin
);

router.get("/validate-token", verifyToken, tokenValidation);

export default router;
