import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateClientExist } from "../middlewares/ClientValidation"
import { validateUserExist } from "../middlewares/AuthValidations"
import { validateVehicleNotExist, validateVehicleIsYours, validateVehicleExist, validateVehicleData  } from "../middlewares/VehiclesValidation"
import { createNewVehicle , getVehiclesByClient, getVehicleData, addClientVehicle, getLastWashed} from "../controllers/VehiclesControllers"
import { validateVehicleExistInUserClientsVehicles } from "../middlewares/JobsValidation"


const router = Router()

router.post("/addVehicle/:clientId/:userId",    
   param("clientId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   body("typeOfVehicle").notEmpty().withMessage("El tipo de Vehiculo es obligatorio"),
   body("description").notEmpty().withMessage("La descripcion del vehiculo es obligatoria"),
   body("patent").notEmpty().withMessage("La patente del Vehiculo es obligatoria"),
   validateClientExist,
   validateVehicleNotExist,
   validateUserExist,
   createNewVehicle
)

router.get("/clientVehicles/:clientId/:userId",    
   param("clientId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   param("userId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   handleInputErrors,
   validateClientExist,
   validateUserExist,
   getVehiclesByClient
)

router.get("/vehicleData/:vehicleId/:userId",    
   param("vehicleId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   param("userId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   validateUserExist,
   validateVehicleExist,
   validateVehicleIsYours,
   getVehicleData
)

router.post("/addClientVehicle/:clientId/:userId",    
   param("clientId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   param("userId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   validateUserExist,
   validateVehicleNotExist,
   validateVehicleData,
   addClientVehicle
)

router.get("/getLastWashed/:vehicleId/:userId",    
   param("vehicleId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   param("userId").isMongoId().withMessage("El Id del client al que intentas asignarle un vehiculo no es valido"),
   validateUserExist,
   validateVehicleExist,
   validateVehicleIsYours,
   getLastWashed
)

export default router;
