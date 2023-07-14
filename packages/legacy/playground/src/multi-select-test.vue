<script setup lang="ts">

</script>

<template>
    <main>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="basic-multiselect"
                label='Default Multi-select'
                options='happy, sad, angry'
                placeholder="Emotions"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="default-multiselect-first"
                label='Default Multi-select First Option'
                options='First Option, Second Option, Third Option'
                placeholder="Options"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-values"
                label='Multi-select with Values'
                options='happy,sad, angry'
                value='happy, sad'
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-with-button"
                label='Multi-select withbutton'
                withbutton='true'
                buttontext='TAKE PHOTO'
                buttonicon='camera'
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-header"
                label='Multi-select Header'
                options='happy, sad, angry'
                heading="Emotions"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-disabled"
                label='Multi-select Disabled'
                options='happy, sad, angry'
                disabled="true"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-readonly"
                label='Multi-select Readonly'
                options='happy, sad, angry'
                readonly=true
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-not-clearable"
                label='Multi-select not clearable'
                options='happy, sad, angry'
                clearable="false"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-info-tooltip"
                label='Multi-select info state'
                options='happy, sad, angry'
                tooltip="info tip"
                state="info"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-warn-tooltip"
                label='Multi-select warn state'
                options='happy, sad, angry'
                tooltip="warn tip"
                state="warn"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-error-tooltip"
                label='Multi-select error state'
                options='happy, sad, angry'
                tooltip="error tip"
                state="error"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-showpill"
                label='Multi-select showpill'
                options='happy, sad, angry'
                value="happy, sad"
                showpill="false"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-sort-off"
                label='Multi-select sort off'
                options='happy, sad, angry'
                sortoption="off"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-multiselect
                data-testid="multiselect-reduce"
                label='Multi-select Reduce sort'
                options='happy, sad, angry'
                sortoption="reduce"
            />
        </section>
    </main>
</template>