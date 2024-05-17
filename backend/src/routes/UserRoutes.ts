import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { getUserClients } from "../controllers/UserControllers"

const router = Router()

router.get("/myClients/:userId", 
        param("userId").isMongoId().withMessage("El id no es valido"),
        handleInputErrors,
        validateUserExist,
        getUserClients  
)

export default router