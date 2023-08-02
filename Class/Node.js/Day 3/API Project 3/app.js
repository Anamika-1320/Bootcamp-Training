const axios = require('axios');

const apiKey = '9ab266ce61msh8d164bf7b2f6b91p1195f0jsnbac22a0cf0c0';
const apiUrl = 'http://timetable-api.p.rapidapi.com/timetable';
const origin = 'London'; // Replace with your origin location
const destination = 'Paris'; // Replace with your destination location
const date = '2023-08-10'; // Replace with the desired date in YYYY-MM-DD format

const options = {
    method: 'GET',
    url: apiUrl,
    params: { origin, destination, date },
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'timetable-api.p.rapidapi.com',
    },
};

// Function to fetch timetable data
async function getTimetableData() {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error occurred:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        throw error;
    }
}

// Function to display timetable data
function displayTimetableData(timetableData) {
    console.log('Timetable Data:', timetableData);
    // You can handle the data here as per your requirement
}

// Main function to fetch and display timetable data
async function main() {
    try {
        const timetableData = await getTimetableData();
        displayTimetableData(timetableData);
    } catch (error) {
        console.error('Failed to fetch timetable data:', error.message);
    }
}

main();
