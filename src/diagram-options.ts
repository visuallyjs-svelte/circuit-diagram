import {CONNECTOR_TYPE_ORTHOGONAL, DiagramOptions, Node, Group} from "@visuallyjs/browser-ui"
import { ELECTRONICS_COMPONENTS } from "./electronics-components";

const options:DiagramOptions = {
    shapes:[ ELECTRONICS_COMPONENTS()],
    lineCrossings:true,
    zoomToFit:true,
    edges: {
        layerIndex:0, // we force all edges to the background in this diagram, so they dont overlap our terminuses
        detachable:false,
        connector: {
            type:CONNECTOR_TYPE_ORTHOGONAL,
            options:{
                cornerRadius:5,
                stub:0,
                alwaysRespectStubs:true
            }
        },
        deleteButton:"hover",
        deleteButtonLocation:0.5,
        allowUnattached:false
    },
    cells:{
        rotatable:true,
        rotationStops:4,
        showLabels:true,
        labelPosition:"top"
    },
    grid:{
      size:{width:10, height:10}
    },
    lasso:{
        autoArm:true
    },
    mediator:{
        canResize:() => false,
        canRotate:(v:Node|Group) => v.group == null && v.type !== "junction",
        canClone:(v:Node|Group) => v.group == null,
        canDelete:(v:Node|Group) => v.group == null,
        canLink:() => false
    }
}

export default options;
