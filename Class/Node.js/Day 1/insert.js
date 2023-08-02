const fs = require('fs');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

console.log('Establishing connection...');
setTimeout(() => {
    console.log('Connection established.');

    const dataToInsert = '\nThis is the new line.\n';
    const filePath = './text.txt';

    console.log('Inserting text in file...');
    setTimeout(() => {
        fs.appendFile(filePath, dataToInsert, (err) => {
            if (err) {
                console.error('Error inserting data:', err);
                emitter.emit('error', 'Error inserting text');
            } else {
                console.log('Inserted successfully!');
            }
            setTimeout(() => {
                console.log('Connection closed.');
            }, 1000);
        });
    });
}, 1000);


