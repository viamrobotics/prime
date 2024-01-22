import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type NavigationMapProps = typeof __propDef.props;
export type NavigationMapEvents = typeof __propDef.events;
export type NavigationMapSlots = typeof __propDef.slots;
export default class NavigationMap extends SvelteComponent<NavigationMapProps, NavigationMapEvents, NavigationMapSlots> {
}
export {};
