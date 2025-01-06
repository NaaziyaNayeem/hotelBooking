# Hotel Booking Application Using NodeJS
A simple hotel booking application built with the NodeJS framework. 

## Technologies Used

- **Front End**: HTML, JavaScript
- **Back End**: NodeJS, ExpressJS
- **Database**: Stored data in json format
- **Node Packages**:
  - **Express**: A minimal and flexible Node.js web application framework.
  - **fs**: Node's file system module, used for file operations.
  - **path**: Module for handling and transforming file paths.

## File Structure

The project is organized as follows:
- `constants/`
  - `data.json` - Contains booking data
- `public/`
  - `index.html` - Front-end HTML file
- `routes/`
  - `bookingRoutes.js` - Routes for handling booking API requests
- `server.js` - Main server file to start the application

## API Endpoints

1. **GET /api/hotelBookings/:userId**
   - Fetches the bookings based on the `userId` provided in the URL.
   - **URL Parameter**: `userId` (required)
   - **Response**: A JSON object containing booking details for the specified user.

2. **POST /api/createBookings**
   - Creates a new booking.
   - **Request Body**: Booking data (e.g., user details, booking dates, etc.)
   - **Response**: A success message indicating the booking has been created.
  
## Usecase Covered
1. List Hotel bookings based on UserId
   Based on userId fetch bookings and append hotels details in it
3. Create Hotel Bookings
   Pass the data from from to api side
   Append the data in json
5. Populate hotels in Select Dropdown
   
## Screenshot:
![image](https://github.com/user-attachments/assets/acab25ed-0f55-47f7-9772-838da6a9d601)
![image](https://github.com/user-attachments/assets/0b3e69f7-050d-4a2d-bbec-bab92385b340)



