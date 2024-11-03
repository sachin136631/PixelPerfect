# PixelPerfect

## Description
This full-stack web application provides an intuitive UI testing platform designed to optimize user interface (UI) components through real-time data collection and analysis. By integrating lightweight tracking pixels, the app records user interactions on different UI versions, calculating metrics such as click rates and timestamps. Using WebSockets, the app ensures live data updates, offering a seamless experience for tracking user behavior. A privacy-centric approach ensures user data is secure and not shared with third parties, distinguishing this app from other complex and costly analytics tools.

## Key Features
- **No-Code A/B Testing:** Easily set up and manage tests without requiring technical expertise.
- **Live Data Updates:** Live updation of button/link clicks , call to action , colour contrast ratio ans its visualisation  .
- **Privacy-Centric:** Focuses on user data privacy, collecting minimal information and not sharing with third parties.
- **Gen AI-integration:** AI powered UI optimization suggestion based on collected data. 
- **Lightweight & Seamless:** Optimized performance, ensuring the app does not impact site speed.
- **Detailed Analytics:** Visual representation of data using Chart.js for easy analysis and insights.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **Tracking pixels:** Pixels of size 1px , 1px are embedded to track the user interaction
- **Data Visualization:** Chart.js
- **Backend:** Node , Express, Axios
- **Database:** Firebase
- **AI Integration:** Gemini for generating insights and improvement suggestions

## Working
1. **UI Versions:** The app serves two different UI components (Version A and Version B) to users with equal likelyhood.
2. **User Interaction:** When a user interacts with a UI element, the click data, including the timestamp and version, is recorded using tracking pixels.
3. **Data Analysis:** Click rate and performance metrics are visualized with Chart.js, offering a clear and interactive representation of results.
4. **AI-Powered Insights:** The Gemini AI integration provides analysis and suggestions for UI optimization based on collected data.
5. **Firebase Storage:** Data is securely stored in Firebase for efficient retrieval and scalability.

## Video Demo and Explanation
Demo Video Link :https://drive.google.com/drive/folders/1uq6n8hyEUud0HxqmTl4jNnrGkh6_l2EC

The web-App serves two different versions of the same website on different users with equal likelyhood at localhost:3000. 
The mouse movements,button clicks and user behaviour is tracked and stored to the firebase database.
At the localhost:3000/dashboard, the data from the database is converted into visual representation through chart.js.
Mouse movement coordinates are stored in heatmap.json and is later used to generate heatmap image which is displayed in the dashboard.
To aid with readability and keep website disability friendly the color contrast between foreground and background is checked and the data is made available in the dashboard.
Gemini API is used to generate criticism on how to improve the overall structure of the website.


## Future Scope
1. **Deeper AI Integration:** Deeper AI Integration.
2. **Websocket integration:** Websocket integration for real time updation of data.
3. **Multiple versions of sites:** More than two templates of sites can be compared to get comprehensive data.

   


