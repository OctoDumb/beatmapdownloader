const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let started = false;
const tryConnection = () => client.connect({ port }, () => {
    client.end();
    if(!started) {
        console.log("Starting Electron");
        started = true;
        const { exec } = require('child_process');
        exec('npm run electron');
    }
});

tryConnection();

client.on('error', () => {
    setTimeout(tryConnection, 1e3);
});