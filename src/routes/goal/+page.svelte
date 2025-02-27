<script lang="ts">
    let { data } = $props();
</script>

<div class="m-12">
    <h1>Goals List Card</h1>

    <section>
        {#each data.goals_list as {id, title}}
            <li>
                <a href={`/goal/${title}`}>{title}</a>
            </li>
        {/each}
    </section>
</div>

