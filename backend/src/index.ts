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
import servicesRoutes from "./routes/ServicesRoutes"
import collectionRoutes from "./routes/CollectionRoutes"
import estadisticsRoutes from "./routes/EstadisticsRoutes"
import {MercadoPagoConfig, Preference} from "mercadopago"
import { Response, Request } from "express"

type firstBody = { 
    id: string;
    title: string,
    quantity: number,
    unit_price: number,
    currency_id: string
}

type urlsType = { 
    success: string,
    failure: string,
    pending: string,
}

interface CreateReferenceRequestBody {
    items: firstBody[];
    back_urls: urlsType;
    auto_return: string,
    notification_url: string,
    payer: {
        email: string
    }
   
} 


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
app.use("/api/services", servicesRoutes)
app.use("/api/collections", collectionRoutes)
app.use("/api/estadistics", estadisticsRoutes)


const client = new MercadoPagoConfig({ 
    accessToken: "TEST-6414893546863000-061015-e94c07200e7d2e6e501d4d2b25bb4796-548557600"
})

app.post("/create_preference/:jobId/:userId", async (req: Request, res: Response) => {

    let itemIdCounter = 1;

    const {jobId, userId} = req.params

    try {
        const body: CreateReferenceRequestBody = {
            items: [
                {
                    id: String(itemIdCounter++), 
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price), 
                    currency_id: "ARS"
                }
            ],
            payer: {
                email: 'test_user_email@testuser.com'  // Usa el email del comprador de prueba generado
            },
            back_urls: {
                success: "http://127.0.0.1:5173/",
                failure: "http://127.0.0.1:5173/",
                pending: "http://127.0.0.1:5173/",
            },
            auto_return: "approved",
            notification_url: `http://localhost:4000/api/jobs/markAsPaid/${jobId}/${userId}`
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id: result.init_point,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
});



app.listen(port, () => { 
    console.log(`REST API LavaderosApp - Practica con TypeScript funcionando en el puerto ${port}`)
    connectDataBase()
})


export default app