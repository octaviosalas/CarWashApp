import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { validateClientExist } from "../middlewares/ClientValidation"
import { validateVehicleExistInUserClientsVehicles, validateJobExist, validateJobIsUserJob } from "../middlewares/JobsValidation"
import {validateJobCollectionExist} from "../middlewares/CollectionsValidations"
import { createJob, updateJobStatus, deleteJob, markJobAsPaid, deleteJobPaid,  notifyEndOfWashingByEmail, updateJobDetailData, updateJobAmountOrClient, jobCollectionData} from "../controllers/JobsControllers"


const router = Router()

router.post("/createJob/:userId/:clientId",
    param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),
    param("clientId").isMongoId().withMessage("El Id del cliente al que intentas asignar un cliente no es valido"),
    body("date").notEmpty().withMessage("La fecha es obligatoria"),
    body("hour").notEmpty().withMessage("La hora es obligatoria"),
    body("typeOfJob").notEmpty().withMessage("El tipo de trabajo es obligatorio"),
    body("amount").notEmpty().withMessage("El valor es obligatorio"),
    body("vehicle").notEmpty().withMessage("El vehiculo es obligatorio"),
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

router.post("/updateJobData/:jobId/:clientId/:userId",
    param("jobId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    param("userId").isMongoId().withMessage("El Id del usuario que deseas actualizar es obligatorio"), 
    param("clientId").isMongoId().withMessage("El Id del cliente que deseas actualizar es obligatorio"), 
    body("vehicle").notEmpty().withMessage("El Vehiculo es obligatorio"), 
    body("typeOfJob").notEmpty().withMessage("El o los servicios son obligatorios"), 
    body("amount").notEmpty().withMessage("El monto es obligatorio"), 
    handleInputErrors,
    validateUserExist,
    validateJobExist,
    validateClientExist,
    updateJobDetailData
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

router.post("/sendEmail/:jobId/:userId",
    param("jobId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    param("userId").isMongoId().withMessage("El estado que deseas actualizar es obligatorio"), 
    body("addressee").isEmail().withMessage("El email del cliente no es valido"), 
    body("title").notEmpty().withMessage("El titulo es obligatorio"), 
    body("message").notEmpty().withMessage("El mensaje es obligatorio"), 
    body("date").notEmpty().withMessage("La fecha es obligatoria"), 
    handleInputErrors,
    validateUserExist,
    validateJobExist,
    notifyEndOfWashingByEmail
)

router.put("/updateData/:jobId/:userId",
    param("jobId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    param("userId").isMongoId().withMessage("El ID del usuario es obligatorio"), 
    body("clientId").notEmpty().withMessage("El ID del cliente es obligatorio"), 
    body("amount")
        .notEmpty().withMessage("El Monto es obligatorio")
        .isFloat({ min: 0.01 }).withMessage("El Monto debe ser un número mayor a 0"), 
    body("vehicle").notEmpty().withMessage("El Vehiculo es obligatorio"), 
    body("paid").notEmpty().withMessage("Es obligatorio indicar si el pago fue realizado"), 
    handleInputErrors,
    validateUserExist,
    validateJobExist,
    updateJobAmountOrClient
)

router.get("/jobCollection/:jobId/:userId",
    param("jobId").isMongoId().withMessage("El Id del lavado al que intentas asignar no es valido"),
    param("userId").isMongoId().withMessage("El ID del usuario es obligatorio"), 
    handleInputErrors,
    validateUserExist,
    validateJobExist,
    validateJobCollectionExist,
    jobCollectionData
)

export default router