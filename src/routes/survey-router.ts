import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import surveyService from "@services/survey-service";
import { ParamMissingError } from "@shared/errors";

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
  get: "/all",
  add: "/add",
  update: "/update",
  delete: "/delete/:id",
} as const;

/**
 * Get all
 */
router.get(p.get, async (_: Request, res: Response) => {
  const data = await surveyService.getAll();
  return res.status(OK).json({ data: data });
});

/**
 * Add one
 */
router.post(p.add, async (req: Request, res: Response) => {
  // Check param
  if (!req.body) {
    throw new ParamMissingError();
  }
  // Fetch data
  const data = await surveyService.addOne(req.body);
  return res
    .status(CREATED)
    .json({ data: data, callbackUrl: "/success/callback" });
});

/**
 * Update one
 */
router.put(p.update, async (req: Request, res: Response) => {
  // Check param
  if (!req.body) {
    throw new ParamMissingError();
  }
  // Fetch data
  const data = await surveyService.updateOne(req.body);
  return res.status(OK).json({ data: data });
});

/**
 * Delete one
 */
router.delete(p.delete, async (req: Request, res: Response) => {
  const { id } = req.params;
  // Check param
  if (!id) {
    throw new ParamMissingError();
  }
  // Fetch data
  const data = await surveyService.delete(Number(id));
  return res.status(OK).json({ data: data });
});

// Export default
export default router;
