import { Request, Response } from "express";
import * as locationService from "../services/locationService";

export const getLocationHandler = async (req: Request, res: Response) => {
  try {
    const locations = await locationService.getAllLocations();
    res.json(locations);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLocationHandler = async (req: Request, res: Response) => {
  try {
    const location = await locationService.createLocation(req.body);
    res.json(location);
  } catch (error:any) {
    res.status(500).json({ message: "Failed to create location" });
  }
}