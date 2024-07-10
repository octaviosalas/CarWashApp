import { Request, Response } from "express";
import ExpensesModel from "../models/Expenses";

export const createExpense = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    const {date, amount, reason, expenseType, observation} = req.body
    
    try {
        const expense = new ExpensesModel({
            date: date,
            user: userId,
            amount: amount,
            reason: reason,
            expenseType: expenseType,
            observation: observation
        })

        await expense.save()
        res.status(200).send("Has creado exitosamente el gasto")

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
    }
}

export const getExpenses = async (req: Request, res: Response) => { 
    
    const {userId} = req.params

    try {
        const expenses = await ExpensesModel.find({user: userId})
            res.status(200).send(expenses)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
    }
}