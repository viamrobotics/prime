import { expect,Page } from '@playwright/test';

export const waitForCustomEvent = async(page:Page, customEventName:string) => {
    return page.evaluate(eventName => new Promise(callback => window.addEventListener(eventName, callback,{ once: true })), customEventName)
}

export const waitForCustomEventTimeout = async (page:Page,customEventName:string) => {
    const value = await Promise.race([
        page.evaluate(eventName => new Promise(callback => window.addEventListener(eventName, callback, { once: true })), customEventName),
        new Promise((resolve) => {setTimeout(resolve, 500, "timeout")}),
    ])

    expect(value).toBe("timeout")
}

