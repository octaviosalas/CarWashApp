import {Router} from "express"
import { param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist, validateUserAccountIsConfirmed } from "../middlewares/AuthValidations"
import {getDayEstadistic, getMonthEstadistic, getYearEstadistic} from "../controllers/EstadisticsControllers"

const router = Router()

router.get("/todayEstadistics/:userId/:date",
    param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
    param("date").notEmpty().withMessage("La fecha es obligatoria"),
    handleInputErrors,
    validateUserExist,
    validateUserAccountIsConfirmed,
    getDayEstadistic
)

router.get("/monthEstadistics/:userId", 
    param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
    handleInputErrors,
    validateUserExist,
    validateUserAccountIsConfirmed,
    getMonthEstadistic
)
router.get("/yearEstadistics/:userId",
    param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
    handleInputErrors,
    validateUserExist,
    validateUserAccountIsConfirmed,
    getYearEstadistic
)


export default router