import { Request, Response } from "express";
import JobsModel from "../models/Jobs";
import CollectionModel from "../models/Collections";
import mongoose, { ObjectId } from 'mongoose';
import { actualYear, actualMonth } from "../utils/DateAndHourFunctions";
import ExpensesModel from "../models/Expenses";

export const getDayEstadistic = async (req: Request, res: Response) => { 
    
    const {userId, date} = req.params
    
    try { 
        const findJobs = await JobsModel.find({user: userId, date: date})
        const findCollections = await CollectionModel.find({user: userId, date: date})
        const totalAmountFactured = findCollections.reduce((acc, el) => acc + el.amount, 0)
        const totalAmountFacturedInEfective = findCollections.filter((cc) => cc.paymentMethod === "Efectivo")
        const totalEfective = totalAmountFacturedInEfective.reduce((acc, el) => acc + el.amount, 0)

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

        const userExpensesDay = await ExpensesModel.find({user: userId, date: date})
        const totalAmountExpense = userExpensesDay.reduce((acc, el) => acc + el.amount, 0)
        
        res.status(200).json(
            {jobs: findJobs, 
                collections: findCollections, 
                amount: totalAmountFactured, 
                amountEfective: totalEfective, 
                orderByServices: trasformData,
                expensesAmount: totalAmountExpense
            }
        );
        
    } catch (error) {
        console.log(error)
    }
}

export const getMonthEstadistic = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    const actuallyMonth = actualMonth();

    try {

        const userCollections = await CollectionModel.find({user: userId})
        const filteredCollections = userCollections.filter(dato => {
            const fechaDato = new Date(dato.date);
            const monthData = fechaDato.getMonth() + 1;
            return monthData === actuallyMonth;
        });
        const totalAmountFactured = filteredCollections.reduce((acc, el) => acc + el.amount, 0)



        const userJobs = await JobsModel.find({user: userId})
        const filteredJobs = userJobs.filter(job => { 
            const date = new Date(job.date)
            const actualYear = date.getFullYear();
            const monthActualData = date.getMonth() + 1
            const yearData = date.getFullYear();
            return monthActualData === actuallyMonth && yearData === actualYear;
        })
        const orderJobsByType = new Map();
        filteredJobs.forEach(job => {
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

        const userExpensesMonth = await ExpensesModel.find({user: userId})
        const filteredExpenses = userExpensesMonth.filter(dato => {
            const fechaDato = new Date(dato.date);
            const monthData = fechaDato.getMonth() + 1;
            return monthData === actuallyMonth;
        });
        const totalMonthExpenses = filteredExpenses.reduce((acc, el) => acc + el.amount, 0)



        res.status(200).json({
            collections: filteredCollections, 
            totalAmount: totalAmountFactured,
            quantityJobs: filteredJobs.length,
            jobsOrderByType: trasformData,
            jobs: filteredJobs,
            amountExpenses: totalMonthExpenses
        })

        
    } catch (error) {
        console.log(error)
    }
}

export const getYearEstadistic = async (req: Request, res: Response) => { 
    const { userId } = req.params;
    const currentYear = actualYear();

    try {

        const userCollections = await CollectionModel.find({ user: userId });
        const filteredCollections = userCollections.filter(dato => {
            const fechaDato = new Date(dato.date);
            const yearData = fechaDato.getFullYear();
            return yearData === currentYear;
        });
        const totalAmountFactured = filteredCollections.reduce((acc, el) => acc + el.amount, 0);

        const userJobs = await JobsModel.find({ user: userId });
        const filteredJobs = userJobs.filter(job => { 
            const date = new Date(job.date);
            const yearData = date.getFullYear();
            return yearData === currentYear;
        });

        const orderJobsByType = new Map();
        filteredJobs.forEach(job => {
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

        const expenses = await ExpensesModel.find({ user: userId });
        const filteredExpensesData = expenses.filter(dato => {
            const fechaDato = new Date(dato.date);
            const yearData = fechaDato.getFullYear();
            return yearData === currentYear;
        });
        const totalExpensesAmount = filteredExpensesData.reduce((acc, el) => acc + el.amount, 0);

        res.status(200).json({
            collections: filteredCollections, 
            totalAmount: totalAmountFactured,
            quantityJobs: filteredJobs.length,
            jobsOrderByType: trasformData,
            jobs: filteredJobs,
            totalExpensesAmount: totalExpensesAmount
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}