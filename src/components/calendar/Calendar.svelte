<script lang="ts">
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { Calendar } from "$lib/components/ui/calendar";
    
    export let value = today(getLocalTimeZone());
</script>

<div class="w-full">
    <div class="bg-white border rounded-lg shadow p-2">
        <Calendar bind:value class="rounded-md" />
    </div>
</div>