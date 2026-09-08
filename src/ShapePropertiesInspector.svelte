<script>
    import { isNode } from "@visuallyjs/browser-ui";
    import {useDiagram} from "@visuallyjs/browser-ui-svelte";

    let { vertex } = $props();

    let diagram = useDiagram()

    let properties = $derived.by(() => {
        if (!vertex || !isNode(vertex)) return [];

        const { type, category } = vertex.data;
        if (!type || !category) return [];

        if (!diagram.current) return [];
        const shapeLibrary = diagram.current.$ui.getShapeLibrary();
        const shapeSet = shapeLibrary.getShapeSet(category);
        if (!shapeSet) return [];

        const shapeDef = shapeSet.shapes.find(s => s.type === type);
        if (!shapeDef || !shapeDef.properties) return [];

        return shapeDef.properties;
    });

</script>

{#each properties as prop (prop.id)}
    <div class="vjs-inspector-field">
        <label>{prop.label || prop.id}</label>
        {#if prop.type === 'string'}
            {#if prop.values && prop.values.length > 0}
                <select vjs-att={prop.id}>
                    {#each prop.values as v}
                        <option value={v}>{v}</option>
                    {/each}
                </select>
            {:else}
                <input type="text" vjs-att={prop.id} placeholder={prop.description || ''} />
            {/if}
        {:else if prop.type === 'number'}
            {#if prop.values && prop.values.length > 0}
                <select vjs-att={prop.id}>
                    {#each prop.values as v}
                        <option value={v}>{v}</option>
                    {/each}
                </select>
            {:else}
                <input type="number" vjs-att={prop.id} placeholder={prop.description || ''} min={prop.min} max={prop.max} />
            {/if}
        {:else if prop.type === 'boolean'}
            <select vjs-att={prop.id}>
                <option value=""></option>
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
        {:else}
            <input type="text" vjs-att={prop.id} placeholder={prop.description || ''} />
        {/if}
        {#if prop.description}
            <div class="vjs-field-desc">{prop.description}</div>
        {/if}
    </div>
{/each}
