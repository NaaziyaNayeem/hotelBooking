# Hotel Booking Application Using NodeJS
A simple hotel booking application built with the NodeJS framework. 

## Technologies Used

- **Front End**: HTML, JavaScript
- **Back End**: NodeJS, ExpressJS
- **Database**: Stored data in json format
- **Style**: Used CSS
- **Node Packages**:
  - **Express**: Used for server logic
  - **fs**: Used for updating the json when we add/edit/cancel the bookings
  - **path**: Used for transforming file paths.

## File Structure

The project is organized as follows:
- `constants/`
  - `hotel_bookings.json` - Contains hotels booking data
  - `hotels.json` - Contains hotels data
- `public/`
  - `index.html` - Front-end HTML file
  - `script.js` - Js file
- `routes/`
  - `booking.js` - Routes for handling booking API requests
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
1. Inital Screen
![image](https://github.com/user-attachments/assets/d25a93c1-a5f7-4674-ae50-e9a7e02f0df8)

2. Populate Hotels data from API in Select Drop Down
![image](https://github.com/user-attachments/assets/3fb137c0-1991-48e5-9231-f32d3d890bd1)

3. Display error before submit
![image](https://github.com/user-attachments/assets/7c873581-02a4-4b4b-8c0b-a637112dbd6e)

4. After creating the booking
![image](https://github.com/user-attachments/assets/3152e5f9-1e2e-46fc-80ec-6856af1d6f89)

5. After booking get cancelled
![image](https://github.com/user-attachments/assets/df9b1d2e-1502-47a3-b583-e2aaac08cc11)

6. New Booking
![image](https://github.com/user-attachments/assets/8ac134c4-a417-47dc-8b69-fd36bb8f4d90)

7. Pre-Populate the form when we click edit in any row
![image](https://github.com/user-attachments/assets/071544a0-5fea-448a-b44a-004bc3f2b5e0)

8. After editing  the booking
![image](https://github.com/user-attachments/assets/e5b3bffd-4833-4b4d-919e-0277261fb445)









