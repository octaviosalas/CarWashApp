import nodemailer from "nodemailer"

type Props = { 
    email: string,
    token: string,
    name: string
}

export const sendEmailConfirmationWithToken = async ({email, token, name}: Props) => { 

    console.log("Soy la funcion que envia el correo, me llego:", email, token, name)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'obitsoftware@gmail.com', 
          pass: 'jghl xhdk bqju xtpj' 
        },
        tls: {
          rejectUnauthorized: false
        }
       });
         
       const mailOptions = {
        from: 'obitsoftware@gmail.com', 
        to:  email, 
        subject: "Verificación de cuenta", 
        text:  `Hola ${name}, estas a punto de confirmar tu cuenta, solo queda confirmarla. Tu Token de confirmacion es ${token} y expirara en 15 minutos.`
      };
    
      await transporter.sendMail(mailOptions);
}