import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDataBase from "./config/database"
import authRoutes from "./routes/AuthRoutes"
import clientsRoutes from "./routes/ClientsRoutes"
import usersRoutes from "./routes/UserRoutes"
import jobsRoutes  from "./routes/JobsRoutes"
import vehiclesRoutes from "./routes/VehiclesRoutes"


const port = process.env.PORT || 4000

dotenv.config()
const app = express()  
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes)
app.use("/api/clients", clientsRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/jobs", jobsRoutes)
app.use("/api/vehicles", vehiclesRoutes)

app.listen(port, () => { 
    console.log(`REST API LavaderosApp - Practica con TypeScript funcionando en el puerto ${port}`)
    connectDataBase()
})

function obtenerFechaExacta() {
    const ahora = new Date();
    let offsetUTC = -3; 
    const offsetVerano = -2; 

    let mes = ahora.getMonth() + 1; 
    let dia = ahora.getDate();
    let ano = ahora.getFullYear();

    if ((mes > 2 && mes < 10) || (mes == 2 && dia >= 21)) {
        offsetUTC = offsetVerano;
    }

    const fechaArgentina = new Date(ano, mes - 1, dia, offsetUTC);

    return fechaArgentina;
}

console.log(obtenerFechaExacta());

function obtenerHoraExacta() {
    const ahora = new Date();
    let offsetUTC = -3; 
    const offsetVerano = -2; 

    let hora = ahora.getHours();
    let minuto = ahora.getMinutes();
    let segundo = ahora.getSeconds();

    if ((hora >= 0 && hora <= 11) || (hora >= 20 && hora <= 23)) {
        offsetUTC = offsetVerano;
    }

    const horaArgentina = new Date(0, 0, 0, hora + offsetUTC, minuto, segundo);

    return horaArgentina;
}

console.log(obtenerHoraExacta());




export default app