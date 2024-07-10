import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { createExpense, getExpenses } from "../controllers/ExpensesControllers"
import { validateExpenseAmount } from "../middlewares/ExpensesValidations"

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

export default router