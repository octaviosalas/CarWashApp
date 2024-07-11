import { Request, Response } from "express";
import ExpensesModel from "../models/Expenses";
import ExpensesTypeModel from "../models/ExpensesType";

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

export const createNewTypeOfExpense = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    const {name} = req.body
    
    try {
        const expense = new ExpensesTypeModel({
            user: userId,
            name: name,
        })

        await expense.save()
        res.status(200).send({message: "Has creado exitosamente un nuevo tipo de gasto", expenseTypeData: expense})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
    }
}

export const getTypesOfExpenses = async (req: Request, res: Response) => { 
    
    const {userId} = req.params
    
    try {
        const expensesUserTypes = await ExpensesTypeModel.find({ user: userId})
       
        res.status(200).send(expensesUserTypes)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
    }
}


export const getExpenses = async (req: Request, res: Response) => { 
    
    const {userId} = req.params

    try {
        const expenses = await ExpensesModel.find({user: userId}).populate({ 
            path: "expenseType",
            model: ExpensesTypeModel,
            select: "name"
        })
        
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

