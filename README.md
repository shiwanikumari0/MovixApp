# Overview:
I built a fully responsive movie website using React and the TMDB API. Users can explore trending movies and TV shows, view details, and search for their favorite titles. The website has smooth navigation and works well on both desktop and mobile devices.

# Tech Stack:
React, React Router, Context API, Tailwind CSS, TMDB API

Live server:https://movix-1-nine.vercel.app/

# API Reference:
Base URL: https://api.themoviedb.org/3

Trending Movies:
GET /trending/movie/day

Movie Search:
GET /search/movie?query=your_query

Movie Details:
GET /movie/{movie_id}

All API requests must include:
?api_key=YOUR_API_KEY

# Key Features:
 1. Hero Section: Shows trending movies in a full-screen image slider.
 2. Movie Grid: Popular movies are shown in a neat grid using reusable card components.
 3. Search Bar: Users can search for any movie or show and go directly to its detail page.
 4. Detail Pages: Each movie/show has a page showing its title, genres, rating, description, and creators.
 5. Load More Button: Helps users see more results without refreshing the page.
 6. Responsive Design: Looks great on both mobile and desktop using Tailwind CSS.

# Future Improvements
 1. User authentication (signup, login, protected routes)
 2. Actor and cast detail pages
 3. Movie reviews and rating system
 4. Watchlist feature
 5. Multi-language support
 5. light and Dark mode

