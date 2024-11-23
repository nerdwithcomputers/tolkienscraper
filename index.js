import express from "express";
import puppeteer from "puppeteer";

const app = express();
const port = 3000;

async function scrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.content();
    console.log(data);
    await browser.close();
    return data;
}

app.get('/', (req, res)=>{
    const url = req.headers.url;
    var text;
    console.log(url);
    scrape(url).then((x)=> res.send(x));
});

app.listen(port, ()=>{
    console.log('server listening on: ' + port.toString());
});