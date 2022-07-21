import '../prime.css'

import { loadFonts } from './lib'
import Badge from './elements/badge.svelte'
import Breadcrumbs from './elements/breadcrumbs.svelte'
import Button from './elements/button.svelte'
import Collapse from './elements/collapse.svelte'
import Dropdown from './elements/dropdown.svelte'
import Icon from './elements/icon.svelte'
import Input from './elements/input.svelte'
import Notify from './elements/notify.svelte'
import Radio from './elements/radio.svelte'
import Select from './elements/select.svelte'
import Slider from './elements/slider.svelte'
import Switch from './elements/switch.svelte'
import Table from './elements/table/table.svelte'
import Tabs from './elements/tabs.svelte'
import TBody from './elements/table/tbody.svelte'
import THead from './elements/table/th.svelte'
import Td from './elements/table/td.svelte'
import Th from './elements/table/thead.svelte'
import Tooltip from './elements/tooltip.svelte'
import Tr from './elements/table/tr.svelte'

const elements = {
  'badge': Badge,
  'breadcrumbs': Breadcrumbs,
  'button': Button,
  'collapse': Collapse,
  'dropdown': Dropdown,
  'icon': Icon,
  'input': Input,
  'notify': Notify,
  'radio': Radio,
  'select': Select,
  'slider': Slider,
  'switch': Switch,
  'table': Table,
  'tabs': Tabs,
  'tbody': TBody,
  'thead': THead,
  'td': Td,
  'tooltip': Tooltip,
  'tr': Tr,
  'th': Th,
}

let warn = false

for (const [name, element] of Object.entries(elements)) {
  if (customElements.get(`v-${name}`) === undefined) {
    customElements.define(`v-${name}`, element as unknown as CustomElementConstructor)
  } else {
    warn = true
  }
}

if (warn) {
  console.warn('WARNING: Multiple instances of PRIME being imported.')
}

loadFonts().catch(error => console.error(error))
