import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { validateClientNotExist, validateClientExist, validateClientNotExistWithVehicle } from "../middlewares/ClientValidation"
import { createClient, getClientDataWithVehicles, updateClientData, createClientWithVehicle, deleteClient, getClientHistoricJobs } from "../controllers/ClientsControllers"
import { validateUserAccountIsConfirmed } from "../middlewares/AuthValidations"

const router = Router()

router.post("/create/:userId",
       param("userId").isMongoId().withMessage("Estas intentando agregar un cliente desde una cuenta que no es valida"),
       body("name").notEmpty().withMessage("El nombre del cliente es obligatorio"),
       body("telephone").notEmpty().withMessage("El telefono del cliente es obligatorio"),
       body("dni").notEmpty().withMessage("El DNI del cliente es obligatorio"),
       body("email").notEmpty().withMessage("El email del cliente es obligatorio"),
       body("email").isEmail().withMessage("El email del cliente no es válido"),
       handleInputErrors,
       validateClientNotExist,
       validateUserExist,
       validateUserAccountIsConfirmed,
       createClient
)

router.post("/createWithVehicle/:userId",
       param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
       handleInputErrors,
       validateClientNotExistWithVehicle,
       validateUserExist,
       validateUserAccountIsConfirmed,
       createClientWithVehicle
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
   body("email").notEmpty().withMessage("El email es obligatorio"),
   body("email").isEmail().withMessage("El email del cliente no es válido"),
   body("telephone").notEmpty().withMessage("El telefono es obligatorio"),
   handleInputErrors,
   validateClientExist,
   updateClientData
)

router.post("/updateClientData/:clientId/:userId")

router.delete("/deleteClient/:clientId/:userId",
   param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
   param("clientId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
   handleInputErrors,
   validateClientExist,
   deleteClient
)

router.get("/clientHistoricJobs/:clientId/:userId",
   param("userId").isMongoId().withMessage("El Id del usuario del que intentas obtener lavados no es valido"), 
   param("clientId").isMongoId().withMessage("El Id del cliente que intentas obtener lavados no es valido"), 
   validateClientExist,
   validateUserExist,
   getClientHistoricJobs
)




export default router;
