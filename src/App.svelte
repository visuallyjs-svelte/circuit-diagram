<script>
    import {
        ControlsComponent,
        DiagramProvider, DiagramComponent, DiagramPaletteComponent, ExportControlsComponent
    } from "@visuallyjs/browser-ui-svelte"

    import diagramOptions from './diagram-options'
    import Inspector from "./Inspector.svelte";
    import './circuit-diagram.css'


    let { url = "/dataset.json" } = $props();


</script>

<div class="vjs-cd-main">
    <DiagramProvider>
        <div class="vjs-cd-palette-wrapper">
            <ControlsComponent/>
            <DiagramPaletteComponent showLabels={true}
                                     iconSize={{width:120,height:80}}
                                     allowDropOnEdge={true}
                                     autoEdgeConnect={true}/>
        </div>
        <DiagramComponent style="flex-grow:1" options={diagramOptions} {url}/>
        <Inspector/>
        <ExportControlsComponent/>
    </DiagramProvider>
</div>

<style>
    :global(html, body) {
        margin:0;
        padding:0;
        width:100vw;
        height:100vh;
    }
</style>
