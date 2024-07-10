import {Router} from "express"
import { createMercadoPagoOrder, generateLink } from "../controllers/CollectionsControllers";

const router = Router()

router.post("/createOrder", createMercadoPagoOrder)
router.get("/mp", generateLink)


export default router;
