import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { getUserClients, getMyBilling, getMonthlyJobs, getDayJobs, hellu } from "../controllers/UserControllers"

const router = Router()

router.get("/myClients/:userId", 
        param("userId").isMongoId().withMessage("El id no es valido"),
        handleInputErrors,
        validateUserExist,
        getUserClients  
)

router.get("/myBilling/:userId", 
        param("userId").isMongoId().withMessage("El id no es valido"),
        handleInputErrors,
        validateUserExist,
        getMyBilling  
)

router.get("/myJobs/:userId/:month/:year", 
        param("userId").isMongoId().withMessage("El id no es valido"),
        handleInputErrors,
        validateUserExist,
        getMonthlyJobs  
)

router.get("/myJobs/:userId/:day/:month/:year", 
        param("userId").isMongoId().withMessage("El id no es valido"),
        handleInputErrors,
        validateUserExist,
        getDayJobs  
)

router.get("/hola", 
hellu
)

export default router