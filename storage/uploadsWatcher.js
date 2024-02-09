const fs = require('fs');

const folderPath = './storage/uploads';

    const watchUploadsFolder = () => {
        function logFolderContents() {
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    console.error('Error reading folder:', err);
                    return;
                }
                console.log('Folder contents:', files);
            });
        }
        console.log('file works')
        fs.watch(folderPath, (eventType, filename) => {
            console.log(`Event type: ${eventType}`);
            if (filename) {
                console.log(`Filename: ${filename}`);
            } else {
                console.log('Filename not provided');
            }

            logFolderContents();
        });

        logFolderContents();

    }

module.exports = watchUploadsFolder