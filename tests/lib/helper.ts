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

// This function adds an event listener for eventName and puts the value of paramName on the window
// Retrieve the value of paramName by calling await page.evaluate('window.<paramName>')
export const waitForCustomEventWithParam = (page:Page, eventName:string, paramName:string) => {
  return page.evaluate(
    (eventInfo) => {
      function listener(event) {
        window[eventInfo.eventName] = event.target[eventInfo.paramName]
      }
      return new Promise(resolve => {
        window.addEventListener(eventInfo.eventName, listener, { once: true })
        resolve(eventInfo.eventName + ' event called!')
      })}, 
  {eventName, paramName})
}