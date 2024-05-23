import { Request, Response } from "express";
import VehicleModel from "../models/Vehicles";
import ClientModel from "../models/Clients";
import JobsModel from "../models/Jobs";

export const createNewVehicle = async (req: Request, res: Response) => { 
    
    const {clientId, userId} = req.params
    const {typeOfVehicle, patent, description} = req.body
    
    try {
        const vehicle = new VehicleModel({
            client: clientId,
            user: userId,
            patent: patent,
            typeOfVehicle: typeOfVehicle,
            description: description
        })
        await vehicle.save()
        res.status(200).json("El vehiculo fue almacenado correctamente")
    } catch (error) {
         console.log(error)
         res.status(500).json({message: "Error", error})
    }
}

export const getVehiclesByClient = async (req: Request, res: Response) => { 
    const {clientId, userId} = req.params;

    try {
        const vehicles = await VehicleModel.find({user: userId, client: clientId})
        
        if (vehicles.length === 0) { 
            res.status(404).json("No hay vehículos registrados de este cliente");
        } else { 

            res.status(200).json(vehicles);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error", error});
    }
}

export const getVehicleData = async (req: Request, res: Response) => {

    const { vehicleId } = req.params;

    try {
        const vehicles = await VehicleModel.findById(vehicleId).populate({
            path: 'client',
            model: ClientModel,
            select: 'name' 
        });

        if (!vehicles) {
            res.status(404).json("No se encontraron vehículos para el cliente especificado.");
        } else {
            res.status(200).json(vehicles);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los vehículos del cliente.", error });
    }
};

export const addClientVehicle = async (req: Request, res: Response) => {

    const { clientId, userId } = req.params;

    try {
        const newVehicleToBeSaved = new VehicleModel({ 
            client: clientId,
            typeOfVehicle: req.body.typeOfVehicle,
            patent: req.body.patent,
            description: req.body.description,
            user: userId
        })
        await newVehicleToBeSaved.save()
        res.status(200).json("El vehiculo fue correctamente asignado al cliente")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los vehículos del cliente.", error });
    }
};

export const getLastWashed = async (req: Request, res: Response) => {

    const { vehicleId, userId } = req.params;

    try {
        const getVehicleJobs = await JobsModel.find({vehicle: vehicleId})
        res.status(200).json(getVehicleJobs)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los vehículos del cliente.", error });
    }
};

