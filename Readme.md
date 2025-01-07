# Hotel Booking Application Using NodeJS
A simple hotel booking application built with the NodeJS framework. 

## Technologies Used

- **Front End**: HTML, JavaScript
- **Back End**: NodeJS, ExpressJS
- **Database**: Stored data in json format
- **Style**: Used CSS
- **Node Packages**:
  - **Express**: A minimal and flexible Node.js web application framework.
  - **fs**: Node's file system module, used for file operations.
  - **path**: Module for handling and transforming file paths.

## File Structure

The project is organized as follows:
- `constants/`
  - `hotel_bookings.json` - Contains hotels booking data
  - `hotels.json` - Contains hotels data
- `public/`
  - `index.html` - Front-end HTML file
  - `script.js` - Js file
- `routes/`
  - `bookingRoutes.js` - Routes for handling booking API requests
  - `hotel.js` - Routes for handling hotel API requests
- `server.js` - Main server file to start the application

## API Endpoints

1. **GET /api/bookings/:userId**
  - Fetches the bookings based on the `userId` provided in the URL.
  - **URL Parameter**: `userId` (required)
  - **Response**: A JSON object containing booking details for the specified user.

2. **POST /api/bookings/createOrEdit**
  - Create or Update a booking.
  - **Request Body**: Booking data (HotelId, CheckInDate, CheckOutDate, Rooms)
  - **Response**: A success message indicating the booking has been created.

3. **POST /api/booking/cancel/:bookingId**
  - Cancel a booking
  - **Request Body**: Booking Id
  - **Response**: A success message indicating the booking has been cancelled.

4. **GET /api/hotels**
  - Fetches all hotels
  - **Response**: A JSON object containing hotel details

## Functionalities

1. Show "No Results" if there are no bookings for the current user.
2. Load all available hotels in the "Create Booking" form dropdown.
3. Allow users to create hotel bookings with their user ID.
4. Display the hotel bookings created by the user.
5. Add new bookings to the table without refreshing the page.
6. When "Cancel" is clicked, update the booking status and show the change on the front-end without refreshing the page.
7. When "Edit" is clicked, fill the form with the existing booking details so it can be edited and saved.
8. Update the table with the modified booking details without page refresh.
   
## Screenshot:
![image](https://github.com/user-attachments/assets/acab25ed-0f55-47f7-9772-838da6a9d601)
![image](https://github.com/user-attachments/assets/0b3e69f7-050d-4a2d-bbec-bab92385b340)



