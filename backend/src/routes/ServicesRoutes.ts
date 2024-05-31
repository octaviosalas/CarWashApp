import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist } from "../middlewares/AuthValidations"
import { validateServiceNotExist, validateServiceExist, validateServicePrice } from "../middlewares/ServicesValidation"
import { getServices, createService, deleteService, updateService, getServicesDataEstadistic } from "../controllers/ServicesControllers"

const router = Router()

router.post("/createService/:userId",
        body("service").notEmpty().withMessage("El nombre del servicio es obligatorio"),
        body("price").notEmpty().withMessage("El precio del servicio es obligatorio"),
        param("userId").isMongoId().withMessage("El id no es valido"),
        handleInputErrors,
        validateUserExist,
        validateServiceNotExist,
        validateServicePrice,
        createService
)

router.get("/myServices/:userId",
        param("userId").isMongoId().withMessage("El id del usuario no es valido"),
        handleInputErrors,
        validateUserExist,
        getServices
)


router.put("/updateServicePrice/:userId/:serviceId", 
        param("userId").isMongoId().withMessage("El id del usuario no es valido"),
        param("serviceId").isMongoId().withMessage("El id del servicio no es valido"),
        body("name").notEmpty().withMessage("El nombre del servicio es obligatorio").isLength({min: 1}).withMessage("El nombre del servicio debe tener al menos 1 carácter"), // Añadir validación de longitud para name
          body("price").notEmpty().withMessage("El precio del servicio es obligatorio").isLength({min: 1}).withMessage("El precio del servicio debe tener al menos 1 carácter"),
        handleInputErrors,
        validateUserExist,
        validateServiceExist,
        updateService
)

router.delete("/deleteService/:userId/:serviceId",
        param("userId").isMongoId().withMessage("El id del usuario no es valido"),
        param("serviceId").isMongoId().withMessage("El id del servicio no es valido"),
        handleInputErrors,
        validateUserExist,
        validateServiceExist,
        deleteService
)

router.get("/servicesDataEstadistic/:userId/:serviceId",
        param("userId").isMongoId().withMessage("El id del usuario no es valido"),
        param("serviceId").isMongoId().withMessage("El id del servicio no es valido"),
        handleInputErrors,
        validateUserExist,
        validateServiceExist,
        getServicesDataEstadistic
)



export default router