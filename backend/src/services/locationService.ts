import db from "../utils/db";

export const getAllLocations = async (city: string) => {
  if (city) {
    return await db.location.findMany({
      where: {
        city: {
          contains: city
          
        }
      }
    });
  } else {
    return await db.location.findMany();
  }
  
};

export const createLocation = async (data: any) => {
  return await db.location.create({
    data,
  });
};