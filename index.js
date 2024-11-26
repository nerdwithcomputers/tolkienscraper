import express from "express";
import puppeteer from "puppeteer-extra";
import cors from "cors";
import stealth from "puppeteer-extra-plugin-stealth";

var app = express();
app.use(cors());
const port = 3000;
// sneaky boi
puppeteer.use(stealth());

async function scrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.content();
    // await page.screenshot({ path: 'screenshot.png' });
    // console.log(data);
    await browser.close();
    return data;
}

app.get('/', (req, res)=>{
    console.log(req.ip);
    const url = req.headers.url;
    console.log(url);
    scrape(url).then((x)=> res.send(x));
});

app.listen(port, ()=>{
    console.log('server listening on: ' + port.toString());
});