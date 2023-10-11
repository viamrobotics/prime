import { writable } from 'svelte/store';
import { currentWritable } from '@threlte/core';
import type { Waypoint } from '$lib';
import { type Obstacle, NavigationTab, type NavigationTabType } from './types';

export const hovered = currentWritable<string | null>(null);
export const selected = currentWritable<string | null>(null);

export const waypoints = currentWritable<Waypoint[]>([]);
export const obstacles = currentWritable<Obstacle[]>([]);

export type Environments = 'debug' | 'configure';

/** The currently selected tab. */
export const tab = writable<NavigationTabType>(NavigationTab.Waypoints);

/** The visible set of tabs. */
export const tabs = writable<NavigationTabType[]>([
  NavigationTab.Obstacles,
  NavigationTab.Waypoints,
]);

/** If we're looking at obstacles in a 2d top-down or 3d orbiting view */
export const view = currentWritable<'2D' | '3D'>('2D');

/** Whether or not we can create obstacles */
export const environment = currentWritable<Environments>('debug');

/** The bounding radius of an obstacle mapped to obstacle name. */
export const boundingRadius: Record<string, number> = {};
