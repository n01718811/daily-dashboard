Daily Dashboard

The Daily Dashboard is a Next.js web application designed to give users quick access to weather updates, the latest news, and customizable preferences. It demonstrates the use of React components, API integration, state management with React Context, and dynamic routing.

Project Structure

The project is organized into several key folders and files. The components folder contains reusable UI elements, such as cards and forms, which are shared across multiple pages. The context folder contains AppContext.js, which is the core of the application’s global state management. The pages directory defines the app’s routes, with each file corresponding to a different view of the application.

The home page (/) serves as a landing page with navigation links to the main sections. The weather page (/weather) displays live weather information based on the user’s preferred location. The news page (/news) lists the latest news headlines fetched from a third-party API, and it includes a dynamic route (/news/[id]) for showing detailed information about a specific article. Finally, the settings page (/settings) allows users to configure their location and unit preferences, as well as save or reset them.

The API layer is handled with custom endpoints inside the pages/api directory. For example, the /api/now endpoint fetches weather data from the Open-Meteo API, while the /api/top endpoint retrieves news articles from a Google News RSS feed and formats them as JSON.

State Management

Global state is managed through React Context inside the AppContext.js file. This ensures that important data such as the user’s location, temperature unit (Celsius or Fahrenheit), and saved preferences are available across all pages. To improve user experience, the app integrates localStorage, so preferences are remembered even after refreshing the page.

The Settings page is where users can interact with this state. They can update their location, switch units, and choose to either save or reset their preferences. Because the application uses shared context, changes made here are immediately reflected throughout the app.