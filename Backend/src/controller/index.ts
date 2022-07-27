import { bookRouter } from "../routes/bookRouter";
import { userRouter } from "../routes/userRouter";
import { app } from "./app";


app.use('/user', userRouter)
app.use('/book', bookRouter)