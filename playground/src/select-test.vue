<script setup lang="ts">

</script>

<template>
    <main>
        <section style="width: 400px;">
            <v-select data-testid="basic-select" label="Default Select" options="one, two, three" placeholder="All" />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select 
                data-testid="select-with-button" 
                label="Select with Button" 
                options="one, two, three" 
                withbutton="true" 
                buttontext="Add new option"
                buttonicon="add"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select 
                data-testid="select-disabled" 
                label="Select Disabled" 
                options="one, two, three" 
                disabled="true"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select 
                data-testid="select-readonly" 
                label="Select Readonly" 
                options="one, two, three" 
                readonly="true"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select 
                data-testid="select-exact" 
                label="Select Exact" 
                options="one, two, three"
                exact="true"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select 
                data-testid="select-default-tooltip" 
                label="Select Default Tooltip" 
                options="one, two, three"
                tooltip="default tip"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select 
                data-testid="select-info-tooltip" 
                label="Select Default Tooltip" 
                options="one, two, three"
                tooltip="info tip"
                state="info"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select 
                data-testid="select-warn-tooltip" 
                label="Select Warn Tooltip" 
                options="one, two, three"
                tooltip="warn tip"
                state="warn"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select 
                data-testid="select-error-tooltip" 
                label="Select Warn Tooltip" 
                options="one, two, three"
                tooltip="error tip"
                state="error"
            />
        </section>
        <section style="width: 400px; margin-top: 30px">
            <v-select
                data-testid="select-reduce" 
                label="Select Reduced" 
                options="one, one chicken, two" 
                sortoption="reduce"
            />
        </section>
    </main>
</template>