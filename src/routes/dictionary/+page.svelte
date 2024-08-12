<script lang="ts">
    import { onMount } from 'svelte';
    import FileTable from './_components/FileTable.svelte';
    import type { Sign } from '@/types/types';
	import { Input } from '@/components/ui/input';

    export let theme_options: { name: string, show: boolean }[] = [];
    export let anotation_options = [
        { name: "Anotados", show: true },
        { name: "Anotação não terminada", show: true },
        { name: "Por anotar", show: true }
    ];
    let selection = false;
    export let signs_to_delete: number[] = [];
    let searchQuery = '';
    let signs: Sign[] = [];
    let isLoading = false;
    let errorMessage = '';

    function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        };
    }

    // Fetch signs based on the search query
    async function fetchSigns(query: string) {
        isLoading = true;
        try {
            const response = await fetch(`/api/dictionary/signs?search=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            signs = data.signs;
        } catch (error) {
            errorMessage = 'Error fetching signs, please try again later.';
        } finally {
            isLoading = false;
        }
    }

    const debouncedFetchSigns = debounce(fetchSigns, 400);
    // Handle search input change
    function handleSearch() {
        debouncedFetchSigns(searchQuery);
    }

    // Initial fetch if searchQuery is not empty
   onMount(() => {
        fetchSigns(''); // Fetch all entries initially
    });
</script>



<div>
    <div class="flex justify-center mb-4 mt-2"> 
    <input 
        type="text"
        placeholder="Procurar sinais"
        bind:value={searchQuery}
        on:input={handleSearch}
        class="text-center py-2 px-4 border border-gray-300 rounded-md w-full max-w-md"
    />
</div>

    
    {#if isLoading}
        <p class="loading">Loading...</p>
    {/if}
    {#if errorMessage}
        <p class="error">{errorMessage}</p>
    {/if}

   
    <FileTable
        data={{ signs }}
        bind:theme_options={theme_options}
        bind:anotation_options={anotation_options}
        selection={selection}
        bind:signs_to_delete={signs_to_delete}
    />
</div>
