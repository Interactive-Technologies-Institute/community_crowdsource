<script lang="ts">
    export let data;
   
</script>

<div class="flex items-center justify-center min-h-scree">
    <div class="text-center space-y-4">
        {#if data.sign}
            <h1 class="text-3xl font-bold">Sign Information</h1>
            <p class="text-lg">Sign Name: {data.sign.name}</p>
            <p class="text-lg">Sign Gesture:</p>
            <div>
                <video class="aspect-video rounded-lg mx-auto" controls>
                    <track kind="captions">
                    <source src="{data.sign.video}" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <p class="text-lg">Sign was last changed at: {data.sign.last_changed}</p>
            <p class="text-lg">Sign was created in: {data.sign.created_at}</p>
            <p class="text-lg">Sign's themes are: {data.sign.theme}</p>
            <p class="text-lg">Sign's id is : {data.sign.id}</p>
        {/if}
    </div>
</div>
