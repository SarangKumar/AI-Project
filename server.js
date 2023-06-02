const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const PORT = 8000

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hey from backend')
})

app.post('/completions', async (req, res) => {
    const API_KEY = process.env.API_KEY
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-0301",
            messages: [{
                role: "user",
                content: req.body.message
            }],
            "max_tokens": 1000,
        })
    }


    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})