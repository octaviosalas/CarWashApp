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


export const deleteExpense = async (req: Request, res: Response) => { 
    
    const {expenseId} = req.params

    try {
        await ExpensesModel.findByIdAndDelete(expenseId)
        res.status(200).send("Se ha eliminado el gasto exitosamente")
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
    }
}


export const updateData = async (req: Request, res: Response) => { 
    
    const {expenseId} = req.params

    try {
        const newExpenseData = await ExpensesModel.findByIdAndUpdate(expenseId, { 
            reason: req.body.reason,
            amount: req.body.amount,
            observation: req.body.observation,
            expenseType: req.body.expenseType
        }, {new: true})

        await newExpenseData.save()
        
        res.status(200).send("Se modificaron los datos del gasto correctamente")
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
    }
}

