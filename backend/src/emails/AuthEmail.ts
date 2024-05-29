import { transporter } from "../config/nodemailer";

type Props = { 
    email: string,
    token: string,
    name: string
}

export const sendEmailConfirmationWithToken = async ({email, token, name}: Props) => { 

    console.log("Soy la funcion que envia el correo, me llego:", email, token, name)

    await transporter.sendMail({ 
        from:"ExampleEmail <TypeScriptApiRest@gmail.com>",
        to: email,
        subject: "Validate Your Account",
        text: "Validate your account and start to use the app",
        html: `<p>Hola ${name}, has creado tu cuenta exitosamente, solo queda confirmarla</p>
                 <p>Visita el siguiente enlace: </p>
                 <a href="">Confirmar Cuenta </a>
                 <p>Ingresa el codigo: <b>${token}</b></p>
               `
    })
}