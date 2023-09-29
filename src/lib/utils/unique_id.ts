// Import the necessary libraries
import CryptoJS from 'crypto-js';

// Function to generate a unique ID based on browser information
export function generateUniqueID(): string {
    const browserName = navigator.userAgent;
    const operatingSystem = navigator.platform;
    const time = new Date().getTime();

    const hashSource = time + operatingSystem + browserName;

    return CryptoJS.SHA256(hashSource).toString(CryptoJS.enc.Hex);
}
