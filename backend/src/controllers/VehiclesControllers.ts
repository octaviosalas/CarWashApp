import { Request, Response } from "express";
import VehicleModel from "../models/Vehicles";
import ClientModel from "../models/Clients";

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

