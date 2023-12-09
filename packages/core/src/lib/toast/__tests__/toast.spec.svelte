<script lang="ts">
import type cx from 'classnames';
import { Toast, type ToastVariantType } from '$lib';

export let message = 'This is a message.';
export let variant: ToastVariantType;
export let progress = 1;
export let actionable = false;
export let closeable = false;
export let extraClasses: cx.Argument = '';
</script>

<Toast
  {message}
  {variant}
  {progress}
  {actionable}
  {closeable}
  cx={extraClasses}
  on:close
/>
