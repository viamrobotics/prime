<script lang="ts">
import { NotificationContainer, provideNotify } from '..';
import type { NotifyContext } from '../context';

export let notifyContext: NotifyContext;

$: provideNotify(notifyContext);
</script>

<NotificationContainer />
