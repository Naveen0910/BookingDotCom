import express from "express";
import { userRegistration } from "../controller/users";
import { check } from "express-validator";
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

export default router;
