import {Router} from "express"
import {body, param} from "express-validator"
import { handleInputErrors } from "../middlewares/handleInputErrors"
import { validateUserExist, validateUserNotExist, validateEmailExist, validateAccountNotExist, checkIfUserPasswordIsCorrect } from "../middlewares/AuthValidations"
import { createNewAcount, deleteUserAccount, confirmAccountWithToken, login, lossMyPassword, findTokenToRecoverPassword, changePassowrd, updateUserData, updateUserPassword } from "../controllers/AuthControllers"

const router = Router()

router.post("/register",
        
        body("email").isEmail().withMessage("El email debe ser un email valido"),
        body("name").notEmpty().withMessage("El nombre de usuario es obligatorio"),
        body("password").notEmpty().withMessage("La contraseña de tu futura cuenta es obligatoria"),
        body("password_confirmation").notEmpty().withMessage("La confirmacion de contraseña de tu futura cuenta es obligatoria"),
        body("password").isLength({min: 6}).withMessage("La contraseña debe tener mas de 6 caracteres"),
        body("password_confirmation").custom((value, {req}) => { 
            if(value !== req.body.password) {
                throw new Error("Las contraseñas deben ser iguales")
            }
            return true
        }),
        handleInputErrors,
        validateAccountNotExist,
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


router.put("/updateUserData/:userId",
        param("userId").isMongoId().withMessage("El Id del usuario al que intentas asignar un cliente no es valido"),  
        body("email").notEmpty().withMessage("El Email es obligatorio"),
        body("email").isEmail().withMessage("El Email no es un email valido"),
        body("password").notEmpty().withMessage("La contraseña es obligatoria"), 
        body("password").isLength({min: 6}).withMessage("La contraseña debe tener mas de 6 caracteres"),
        handleInputErrors,
        validateUserExist,
        checkIfUserPasswordIsCorrect,
        updateUserData
)


router.delete("/deleteAccount/:userId",
       validateUserExist,
       deleteUserAccount
)


router.post("/lossMyPassword", 
        body("email").notEmpty().withMessage("El email es obligatorio"),
        body("email").isEmail().withMessage("El email debe ser un email valido"),
        handleInputErrors, 
        validateEmailExist,
        lossMyPassword
)


router.post("/tokenToRecoverAccount", 
        body("token").notEmpty().withMessage("El token es obligaotrio"),
        body("token").isLength({min: 6}).withMessage("El token es demasiado corto, recuerda que son 6 digitos"),
        handleInputErrors,
        findTokenToRecoverPassword
)

router.put("/changeUserPassword", 
        body("email").notEmpty().withMessage("El email es obligaotrio"),
        body("password").notEmpty().withMessage("La contraseña es obligatoria"),
        body("confirmedPassword").notEmpty().withMessage("La confirmacion de contraseña es obligatoria"),
        body("password").isLength({min: 6}).withMessage("La contraseña debe tener mas de 6 caracteres"),
        body("confirmedPassword").custom((value, {req}) => { 
            if(value !== req.body.password) {
                throw new Error("Las contraseñas deben ser iguales")
            }
            return true
        }),
        handleInputErrors,
        changePassowrd
)

router.put("/updatePassword/:userId", 
        body("password").notEmpty().withMessage("La contraseña es obligatoria"),
        body("newPassword").notEmpty().withMessage("La nueva contraseña es obligatoria"),
        body("confirmedPassword").notEmpty().withMessage("La confirmacion de contraseña es obligatoria"),
        body("confirmedPassword").custom((value, {req}) => { 
            if(value !== req.body.newPassword) {
                throw new Error("Las contraseñas deben ser iguales")
            }
            return true
        }),
        handleInputErrors,
        checkIfUserPasswordIsCorrect,
        updateUserPassword
)

export default router