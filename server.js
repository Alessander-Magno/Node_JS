import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import user from "./user.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORTA = 8550;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", async (req, res) => {
    const { email, senha} = req.body;

    try {
        const userExist = await user.findOne({ email, senha});

        if (userExist) {
            res.send("Usuário logado!");
        } else {
            res.send("Email ou senha incorretos!");
        }
    } catch (error) {
        console.error(error);
    }
})

app.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});

app.post("/cadastro", async (req, res) => {
    console.log("Informações recebidas: ", req.body);
    try {
        const novoUsario = await user.create(req.body);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        rmSync.status(500).send("Erro ao salvar as informações de usuário");
    }
});

app.listen(PORTA, () => {
    console.log(`O servidor está rodando na porta ${PORTA}`);
});