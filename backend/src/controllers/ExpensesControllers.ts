import { Request, Response } from "express";
import ExpensesModel from "../models/Expenses";
import ExpensesTypeModel from "../models/ExpensesType";
import { actualMonth, actualYear } from "../utils/DateAndHourFunctions";

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

export const getTypeResumeData = async (req: Request, res: Response) => { 
    
    const {expenseTypeId, userId, date} = req.params
    const actuallyMonth = actualMonth();
    const currentYear = actualYear();

    try {
        const everyTypesDetectedInDay = await ExpensesModel.find({ 
            user: userId,
            expenseType: expenseTypeId,
            date: date
        })

        const everyTypesDetectedInMonth = await ExpensesModel.find({ 
            user: userId,
            expenseType: expenseTypeId,
        })

        const totalAmountDayUsed = everyTypesDetectedInDay.reduce((acc, el) => acc + el.amount, 0)

        const totalAmountMonth =  everyTypesDetectedInMonth.filter(data => { 
            const actualDate = new Date(data.date);
            const monthData = actualDate.getMonth() + 1;
            return monthData === actuallyMonth
        })

        const totalAmountYear = everyTypesDetectedInMonth.filter(dato => {
            const actualDate = new Date(dato.date);
            const yearData = actualDate.getFullYear();
            return yearData === currentYear;
        });

   
        const totalAmountMonthUsed= totalAmountMonth.reduce((acc, el) => acc + el.amount, 0)
        const totalAmountYearUsed= totalAmountYear.reduce((acc, el) => acc + el.amount, 0)

        res.status(200).json({day: totalAmountDayUsed, month: totalAmountMonthUsed, year: totalAmountYearUsed})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
    }
}


export const deleteTypeExpense = async (req: Request, res: Response) => { 
   
    const {userId, expenseTypeId} = req.params

    try {
        await ExpensesTypeModel.findOneAndDelete({_id: expenseTypeId, user: userId})
        await ExpensesModel.deleteMany({expenseType: expenseTypeId})
        res.status(200).send("Se ha eliminado correctamente el tipo de gasto y todos los gastos relacionados a este")

   } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error", error})
   }
}