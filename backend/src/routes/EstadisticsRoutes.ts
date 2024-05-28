import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist, validateUserAccountIsConfirmed } from "../middlewares/AuthValidations"
import {getDayEstadistic, getMonthEstadistic} from "../controllers/EstadisticsControllers"

const router = Router()

router.get("/todayEstadistics/:userId/:date",
    param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
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
router.get("/yearEstadistics/:userId")


export default router