<script lang="ts">
    import PageHeader from '@/components/page-header.svelte';
	import FileTable from './_components/FileTable.svelte';
	import type { Sign } from '@/types/types';
	import Table from '@/components/ui/table/table.svelte';
     
    export let data;
    
    
</script>

{#each data.signs as sign }
    {sign.created_at}
    <p></p>
    {sign.id}
    <p></p>
    {sign.name}
{/each}