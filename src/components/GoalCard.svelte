<script lang="ts">
    let { 
        goal,
        showButton = true // Default to true to maintain backward compatibility
    } = $props();
</script>

<div class="rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
    <h2 class="text-2xl font-bold mb-2">{goal.title}</h2>
    
    <p class="text-gray-600 mb-1">Due {goal.dueDate}</p>
    
    <p class="text-gray-600 mb-4">{goal.hoursPerWeek} hours weekly, starting {goal.startingTime}</p>
    
    <div class="flex items-center justify-between mb-2">
        <span class="text-gray-600">Progress</span>
        <span class="font-semibold">{goal.progress}%</span>
    </div>
    
    <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-500 h-2.5 rounded-full" style="width: {goal.progress}%"></div>
    </div>

    {#if showButton}
        <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <a href={`/goal/${goal.id}`}>View Goal</a>
        </button>
    {/if}
</div>
