<script lang="ts">
	import { DateRangePicker } from '../../DateRangePicker/date-range-picker.ts';
</script>

<DateRangePicker>
	<DateRangePicker.Field aria-label="Dates" />
	<DateRangePicker.Trigger aria-label="Open calendar" />
	<DateRangePicker.Content>
		<DateRangePicker.Calendar />
	</DateRangePicker.Content>
</DateRangePicker>
