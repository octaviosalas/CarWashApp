import { Request, Response } from "express";
import VehicleModel from "../models/Vehicles";
import ClientModel from "../models/Clients";
import UserModel from "../models/User";
import CollectionModel from "../models/Collections";

export const getUserClients = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    
    try {
        const userClients = await ClientModel.find({clientOf: userId})
        if(!userClients) { 
            res.status(200).json("No se encontraron clientes registrados desde tu cuenta")
        } else { 
             res.status(200).json(userClients)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}

export const getMyBilling = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    
    try {
        const userCollections = await CollectionModel.find({user: userId})
        if(!userCollections) { 
            res.status(200).json("No se encontraron cobros registrados desde tu cuenta")
        } else { 
             const getTotalBilling = userCollections.reduce((acc, el) => acc + el.amount, 0)
             res.status(200).json({collections: userCollections, totalBilling: getTotalBilling})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}
