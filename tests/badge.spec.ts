import { test, expect } from '@playwright/test';
import config from '../tailwind.config.cjs'

export const hexToRGB = (hex) => {
  let alpha = false;
  let h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = Number.parseInt(h, 16);
  return (
    `rgb${ 
      alpha ? 'a' : '' 
    }(${ 
      h >>> (alpha ? 24 : 16) 
    }, ${ 
      (h & (alpha ? 0x00_FF_00_00 : 0x00_FF_00)) >>> (alpha ? 16 : 8) 
    }, ${ 
      (h & (alpha ? 0x00_00_FF_00 : 0x00_00_FF)) >>> (alpha ? 8 : 0) 
    }${alpha ? `, ${h & 0x00_00_00_FF}` : '' 
    })`
  );
};


test('Badge E2E Tests', async ({ page }) => {
  await page.goto('/test.html');

  // Gray Badge Test

  const grayBadge = page.getByText('Inactive')
  
  await expect(grayBadge).toBeVisible()
  await expect(grayBadge).toHaveText("Inactive")
  

  await expect(grayBadge).toHaveCSS("background-color", hexToRGB(config.theme.extend.colors['gray/200']))
  await expect(grayBadge).toHaveCSS("color", hexToRGB(config.theme.extend.colors['gray/800']))

  // Default Badge Test

  const defaultBadge = page.getByText("Default")
  
  await expect(defaultBadge).toBeVisible()
  await expect(defaultBadge).toHaveText("Default")

  await expect(defaultBadge).toHaveCSS("background-color", hexToRGB(config.theme.extend.colors['gray/200']))
  await expect(defaultBadge).toHaveCSS("color", hexToRGB(config.theme.extend.colors['gray/800']))

  // Green Badge Test

  const greenBadge = page.getByText("Go")
  
  await expect(greenBadge).toBeVisible()
  await expect(greenBadge).toHaveText("Go")

  await expect(greenBadge).toHaveCSS("background-color", hexToRGB(config.theme.extend.colors['green/200']))
  await expect(greenBadge).toHaveCSS("color", hexToRGB(config.theme.extend.colors['green/900']))

  // Orange Badge Test

  const orangeBadge = page.getByText("Danger")
  
  await expect(orangeBadge).toBeVisible()
  await expect(orangeBadge).toHaveText("Danger")

  await expect(orangeBadge).toHaveCSS("background-color", hexToRGB(config.theme.extend.colors['orange/200']))
  await expect(orangeBadge).toHaveCSS("color", hexToRGB(config.theme.extend.colors['orange/900']))

  // Red Badge Test

  const redBadge = page.getByText("Unhealthy")
  
  await expect(redBadge).toBeVisible()
  await expect(redBadge).toHaveText("Unhealthy")

  await expect(redBadge).toHaveCSS("background-color", hexToRGB(config.theme.extend.colors['red/200']))
  await expect(redBadge).toHaveCSS("color", hexToRGB(config.theme.extend.colors['red/900']))

});
