# PixelPerfect

## Description
This full-stack web application provides an intuitive UI testing platform designed to optimize user interface (UI) components through real-time data collection and analysis. By integrating lightweight tracking pixels, the app records user interactions on different UI versions, calculating metrics such as click rates and timestamps. Using WebSockets, the app ensures live data updates, offering a seamless experience for tracking user behavior. A privacy-centric approach ensures user data is secure and not shared with third parties, distinguishing this app from other complex and costly analytics tools.

## Key Features
- **No-Code A/B Testing:** Easily set up and manage tests without requiring technical expertise.
- **Live Data Updates:** Live updation of button/link clicks , call to action , colour contrast ratio ans its visualisation  .
- **Privacy-Centric:** Focuses on user data privacy, collecting minimal information and not sharing with third parties.
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
1. **UI Versions:** The app serves two different UI components (Version A and Version B) to users.
2. **User Interaction:** When a user interacts with a UI element, the click data, including the timestamp and version, is recorded using tracking pixels.
3. **Data Collection & Real-Time Updates:** The app uses WebSockets to send real-time data updates to the server, which logs and processes the interactions.
4. **Data Analysis:** Click rate and performance metrics are visualized with Chart.js, offering a clear and interactive representation of results.
5. **AI-Powered Insights:** The Gemini AI integration provides analysis and suggestions for UI optimization based on collected data.
6. **Firebase Storage:** Data is securely stored in Firebase for efficient retrieval and scalability.

## Future Scope
1. **Enhanced Analytics Dashboard:**  More comprehensive data visualization and performance analysis..
2. **Deeper AI Integration:** Deeper AI Integration.
3. **Websocket integration:** Websocket integration for real time updation of data.
4. **Multiple versions of sites:** More than two templates of sites can be compared to get comprehensive data.

   


