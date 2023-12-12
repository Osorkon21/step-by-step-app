const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [{"role": "system", "content": "You are a helpful assistant that provides a list of up to 10 steps to fulfill an inputted goal, which designed to ouput JSON. Sample response,  id:, title: (User's goal), steps: ."},
        {"role": "user", "content": "Bake Brownies."},
    ],
    temperature: 0.5,
    // max_tokens: 200,
    top_p: 1,
  });

  console.log(completion.choices[0]);
}
main();


// import OpenAI from "openai";

// const openai = new OpenAI();

// const response = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   messages: [
//     {
//       "role": "system",
//       "content": "You will be provided with a block of text, and your task is to extract a list of keywords from it."
//     },
//     {
//       "role": "user",
//       "content": "Black-on-black ware is a 20th- and 21st-century pottery tradition developed by the Puebloan Native American ceramic artists in Northern New Mexico. Traditional reduction-fired blackware has been made for centuries by pueblo artists. Black-on-black ware of the past century is produced with a smooth surface, with the designs applied through selective burnishing or the application of refractory slip. Another style involves carving or incising designs and selectively polishing the raised areas. For generations several families from Kha'po Owingeh and P'ohwhóge Owingeh pueblos have been making black-on-black ware with the techniques passed down from matriarch potters. Artists from other pueblos have also produced black-on-black ware. Several contemporary artists have created works honoring the pottery of their ancestors."
//     }
//   ],
//   temperature: 0.5,
//   max_tokens: 64,
//   top_p: 1,
// });