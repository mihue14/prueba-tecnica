import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();

app.use(cors());
app.use(morgan("dev"));

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
