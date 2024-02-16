
This is where I left off:
https://remix.run/docs/en/main/start/tutorial#mutation-discussion

# Expo + Remix

This project contains a mobile directory and a web directory.
In the mobile directroy we'll use Expo to render a webview of our Remix webapp.
This allows us to create a mobile app using web technology.

# Start the projects

Mobile on Expo: `npx expo start`
Web on Remix: `npm run dev`

During development we'll use ngrok to get around CORS issues.
Install ngrok globally: npm install -g ngrok

1. Start your local web project on port 3000.
2. Start ngrok and create a tunnel to your local server: ngrok http 3000
3. Replace the uri in the WebView component with the ngrok url.