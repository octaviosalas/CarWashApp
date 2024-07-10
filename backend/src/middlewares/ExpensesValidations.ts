import type { Request, Response, NextFunction } from "express"
import ExpensesModel from "../models/Expenses"

export const validateExpenseAmount = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {amount} = req.body
  
    try {
        if(amount <= 0) { 
            res.status(404).send("El valor del gasto debe ser mayor a 0")
        } else { 
            next()
        }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateExpenseExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {expenseId, userId} = req.body
  
    try {
        const findExpense = await ExpensesModel.find({
            user: userId,
            _id: expenseId
        })
        if(!findExpense) { 
            res.status(404).json("No se encuentra el gasto que estas intentando eliminar")
        } else { 
            next()
        }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}