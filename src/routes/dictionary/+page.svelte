<script lang="ts">
    import PageHeader from '@/components/page-header.svelte';
    import FileTable from './_components/FileTable.svelte';
    import type { Sign } from '@/types/types';
    import Table from '@/components/ui/table/table.svelte';

    export let data;
    export let theme_options: { name: string, show: boolean }[] = [];
    export let anotation_options = [{ name: "Anotados", show: true }, { name: "Anotação não terminada", show: true }, { name: "Por anotar", show: true }];
    let selection = false;
    export let signs_to_delete: number[] = [];
</script>

<FileTable data={data} bind:theme_options={theme_options} bind:anotation_options={anotation_options} selection={selection} bind:signs_to_delete={signs_to_delete} />
