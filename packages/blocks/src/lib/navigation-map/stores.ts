import * as THREE from 'three';
import { writable } from 'svelte/store';
import { currentWritable } from '@threlte/core';
import type { Waypoint, Obstacle } from '$lib';

export const hovered = currentWritable<string | null>(null);

export const waypoints = currentWritable<Waypoint[]>([]);
export const obstacles = currentWritable<Obstacle[]>([]);

export type Tabs = 'Obstacles' | 'Waypoints'
export type Environments = 'debug' | 'configure'

/** The currently selected tab. */
export const tab = writable<Tabs>('Waypoints');

/** The visible set of tabs. */
export const tabs = writable<string[]>(['Obstacles', 'Waypoints']);

/** If we're looking at obstacles in a 2d top-down or 3d orbiting view */
export const view = currentWritable<'2D' | '3D'>('2D');

/** Whether or not we can create obstacles */
export const environment = currentWritable<Environments>('debug');

/** The bounding radius of an obstacle mapped to obstacle name. */
export const boundingRadius: Record<string, number> = {};

/** The projection matrix of the map camera. */
export const cameraMatrix = new THREE.Matrix4();
