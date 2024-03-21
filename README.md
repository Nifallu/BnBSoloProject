# OasisBnb

## Overview
This project is a web application inspired by AirBnB, designed to facilitate property rentals and user reviews. Users can sign up, log in, view available spots, create their own spots, leave reviews, and manage their listings. The application also includes user authentication and authorization features to ensure secure access to various functionalities.

## Live Site
The project is currently hosted at [OasisBnB](https://api-bnb-project.onrender.com)  

## Database Schema
<!--!!START SILENT -->
![airbnb-database-schema]

[airbnb-database-schema]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/airbnb-db-schema.png
[airbnb-db-diagram-info]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/airbnb-db-diagram-info.txt
<!--!!END -->

## Features

### User Authentication/Authorization
Sign Up & Log In: Users can securely sign up for a new account or log in with existing credentials.
Authentication & Authorization: Certain endpoints require authentication and authorization to access, ensuring data security.

### Spots Management
View All Spots: Users can view all available spots without authentication.  
View User's Spots: Authenticated users can view spots they own.  
Spot Details: Users can view detailed information about a specific spot.  
Create, Edit & Delete Spots: Authenticated users can create new spots, edit existing ones, and delete spots they own.  
Reviews  
View Reviews by User: Authenticated users can view reviews written by them.  
View Reviews by Spot: Users can view reviews associated with a specific spot.  
Create, Edit & Delete Reviews: Authenticated users can leave reviews for spots, edit their reviews, and delete their reviews.  


## Installation
To run the project locally, follow these steps:  

Clone the repository.  
Install dependencies: npm install.  
Start the development server: npm start.  
Open your browser and navigate to localhost.  

## Technologies Used
Frontend: React  
Backend: Express.js  
Database: PostgreSQL  
Authentication: JWT Tokens  
Authorization: Role-based access control  

## Future Features
Bookings: Allows users to book a spot.   
Image Uploads: Allow users to upload images for their spots and reviews.  
Search Functionality: Implement search functionality to find spots based on various criteria.  
Messaging System: Enable communication between users for inquiries and bookings.  
Payment Integration: Integrate payment methods for booking spots.  

