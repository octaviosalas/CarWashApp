import { Request, Response } from "express";
import JobsModel from "../models/Jobs";
import CollectionModel from "../models/Collections";
import mongoose, { ObjectId } from 'mongoose';

export const getDayEstadistic = async (req: Request, res: Response) => { 
    
    const {userId, date} = req.params
    
    try {
        const findJobs = await JobsModel.find({user: userId, date: date})
        const findCollections = await CollectionModel.find({user: userId, date: date})
        const totalAmountFactured = findCollections.reduce((acc, el) => acc + el.amount, 0)

        const orderJobsByType = new Map();

        findJobs.forEach(job => {
            job.typeOfJob.forEach(el => {
                const serviceType = el.service;
                if (!orderJobsByType.has(serviceType)) {
                    orderJobsByType.set(serviceType, []);
                }
                orderJobsByType.get(serviceType).push(el);
            });
        });
        
        const trasformData = Array.from(orderJobsByType.entries()).map(([services, data]) => ({
            services: services,
            data: data
        }));
        
        res.status(200).json({jobs: findJobs, collections: findCollections, amount: totalAmountFactured, orderByServices: trasformData});
        
    } catch (error) {
        console.log(error)
    }
}