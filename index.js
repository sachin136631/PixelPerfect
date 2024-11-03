import express from 'express';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import serviceAccount from './secrets.json' assert { type: 'json' };

dotenv.config();

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Initialize Firebase Admin
initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

const app = express();
const port = 3000;

let clicksA = 0;
let clicksB = 0;
let clicksgotoA = 0;
let clicksgotoB = 0;

const versionA = db.collection('usageData').doc('versionA');
const versionB = db.collection('usageData').doc('versionB');

// Utility function to escape HTML special characters
const escapeHTML = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

const readData = async () => {
    try {
        const versionAData = await versionA.get();
        const versionBData = await versionB.get();

        // Ensure data exists before accessing properties
        if (versionAData.exists && versionBData.exists) {
            return {
                dataClickA: versionAData.data().click || 0,
                dataClickB: versionBData.data().click || 0,
                dataActionA: versionAData.data().action || 0,
                dataActionB: versionBData.data().action || 0,
            };
        } else {
            console.error("Data does not exist for one or both versions.");
            return null;
        }
    } catch (error) {
        console.error("Error reading data:", error);
        return null;
    }
};

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
            } else if (version === 'B') {
                clicksgotoB++;
                try {
                    await versionB.update({
                        action: FieldValue.increment(1),
                    });
                    console.log(`Goto action B clicked, Firestore updated.`);
                } catch (error) {
                    console.error("Error updating Firestore for Goto action B:", error);
                }
            }
        } else {
            if (version === 'A') {
                clicksA++;
                try {
                    await versionA.update({
                        click: FieldValue.increment(1),
                    });
                    console.log(`Button clicked on version A, Firestore updated.`);
                } catch (error) {
                    console.error("Error updating Firestore for version A click:", error);
                }
            } else if (version === 'B') {
                clicksB++;
                try {
                    await versionB.update({
                        click: FieldValue.increment(1),
                    });
                    console.log(`Button clicked on version B, Firestore updated.`);
                } catch (error) {
                    console.error("Error updating Firestore for version B click:", error);
                }
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
    
    const prompt = "Give some general, applicable, and useful tips for building websites. Make it professional and witty, including advice on user retention, A/B testing, readability, and more. Plain text, no formatting.";

    const result = await model.generateContent(prompt);

    res.render('dashboard.ejs', {
        dataFromServer: data,
        promptAnswer: result.response.text(),
    });
});

app.listen(port, () => {
    console.log(`The server is running live on http://localhost:${port}`);
});
