const fs = require('fs');
const path = require('path');

const tmpFolderPath = path.join(__dirname, 'tmp');
const tmpFilePath = path.join(tmpFolderPath, 'marketWaitListData.json'); // Temporary file path

// Function to fetch market wait list data and save it
const fetchAndSaveMarketWaitListData = async () => {
    try {
        const MarketApi = require('./MarketApi'); // Moved inside the function to prevent cyclic dependency
        const marketWaitList = await MarketApi.getWorldMarketWaitList();
        if (marketWaitList) {
            const currentTime = new Date().toISOString(); // Get current time
            // Save data along with timestamp to a temporary file
            const dataToSave = JSON.stringify({ data: marketWaitList, timestamp: currentTime });
            if (!fs.existsSync(tmpFolderPath)) {
                fs.mkdirSync(tmpFolderPath, { recursive: true });
            }
            fs.writeFileSync(tmpFilePath, dataToSave);
            console.log('Market wait list data fetched and saved successfully at', currentTime);
        } else {
            console.error('Error fetching market wait list data');
        }
    } catch (error) {
        console.error('Error fetching market wait list data:', error);
    }
};

// Fetch and save market wait list data initially
fetchAndSaveMarketWaitListData();

// Schedule to fetch and save market wait list data every minute
setInterval(fetchAndSaveMarketWaitListData, 6000); // 1 minute = 60000 milliseconds

module.exports = { tmpFilePath };
