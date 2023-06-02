

const dotenv = require('dotenv');
dotenv.config()

const API_KEY = process.env.API_KEY ;

async function fetchData(){
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: "Hello!, tell about yourself"
            }]        
        })
    })

    const data = await response.json();
    console.log(data.choices);
}


fetchData() 