<script lang="ts">
	import { DatePicker } from '../../DatePicker/date-picker.ts';
</script>

<DatePicker>
	<DatePicker.Field aria-label="Start date" />
	<DatePicker.Trigger aria-label="Open calendar" />
	<DatePicker.Content>
		<DatePicker.Calendar />
	</DatePicker.Content>
</DatePicker>
