<svelte:options immutable={true} tag="v-code-editor" />

<script lang="ts">
    import { afterUpdate, onDestroy, onMount } from "svelte";

    import {
        addStyles,
        dispatch,
        monaco,
        removeNewlineWhitespace,
    } from "../lib/index";
    
    import type {
        MonacoSupportedLanguages,
        MonacoSupportedThemes,
    } from "../lib/index";

    export let id: string;
    export let value: string;
    export let language: MonacoSupportedLanguages;
    export let theme: MonacoSupportedThemes = "vs";
    export let readonly: boolean = false;
    export let minimap: boolean = false;
    // export let getmodeluri: (id: string) => monaco.Uri;
    // export let destroy: () => void;

    let container: HTMLDivElement;
    let editor: null | monaco.editor.IStandaloneCodeEditor = null;

    const setModel = () => {
        const lastModel = editor?.getModel();
        lastModel?.dispose();

        // const uri = getmodeluri?.(id);
        const model = monaco.editor.createModel(value, language /* , uri */);

        console.log('model', model);

        editor?.setModel(model);
    };
    

    addStyles();

    onMount(() => {
        editor = monaco.editor.create(container, {
            value,
            language,
            theme,
            readOnly: readonly,
            minimap: {
                enabled: minimap,
            },
            scrollbar: {
                verticalScrollbarSize: 3,
                horizontalScrollbarSize: 3,
                vertical: "auto",
                horizontal: "auto",
                alwaysConsumeMouseWheel: false,
            },
            scrollBeyondLastLine: false,
        });

        const element = editor?.getDomNode() ?? container;

        editor.onDidChangeModelContent(() =>
            dispatch(element, "input", {
                value: editor?.getValue(),
            })
        );

        editor.onDidBlurEditorWidget(() => {
            const markers = monaco.editor.getModelMarkers({});
            dispatch(element, "updateMarkers", { markers });
            dispatch(element, "blur", { value: editor?.getValue() });
        });

        editor.layout();
        setModel();

        window.setTimeout(() => {
            const markers = monaco.editor.getModelMarkers({});
            dispatch(element, "updateMarkers", markers);
        });
    });

    onDestroy(() => {
        const model = editor?.getModel();
        model?.dispose();

        editor?.dispose();
        // destroy?.();
    });

    afterUpdate(() => {
        setModel();

        let currentValue = editor?.getValue() ?? '';

        const originalFormatted = removeNewlineWhitespace(value);
        const updatedFormatted = removeNewlineWhitespace(currentValue);

        console.log('update', { originalFormatted, updatedFormatted })

        if (updatedFormatted === originalFormatted) {
            return;
        }

        editor?.setValue(currentValue);
    });
</script>

<svelte:window on:resize={() => editor?.layout()} />

<div class="w-full h-full relative isolate" bind:this={container} />
