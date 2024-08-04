<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';
	import { type Writable } from 'svelte/store';
	import { toast } from "svelte-sonner";


	type AnnotationArray = {
		configuration: any[];
		movement: any[];
		location: any[];
		orientation: any[];
		expression: any[];
	}

	export let data: any;
	export let currentTab: String;
	export let anotationArray: AnnotationArray
	export let isParSelected :  Writable<Map<any, boolean>>
	export let signsAnotation = new Map<number, AnnotationArray>();
	export let sign : any;
	export let exist_changes : boolean
	

	let open = false


	data.parameters.forEach((parameter : any) => {
		if(parameter.is_parent){

		}
	});

	
	export function updateSelectedState(id: any, isSelected: boolean) {
    isParSelected.update(map => {
        const newMap = new Map(map);
        newMap.set(id, isSelected);
        return newMap;
    });
	}

	function useToast(message: number){

		open = false;

		if(message == 0){
			toast('A editar nome e temas', {
			action: {
				label: 'Ok',
				onClick: () => {}
			},})
		} else if (message == 1) {
			toast('Alterações guardadas!', {
			action: {
				label: 'Ok',
				onClick: () => reloadPage()
			},})
		} else if (message == 2){
			toast('Tem anotações por guardar!', {
			action: {
				label: 'Ok',
				onClick: () => {}
			},})
		} else if (message == 3){
			toast('Anotação guardada!', {
			action: {
				label: 'Ok',
				onClick: () => reloadPage()
			},})
		}
	}

	function getElementByCode(código : any) {
    	return data.parameters.find((item: { código: any; }) => item.código === código);
	}

	function getParameterById(id : any) {
        return data.parameters.find((item: { id: any; }) => item.id === id);
    }

	function selectParameter(id: any, tipo: any){

		let isSelected = $isParSelected.get(id);
		
		updateSelectedState(id, !isSelected)	


		const updateAnnotationArray = (type: keyof AnnotationArray, id: any) => {
			if (!isSelected) {
				console.log(id); //keep them for debugging if need be
				console.log(anotationArray);
				anotationArray[type].push(id);
				signsAnotation.set(sign.id, anotationArray);
				if (!exist_changes) {
					useToast(2);
				}
				exist_changes = true;
			} else {
				anotationArray[type] = anotationArray[type].filter(e => e !== id);
				if (!exist_changes) {
					useToast(2);
				}
				exist_changes = true;
			}
		};
		
		switch (tipo) {
			case "configuracao":
				updateAnnotationArray('configuration', id);
				break;
			case "movimento":
				updateAnnotationArray('movement', id);
				break;
			case "localizacao":
				updateAnnotationArray('location', id);
				break;
			case "orientacao":
				updateAnnotationArray('orientation', id);
				break;
			case "expressao facial":
				updateAnnotationArray('expression', id);
				break;
		}
	}
	

	function reloadPage() {
    	window.location.reload();
    }

	
</script>
<ScrollArea class="flex h-[22rem] pt-4">
	<div class="grid grid-cols-3 gap-4">
		{#each data.parameters as par}
			{#if par.is_parent && par.tipo == currentTab}  
				{#if par.children.length == 0}
					<button on:click={() => selectParameter(par.id, par.tipo)}>
						{#if $isParSelected.get(par.id)}
							<Card.Root class="flex flex-col items-center justify-center w-96 h-max gap-3 pt-2" style="border: 2px solid #0096FF;">
									<Card.Content class="flex flex-col gap-2">
										<div class="flex flex-col items-center justify-center">
											{#if par.tipo == "configuracao"}
												<img class="flex w-14" src={par.image} alt=""/>
												{par.código}
											{:else if par.image == null}
												{#if par.nome !=null}
													{par.nome}
													{par.código}
												{:else}
													{par.código}
												{/if}
											{/if}
										</div>
									</Card.Content>
								</Card.Root>
						{:else}
							<Card.Root class="flex flex-col items-center justify-center w-96 h-auto gap-3 pt-2">
								<Card.Content class="flex flex-col gap-2">
									<div class="flex flex-col items-center justify-center">
										{#if par.tipo == "configuracao"}
											<img class="flex w-14" src={par.image} alt=""/>
											{par.código}
										{:else if par.image == null}
											{#if par.nome != null}
												{par.nome}
												{par.código}
											{:else}
												{par.código}
											{/if}
										{/if}
									</div>
								</Card.Content>
							</Card.Root>
						{/if}
					</button>
				{:else}
					<Card.Root>
						<Card.Content class="flex flex-col items-center justify-center w-96 h-fit gap-3 pt-2">
							<button on:click={() => selectParameter(par.id, par.tipo)}>
								{#if $isParSelected.get(par.id)}
									<Card.Root class="flex items-center justify-center aspect-square w-32" style="border: 2px solid #0096FF;">
											<Card.Content class="flex flex-col gap-2">
												<div class="flex flex-col items-center justify-center">
													{#if par.tipo == "configuracao"}
														<img class="flex w-14" src={par.image} alt=""/>
														{par.código}
													{:else if par.image == null}
														{#if par.nome !=null}
															{par.nome}
															{par.código}
														{:else}
															{par.código}
														{/if}
													{/if}
												</div>
											</Card.Content>
										</Card.Root>
								{:else}
									<Card.Root class="flex items-center justify-center aspect-square w-32">
										<Card.Content class="flex flex-col gap-2">
											<div class="flex flex-col items-center justify-center">
												{#if par.tipo == "configuracao"}
													<img class="flex w-14" src={par.image} alt=""/>
													{par.código}
												{:else if par.image == null}
													{#if par.nome !=null}
														{par.nome}
														{par.código}
													{:else}
														{par.código}
													{/if}
												{/if}
											</div>
										</Card.Content>
									</Card.Root>
								{/if}
							</button>

							{#if par.children.length > 0}
								<div class="grid grid-cols-3 gap-4">
									{#each par.children as child}
										{#if child != null}
											<button on:click={() => selectParameter(getElementByCode(child).id, getElementByCode(child).tipo)}>
												{#if $isParSelected.get(getElementByCode(child).id)}
													<Card.Root class="flex flex-col items-center justify-center aspect-square w-28"  style="border: 2px solid #0096FF;">
														<Card.Content>
															<img class="flex w-14" src={getElementByCode(child).image} alt=""/>
															<div class="flex text-xs">
																{child}
															</div>
														</Card.Content>
													</Card.Root>
												{:else}
													<Card.Root class="flex flex-col items-center justify-center aspect-square w-28">
														<Card.Content>
															<img class="flex w-14" src={getElementByCode(child).image} alt=""/>
															<div class="flex text-xs">
																{child}
															</div>
														</Card.Content>
													</Card.Root>
												{/if}
											</button>
										{/if}
									{/each}
								</div>
							{/if}
						</Card.Content>
					</Card.Root>
				{/if}
			{/if}
		{/each}
	</div>

</ScrollArea>
