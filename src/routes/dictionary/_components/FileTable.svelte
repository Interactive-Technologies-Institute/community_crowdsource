<script lang="ts">
	import { writable } from 'svelte/store';
	import Button from '@/components/ui/button/button.svelte';
	import CheckmarkCircle from '$lib/img/checkmark_circle.svelte';
	import CheckmarkCircleFill from '$lib/img/checkmark_circle_fill.svelte';
	import PencilCircleFill from '$lib/img/pencil_circle_fill.svelte';
	import * as Table from '$lib/components/ui/table';
	import type { Sign } from '@/types/types';

	// Accept an object with `signs` property
	export let data: { signs: Sign[] } = { signs: [] };
	export let theme_options: any;
	export let anotation_options: any;
	export let selection: boolean;
	export let signs_to_delete: number[] = [];

	const ordered_data = writable(data.signs);
	$: ordered_data.set(data.signs);

	function getSignById(id: number) {
		return data.signs.find((item: { id: number }) => item.id === id);
	}

	function themeShown(themeName: string[], options: any): boolean {
		return options.some((option: any) => themeName.includes(option.name) && option.show);
	}

	function anotationShown(anotation: number, options: any): boolean {
		const anotation_name = anotation === 1 ? "Anotação não terminada" :
							 anotation === 2 ? "Anotados" : "Por anotar";
		return options.some((option: any) => anotation_name === option.name && option.show);
	}

	function selectSigns(sign_id: number) {
		const sign = getSignById(sign_id);
		if (sign) {
			if (sign.selected) {
				signs_to_delete.push(sign_id);
			} else {
				const index = signs_to_delete.indexOf(sign_id);
				if (index > -1) {
					signs_to_delete.splice(index, 1);
				}
			}
		}
	}
</script>

<div class="px-10">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				{#if selection}
					<Table.Head></Table.Head>
				{/if}
				<Table.Head>Gesto</Table.Head>
				<Table.Head>Tags</Table.Head>
				<Table.Head>Data de Criação</Table.Head>
				<Table.Head>Última alteração</Table.Head>
				<Table.Head class="flex justify-center">Anotação</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $ordered_data as sign}
				{#if themeShown(sign.theme, theme_options) && anotationShown(sign.is_annotated, anotation_options) && !selection}
					<Table.Row class="cursor-pointer content-center">
						<Table.Cell class="font-medium"> {sign.name} </Table.Cell>
						<Table.Cell> {sign.theme} </Table.Cell>
						<Table.Cell>{new Date(sign.created_at).toLocaleDateString()}</Table.Cell>
						<Table.Cell>{new Date(sign.last_changed).toLocaleDateString()}</Table.Cell>
						<Table.Cell class="flex justify-center">
							{#if sign.is_annotated === 2}
								<PencilCircleFill color={"#c1e1c1"}/>
							{:else if sign.is_annotated === 1}
								<PencilCircleFill color={"#ffdfba"} />
							{:else}
								<PencilCircleFill color={"#ffb3ba"}/>
							{/if}
						</Table.Cell>
					</Table.Row>
				{:else if themeShown(sign.theme, theme_options) && anotationShown(sign.is_annotated, anotation_options) && selection}
					<Table.Row class="cursor-pointer content-center">
						<Table.Cell>
							{#if selection}
								<Button class="flex h-4" variant="ghost" on:click={() => {
									sign.selected = !sign.selected;
									selectSigns(sign.id);
								}}>
									{#if !sign.selected}
										<CheckmarkCircle />
									{:else}
										<CheckmarkCircleFill />
									{/if}
								</Button>
							{/if}
						</Table.Cell>
						<Table.Cell class="font-medium"> {sign.name} </Table.Cell>
						<Table.Cell> {sign.theme} </Table.Cell>
						<Table.Cell>{new Date(sign.created_at).toLocaleDateString()}</Table.Cell>
						<Table.Cell>{new Date(sign.last_changed).toLocaleDateString()}</Table.Cell>
						<Table.Cell class="flex justify-center">
							{#if sign.is_annotated === 2}
								<PencilCircleFill color={"#c1e1c1"}/>
							{:else if sign.is_annotated === 1}
								<PencilCircleFill color={"#ffdfba"} />
							{:else}
								<PencilCircleFill color={"#ffb3ba"}/>
							{/if}
						</Table.Cell>
					</Table.Row>
				{/if}
			{/each}
		</Table.Body>
	</Table.Root>
</div>
