import {getNodeData} from "../../../helper/getNodeData";
import {toJSON} from "./toJSON";
import {addNodes} from "./addNodes";
import {addGateways} from "./addGateways";
import {addGatewayLines} from "./addGatewayLines";
import {addToSidebar} from "./addToSidebar";

export default function moduleIot(moduleConfig, leafletMap, leafletLayerControl, moduleID, generalConfig) {
    getNodeData(moduleConfig, generalConfig, function (rawNodes) {
        if(((new Date().getTime() - new Date(rawNodes.timestamp).getTime()) / 1000 / 60) > 60) {
            Materialize.toast('Problem beim Laden von ' + moduleConfig.layerName, 10000);
            console.error('Problem with loading the layer ' + moduleConfig.layerName);
        } else {
            toJSON(moduleConfig, rawNodes, function (formattedNodes) {
                let layerIoTMapperGatewaysLines = addGatewayLines(formattedNodes, leafletMap, leafletLayerControl);
                addGateways(formattedNodes, leafletMap, leafletLayerControl);
                let layerIoTMapperNodes = addNodes(formattedNodes, leafletMap, leafletLayerControl);
                addToSidebar(formattedNodes, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, moduleID)
            });
        }
    });
};
