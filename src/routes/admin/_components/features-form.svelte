<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import * as Form from '@/components/ui/form';
	import { Switch } from '@/components/ui/switch';
	import { updateFeaturesSchema, type UpdateFeaturesSchema } from '@/schemas/features';
	import { Loader2 } from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<UpdateFeaturesSchema>>;

	const form = superForm(data, {
		validators: zodClient(updateFeaturesSchema),
		taintedMessage: true,
		resetForm: false,
	});

	const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" action="?/updateFeatures" use:enhance>
	<Card.Root>
		<Card.Header>
			<Card.Title>Features</Card.Title>
			<Card.Description>Lorem Ipsum</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="max-w-2xl space-y-4">
				<Form.Field
					{form}
					name="howtos"
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<Form.Control let:attrs>
						<div class="space-y-0.5">
							<Form.Label>How Tos</Form.Label>
							<Form.Description>
								Enable this feature to allow users to create and share how-to guides.
							</Form.Description>
						</div>
						<Switch includeInput {...attrs} bind:checked={$formData.howtos} />
					</Form.Control>
				</Form.Field>
				<Form.Field
					{form}
					name="events"
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<Form.Control let:attrs>
						<div class="space-y-0.5">
							<Form.Label>Events</Form.Label>
							<Form.Description>
								Enable this feature to allow users to create and share events.
							</Form.Description>
						</div>
						<Switch includeInput {...attrs} bind:checked={$formData.events} />
					</Form.Control>
				</Form.Field>
				<Form.Field
					{form}
					name="map"
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<Form.Control let:attrs>
						<div class="space-y-0.5">
							<Form.Label>Map</Form.Label>
							<Form.Description>
								Enable this feature to allow users to create and share maps.
							</Form.Description>
						</div>
						<Switch includeInput {...attrs} bind:checked={$formData.map} />
					</Form.Control>
				</Form.Field>
				<Form.Field
					{form}
					name="academy"
					class="flex flex-row items-center justify-between rounded-lg border p-4"
				>
					<Form.Control let:attrs>
						<div class="space-y-0.5">
							<Form.Label>Academy</Form.Label>
							<Form.Description>
								Enable this feature to allow users to create and share courses.
							</Form.Description>
						</div>
						<Switch includeInput {...attrs} bind:checked={$formData.academy} />
					</Form.Control>
				</Form.Field>
			</div>
		</Card.Content>
		<Card.Footer>
			<Button type="submit" disabled={$submitting}>
				{#if $submitting}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Save Settings
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
