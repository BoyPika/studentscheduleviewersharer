<script lang="ts">
    import PocketBase from 'pocketbase';
    import { Card } from 'flowbite-svelte';
    const pb = new PocketBase('http://127.0.0.1:8090/');
    import Header from '../src/Header.svelte';
    import {onMount} from "svelte";
    onMount(async () => {
        if (!pb.authStore.isValid) {
            window.location.assign("/login/");
        } else {
            console.log("User is Logged In");
        }
    });
</script>
<Header/>
<main>
    <Card>
    </Card>
</main>