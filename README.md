# Wanderlust

Wanderlust is a travel destination listing web application that allows users to explore, list, and manage various travel destinations. It leverages modern web technologies to provide a seamless user experience.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization.
- Explore various travel destinations.
- List new travel destinations.
- Search for destinations.
- Responsive design.
- Interactive maps using Leaflet.

## Technologies
- Frontend:
  - HTML
  - CSS (Bootstrap, custom styles)
  - JavaScript
  - EJS (Embedded JavaScript templates)
- Backend:
  - Node.js
  - Express.js
- Database:
  - MongoDB
- Other:
  - Leaflet.js for interactive maps
  - Font Awesome for icons

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/wanderlust.git
    cd wanderlust
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL=mongodb://localhost:27017/wanderlust
    SESSION_SECRET=your_secret_key
    ```

4. Start the application:
    ```sh
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage
- **Explore Destinations**: Browse through the various travel destinations listed.
- **List a Destination**: Click on "Wanderlust your home" to list a new travel destination.
- **Search**: Use the search bar to find specific destinations.
- **User Authentication**: Sign up or log in to manage your listings.

## File Structure
