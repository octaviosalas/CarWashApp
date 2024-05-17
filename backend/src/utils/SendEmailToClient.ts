import { EmailType, NewEmailType } from "../models/Emails";
import EmailModel from "../models/Emails";
import nodemailer from "nodemailer"

type EmailProps = { 
   data: NewEmailType
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


