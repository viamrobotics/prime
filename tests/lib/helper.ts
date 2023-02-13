import { expect,Page } from '@playwright/test';

export const waitForCustomEvent = async(page:Page, customEventName:string) => {
    return await page.evaluate(eventName => new Promise(callback => window.addEventListener(eventName, callback,{ once: true })), customEventName)
}

export const waitForCustomEventTimeout = async(page:Page,customEventName:string) => {
    return Promise.race([
        page.evaluate(eventName => new Promise(callback => window.addEventListener(eventName, callback, { once: true })), 'remove'),
        new Promise((resolve) => {setTimeout(resolve, 500, "timeout")}),
      ]).then((value)=>{ expect(value).toBe("timeout")});
}

