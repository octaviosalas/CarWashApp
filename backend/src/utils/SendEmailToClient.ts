import {  NewEmailType } from "../models/Emails";
import EmailModel from "../models/Emails";
import nodemailer from "nodemailer"

type EmailProps = { 
   data: NewEmailType
}

type VerifyAccountType = { 
  email: string,
  token: string,
  name: string
}

export const sendEmailToClient = async ({data}: EmailProps) => { 

        const newEmailToBeSaved = new EmailModel({
            sender: data.sender,
            title: data.title,
            message: data.message,
            addressee: data.addressee,
            date: data.date,
            jobReference: data.jobReference
            });
        
        const savedEmail = await newEmailToBeSaved.save();

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
          from: 'salasoctavio129@gmail.com', 
          to:  data.addressee.toString(), 
          subject: data.title, 
          text:  data.message 
        };
    
        await transporter.sendMail(mailOptions);
        return savedEmail
};




export const sendEmailToVerifyUserAccount = async ({email, token, name}: VerifyAccountType) => { 

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
    from: 'salasoctavio129@gmail.com', 
    to:  email, 
    subject: "Verificación de cuenta", 
    text:  `Hola ${name}, has creado tu cuenta exitosamente, solo queda confirmarla. Tu Token de confirmacion es ${token} y expirara en 15 minutos.`
  };

  await transporter.sendMail(mailOptions);
};

export const sendEmailToRecoverUserAccount = async ({email, token, name}: VerifyAccountType) => { 

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
    from: 'salasoctavio129@gmail.com', 
    to:  email, 
    subject: "Verificación de cuenta", 
    text:  `Hola ${name}, has modificado exitosamente la contraseña de tu cuenta, solo queda confirmar que has sido vos. Tu Token de confirmacion es ${token} y expirara en 15 minutos.`
  };

  await transporter.sendMail(mailOptions);
};



