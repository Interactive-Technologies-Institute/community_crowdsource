<script lang="ts">
	import { page } from '$app/stores';
	import PageHeader from '@/components/page-header.svelte';
	import * as Tabs from '@/components/ui/tabs';

	$: path = $page.url.pathname.split('/').pop();
</script>

<PageHeader title="Moderation" subtitle="Moderate user content" />
<div class="container mx-auto mb-20">
	<Tabs.Root value={path}>
		<Tabs.List>
			<Tabs.TriggerLink href="/moderation/users" value="users">Users</Tabs.TriggerLink>
			<Tabs.TriggerLink href="/moderation/how-to" value="how-to">How To</Tabs.TriggerLink>
			<Tabs.TriggerLink href="/moderation/events" value="events">Events</Tabs.TriggerLink>
			<Tabs.TriggerLink href="/moderation/map" value="map">Map</Tabs.TriggerLink>
		</Tabs.List>
		<slot />
	</Tabs.Root>
</div>
