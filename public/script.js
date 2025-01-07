// Modify Existing Row after editing
function modifyExistingRow(booking) {
    let existingRow = document.querySelector(`tr[booking-id='${booking.id}']`);
    if (existingRow) {
        existingRow.querySelector('#hotel_name').textContent = booking.hotel.name;
        existingRow.querySelector('#hotel_location').textContent = booking.hotel.location;
        existingRow.querySelector('#checkInDate').textContent = booking.checkInDate;
        existingRow.querySelector('#checkOutDate').textContent = booking.checkOutDate;
        existingRow.querySelector('#rooms').textContent = booking.rooms;
    }
}

// Add mew row after creating
function newBookingRow(booking) {
    const bookingRow = document.createElement('tr');
    const customButtons = booking.status !== 'CANCELLED' ? `
                <button onclick="cancelBooking(${booking.id})">Cancel</button>
                <button onclick="editBooking(${booking.id})">Edit</button>
            ` : '-'
    bookingRow.innerHTML = `
            <td id="id">${booking.id}</td>
            <td id="createdDate">${booking.createdDate}</td>
            <td id="hotel_id" style="display:none">${booking.hotel.id}</td>
            <td id="hotel_name">${booking.hotel.name}</td>
            <td id="hotel_location">${booking.hotel.location}</td>
            <td id="checkInDate">${booking.checkInDate}</td>
            <td id="checkOutDate">${booking.checkOutDate}</td>
            <td id="rooms">${booking.rooms}</td>
            <td id="status" class="${booking.status}">${booking.status}</td>
            <td class="buttons" style="text-align: center;">
                ${customButtons}
            </td>
            `;
    bookingRow.setAttribute('booking-id', booking.id);
    return bookingRow;
}


function displayMsg(msg, status) {
    var formMsgElement = document.getElementById('formMsg');
    formMsgElement.textContent = msg;
    if (status == 'ERROR') {
        formMsgElement.style.color = 'red';
    } else {
        formMsgElement.style.color = 'green';
    }
    formMsgElement.style.display = 'block';
}

// Fetch all bookings
async function fetchHotelBookings() {
    try {
        const response = await fetch('/api/bookings/1');
        if (response.ok) {
            const hotelBookings = await response.json();
            if (hotelBookings.length > 0) {
                document.getElementById('noBookings').style.display = 'none';
            }
            document.getElementById('booking_id').value = hotelBookings.length + 1;

            const bookingDetails = document.getElementById('bookingDetails');
            const bookingRows = bookingDetails.getElementsByTagName('tr');
            while (bookingRows.length > 1) {
                bookingDetails.deleteRow(1);
            }
            hotelBookings.forEach(bookings => {
                const row = newBookingRow(bookings);
                bookingDetails.appendChild(row);
            });

        } else {
            console.error('Failed to fetch hotelBookings');
        }
    } catch (error) {
        console.error('Error fetching hotelBookings:', error);
    }
}
// Fetch all hotels
async function fetchHotels() {
    try {
        const response = await fetch('/api/hotels');
        if (response.ok) {
            const hotels = await response.json();
            const hotelSelect = document.getElementById('booking_hotel');
            hotels.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
                hotelSelect.appendChild(option);
            });
        } else {
            console.error('Failed to fetch hotels');
        }
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

// Cancel Booking
async function cancelBooking(bookingId) {
    try {
        const response = await fetch(`/api/booking/cancel/${bookingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const bookingRow = document.querySelector(`tr[booking-id='${bookingId}']`);
            if (bookingRow) {
                const statusCell = bookingRow.querySelector('#status');
                if (statusCell) {
                    statusCell.textContent = 'CANCELLED';
                    statusCell.className = 'CANCELLED';
                }
                const buttonsCell = bookingRow.querySelector('.buttons');
                if (buttonsCell) {
                    buttonsCell.innerHTML = '-';
                }
            }
        } else {
            displayMsg('Failed to cancel bookings', 'ERROR');
            console.error('Failed to cancel bookings');
        }
    } catch (error) {
        console.error('Error cancel bookings:', error);
        displayMsg('Failed to cancel bookings', 'ERROR');
    }
}

// Edit Booking
function editBooking(bookingId) {

    document.getElementById("bookingFormLabel").innerText = "Edit";
    const bookingRow = document.querySelector(`tr[booking-id='${bookingId}']`);
    if (bookingRow) {
        const bookingRowElements = bookingRow.querySelectorAll('td');
        const bookingObj = {};
        Array.from(bookingRowElements).map(row => {
            if (row.textContent && row.id) bookingObj[row.id] = row.textContent.trim()
        });

        // update table values in form
        document.getElementById('formType').value = 'EDIT';
        document.getElementById('booking_id').value = bookingId;
        document.getElementById('booking_hotel_status').value = bookingObj.status;
        document.getElementById('booking_hotel_created_date').value = bookingObj.createdDate;
        document.getElementById('booking_hotel').value = bookingObj.hotel_id;
        document.getElementById('booking_hotel_room').value = bookingObj.rooms;
        document.getElementById('booking_hotel_checkInDate').value = bookingObj.checkInDate;
        document.getElementById('booking_hotel_checkOutDate').value = bookingObj.checkOutDate;
    }
}

window.onload = function () {
    fetchHotelBookings();
    fetchHotels();
};

document.addEventListener('DOMContentLoaded', function () {

    // set default in form
    document.getElementById('booking_hotel_status').value = 'BOOKED';
    document.getElementById('booking_hotel_created_date').value = new Date().toISOString().split('T')[0];;
    document.getElementById('formType').value = 'CREATE';

    document.getElementById('bookingForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const rooms = document.getElementById('booking_hotel_room').value;
        const checkInDate = document.getElementById('booking_hotel_checkInDate').value;
        const checkOutDate = document.getElementById('booking_hotel_checkOutDate').value;
        const hotelId = document.getElementById('booking_hotel').value;
        const createdDate = document.getElementById('booking_hotel_created_date').value
        const status = document.getElementById('booking_hotel_status').value
        const id = document.getElementById('booking_id').value;

        const formType = document.getElementById('formType').value;

        if (!rooms || !checkInDate || !checkOutDate || !hotelId) {
            displayMsg('Please fill all fields', 'ERROR');
        } else if (checkInDate >= checkOutDate) {
            displayMsg('Check-In must be less then Check-Out', 'ERROR');
        } else {
            const bookingData = {
                "userId": 1,
                id,
                status,
                createdDate,
                rooms,
                checkInDate,
                checkOutDate,
                hotelId
            }
            const response = await fetch('/api/booking/createOrEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            if (response.ok) {
                const addedData = await response.json();
                const bookingDetails = document.getElementById('bookingDetails');
                if (formType == 'CREATE') {
                    document.getElementById('noBookings').style.display = 'none';
                    const row = newBookingRow(addedData.data);
                    bookingDetails.appendChild(row);
                    displayMsg('Created Successfully', 'SUCCESS');
                } else {
                    modifyExistingRow(addedData.data);
                    displayMsg('Edited Successfully', 'SUCCESS');
                }
            } else {
                console.error('Failed to fetch hotelBookings');
                displayMsg('Failed to create', 'ERROR');
            }
        }
    });
});