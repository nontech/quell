<script lang="ts">
    import GoalCard from '../components/GoalCard.svelte';
    
    // Get data from the server load function
    let { data } = $props();
</script>

<div class="max-w-4xl mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Your Goals</h1>
        <button class="rounded-full w-12 h-12 bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            <span class="text-2xl text-blue-500">+</span>
        </button>
    </div>
    
    <div class="space-y-4">
        {#each data.goals as goal (goal.id)}
            <GoalCard {goal} />
        {/each}
    </div>
</div>

<section>
    <h2>Calendar</h2>
    <p>
        Calendar View goes here
    </p>
</section>
