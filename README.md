# ☕️ Coffee Connoisseur
Coffee Connoisseur is a web application that allows users to explore and discover coffee stores in their area based on their location. Users can view the name of the store, its location, and the voting score. They can also vote for their favorite coffee store. The application is built using Next.js, React, and integrates with the Unsplash API for displaying images and the Foursquare API for fetching coffee store data.

## Features
- Display coffee stores based on user's location
- View store name, location, and voting score
- Vote for favorite coffee store
- Responsive design for optimal viewing on different devices

## Technologies Used
- Next.js
- React
- Unsplash API (for displaying images)
- Foursquare API (for fetching coffee store data)

## Getting Started
These instructions will help you set up the project on your local machine for development and testing purposes.

1. Clone the repository:

```bash
git clone https://github.com/your-username/coffee-connoisseur.git
```

2. Install dependencies:

```bash
cd coffee-connoisseur
npm install
```

3. Set up API keys:

You will need to obtain API keys from Unsplash and Foursquare in order to use their APIs. Create a .env file in the root directory of the project and add the following:

```makefile
NEXT_PUBLIC_UNSPLASH_API_KEY=your_unsplash_api_key
NEXT_PUBLIC_FOURSQUARE_CLIENT_ID=your_foursquare_client_id
NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET=your_foursquare_client_secret
```

Replace your_unsplash_api_key, your_foursquare_client_id, and your_foursquare_client_secret with your actual API keys.

4. Run the development server:

```bash
npm run dev
```

5. Open your web browser and go to http://localhost:3000 to see the application in action.

## Contributing
If you would like to contribute to Coffee Connoisseur, feel free to submit a pull request with your changes. Please follow the existing code style and include appropriate tests for your changes.

### This project was built as a part of Next.js ZTM course
