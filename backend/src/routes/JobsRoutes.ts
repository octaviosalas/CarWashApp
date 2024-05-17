import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { validateClientExist } from "../middlewares/ClientValidation"
import { validateVehicleExistInUserClientsVehicles, validateJobExist, validateJobIsUserJob } from "../middlewares/JobsValidation"
import { createJob, updateJobStatus, deleteJob, markJobAsPaid, deleteJobPaid } from "../controllers/JobsControllers"


const router = Router()

router.post("/createJob/:userId/:clientId",
    param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
    param("clientId").isMongoId().withMessage("El Id del cliente al que intentas asignar un cliente no es valido"),
    body("date").notEmpty().withMessage("La fecha es obligatoria"),
    body("hour").notEmpty().withMessage("La hora es obligatoria"),
    body("typeOfJob").notEmpty().withMessage("El tipo de trabajo es obligatorio"),
    body("amount").notEmpty().withMessage("El valor es obligatorio"),
    handleInputErrors,
    validateUserExist,
    validateClientExist, 
    validateVehicleExistInUserClientsVehicles,
    createJob
    
)

router.put("/markAsPaid/:jobId/:userId",
    param("jobId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    param("userId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    body("date").notEmpty().withMessage("La fecha de pago es obligatoria"),
    body("paymentMethod").notEmpty().withMessage("La forma de pago es obligatoria"),
    handleInputErrors,
    validateUserExist,
    validateJobExist,
    validateJobIsUserJob,
    markJobAsPaid
)

router.put("/:jobId/:userId",
    param("jobId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    body("status").notEmpty().withMessage("El estado que deseas actualizar es obligatorio"), 
    handleInputErrors,
    validateUserExist,
    validateJobExist,
    updateJobStatus
)

router.delete("/:jobId/:userId",
    param("jobId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    handleInputErrors,
    validateUserExist,
    validateJobExist,
    deleteJob
)

router.delete("/deletePaid/:jobId/:userId",
    param("jobId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    handleInputErrors,
    validateUserExist,
    validateJobExist,
    validateJobIsUserJob,
    deleteJobPaid
)



export default router