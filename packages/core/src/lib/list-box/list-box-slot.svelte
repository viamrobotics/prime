<script lang="ts">
import { ListBox } from '$lib';

// Toggle element on or off
export let disabled = false;
// Elements in the left list
export let left = ['leftText1', 'leftText2', 'leftText3'];
// Elements in the right list
export let right = ['rightText1', 'rightText2', 'rightText3'];
// Label for the left list
export let leftlabel = ['Left'];
// Label for the right list
export let rightlabel = ['Right'];
// Height of the two boxes
export let height = '200px';
// Enable suffix that can be put in front of elements in the box
export let suffix = false;

const inputValues = {
  disabled,
  left,
  right,
  leftlabel,
  rightlabel,
  height,
  suffix,
};
</script>

<ListBox {...inputValues}>
  <div slot="left-empty">Your left box is empty</div>
  <div slot="right-empty">Your right box is empty</div>
</ListBox>
