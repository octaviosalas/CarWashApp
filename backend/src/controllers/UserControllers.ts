import { Request, Response } from "express";
import VehicleModel from "../models/Vehicles";
import ClientModel from "../models/Clients";
import UserModel from "../models/User";
import CollectionModel from "../models/Collections";
import JobsModel from "../models/Jobs";

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

export const getEveryJobs = async (req: Request, res: Response) => { 
    
    const {  userId } = req.params;
    
    try {
        const jobs = await JobsModel.find({user: userId}).populate({
            path: "client",
            model: ClientModel,
            select: "name"
        }).populate({
            path: "vehicle",
            model: VehicleModel,
            select: "description patent typeOfVehicle"
        });
        res.status(200).json({detail: jobs})


    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}

export const getMonthlyJobs = async (req: Request, res: Response) => { 
    
    const { month, year, userId } = req.params;
    
    try {

        const monthNumber = parseInt(month, 10);
        const yearNumber = parseInt(year, 10);
    
        if (isNaN(monthNumber) || isNaN(yearNumber)) {
            return res.status(400).json({ error: 'Los parámetros de mes y año no son válidos.' });
        }
    
        const startDate = new Date(yearNumber, monthNumber - 1, 1); 
        const endDate = new Date(yearNumber, monthNumber, 0);


        const jobs = await JobsModel.find({
            user: userId,
            date: {
                $gte: startDate,
                $lt: endDate
            }
        }).populate({
            path: "client",
            model: ClientModel,
            select: "name"
        }).populate({
            path: "vehicle",
            model: VehicleModel,
            select: "description patent typeOfVehicle"
        })

        const totalAmountFactured = jobs.reduce((acc, el) => acc + el.amount, 0)
        res.status(200).json({detail: jobs, totalBilling: totalAmountFactured});


    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}

export const getDayJobs = async (req: Request, res: Response) => { 
    
    const { day, month, year, userId } = req.params;
    
    try {

        const monthNumber = parseInt(month, 10);
        const yearNumber = parseInt(year, 10);
        const dayNumber = parseInt(day, 10);
    
        console.log(monthNumber, yearNumber, dayNumber)
    
        if (isNaN(monthNumber) || isNaN(yearNumber)  || isNaN(dayNumber)) {
            return res.status(400).json({ error: 'Los parámetros de mes y año no son válidos.' });
        }

        const startDate = new Date(Date.UTC(yearNumber, monthNumber - 1, dayNumber));
        const endDate = new Date(Date.UTC(yearNumber, monthNumber - 1, dayNumber));

        const jobs = await JobsModel.find({
            user: userId,
            date: {
                $gte: startDate,
                $lt: new Date(endDate.getTime() + 24*60*60*1000)
            }
        }).populate({
            path: "client",
            model: ClientModel,
            select: "name"
        }).populate({
            path: "vehicle",
            model: VehicleModel,
            select: "description patent typeOfVehicle"
        })

        const jobsPaid = jobs.filter((job) => job.paid === true)
        const jobsWithOutPaid = jobs.filter((job) => job.paid === false)
        
        const totalAmountFactured = jobsPaid.reduce((acc, el) => acc + el.amount, 0)
        const totalAmountPendingCollection = jobsWithOutPaid.reduce((acc, el) => acc + el.amount, 0)

        res.status(200).json({detail: jobs, totalBilling: totalAmountFactured, pendingCollection: totalAmountPendingCollection});

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error", error})
    }
}


