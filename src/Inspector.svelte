<script>
    import {ColorPickerComponent, InspectorComponent, useDiagram, ShapePropertiesInspector} from "@visuallyjs/browser-ui-svelte"
    import { isNode } from "@visuallyjs/browser-ui"

    let current = $state(null)
</script>

<InspectorComponent bind:current={current}>
    {#if current != null && isNode(current)}
        <div class="vjs-inspector-pane">
            <div class="vjs-inspector-header">
                <div class="vjs-inspector-title">
                    <h3>{current.data.label || current.data.type}</h3>
                </div>
                <button class="close-button" onclick={() => current = null}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                         stroke-width="2" fill="none" stroke-linecap="round"
                         stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div class="vjs-inspector-properties">
                <div class="vjs-inspector-field">
                    <label>Label</label>
                    <input type="text" vjs-att="label" placeholder="Label"/>
                </div>
                <ShapePropertiesInspector vertex={current}/>
            </div>
        </div>
    {/if}
</InspectorComponent>
