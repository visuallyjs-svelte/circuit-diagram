import { ShapeSet } from "@visuallyjs/browser-ui"

/**
 * Shape set containing electronic components.
 * @param terminusSize Size to draw terminuses with. Defaults to 6px.
 * @param showTerminuses Whether or not to show terminuses always. Defaults to false.
 * @constructor
 */
export const ELECTRONICS_COMPONENTS = (terminusSize = 6, showTerminuses = false): ShapeSet => {

    const width = 120;
    const height = 80;
    const midY = height / 2;
    const midX = width / 2;

    const CENTER_LEFT = "0.5,0.5,-1,0"
    const CENTER_RIGHT = "0.5,0.5,1,0"
    const CENTER_TOP = "0.5,0.5,0,-1"

    const terminusFill = showTerminuses ? "{{outline}}" : "transparent"

    function terminus(x:number, y:number, source:boolean, target:boolean, port:string, anchor:string):string {
        const atts:Record<string, string> = {
            cx:`${x}`, cy:`${y}`, "class":"vjs-ec-terminus", stroke:"none", fill:terminusFill, r:`${terminusSize}`, "data-vjs-anchor":anchor
        }
        if (source) {
            atts["data-vjs-source"] = "true"
        }
        if (target) {
            atts["data-vjs-target"] = "true"
        }
        if (port) {
            atts["data-vjs-port"] = port
        }

        const atts2 = Object.entries(atts).map(e => `${e[0]}="${e[1]}"`).join(" ")
        return `<circle ${atts2}/>`
    }

    function defaultTerminuses(sourceId?:string, targetId?:string):string {
        return `${terminus(0, midY, true, true, sourceId || "p1", CENTER_LEFT)}
        ${terminus(width, midY, true, true, targetId || "p2", CENTER_RIGHT)}`
    }

    return {
        id: "electronics-components",
        name: "Electronics Components",
        labelPadding:0,
        shapes: [
            {
                type: "resistor",
                label: "Resistor",
                group: "passive",
                defaultTarget: false,
                properties: [
                    { id: "resistance", label: "Resistance", type: "string", description: "" },
                    { id: "powerRating", label: "Power rating", type: "string", description: "" },
                    { id: "tolerance", label: "Tolerance", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 30 ${midY} L 35 ${midY-15} L 45 ${midY+15} L 55 ${midY-15} L 65 ${midY+15} L 75 ${midY-15} L 85 ${midY+15} L 90 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>                    
                    ${defaultTerminuses()}
                    <text x="${midX}" y="${height}" font-size="9px" text-anchor="middle" dominant-baseline="auto" stroke="none" fill="#888888">{{resistance}}</text>
                    </g>
                </svg>`
            },
            {
                type: "capacitor",
                label: "Capacitor",
                group: "passive",
                defaultTarget: false,
                properties: [
                    { id: "capacitance", label: "Capacitance", type: "string", description: "" },
                    { id: "voltage", label: "Voltage", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 55 ${midY} M 65 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 55 ${midY-20} L 55 ${midY+20} M 65 ${midY-20} L 65 ${midY+20}" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses()}
                    <text x="${midX}" y="${height}" font-size="9px" text-anchor="middle" dominant-baseline="auto" stroke="none" fill="#888888">{{capacitance}}</text>
                    </g>
                </svg>`
            },
            {
                type: "inductor",
                label: "Inductor",
                group: "passive",
                defaultTarget: false,
                properties: [
                    { id: "inductance", label: "Inductance", type: "string", description: "" },
                    { id: "currentRating", label: "Current rating", type: "string", description: "" },
                    { id: "tolerance", label: "Tolerance", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>    
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 30 ${midY} C 30 ${midY-20} 45 ${midY-20} 45 ${midY} C 45 ${midY-20} 60 ${midY-20} 60 ${midY} C 60 ${midY-20} 75 ${midY-20} 75 ${midY} C 75 ${midY-20} 90 ${midY-20} 90 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses()}
                    <text x="${midX}" y="${height}" font-size="9px" text-anchor="middle" dominant-baseline="auto" stroke="none" fill="#888888">{{inductance}}</text>
                    </g>
                </svg>`
            },
            {
                type: "potentiometer",
                label: "Potentiometer",
                group: "passive",
                defaultTarget: false,
                properties: [
                    { id: "resistance", label: "Resistance", type: "string", description: "" },
                    { id: "powerRating", label: "Power rating", type: "string", description: "" },
                    { id: "taper", label: "Taper", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 30 ${midY} L 35 ${midY-10} L 45 ${midY+10} L 55 ${midY-10} L 65 ${midY+10} L 75 ${midY-10} L 85 ${midY+10} L 90 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 60 10 L 60 33 L 55 28 M 60 33 L 65 28" fill="none" stroke="{{outline}}"/>
                    <circle cx="0" cy="${midY}" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="p1" stroke="none" data-vjs-anchor="${CENTER_LEFT}"/>
                    <circle cx="${width}" cy="${midY}" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="p2" stroke="none" data-vjs-anchor="${CENTER_TOP}"/>
                    <circle cx="${midX}" cy="10" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="wiper" stroke="none" data-vjs-anchor="${CENTER_RIGHT}"/>
                    
                    </g>
                </svg>`
            },
            {
                type: "fuse",
                label: "Fuse",
                group: "passive",
                defaultTarget: false,
                properties: [
                    { id: "rating", label: "Rating", type: "string", description: "" },
                    { id: "voltage", label: "Voltage", type: "string", description: "" },
                    { id: "type", label: "Type", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 40 ${midY} C 50 ${midY-10} 70 ${midY+10} 80 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <rect vector-effect="non-scaling-stroke" x="40" y="${midY-10}" width="40" height="20" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses()}
                    <text x="${midX}" y="${height}" font-size="9px" text-anchor="middle" dominant-baseline="auto" stroke="none" fill="#888888">{{rating}}</text>
                    </g>
                </svg>`
            },
            {
                type: "crystal",
                label: "Crystal",
                group: "passive",
                defaultTarget: false,
                properties: [
                    { id: "frequency", label: "Frequency", type: "string", description: "" },
                    { id: "loadCapacitance", label: "Load capacitance", type: "string", description: "" },
                    { id: "tolerance", label: "Tolerance", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 50 ${midY} M 70 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 50 ${midY-20} L 50 ${midY+20} M 70 ${midY-20} L 70 ${midY+20}" fill="none" stroke="{{outline}}"/>
                    <rect vector-effect="non-scaling-stroke" x="55" y="${midY-15}" width="10" height="30" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses()}
                    </g>
                </svg>`
            },
            {
                type: "diode",
                label: "Diode",
                group: "semiconductors",
                defaultTarget: false,
                properties: [
                    { id: "partNumber", label: "Part number", type: "string", description: "" },
                    { id: "forwardVoltage", label: "Forward voltage", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 45 ${midY} M 75 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 45 ${midY-20} L 45 ${midY+20} L 75 ${midY} Z" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 75 ${midY-20} L 75 ${midY+20}" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses("anode", "cathode")}
                    <text x="${midX}" y="${height}" font-size="9px" text-anchor="middle" dominant-baseline="auto" stroke="none" fill="#888888">{{forwardVoltage}}</text>
                    </g>
                </svg>`
            },
            {
                type: "led",
                label: "LED",
                group: "semiconductors",
                defaultTarget: false,
                properties: [
                    { id: "color", label: "color", type: "string", description: "" },
                    { id: "forwardVoltage", label: "Forward voltage", type: "string", description: "" },
                    { id: "forwardCurrent", label: "Forward current", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 45 ${midY} M 75 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 45 ${midY-20} L 45 ${midY+20} L 75 ${midY} Z" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 75 ${midY-20} L 75 ${midY+20}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 50 20 L 35 5 M 42 5 L 35 5 L 35 12 M 65 20 L 50 5 M 57 5 L 50 5 L 50 12" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses("anode", "cathode")}
                    <text x="${midX}" y="${height}" font-size="9px" text-anchor="middle" dominant-baseline="auto" stroke="none" fill="#888888">{{color}}</text>
                    </g>
                </svg>`
            },
            {
                type: "zenerDiode",
                label: "Zener Diode",
                group: "semiconductors",
                defaultTarget: false,
                properties: [
                    { id: "voltage", label: "Voltage", type: "string", description: "" },
                    { id: "powerRating", label: "Power rating", type: "string", description: "" },
                    { id: "tolerance", label: "Tolerance", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 45 ${midY} M 75 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 45 ${midY-20} L 45 ${midY+20} L 75 ${midY} Z" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 70 ${midY-25} L 75 ${midY-20} L 75 ${midY+20} L 80 ${midY+25}" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses("anode", "cathode")}
                    </g>
                </svg>`
            },
            {
                type: "npnTransistor",
                label: "NPN Transistor",
                group: "semiconductors",
                defaultTarget: false,
                properties: [
                    { id: "partNumber", label: "Part number", type: "string", description: "" },
                    { id: "hFE", label: "hFE", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <circle vector-effect="non-scaling-stroke" cx="${midX}" cy="${midY}" r="30" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M ${midX-10} ${midY-15} L ${midX-10} ${midY+15}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L ${midX-10} ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M ${midX-10} ${midY-5} L ${midX+15} ${midY-25} L 120 ${midY-25}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M ${midX-10} ${midY+5} L ${midX+15} ${midY+25} L 120 ${midY+25}" fill="none" stroke="{{outline}}"/>
                    <path d="M ${midX+7} ${midY+23} L ${midX+15} ${midY+25} L ${midX+11} ${midY+17} Z" fill="{{outline || '#888888'}}" stroke="{{outline}}"/>
                    <circle cx="0" cy="${midY}" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="base" stroke="none" data-vjs-anchor="${CENTER_LEFT}"/>
                    <circle cx="${width}" cy="${midY-25}" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="collector" stroke="none" data-vjs-anchor="${CENTER_RIGHT}"/>
                    <circle cx="${width}" cy="${midY+25}" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="emitter" stroke="none" data-vjs-anchor="${CENTER_RIGHT}"/>
                    
                    </g>
                </svg>`
            },
            {
                type: "pnpTransistor",
                label: "PNP Transistor",
                group: "semiconductors",
                defaultTarget: false,
                properties: [
                    { id: "partNumber", label: "Part number", type: "string", description: "" },
                    { id: "hFE", label: "hFE", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <circle vector-effect="non-scaling-stroke" cx="${midX}" cy="${midY}" r="30" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M ${midX-10} ${midY-15} L ${midX-10} ${midY+15}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L ${midX-10} ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M ${midX-10} ${midY-5} L ${midX+15} ${midY-25} L 120 ${midY-25}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M ${midX-10} ${midY+5} L ${midX+15} ${midY+25} L 120 ${midY+25}" fill="none" stroke="{{outline}}"/>
                    <path d="M ${midX-2} ${midY-7} L ${midX-10} ${midY-5} L ${midX-6} ${midY-13} Z" fill="{{outline || '#888888'}}" stroke="{{outline}}"/>
                    <circle cx="0" cy="${midY}" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="base" stroke="none" data-vjs-anchor="${CENTER_LEFT}"/>
                    <circle cx="${width}" cy="${midY-25}" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="emitter" stroke="none" data-vjs-anchor="${CENTER_RIGHT}"/>
                    <circle cx="${width}" cy="${midY+25}" r="${terminusSize}" fill="${terminusFill}" data-vjs-target="true" data-vjs-source="true" data-vjs-port="collector" stroke="none" data-vjs-anchor="${CENTER_RIGHT}"/>
                    
                    </g>
                </svg>`
            },
            {
                type: "switch",
                label: "Switch",
                group: "electromechanical",
                defaultTarget: false,
                properties: [
                    { id: "contactRating", label: "Contact rating", type: "string", description: "" },
                    { id: "actuator", label: "actuator", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 42 ${midY} M 78 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <circle vector-effect="non-scaling-stroke" cx="45" cy="${midY}" r="3" fill="none" stroke="{{outline}}"/>
                    <circle vector-effect="non-scaling-stroke" cx="75" cy="${midY}" r="3" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 47 ${midY-2} L 73 ${midY-20}" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses()}                    
                    </g>
                </svg>`
            },
            {
                type: "pushButton",
                label: "Push Button",
                group: "electromechanical",
                defaultTarget: false,
                properties: [
                    { id: "contactRating", label: "Contact rating", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 42 ${midY} M 78 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <circle vector-effect="non-scaling-stroke" cx="45" cy="${midY}" r="3" fill="none" stroke="{{outline}}"/>
                    <circle vector-effect="non-scaling-stroke" cx="75" cy="${midY}" r="3" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 40 ${midY-15} L 80 ${midY-15} M 60 ${midY-15} L 60 ${midY-25}" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses()}
                    </g>
                </svg>`
            },
            {
                type: "speaker",
                label: "Speaker",
                group: "electromechanical",
                defaultTarget: false,
                properties: [
                    { id: "impedance", label: "Impedance", type: "string", description: "" },
                    { id: "powerRating", label: "Power rating", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                        <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                        <g stroke-linecap="round">
                        <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 40 ${midY} M 80 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                        <path vector-effect="non-scaling-stroke" d="M 40 ${midY-15} L 40 ${midY+15} L 80 ${midY+25} L 80 ${midY-25} Z" fill="none" stroke="{{outline}}"/>
                        ${defaultTerminuses()}
                        </g>
                    </svg>`
            },
            {
                type: "microphone",
                label: "Microphone",
                group: "electromechanical",
                defaultTarget: false,
                properties: [
                    { id: "sensitivity", label: "Sensitivity", type: "string", description: "" },
                    { id: "type", label: "Type", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                        <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                        <g stroke-linecap="round">
                        <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 40 ${midY} M 80 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                        <path vector-effect="non-scaling-stroke" d="M 40 ${midY-25} L 40 ${midY+25} L 80 ${midY+15} L 80 ${midY-15} Z" fill="none" stroke="{{outline}}"/>
                        ${defaultTerminuses()}
                        </g>
                    </svg>`
            },{
                type: "battery",
                label: "Battery",
                group: "power",
                defaultTarget: false,
                properties: [
                    { id: "voltage", label: "Voltage", type: "string", description: "" },
                    { id: "capacity", label: "Capacity", type: "string", description: "", values:["big", "small"] }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L 50 ${midY} M 70 ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 50 ${midY-20} L 50 ${midY+20} M 55 ${midY-10} L 55 ${midY+10} M 60 ${midY-20} L 60 ${midY+20} M 65 ${midY-10} L 65 ${midY+10} M 70 ${midY-20} L 70 ${midY+20}" fill="none" stroke="{{outline}}"/>
                    ${defaultTerminuses("pos", "neg")}
                    <text x="${midX}" y="${height}" font-size="9px" text-anchor="middle" dominant-baseline="auto" stroke="none" fill="#888888">{{voltage}}V</text>
                    </g>
                </svg>`
            },
            {
                type: "powerSupply",
                label: "Power Supply",
                group: "power",
                defaultTarget: false,
                properties: [
                    { id: "voltage", label: "Voltage", type: "number", description: "" },
                    { id: "current", label: "Current", type: "string", description: "" }
                ],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <circle vector-effect="non-scaling-stroke" cx="${midX}" cy="${midY}" r="25" fill="none" stroke="{{outline}}"/>
                    <path vector-effect="non-scaling-stroke" d="M 0 ${midY} L ${midX-25} ${midY} M ${midX+25} ${midY} L 120 ${midY}" fill="none" stroke="{{outline}}"/>
                    <text x="${midX}" y="${midY}" style="font-size:16px;text-anchor:middle;dominant-baseline:central;" fill="{{outline}}">V</text>
                    ${defaultTerminuses("in", "out")}
                    </g>
                </svg>`
            },
            {
                type: "ground",
                label: "Ground",
                group: "power",
                defaultTarget: false,
                properties: [],
                template: `<svg preserveAspectRatio="none" overflow="visible" viewBox="0 0 ${width} ${height}" width="{{width}}" height="{{height}}">
                    <rect fill="transparent" x="0" y="0" width="${width}" height="${height}" stroke="none"/>
                    <g stroke-linecap="round">
                    <path vector-effect="non-scaling-stroke" d="M ${midX} 0 L ${midX} 40 M ${midX-20} 40 L ${midX+20} 40 M ${midX-12} 50 L ${midX+12} 50 M ${midX-4} 60 L ${midX+4} 60" fill="none" stroke="{{outline}}"/>
                    ${terminus(midX, 0, true, true, "junction", CENTER_TOP)}                   
                    </g>
                </svg>`
            },
            {
                type: "junction",
                label: "Junction",
                defaultTarget: false,
                group:"other",
                description: "Wire connection point for signal splitting or merging",
                initialSize: {width: 20, height: 20},
                template: `<svg overflow="visible" viewBox="0 0 {{width}} {{height}}" width="{{width}}" height="{{height}}">
    <rect fill="transparent" x="0" y="0" width="{{width}}" height="{{height}}" stroke="none" data-vjs-bg="true" rx="5"/>
    <circle cx="{{width / 2}}" cy="{{height / 2}}" r="{{width/2}}" fill="{{outline || '#888888'}}" stroke="none" data-vjs-target="true" data-vjs-source="true" data-vjs-anchor="Center"/>
    <circle cx="{{width / 2}}" cy="{{height / 2}}" r="{{width / 3}}" fill="{{outline || '#AAAAAA'}}" stroke="none"/>
    </svg>`
            }
        ]
    }
}
