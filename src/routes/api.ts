import { Router } from "express";
import userRouter from "./user-router";
import surveyRouter from "./survey-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/users", userRouter);
baseRouter.use("/surveys", surveyRouter);

// Export default.
export default baseRouter;
