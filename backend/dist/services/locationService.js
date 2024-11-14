"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocation = exports.getAllLocations = void 0;
const db_1 = __importDefault(require("../utils/db"));
const getAllLocations = async (city) => {
    if (city) {
        return await db_1.default.location.findMany({
            where: {
                city: {
                    contains: city
                }
            }
        });
    }
    else {
        return await db_1.default.location.findMany();
    }
};
exports.getAllLocations = getAllLocations;
const createLocation = async (data) => {
    return await db_1.default.location.create({
        data,
    });
};
exports.createLocation = createLocation;
