const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    const allowedOrigins = ['*'];
    const origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

async function htmltopdf(html, landscape=false) {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4', landscape: JSON.parse(landscape)});
    await browser.close();

    return pdf;
}

app.post('/api/v1/htmltopdf', (req, res) => {
    if (!req.body.html) {
        return res.status(400).send({
            success: 'false',
            message: 'html is required'
        });
    }

    htmltopdf(req.body.html, req.body.landscape).then((data) => {

        return res.status(201).send({
            success: 'true',
            message: 'PDF Ok',
            data: data.toString('base64')
        })
    });

    process.on('unhandledRejection', (err) => {
        console.error(err);
        process.exit(1);
    })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});


