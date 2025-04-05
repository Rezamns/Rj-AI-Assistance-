const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const response = chatCompletion.choices[0].message.content;
    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "خطا در ارتباط با OpenAI" });
  }
});

app.listen(3000, () => {
  console.log("سرور روی http://localhost:3000 فعال شد");
});
