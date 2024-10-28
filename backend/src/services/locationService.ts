import db from "../utils/db";

export const getAllLocations = async () => {
  return await db.location.findMany();
};

export const createLocation = async (data: any) => {
  return await db.location.create({
    data,
  });
};