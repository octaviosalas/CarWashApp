import { Request, Response } from "express";
import ServicesModel from "../models/Services";


export const createService = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    const {service, price} = req.body
    console.log(req.body)
    try {
      const newServiceToBeSaved = new ServicesModel({
        service: service,
        price: price,
        user: userId
      })
      await newServiceToBeSaved.save()
      res.status(200).send("El servicio se alaceno correctamente")
    } catch (error) {
      
    }
}

export const getServices = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    console.log(userId)
    
    try {
      const userServicies = await ServicesModel.find({user: userId})
      if(userServicies) { 
        res.status(200).json(userServicies)
      } else { 
        res.status(200).json("No hay servicios")
      }
    } catch (error) {  
        console.log(error)
    }
}

export const deleteService = async (req: Request, res: Response) => { 
    
    const {userId, serviceId} = req.params
    
    try {
     
    } catch (error) {
      
    }
}

export const updateService = async (req: Request, res: Response) => { 
    
    const {userId, serviceId} = req.params
    
    try {
     
    } catch (error) {
      
    }
}