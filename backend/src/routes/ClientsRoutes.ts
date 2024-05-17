import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { validateClientNotExist, validateClientExist } from "../middlewares/ClientValidation"
import { createClient, getClientDataWithVehicles, updateClientData } from "../controllers/ClientsControllers"
import { validateUserAccountIsConfirmed } from "../middlewares/AuthValidations"

const router = Router()

router.post("/create/:userId",
       param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
       body("name").notEmpty().withMessage("El nombre del cliente es obligatorio"),
       body("telephone").notEmpty().withMessage("El nombre del cliente es obligatorio"),
       body("dni").notEmpty().withMessage("El DNI del cliente es obligatorio"),
       handleInputErrors,
       validateClientNotExist,
       validateUserExist,
       validateUserAccountIsConfirmed,
       createClient
)

router.get("/clientData/:clientId/:userId",
   param("userId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"), 
   validateClientExist,
   validateUserExist,
   getClientDataWithVehicles
)

router.put("/updateClientData/:clientId/:userId",
   param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
   param("clientId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
   body("name").notEmpty().withMessage("El nombre es obligatorio"),
   body("dni").notEmpty().withMessage("El dni es obligatorio"),
   body("telephone").notEmpty().withMessage("El telefono es obligatorio"),
   handleInputErrors,
   validateClientExist,
   updateClientData


)

router.post("/updateClientData/:clientId/:userId")

router.delete("/deleteClient/:clientId/:userId")






export default router;
