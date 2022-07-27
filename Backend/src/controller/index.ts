import { userRouter } from "../routes/userRouter";
import { app } from "./app";


app.use('/user', userRouter)