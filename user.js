import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /.+\@.+\..+/
        // '/'= inicio; '/'= fim
        // '.'= qualquer coisa
        // '+'= varias ocorrencias
        // '.+' varias ocorrencias de qualquer coisa
        // '\@'= escape arromba, ou seja, @ obrigatorio
        // '\.'= escape ponto, ou seja, . obrigatorio
    },
    senha: {
        type: String,
        require: true,
        minlenght: 8,
        maxlenght: 18,
        trim: true,
        match: /^[a-zA-Z0-9!@#_]{8,18}$/
        // '/^'= inicio; '$/'=fim
        // 'a-z'= intervalo
        // '{8,18}'= mix e max
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("user", userSchema)