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
    // const articles = await getNews("AI", NEWSAPI_KEY);
    // const slicedFive = articles.filter((article) => !!article.urlToImage).slice(0, 5);
    // const mapped = slicedFive.map(article => {
    //     return {
    //         createdAt: new Date(),
    //         datePublished: article.publishedAt,
    //         picture: article.urlToImage,
    //         publisher: article.author,
    //         summary: article.description,
    //         tag: "AI",
    //         title: article.title,
    //         keyPoints: [],
    //         url: article.url
    //     };
    // });
    // fs.writeFileSync("./db/data.json", JSON.stringify(mapped));

    // const readFile = fs.readFileSync("./db/data.json");
    // const articles = JSON.parse(readFile);
    // console.log(articles[0]);
    // const {data} = await axios.post(PERPLEXITY_URL, {
    //     model: "sonar",
    //     messages: [{
    //         role: "system",
    //         content: "You give 3 key points on the link of the article given"
    //     }, {
    //         role: "user",
    //         content: `Give me three keypoints on this article: ${articles[0].url}`
    //     }
    // ]
    // }, {
    //     headers: PERPLEXITY_HEADER
    // });

    // console.log(data.choices[0]);

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

        // const { data: content } = await axios.get("https://www.theverge.com/news/615048/microsoft-xbox-generative-ai-model-gaming-muse");
        // const $ = cheerio.load(response.data);
        // const text = $('main').text().replace(/\s+/g, ' ').trim();
        // console.log(text);
    }
    catch(e){
        console.log(e);
    }

})();

async function getNews(query, apiKey) {
    const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${query}&sortBy=relevancy&apiKey=${apiKey}`);
    return data.articles;
}