import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(router);

app.get("/api", (req, res) => {
  res.send({
    message: "API is running",
    version: 0.01,
  });
});

const port = Number(process.env.PORT) || 3333;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
