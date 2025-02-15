<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Avatar from '@/components/ui/avatar';
	import { Button } from '@/components/ui/button';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import type { UserProfile, UserRole } from '@/types/types';

	export let role: UserRole;
	export let profile: UserProfile;

	$: initials = profile.display_name
		.split(' ')
		.map((name) => name[0])
		.join('');

	let signOutForm: HTMLFormElement;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src="/avatars/user.png" alt={profile.display_name} />
				<Avatar.Fallback>{initials}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{profile.display_name}</p>
				<p class="text-xs leading-none text-muted-foreground">{profile.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/users/me">
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item href="/settings">
				Settings
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			{#if role === 'moderator' || role === 'admin'}
				<DropdownMenu.Item href="/moderation/users">
					Moderation
					<DropdownMenu.Shortcut>⌘M</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			{/if}
			{#if role === 'admin'}
				<DropdownMenu.Item href="/admin">
					Admin
					<DropdownMenu.Shortcut>⌘A</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			{/if}
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<form method="post" action="/?/signout" use:enhance bind:this={signOutForm}>
			<DropdownMenu.Item on:click={() => signOutForm.requestSubmit()}>Log out</DropdownMenu.Item>
		</form>
	</DropdownMenu.Content>
</DropdownMenu.Root>
