<script lang="ts">
    import GoalCard from '../../../components/GoalCard.svelte';
    import { today, getLocalTimeZone } from '@internationalized/date';
    import Calendar from '../../../components/calendar/Calendar.svelte';
    import DayTimeline from '../../../components/calendar/DayTimeline.svelte';

    let { data } = $props();
    let selectedDate = today(getLocalTimeZone());
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Goal Management</h1>
    
    <GoalCard goal={data?.goal} showButton={false} />
    
     <!-- Calendar, Timeline, and Chat Section -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8">
        <!-- Calendar -->
        <div class="lg:col-span-3">
            <h2 class="text-xl font-semibold mb-4">Calendar</h2>
            <Calendar bind:value={selectedDate} />
        </div>
        
        <!-- Timeline -->
        <div class="lg:col-span-6">
            <h2 class="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <DayTimeline date={new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)}/>
        </div>
        
        <!-- Chat Window -->
        <div class="lg:col-span-3">
            <h2 class="text-xl font-semibold mb-4">Chat Window</h2>
            <div class="bg-white border rounded-lg shadow h-[500px] flex flex-col">
                <div class="p-3 border-b">
                    <h3 class="font-medium">Messages</h3>
                </div>
                <div class="flex-1 overflow-y-auto p-3">
                    <!-- Chat messages would go here -->
                    <div class="text-gray-400 text-center mt-4">No messages yet</div>
                </div>
                <div class="p-3 border-t">
                    <div class="flex">
                        <input type="text" placeholder="Type a message..." class="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



