import express, {Request, Response, NextFunction} from 'express'; // <---- typescript uses same import as react
import {json} from 'body-parser';
// install dependencies npm i --save-dev @types/node
// 						npm i --save-dev @types/express < ---- for better support of typescript scripts
import todoRoutes from './routes/todos';
const app = express(); // now our app is a type of Express

app.use(json());
app.use('/todos', todoRoutes);

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
	res.status(500).json({message:err.message})
})

app.listen(3000);