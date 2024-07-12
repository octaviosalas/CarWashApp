import type { Request, Response, NextFunction } from "express"
import ExpensesModel from "../models/Expenses"
import ExpensesTypeModel from "../models/ExpensesType"

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

export const validateExpenseTypeNameNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {name} = req.body
    const {userId} = req.params

    try {
         const normalizedName = name.toLowerCase();

         const checkIt = await ExpensesTypeModel.findOne({ 
            user: userId,
            name: { $regex: new RegExp(`^${normalizedName}$`, 'i') }
        });
        
         if(checkIt) { 
            res.status(400).send("El tipo de gasto que estas intentando agregar ya forma parte de los que tenes almacenados")
         } else { 
            next()
         }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateTypeOfExpenseIsUserType = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {userId, expenseTypeId} = req.params

    try {
        
         const check = await ExpensesTypeModel.find({user: userId, _id: expenseTypeId})
        
         if(!check) { 
            res.status(400).send("El tipo de gasto que estas intentando averiguar no forma parte de los que tenes almacenados")
         } else { 
            next()
         }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}