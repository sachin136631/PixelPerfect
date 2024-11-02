import express from 'express';

const app = express();
const port = 3000;

let clicksA = 0;
let clicksB = 0;
let clicksgotoA = 0;
let clicksgotoB = 0;
const clickLogsA = [];
const clickLogsB = [];

app.use(express.static("public"));

app.get('/tracking', (req, res) => {
    const version = req.query.version; 
    const id = req.query.id; 
    const timestamp = new Date(); 
    const localTimestamp = timestamp.toLocaleString(); 

    if (req.query.action === 'click') {

        if (id === '001') {
            if (version === 'A') {
                clicksgotoA++;
                clickLogsA.push({ timestamp: localTimestamp, gotoA: clicksgotoA });
                console.log(`Goto action A clicked: Goto action A: ${clicksgotoA}, Goto action B: ${clicksgotoB}, Clicks A: ${clicksA}, Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
            } else if (version === 'B') {
                clicksgotoB++;
                clickLogsB.push({ timestamp: localTimestamp, gotoB: clicksgotoB });
                console.log(`Goto action B clicked: Goto action A: ${clicksgotoA}, Goto action B: ${clicksgotoB}, Clicks A: ${clicksA}, Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
            }
        } else {

            if (version === 'A') {
                clicksA++;
                clickLogsA.push({ timestamp: localTimestamp, clicksofA: clicksA });
                console.log(`Button clicked: ${version}, Clicks A: ${clicksA}, Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
            } else if (version === 'B') {
                clicksB++;
                clickLogsB.push({ timestamp: localTimestamp, clicksofB: clicksB });
                console.log(`Button clicked: ${version}, Clicks A: ${clicksA}, Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
            }
        }
    }

    res.setHeader('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAAAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64'));
});

app.get("/", (req, res) => {
    const version = Math.random() < 0.5 ? "index11" : "index22";
    res.render(`${version}.ejs`);
});

app.listen(port, () => {
    console.log(`The server is running live on ${port}`);
});
