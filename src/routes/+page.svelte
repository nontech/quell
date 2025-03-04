<script lang="ts">
    import GoalCard from '../components/GoalCard.svelte';

    // Get data from the server load function
    let { data } = $props();
    
</script>

<div class="container mx-auto p-4">
    <!-- Goals Section -->
    <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Your Goals</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each data.goals as goal (goal.id)}
                <GoalCard {goal} />
            {/each}
        </div>
    </div>
</div>
