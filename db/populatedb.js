import * as dotenv from "dotenv";
import * as fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";

const result = dotenv.config();

if (result.error) {
    console.log(result.error.message);
}

const NEWSAPI_KEY = process.env.NEWSAPI_KEY;
const OPENAI_KEY = process.env.OPENAI_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_KEY
});

(async () => {

    try{
        const articles = await getNews("AI", NEWSAPI_KEY);
        const slicedFive = articles.filter((article) => !!article.urlToImage).slice(0, 5);

        const getArray = slicedFive.map(async (article) => {
            const {data: markup} = await axios.get(article.url);
            const $ = cheerio.load(markup);
            const text = $('main').text().replace(/\s+/g, ' ').trim();
            const openAIResponse = await openai.chat.completions.create({
                model: "gpt-4o-mini-2024-07-18",
                messages: [
                    {role: "system", content: "You are a very helpful assistant."},
                    {role: "user", content: ` Content: ${text} Task: Generate 3 key points using the content.`}
                ],
                response_format: {
                    type: "json_schema",
                    json_schema: {
                        name: "key_points_schema",
                        schema: {
                            type: "object",
                            properties: {
                                keyPoints: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                }
                            },
                            required: ["keyPoints"],
                            additionalProperties: false
                        },
                        strict: true
                    }
                }
            });

            const openaires = JSON.parse(openAIResponse.choices[0].message.content);
            console.log(openaires);

            return {
                datePublished: article.publishedAt,
                picture: article.urlToImage,
                publisher: article.author,
                summary: article.description,
                tag: "AI",
                title: article.title,
                keyPoints: [],
                url: article.url,
                createdAt: new Date(),
                keyPoints: openaires.keyPoints
            };
        });

        const result = await Promise.allSettled(getArray);

        const toDbformat = result.map(result => result.value);

        fs.writeFileSync("./db/data.json", JSON.stringify(toDbformat));
    }
    catch(e){
        console.log(e);
    }

})();

async function getNews(query, apiKey) {
    const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${query}&sortBy=relevancy&apiKey=${apiKey}`);
    return data.articles;
}