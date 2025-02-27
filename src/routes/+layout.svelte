<script>
    import "../app.css";
    let { children } = $props();
</script>

<nav class="bg-white shadow-md mb-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
            <!-- Logo -->
            <div class="flex-shrink-0">
                <a href="/" class="font-serif text-2xl font-bold text-indigo-600 hover:text-indigo-500">
                    Quell
                </a>
            </div>
            
            <!-- Navigation Links -->
            <div class="flex space-x-8">
                <a href="/" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Home
                </a>
                <a href="/my-account" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    My Account
                </a>
            </div>
        </div>
    </div>
</nav>

{@render children()}
