<script lang="ts">
	import PageHeader from '@/components/page-header.svelte';
	import TagFilterButton from '@/components/tag-filter-button.svelte';
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { nullableQueryParam } from '@/utils';
	import { PlusCircle } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import SortButton from './../../lib/components/sort-button.svelte';
	import HowToItem from './_components/how-to-item.svelte';

	export let data;

	const search = queryParam('s', nullableQueryParam(ssp.string()), {
		debounceHistory: 1000,
	});

	const tags = queryParam('tags', nullableQueryParam(ssp.array<string>()));
</script>

<PageHeader title="How to" subtitle="Learn & share how to solve your problems" />
<div class="container mx-auto flex flex-row justify-between gap-x-2">
	<div class="flex flex-1 flex-row gap-x-2 sm:gap-x-4 md:flex-auto">
		<Input placeholder="Search..." class="flex-1 sm:max-w-64" bind:value={$search}></Input>
		<TagFilterButton tags={data.tags} bind:filterValues={$tags} />
		<SortButton />
	</div>
	<Button href="/how-to/create" class="w-10 p-0 sm:w-auto sm:px-4 sm:py-2">
		<PlusCircle class="h-4 w-4 sm:mr-2" />
		<span class="sr-only sm:not-sr-only">Create How To</span>
	</Button>
</div>
<div
	class="container mx-auto grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
	{#each data.howTos as howTo}
		<HowToItem {howTo} />
	{/each}
</div>
