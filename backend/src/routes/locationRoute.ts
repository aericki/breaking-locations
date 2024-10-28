import  { Router } from "express";

import * as locationController from "../controllers/locationController";

const router = Router();

router.get("/", locationController.getLocationHandler);
router.post("/", locationController.createLocationHandler);

export default router;