class RoadSegment {
    constructor(jsonObject) {
        this.type = jsonObject.type || "Feature"; 
        this.geometry = jsonObject.geometry ? 
            new Geometry(
                    jsonObject.geometry.type,
                    jsonObject.geometry.coordinates,
                    jsonObject.geometry.srid
            ) : null; 

        const props = jsonObject.properties || {};

        // Basic identification
        this.id = props.id || "";
        this.name = props.name || "";
        this.nameId = props.nameId || "";

        // Route information
        this.route = {
            routeId: props.routeId || 0,
            routeName: props.routeName || "",
            routeRoadSegmentIndex: props.routeRoadSegmentIndex || 0,
        };

        // Milepost information
        this.milepost = {
            primaryMP: props.primaryMP || 0,
            secondaryMP: props.secondaryMP || 0,
        };

        // Location coordinates
        this.location = {
            primary: {
                latitude: props.primaryLatitude || 0,
                longitude: props.primaryLongitude || 0,
            },
            secondary: {
                latitude: props.secondaryLatitude || 0,
                longitude: props.secondaryLongitude || 0,
            },
        };

        // Organizational hierarchy
        this.parentArea = {
            areaId: props.parentAreaId || 0,
            subAreaId: props.parentSubAreaId || 0,
        };

        // Sorting order
        this.sortOrder = props.sortOrder || 0;

        // Current conditions
        this.currentConditions = Array.isArray(props.currentConditions)
            ? props.currentConditions.map(
                  (condition) => new CurrentCondition(condition)
              )
            : [];
    }
 
    getCurrentConditionsSummary() {
        return this.currentConditions.map((condition) => condition.conditionDescription).join(", ");
    }

    toMarkdown() {
        let markdown = `### Segment ID: ${this.id}\n\n`;
        markdown += `**Name**: ${this.name}\n\n`;
        markdown += `**Name ID**: ${this.nameId}\n\n`;

        markdown += `**Route Information**:\n`;
        markdown += `- Route ID: ${this.route.routeId}\n`;
        markdown += `- Route Name: ${this.route.routeName}\n`;
        markdown += `- Route Segment Index: ${this.route.routeRoadSegmentIndex}\n\n`;

        markdown += `**Milepost Information**:\n`;
        markdown += `- Primary MP: ${this.milepost.primaryMP}\n`;
        markdown += `- Secondary MP: ${this.milepost.secondaryMP}\n\n`;

        markdown += `**Location Information**:\n`;
        markdown += `- Primary Latitude: ${this.location.primary.latitude}\n`;
        markdown += `- Primary Longitude: ${this.location.primary.longitude}\n`;
        markdown += `- Secondary Latitude: ${this.location.secondary.latitude}\n`;
        markdown += `- Secondary Longitude: ${this.location.secondary.longitude}\n\n`;

        markdown += `**Organizational Hierarchy**:\n`;
        markdown += `- Parent Area ID: ${this.parentArea.areaId}\n`;
        markdown += `- Parent Sub-Area ID: ${this.parentArea.subAreaId}\n\n`;
    
        markdown += `**Sort Order**: ${this.sortOrder}\n\n`;

        markdown += `**Current Conditions**:\n`;
        if (this.currentConditions.length > 0) {
            this.currentConditions.forEach((condition, index) => {
                markdown += `- **Condition ${index + 1}**:\n`;
                markdown += `  - ID: ${condition.id}\n`;
                markdown += `  - Condition ID: ${condition.conditionId}\n`;
                markdown += `  - Description: ${condition.conditionDescription}\n`;
                markdown += `  - User Name: ${condition.userName}\n`;
                markdown += `  - Start Time: ${condition.startTime}\n`;
                markdown += `  - End Time: ${condition.endTime}\n`;
                markdown += `  - Confirmation Time: ${condition.confirmationTime}\n`;
                markdown += `  - Update Time: ${condition.updateTime}\n`;
                markdown += `  - Confirmation User Name: ${condition.confirmationUserName}\n`;
                markdown += `  - Source Type: ${condition.sourceType}\n`;
                markdown += `  - Additional Data: ${condition.additionalData}\n`;
            });
        } else {
            markdown += `- No current conditions.\n`;
        } 
        
        markdown += `\n---\n`;
        return markdown;
    }
 
}

class CurrentCondition {
    constructor(jsonObject) {
        this.id = jsonObject.id || 0;
        this.conditionId = jsonObject.conditionId || 0;
        this.conditionDescription = jsonObject.conditionDescription || "";
        this.userName = jsonObject.userName || "";
        this.startTime = jsonObject.startTime || 0;
        this.endTime = jsonObject.endTime || 0;
        this.confirmationTime = jsonObject.confirmationTime || 0;
        this.updateTime = jsonObject.updateTime || 0;
        this.confirmationUserName = jsonObject.confirmationUserName || "";
        this.sourceType = jsonObject.sourceType || "";
        this.additionalData = jsonObject.additionalData || null;
    }
}

class Geometry {
    constructor(type, coordinates, srid) {
        this.type = type;
        this.coordinates = coordinates;
        this.srid = srid || null;  
    }
}

module.exports = { RoadSegment };

