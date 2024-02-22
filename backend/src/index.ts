import cors from "cors";
import multer from "multer";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import express, { response } from "express";
import { process_doc } from "./lang_script";
import OpenAI from "openai";
import * as path from "path";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = 3000;
app.use(cors({ origin: "*" }));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, callback: multer.FileFilterCallback) {
    const fileExtension = path.extname(file.originalname);

    if (!fileExtension.includes(".pdf")) {
      callback(new Error("Only pdfs ara allowed"));
    }
    callback(null, true);
  },
});

const openai = new OpenAI({
  apiKey: "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",
});

const generatePrompt = (numberToConvert: number) => {
  return ` Tu tienes un rol de convertidor binario y requiero que conviertes este numero ${numberToConvert} a  binario`;
};

let names = [
  {
    id: uuidv4(),
    firstName: "Steven",
    lastName: "Erraez",
  },
];

app.get("/ping", (req, res) => {
  console.log("alguien ha dado pin!!");
  res.setHeader("Content-Type", "application/json");
  res.send("pong");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log(req.files);

    if (!req.file || !req.body?.question) {
      return res.status(400).send();
    }

    //@ts-ignore
    const response = await process_doc(req.file.filename, req.body.question);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});
app.get("/hola/:nombre/:apellido", (req, res) => {
  console.log("alguien ha dado pin!!");
  res.setHeader("Content-Type", "application/json");
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  console.log("alguien ha ingresado su nombre");
  res.send({ nombre, apellido });
});

app.get("/nombres", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(names);
});

app.post("/nombres", (req, res) => {
  const item = { ...req.body, id: uuidv4() };
  names.push(item);
  res.send(item);
});

app.post("/openapi", async (req, res) => {
  console.log();
  const { prompt } = req.body;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: generatePrompt(prompt) }],
  });

  // @ts-ignore
  res.send({
    // @ts-ignore
    result: completion.choices[0].message.content,
    token: completion.usage?.completion_tokens,
    // @ts-ignore
  });
});

app.delete("/nombres/:id", (req, res) => {
  names = names.filter((n) => n.id !== req.params.id);
  res.status(204).end();
});

app.get("/nombres/:id", (req, res) => {
  const searchedName = names.find((n) => n.id === req.params.id);
  if (!searchedName) res.status(400).end();
  res.send(searchedName);
});

app.put("/nombres/:id", (req, res) => {
  const index = names.findIndex((n) => n.id === req.params.id);
  if (index === -1) res.status(404).end();
  names[index] = { ...req.body, id: req.params.id };
  res.status(204).end();
});
app.listen(PORT, () => {
  console.log(`running application ${PORT}`);
});
