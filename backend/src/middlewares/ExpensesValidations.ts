import type { Request, Response, NextFunction } from "express"

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