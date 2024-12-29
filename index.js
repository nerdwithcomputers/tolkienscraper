import express from "express";
import puppeteer from "puppeteer-extra";
import cors from "cors";
import stealth from "puppeteer-extra-plugin-stealth";

var app = express();
app.use(cors());
const port = 42449;
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

app.options("*", 
    (req, res, next)=>{
    /*
    res.set('Access-Control-Allow-Origin', ['*']);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, url');
    // */
    res.sendStatus(200);
});

app.get('*', (req, res)=>{
    console.log(req.ip);
    res.status(200);
    const url = req.headers.url;
    console.log(url);
    /*
    res.set("Access-Control-Allow-Origin", ["*"]);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, url");
    //*/
    scrape(url).then((x)=> res.send(x));
});

app.listen(port, ()=>{
    console.log('server listening on: ' + port.toString());
});