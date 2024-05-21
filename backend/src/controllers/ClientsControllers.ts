import { Request, Response } from "express";
import ClientModel from "../models/Clients";
import VehicleModel from "../models/Vehicles";
import ServicesModel from "../models/Services";

export const createClient = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    
    try {
        const user = new ClientModel({
            name: req.body.name,
            telephone: req.body.telephone,
            dni: req.body.dni,
            clientOf: userId
        })

        await user.save()
        res.status(200).send("El cliente fue guardado con exito")

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
    }
}

export const getClientDataWithVehicles = async (req: Request, res: Response) => { 
    
      const {clientId, userId} = req.params

    try {

        const userSelected = await ClientModel.findById(clientId)
        const clientsVehicles = await VehicleModel.find({client: clientId, user: userId})
        const userServices = await ServicesModel.find({user: userId})
        
        if (!userSelected) {
            res.status(404).json("No se encontro el cliente");
        } else {
            res.status(200).json({clientData: userSelected, clientVehicles: clientsVehicles, services: userServices});
        }

    } catch (error) {
        
    }
}

export const getClientVehicles = async (req: Request, res: Response) => {

    const { clientId } = req.params;

    try {
        const vehicles = await VehicleModel.find({client: clientId }).populate({
            path: 'client',
            model: ClientModel,
            select: 'name' 
        });

        if (!vehicles.length) {
            res.status(404).json("No se encontraron vehículos para el cliente especificado.");
        } else {
            res.status(200).json(vehicles);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los vehículos del cliente.", error });
    }
};


export const updateClientData = async (req: Request, res: Response) => {

    const { clientId } = req.params;

    try {
          const updatedClient = await ClientModel.findByIdAndUpdate(clientId, {
            name: req.body.name,
            telephone: req.body.telephone,
            dni: req.body.dni,
        }, { new: true });

        await updatedClient.save()
        res.status(200).send("Los datos del cliente fueron actualizadosss")

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los vehículos del cliente.", error });
    }
};


