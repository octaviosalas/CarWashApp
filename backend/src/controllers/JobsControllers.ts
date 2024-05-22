import CollectionModel from "../models/Collections"
import JobsModel from "../models/Jobs";
import { Request, Response } from "express";
import {NewEmailType } from "../models/Emails";
import { sendEmailToClient } from "../utils/SendEmailToClient";
import { ObjectId } from 'mongodb';
import { Types } from "mongoose";


export const createJob = async (req: Request, res: Response) => { 
   
    const {userId, clientId} = req.params
    const {date, hour, vehicle, typeOfJob, amount} = req.body

   try {
        const newJobToBeCreated = new JobsModel({ 
            date: date,
            hour: hour,
            client: clientId,
            user: userId,
            vehicle: vehicle,
            typeOfJob: typeOfJob,
            amount: amount
        })
        await newJobToBeCreated.save()
        res.status(200).json("El lavado quedo almacenado Correctamente")
    } catch (error) {
        console.log(error)
        res.status(200).json({message: "Error", error})
    }
}

export const updateJobStatus = async (req: Request, res: Response) => { 

    const {status} = req.body
   
    try {
         const jobSelected =  req.jobData
         jobSelected.status = status
         await jobSelected.save()
         res.status(200).json("El estado del lavado fue modificado con exito")
    } catch (error) {
      
    }
}

export const deleteJob = async (req: Request, res: Response) => { 
 
    console.log("el id para elmininar", req.jobData.id)
   
    try {
         if(req.jobData.paid === false) { 
            console.log("Job Inpago")
            await JobsModel.findByIdAndDelete(req.jobData.id)
            res.status(200).json("El lavado fue eliminado con exito")
         } else { 
            console.log("Job Pagado")
           const deleteJob = await JobsModel.findByIdAndDelete(req.jobData.id)
           const deletePaid =  await CollectionModel.findOneAndDelete({jobReference: req.jobData.id})
             if(deletePaid && deleteJob) { 
                res.status(200).json("El lavado y el cobro fueron eliminados con exito")
             }
         }
       
    } catch (error) {
       console.log(error)
       res.status(200).json("El lavado fue eliminado con exito")
    }
}

export const markJobAsPaid = async (req: Request, res: Response) => { 
    const {date, paymentMethod} = req.body
    console.log(date, paymentMethod)
   
    try {
        const jobSelected =  req.jobData
        jobSelected.paid = true
        const createNewCollection = new CollectionModel({ 
            amount: req.jobData.amount,
            date: date,
            paymentMethod: paymentMethod,
            user: req.jobData.user,
            client: req.jobData.client,
            jobReference: req.jobData.id

        })
        await jobSelected.save()
        await createNewCollection.save()
        res.status(200).json("El lavado quedo asentado como abonado")
    } catch (error) {
        console.log(error)
        res.status(400).json("error")

    }
}

export const updateJobDetailData = async (req: Request, res: Response) => { 
    const {vehicle, typeOfJob, amount} = req.body
    const {jobId, clientId, userId} = req.params
    try {
        const newJobData = await JobsModel.findByIdAndUpdate(jobId, {        
            vehicle: vehicle,
            typeOfJob: typeOfJob,
            amount: amount
        }, {new: true})

        await newJobData.save()
        res.status(200).send("Los datos del lavado fueron actualizados")

        
    } catch (error) {
        
    }
}

export const deleteJobPaid = async (req: Request, res: Response) => { 
    console.log("el id recibido", req.jobData.id)
   
    try {
        const jobSelected =  req.jobData
        jobSelected.paid = false
        const findCollectionToBeDeleted = CollectionModel.findOneAndDelete({jobReference: req.jobData.id})

        await Promise.allSettled([
            jobSelected.save(),
            findCollectionToBeDeleted
        ]);
        
        res.status(200).json("El cobro del lavado fue eliminado correctamente")

    } catch (error) {
        console.log(error)
        res.status(400).json("error")

    }
}

export const notifyEndOfWashingByEmail = async (req: Request, res: Response) => { 

    const {jobId, userId} = req.params
    
    try {
        const { addressee, message, date, title } = req.body;

        const job = await JobsModel.findByIdAndUpdate(jobId, { 
            status: "completed"
        }, {new: true})

        await job.save()
 
        const data: NewEmailType = {
            sender: new Types.ObjectId(userId),
            title: title,
            message: message,
            addressee: addressee,
            date: date,
            jobReference: new Types.ObjectId(jobId)
        };
        
        await sendEmailToClient({data})

        const jobSelected = await JobsModel.findByIdAndUpdate(jobId, {
            notified: true
         }, {new: true})

         await jobSelected.save()
         res.status(200).json("Lavado finalizado y Correo Electronico enviado")
    } catch (error) {
        console.log(error)
    }
};

