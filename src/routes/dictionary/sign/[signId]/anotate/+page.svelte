<script lang="ts">
	import { themes } from '@/themes';

	export let data;
</script>

{#each data.parameters as parameters}
	{parameters.code}
{/each}
