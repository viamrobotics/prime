<script lang="ts">
import { ToastContainer, provideToast } from '..';
import type { ToastContext } from '../context';

export let toastContext: ToastContext;

$: provideToast(toastContext);
</script>

<ToastContainer />
