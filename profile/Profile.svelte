<script lang="ts">
    import PocketBase from 'pocketbase';
    import { Card, Input, Button, ButtonGroup, InputAddon } from 'flowbite-svelte';
    import { UserCircleSolid, LockSolid, EnvelopeSolid } from 'flowbite-svelte-icons';
    import Header from '../src/Header.svelte';
    import {onMount} from "svelte";
    const pb = new PocketBase('http://127.0.0.1:8090/');
    onMount(async () => {
        if (!pb.authStore.isValid) {
            window.location.assign("/login/");
        } else {
            console.log("User is Logged In");
            const classes = await pb.collection('users').getOne(userId);
            console.log(classes.classes);
        }
    });
    const userId = pb.authStore.model.id;
</script>
<Header/>
<main>
    <Card>
        <h1 class="text-2xl font-semibold">Settings</h1> <br>
        <h2>Current Classes:</h2>
        <ul>
            <li>Class 1</li>
            <li>Class 2</li>
            <li>Class 3</li>
        </ul>
    </Card>
</main>