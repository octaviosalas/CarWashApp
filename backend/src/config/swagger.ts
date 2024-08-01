import swaggerJSDoc from "swagger-jsdoc"

const options : swaggerJSDoc.Options = { 
    swaggerDefinition: { 
        openapi: "3.0.2",
        tags: [
            {
                name: "Users",
                description: "Api operations releated to User",
                
            },
            {
                name: "Clients",
                description: "Api operations releated to Clients",
                
            }
        ],
        info: { 
            title: "Api Rest Node + Express + TypeScript - Car Wash Application",
            version: "2.0",
            description: "Api docs"
        }
    },
    apis: ["./src/routes/UserRoutes.ts", "./src/routes/ClientsRoutes.ts"]
}

const swaggerSpect = swaggerJSDoc(options)

export default swaggerSpect