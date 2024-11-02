import express from 'express';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';

import serviceAccount from './secrets.json' assert { type: 'json' };



initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const app = express();
const port = 3000;

let clicksA = 0;
let clicksB = 0;
let clicksgotoA = 0;
let clicksgotoB = 0;
const clickLogsA = [];
const clickLogsB = [];
let dataClickA;
let dataClickB;
let dataActionA;
let dataActionB;

const versionA = db.collection('usageData').doc('versionA');
const versionB = db.collection('usageData').doc('versionB');

const readData = async () => {
    try{
      const versionAData = await versionA.get();
      const versionBData = await versionB.get();
        
      return {
        dataClickA : versionAData.data().click,
        dataClickB : versionBData.data().click,
        dataActionA : versionAData.data().action,
        dataActionB : versionBData.data().action,
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

app.use(express.static('public'));


app.get('/tracking', async (req, res) => {
    const version = req.query.version; 
    const id = req.query.id; 
    const timestamp = new Date(); 
    const localTimestamp = timestamp.toLocaleString(); 

    

    if (req.query.action === 'click') {

        if (id === '001') {
            if (version === 'A') {
                clicksgotoA++;
                try {
                    await versionA.update({
                        action: FieldValue.increment(1),
                    });
                    console.log(`Goto action A clicked, Firestore updated.`);
                } catch (error) {
                    console.error("Error updating Firestore for Goto action A:", error);
                }
                // clickLogsA.push({ timestamp: localTimestamp, gotoA: clicksgotoA });
                // console.log(`Goto action A clicked: Goto action A: ${clicksgotoA}, Goto action B: ${clicksgotoB}, Clicks A: ${clicksA}, Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
            } else if (version === 'B') {
                clicksgotoB++;
                try {
                    await versionB.update({
                        action: FieldValue.increment(1),
                    });
                    console.log(`Goto action A clicked, Firestore updated.`);
                } catch (error) {
                    console.error("Error updating Firestore for Goto action A:", error);
                }
                // clickLogsB.push({ timestamp: localTimestamp, gotoB: clicksgotoB });
                // console.log(`Goto action B clicked: Goto action A: ${clicksgotoA}, Goto action B: ${clicksgotoB}, Clicks A: ${clicksA}, Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
            }
        } else {

            if (version === 'A') {
                clicksA++;
                try {
                    await versionA.update({
                        click: FieldValue.increment(1),
                    });
                    console.log(`Goto action A clicked, Firestore updated.`);
                } catch (error) {
                    console.error("Error updating Firestore for Goto action A:", error);
                }
                // clickLogsA.push({ timestamp: localTimestamp, clicksofA: clicksA });
                // console.log(`Button clicked: ${version}, Clicks A: ${clicksA}, Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
            } else if (version === 'B') {
                clicksB++;
                try {
                    await versionB.update({
                        click: FieldValue.increment(1),
                    });
                    console.log(`Goto action A clicked, Firestore updated.`);
                } catch (error) {
                    console.error("Error updating Firestore for Goto action A:", error);
                }
                // clickLogsB.push({ timestamp: localTimestamp, clicksofB: clicksB });
                // console.log(`Button clicked: ${version}, Clicks A: ${clicksA}, Clicks B: ${clicksB}, Timestamp: ${localTimestamp}`);
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

app.get("/dashboard", async (req, res) => {
    const data = await readData();
    console.log("data from server: ");
    console.log(data);
    res.render('dashboard.ejs', {
        dataFromServer : data,
    });
});

app.listen(port, () => {
    console.log(`The server is running live on ${port}`);
});
