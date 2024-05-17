import mongoose from "mongoose";
import dotenv from "dotenv";
import {exit} from "node:process"
dotenv.config();

mongoose.set('strictQuery', false);

const connectDataBase = () => {

    mongoose.connect(process.env.MONGODB_URL)
      .then(() => { 
        console.log("Conexion exitosa a la DB de la RestApi para LAVADEROSAPP con Node + Express + TypeScript 😉");
      })
      .catch(err => {
        console.log("Erroren la conexion a la RestApi con Node + Express + TypeScript  👎");
        console.log(err); 
        exit(1)
      });
  }
export default connectDataBase;