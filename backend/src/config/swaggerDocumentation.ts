

/** 
 * @swagger
 *   components:
 *      schemas:
 *            Users:
 *               type: object
 *               properties:
 *                  id:
 *                   type: objectId
 *                   description: The user ID
 *                   example: "64c5b3f2a8d5f7e4b1234567"
 *                  email:
 *                   type: string
 *                   description: The user email
 *                   example: "salasocavio129@gmail.com"
 *                  password:
 *                   type: string
 *                   description: The user password
 *                   example: "octavio123"
 *                  name:
 *                   type: string
 *                   description: The user name
 *                   example: "Salas Octavio"
 *                  confirmed:
 *                   type: boolean
 *                   description: User is Autheticated
 *                   example: true
 *      
 *            Collections:
 *               type: object
 *               properties:
 *                  paymentMethod:
 *                   type: string
 *                   description: The method of the pay
 *                   example: "Efectivo"
 *                  date:
 *                   type: date
 *                   description: Pay Date
 *                   example: "2024-08-01T14:22:35.123Z"
 *                  amount:
 *                   type: number
 *                   description: The amount
 *                   example: "25.000"
 *                  user:
 *                   type: objectId
 *                   description: User receiver of the pay
 *                   example: "64c5b3f2a8d5f7e4b1234567"
 *                  client:
 *                   type: Client owner of the pay
 *                   description: User who pays the money
 *                   example: "64c5b3f2a8d5f7e4b1234567"    
 *                  jobReference:
 *                   type: Client owner of the pay
 *                   description: Job´s Pay
 *                   example: "64c5b3f2a8d5f7e4b1234567"    
 */


/**
* @swagger
* /api/users/myClients/:userId:
*            get:
*               summary: List of user clients
*               tags: 
*                   - Users
*               description: Return a list of user´s clients
*               responses:
*                       200:
*                           description: Succesfull Response
*                           content: 
*                               application/json:
*                                       schema:
*                                         type: array
*                                         items:
*                                           $ref: "#/components/schemas/Users"
* /api/users/myBilling/:userId:
*            get:
*               summary: List of user clients
*               tags: 
*                   - Users
*               description: Return a list of user´s clients
*               responses:
*                       200:
*                           description: Succesfull Response
*                           content: 
*                               application/json:
*                                       schema:
*                                         type: array
*                                         items:
*                                           $ref: "#/components/schemas/Collections"
* 
* 
*/