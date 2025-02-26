<script>
    import "../app.css";
    let { children } = $props();
</script>

<nav>
    <a href="/">Home</a>
    <a href="/goal">Goal</a>
</nav>

{@render children()}
