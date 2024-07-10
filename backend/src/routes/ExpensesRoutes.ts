import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { createExpense, getExpenses, deleteExpense, updateData } from "../controllers/ExpensesControllers"
import { validateExpenseAmount, validateExpenseExist } from "../middlewares/ExpensesValidations"

const router = Router()

router.post("/createExpense/:userId",
    param("userId").isMongoId().withMessage("El Id del usuario con el que intentas operar no es valido"),
    body("amount").notEmpty().withMessage("El valor es obligatorio"),
    body("reason").notEmpty().withMessage("Debes especificar el motivo del gasto"),
    body("expenseType").notEmpty().withMessage("Debes especificar el tipo de gasto realizado"),
    handleInputErrors,
    validateUserExist,
    validateExpenseAmount,
    createExpense
)

router.get("/getMyExpenses/:userId",
    param("userId").isMongoId().withMessage("El Id del usuario con el que intentas operar no es valido"),
    handleInputErrors,
    validateUserExist,
    getExpenses
)

router.delete("/deleteExpense/:expenseId/:userId",
    param("userId").isMongoId().withMessage("El Id del usuario con el que intentas operar no es valido"),
    param("expenseId").isMongoId().withMessage("El Id del usuario con el que intentas operar no es valido"),
    handleInputErrors,
    validateUserExist,
    validateExpenseExist,
    deleteExpense
)


router.put("/editData/:expenseId/:userId", 
    param("userId").isMongoId().withMessage("El Id del usuario con el que intentas operar no es valido"),
    param("expenseId").isMongoId().withMessage("El Id del usuario con el que intentas operar no es valido"),
    body("amount").notEmpty().withMessage("El valor es obligatorio"),
    body("reason").notEmpty().withMessage("Debes especificar el motivo del gasto"),
    body("observation").notEmpty().withMessage("Debes especificar el motivo del gasto"),
    body("expenseType").notEmpty().withMessage("Debes especificar el tipo de gasto realizado"),
    handleInputErrors,
    validateUserExist,
    validateExpenseExist,
    updateData
)

export default router