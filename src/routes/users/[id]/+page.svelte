<script lang="ts">
	import { page } from '$app/stores';
	import FeatureWrapper from '@/components/feature-wrapper.svelte';
	import PageHeader from '@/components/page-header.svelte';
	import * as Avatar from '@/components/ui/avatar';
	import { Button } from '@/components/ui/button';
	import * as Card from '@/components/ui/card';
	import { Mail, Map, SquareArrowOutUpRight } from 'lucide-svelte';

	export let data;

	$: initials = data.userProfile.display_name
		.split(' ')
		.map((name) => name[0])
		.join('');
</script>

<PageHeader
	title="User Profile"
	subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
/>
<div class="container mx-auto mb-20 flex max-w-3xl flex-col gap-y-8 md:gap-y-10">
	<Card.Root>
		<Card.Header>
			<div class="flex flex-row items-center gap-x-4">
				<Avatar.Root class="h-20 w-20">
					<Avatar.Image src="/avatars/user.png" alt={data.userProfile.display_name} />
					<Avatar.Fallback>{initials}</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<Card.Title class="text-xl">{data.userProfile.display_name}</Card.Title>
					<Card.Description class="text-lg">
						{data.userProfile.type}
					</Card.Description>
				</div>
			</div>
		</Card.Header>
		<Card.Content class="space-y-4">
			<p>{data.userProfile.description}</p>
			<div class="flex flex-row gap-x-4">
				<Button href="mailto:{data.userProfile.email}" variant="outline">
					<Mail class="mr-2 h-4 w-4" />
					Email
				</Button>
				{#if data.mapPin}
					<Button href="/map?lng={data.mapPin.lng}&lat={data.mapPin.lat}&zoom=10" variant="outline">
						<Map class="mr-2 h-4 w-4" />
						View on Map
					</Button>
				{/if}
			</div>
			{#if $page.url.pathname === '/users/me'}
				<Button href="/user/me/edit">Edit Profile</Button>
			{/if}
		</Card.Content>
	</Card.Root>
	<FeatureWrapper feature="howtos">
		<Card.Root>
			<Card.Header>
				<Card.Title>How Tos</Card.Title>
				<Card.Description>List of How To guides created by the user</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if data.howTos && data.howTos.length > 0}
					<div class="flex flex-col items-start gap-y-4">
						{#each data.howTos as howTo}
							<Button href="/how-to/{howTo.id}" variant="outline">
								{howTo.label}
								<SquareArrowOutUpRight class="ml-2 h-4 w-4 text-muted-foreground" />
							</Button>
						{/each}
					</div>
				{:else}
					<p class="text-sm text-muted-foreground">User has not created any How Tos</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</FeatureWrapper>
	<FeatureWrapper feature="events">
		<Card.Root>
			<Card.Header>
				<Card.Title>Events</Card.Title>
				<Card.Description>List of Events created by the user</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if data.events && data.events.length > 0}
					<div class="flex flex-col items-start gap-y-4">
						{#each data.events as event}
							<Button href="/events/{event.id}" variant="outline">
								{event.label}
								<SquareArrowOutUpRight class="ml-2 h-4 w-4 text-muted-foreground" />
							</Button>
						{/each}
					</div>
				{:else}
					<p class="text-sm text-muted-foreground">User has not created any Events</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</FeatureWrapper>
</div>
