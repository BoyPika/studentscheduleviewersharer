<script lang="ts">
    import PocketBase from 'pocketbase';
    import { Card, Input, Button, ButtonGroup, InputAddon } from 'flowbite-svelte';
    import { UserCircleSolid, LockSolid, EnvelopeSolid } from 'flowbite-svelte-icons';
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
    const userId = pb.authStore.model.id;
    pb.autoCancellation(false);
    async function getUsername() {
        const user = await pb.collection('users').getOne(userId);
        document.getElementById('username').value = user.username;
    }
    async function getName() {
        const user = await pb.collection('users').getOne(userId);
        if (user.name) {
            document.getElementById('name').value = user.name;
        } else {
            document.getElementById('name').value = "Name";
        }
    }
    async function getEmail() {
        const user = await pb.collection('users').getOne(userId);
        document.getElementById('email').value = user.email;
    }
    async function handleSubmit() {
        const data = {
            "username": (document.getElementById('username') as HTMLInputElement).value,
            "email": (document.getElementById('email') as HTMLInputElement).value,
            "emailVisibility": true,
            "oldPassword": (document.getElementById('oldPassword') as HTMLInputElement).value,
            "password": (document.getElementById('password') as HTMLInputElement).value,
            "passwordConfirm": (document.getElementById('password') as HTMLInputElement).value,
            "name": (document.getElementById('name') as HTMLInputElement).value
        }
        if (data.name === "Name") {
            delete data.name;
        }
        //CW for those sensitive to stupid if statements
        if (data.oldPassword > 0) {
            if (data.password.length >= 8 && data.password.length <= 72){
                if (data.username.length >= 3 && data.username.length <= 150) {
                    await pb.collection('users').update(userid, data).catch((error) => {
                        console.error(error);
                    });
                } else {
                    alert("Username must be at least 3 characters long and less than 150 characters long")
                }
            } else {
                alert("Password must be at least 100 characters long and less than 72 characters long")
            }
        } else {
            if (data.username.length >= 3 && data.username.length <= 150) {
                await pb.collection('users').update(userId, data).catch((error) => {
                    console.error(error);
                });
            } else {
                alert("Username must be at least 3 characters long and less than 150 characters long")
            }
        }
    }
</script>
<Header/>
<main>
    <Card>
        <form on:submit|preventDefault={handleSubmit}>
            <h1 class="text-2xl font-semibold">Settings</h1> <br>
             <p>Username: </p>
             <ButtonGroup class="w-full">
                <InputAddon>
                       <UserCircleSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                 </InputAddon>
                 <Input type="text" id="username" placeholder="{getUsername()}"/>
                </ButtonGroup> <br>
                <p>Name (Optional): </p>
                <ButtonGroup class="w-full">
                   <InputAddon>
                       <UserCircleSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </InputAddon>
                   <Input type="text" id="name" placeholder="{getName()}"/>
                </ButtonGroup> <br>
                <p>Email: </p>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <EnvelopeSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input type="email" id="email" placeholder="{getEmail()}"/>
                </ButtonGroup> <br>
            <p>Password: </p>
            <ButtonGroup class="w-full">
                <InputAddon>
                    <LockSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input type="password" id="password" placeholder="•••••••"/>
            </ButtonGroup> <br>
            <p>Old Password: </p>
            <ButtonGroup class="w-full">
                <InputAddon>
                    <LockSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input type="password" id="oldPassword" placeholder="•••••••"/>
            </ButtonGroup> <br> <br>
            <Button class="w-full" type="submit">Save Settings</Button>
        </form>
    </Card>
</main>