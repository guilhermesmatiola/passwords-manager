import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/validators/errorHandler.js";
import router from "./routes/indexRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log("subiu na porta " + process.env.PORT);
});