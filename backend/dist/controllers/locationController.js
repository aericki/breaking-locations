"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocationHandler = exports.getLocationHandler = void 0;
const locationService = __importStar(require("../services/locationService"));
const getLocationHandler = async (req, res) => {
    try {
        const city = req.query.city;
        const locations = await locationService.getAllLocations(city);
        res.json(locations);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get locations", message: error.message });
    }
};
exports.getLocationHandler = getLocationHandler;
const createLocationHandler = async (req, res) => {
    try {
        const location = await locationService.createLocation(req.body);
        res.json(location);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create location" });
    }
};
exports.createLocationHandler = createLocationHandler;
