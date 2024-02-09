const fs = require('fs');
const path = require('path');

// Function to log folder contents recursively
function logFolderContents(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }
        files.forEach(file => {
            if (file !== 'node_modules' && file !== '.git') { // Skip node_modules folder
                const filePath = path.join(folderPath, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error('Error getting file stats:', err);
                        return;
                    }
                    if (stats.isDirectory()) {
                        console.log('Directory:', filePath);
                        logFolderContents(filePath); // Recursively log contents of subdirectory
                    } else if (stats.isFile()) {
                        console.log('File:', filePath);
                    }
                });
            }
        });
    });
}

// Path to the backend folder
const logBackendFolder = ()=> {
// Log contents of the backend folder recursively
const backendFolderPath = './';
logFolderContents(backendFolderPath);
}

module.exports = logBackendFolder



