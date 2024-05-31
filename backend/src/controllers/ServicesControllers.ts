import { Request, Response } from "express";
import ServicesModel from "../models/Services";
import { actualYear, actualMonth, transformPrice } from "../utils/DateAndHourFunctions";
import JobsModel from "../models/Jobs";


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
        await ServicesModel.findOneAndDelete({_id: serviceId, user: userId})
        res.status(200).json("El servicio fue correctamente eliminado")
       
    } catch (error) {
      console.log(error)
      res.status(500).json("El servicio no pudo ser eliminado")

    }
}

export const updateService = async (req: Request, res: Response) => { 
    
    const {userId, serviceId} = req.params
    
    try {
       const service = await ServicesModel.findOneAndUpdate({_id: serviceId, user: userId}, { 
        service: req.body.name,
        price: req.body.price
       }, {new: true})

       await service.save()
       res.status(200).json("El servicio fue actualizado correctamente")

    } catch (error) {
      res.status(500).json("Error al actualizar el servicio")

    }
}

export const getServicesDataEstadistic = async (req: Request, res: Response) => { 

    const {userId, serviceId, month} = req.params
    const currentYear = actualYear();
    const actuallyMonth = actualMonth();

    const servicesJobs = await JobsModel.find({user: userId})
    const filteredJobs = servicesJobs.filter(job => { 
      const date = new Date(job.date)
      const actualYear = date.getFullYear();
      const monthActualData = date.getMonth() + 1
      const yearData = date.getFullYear();
      return monthActualData === actuallyMonth && yearData === actualYear;
    })

    console.log(filteredJobs)

    const detail = []

    const data =  filteredJobs.forEach((jd) => { 
      jd.typeOfJob.map((job) => { 
         if(job._id.toString() === serviceId) { 
            detail.push(job)
         } else { 
           null
         }
      })
    })

    const totalAmount = detail.reduce((acc, el) => acc + el.price, 0)
    const totalJobs = detail.length


    res.status(200).json({data, detail, totalAmount, totalJobs})


}