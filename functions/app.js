const { COTripUtil } = require('./utils/COTripUtil.js');
const { DataProcessor } = require('./utils/DataProcessor.js');

async function main(){
    const coTrip = new COTripUtil();
    const dataProcessor = new DataProcessor();

    let incidents = await coTrip.getIncidents();
    dataProcessor.importIncidents(incidents);


    let destinations = await coTrip.getDestinations();
    dataProcessor.importDestinations(destinations);

    let roadSegments = await coTrip.getRoadConditions(); 
    dataProcessor.importRoadConditions(roadSegments);  

    dataProcessor.buildMarkdown();
    dataProcessor.save();
    dataProcessor.saveRoadSegmentsToMd();
}

module.exports = {main}