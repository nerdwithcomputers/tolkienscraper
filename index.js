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
}

app.get('/', (req, res)=>{
    const headers = req.headers;
    console.log(headers.url);
    scrape(headers.url)    
});

app.listen(port, ()=>{
    console.log('SOMEONE AT THE DOOR')
});