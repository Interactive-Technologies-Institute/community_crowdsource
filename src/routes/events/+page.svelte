<script lang="ts">
	import PageHeader from '@/components/page-header.svelte';
	import SortButton from '@/components/sort-button.svelte';
	import TagFilterButton from '@/components/tag-filter-button.svelte';
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { nullableQueryParam } from '@/utils';
	import { PlusCircle } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import EventItem from './_components/event-item.svelte';

	export let data;

	const search = queryParam('s', nullableQueryParam(ssp.string()), {
		debounceHistory: 1000,
	});

	const tags = queryParam('tags', nullableQueryParam(ssp.array<string>()));
</script>

<PageHeader title="Events" subtitle="Find & share events" />
<div class="container mx-auto flex flex-row justify-between gap-x-2">
	<div class="flex flex-1 flex-row gap-x-2 sm:gap-x-4 md:flex-auto">
		<Input placeholder="Search..." class="flex-1 sm:max-w-64" bind:value={$search}></Input>
		<TagFilterButton tags={data.tags} bind:filterValues={$tags} />
		<SortButton />
	</div>
	<Button href="/events/create" class="w-10 p-0 sm:w-auto sm:px-4 sm:py-2">
		<PlusCircle class="h-4 w-4 sm:mr-2" />
		<span class="sr-only sm:not-sr-only">Create Event</span>
	</Button>
</div>
<div class="container mx-auto grid grid-cols-1 gap-6 py-10 lg:grid-cols-2">
	{#each data.events as event}
		<EventItem {event}></EventItem>
	{/each}
</div>
