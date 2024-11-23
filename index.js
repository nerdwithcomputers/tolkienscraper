import express from "express";
import axios from "axios";


const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    const headers = req.headers;
    console.log(headers.url);
    axios.get(headers.url)
        .then(
            (x)=>console.log(x)
        );
});

app.listen(port, ()=>{
    console.log('SOMEONE AT THE DOOR')
});