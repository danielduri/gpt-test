import express from "express";
import {inspect} from "util";
import {Configuration, OpenAIApi} from "openai";

const app = express()

app.get("/", async (req, res) => {
    console.log("Starting")
    const message = await func();
    res.send(message)
})
const func = async () => {
    const configuration = new Configuration({
        apiKey: "YOUR_API_KEY",
    });

    const openai = new OpenAIApi(configuration);

    const GPT35TurboMessage = [
        { role: "system", content: `Eres un modelo de IA tratando de ayudar a un profesor universitario a escribir una guía docente.` },
        {
            role: "user",
            content: "Escribe sólo el campo Bibliografía de una guía docente para la asignatura Dirección Estratégica (Facultad de Ciencias Económicas y Empresariales), en formato Array[str] crudo",
        }
    ];

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: GPT35TurboMessage,
    }).catch((err) => {
        console.log(err);
    })

    console.log("Cost: " + response.data.usage.total_tokens + " tokens, " + response.data.usage.total_tokens*0.002/1000 + " $");
    return response.data.choices[0].message.content;

}

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})