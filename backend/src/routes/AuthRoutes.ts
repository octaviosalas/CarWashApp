import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist, validateUserNotExist, validateEmailExist } from "../middlewares/AuthValidations"
import { createNewAcount, updateUserData, deleteUserAccount, confirmAccountWithToken, login } from "../controllers/AuthControllers"

const router = Router()

router.post("/register",
        body("email").isEmail().withMessage("El email debe ser un email valido"),
        body("name").notEmpty().withMessage("El nombre de usuario es obligatorio"),
        body("password").notEmpty().withMessage("La contraseña de tu futura cuenta es obligatoria"),
        body("password_confirmation").notEmpty().withMessage("La confirmacion de contraseña de tu futura cuenta es obligatoria"),
        body("password").isLength({min: 6}).withMessage("La contraseña debe tener mas de 6 caracteres"),
        body("password_confirmation").custom((value, {req}) => { 
            if(value !== req.body.password) {
                throw new Error("Los password no son iguales")
            }
            return true
        }),
        handleInputErrors,
        createNewAcount
)

router.post("/confirmAccount",
    body("token").notEmpty().withMessage("El token no puede ir vacio"),
    handleInputErrors,
    confirmAccountWithToken
)

router.post("/login",
        body("email").notEmpty().withMessage("El nombre es obligatorio"),
        body("password").notEmpty().withMessage("La contraseña es obligatoria"),
        handleInputErrors,
        validateEmailExist,
        login
)

router.get("/:userId",
        param("userId").isMongoId().withMessage("El id no es valido"),
        handleInputErrors,
        validateUserExist,
)

router.put("/updateData/:userId",   
        validateUserExist,
        updateUserData
)

router.delete("/deleteAccount/:userId",
       validateUserExist,
       deleteUserAccount
)



export default router