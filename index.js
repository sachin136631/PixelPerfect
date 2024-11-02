import express from 'express';

const app = express();
const port = 3000;


let clicksA = 0;
let clicksB = 0;
const clickLogsA = [];
const clickLogsB = [];


app.get('/tracking', (req, res) => {
    const version = req.query.version; 
    const timestamp = new Date(); 
    const localTimestamp = timestamp.toLocaleString(); 

    if (req.query.action === 'click') {
        if (version === 'A') {
            clicksA++;
            clickLogsA.push({ timestamp: localTimestamp, clicks: clicksA });
            console.log(`Button clicked: ${version}, Total Clicks A: ${clicksA}, Total Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
        } else if (version === 'B') {
            clicksB++;
            clickLogsB.push({ timestamp: localTimestamp, clicks: clicksB });
            console.log(`Button clicked: ${version}, Total Clicks A: ${clicksA}, Total Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
        }


    }


    res.setHeader('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAAAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64'));
});

app.get("/", (req, res) => {
    const version = Math.random() < 0.5 ? "index1" : "index2";
    res.render(`${version}.ejs`);
});

app.listen(port, () => {
    console.log(`The server is running live on ${port}`);
});
