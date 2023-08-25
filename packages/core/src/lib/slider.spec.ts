import { describe, it, expect, vi } from 'vitest';
import { act, createEvent, fireEvent, render, screen } from '@testing-library/svelte';
import Slider from './slider.svelte';


const customMin = -50;
const customMax = 50;
const customStart = -20;
const customEnd = 30;
const value = 15;
const step = 25;

export const delay = async (time: number) => {
    await new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

describe('Slider', () => {
    it('Displays min and max values', () => {
        render(Slider, {
            range:"range",
            min:"-50",
            max:"50",
            start:"-20",
            end:"30",
        });

        expect(screen.getByText("-50", { exact: true })).toBeVisible();
        expect(screen.getByText("50", { exact: true })).toBeVisible();
    });

    it('Displays start and and end values',  () => {
        const { container } =render(Slider, {
            range:"range",
            min:"-50",
            max:"50",
            start:"-20",
            end:"30",
        });
        
        expect(screen.getByText("-20", { exact: true })).toBeVisible();
        expect(screen.getByText("-50", { exact: true })).toBeVisible();
        const startPercentage = (customStart - customMin) / (customMax - customMin);

        let slider = screen.getByRole('slider', {value:{text : customStart}})
        expect(slider).toBeVisible()
        let style = getComputedStyle(slider)
        expect(Number.parseFloat(style.left)).toBeCloseTo(startPercentage*100)

        slider = screen.getByRole('slider', {value:{text : customEnd}})
        expect(slider).toBeVisible()

        const endPercentage = (customEnd - customMin) / (customMax - customMin);
        style = getComputedStyle(slider)
        expect(Number.parseFloat(style.left)).toBeCloseTo(endPercentage*100)

        const floating = container.querySelectorAll('.floating')
        expect(floating).toHaveLength(2)
        const eleFirst = floating[0]!

        // TODO add the rest of the test
        // Had issues pulling opacity from eleFrist

    });
    it('Starts slider at minimum value', () => {
        const { container } = render(Slider, {
            range:"min",
            max:"50",
            value:"15",
        });
        const slider = container.querySelectorAll('span.bg-gray-9')[0]!
        expect(slider).toBeVisible()
        const style = getComputedStyle(slider)
        expect(Number.parseFloat(style.left)).toBeCloseTo(0)
    });
    it('Ends slider at maximum value', () => {
        const { container } =render(Slider, {
            range:"max",
            max:"50",
            value:"15"
        })
        const slider = container.querySelectorAll('span.bg-gray-9')[0]!
        expect(slider).toBeVisible()
        const style = getComputedStyle(slider)
        expect(Number.parseFloat(style.right)).toBeCloseTo(0)
    });
    it('Starts slider placement at value', () => {
        render (Slider, {
            min:"-50",
            max:"50",
            value:"15"
        });
        const slider = screen.getByRole('slider')
        expect(slider).toBeVisible()

        const valuePercentage = (value - customMin) / (customMax - customMin);
        const style = getComputedStyle(slider)
        expect(Number.parseFloat(style.left)).toBeCloseTo(valuePercentage*100)
    });
    it('Displays axis ticks at intervals of size step', () => {
         /*
          * for reasonable step size, axis ticks display at intervals of size step
          * does not hold true for relatively small step sizes
          */
        const { container } = render(Slider,{
            min:"-50",
            max:"50",
            step:"25"
        })
        const axisTicks = container.querySelectorAll('span.bg-gray-6')
        const numTicks = (customMax - customMin)/ step - 1;
        expect(axisTicks.length).toBe(numTicks)
        // check positioning of each tick
        for (const [i, axisTick] of axisTicks.entries()) {
            const tickPos = getComputedStyle(axisTick).left
            expect(Number.parseFloat(tickPos)).toBeCloseTo(
              ((i + 1) / (numTicks + 1)*100),
              1
            );
          }
    });
    it('Restricts slider value to intervvals of size step', () => {
        // TODO
    });
    it('Renders label above slider', ()=> {
        render(Slider, {
            label:"sliiide to the left"
        });
        const slider = screen.getByText("sliiide to the left" , { exact: true });
        expect(slider).toBeVisible();
    });
    it('Renders unit suffix with min and max values', () => {
        render(Slider, {
            suffix:"units",
            min:"-50",
            max:"50"
        })
        // 1 for min max and one floating value
        expect(screen.getAllByText('units').length).toBe(3)
        expect(
            screen.getByText(customMin, { exact: true })
          ).toBeVisible();
        expect(
            screen.getByText(customMax, { exact: true })
          ).toBeVisible();
    });
    it('Dispatches "input" event with value when user drags slider to value', async () => {
        const {container} = render (Slider, {
            min:"-50",
            max:"50",
            value:"15"
        });
        const slider = screen.getByRole('slider');
        expect(slider).toBeVisible();
        
        // TODO
    });

    it('Given disabled attributes as true, displays slider as disabled and prevents interaction', () =>{
        // TODO
    });

    it('Given readonly attributes as true, displays slider as readonly and prevents interaction', ()=> {
        // TODO
    });

    it ('Given no attributes, renders slider with { min: 0, max100m value:50, step:1 )', async () => {
        const {container} = render(Slider)
        expect(screen.getByText('0',{ exact:true})).toBeVisible();
        expect(screen.getByText('50', {exact: true}));
        expect(screen.getByText('100', {exact:true}));

        const slider = screen.getByRole('slider');
        expect(slider).toBeVisible();

        // TODO Drag isnt working as expected
        // Drag documentation https://testing-library.com/docs/example-drag/
        await fireEvent.drag(slider,{delta:{x:-5,y:0}});
        expect(slider).toBe(45)

    });

});

