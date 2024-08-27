<script lang="ts">
    import PocketBase from 'pocketbase';
    import { Label, Input, InputAddon, ButtonGroup, Card, Checkbox, Button } from 'flowbite-svelte';
    import { UserCircleSolid, LockSolid, EnvelopeSolid } from 'flowbite-svelte-icons';
    const pb = new PocketBase('http://127.0.0.1:8090/');
    import Header from '../src/Header.svelte';
    async function handleSubmit() {
        const data = {
            "username": (document.getElementById('username') as HTMLInputElement).value,
            "email": (document.getElementById('email') as HTMLInputElement).value,
            "emailVisibility": true,
            "password": (document.getElementById('password') as HTMLInputElement).value,
            "passwordConfirm": (document.getElementById('password') as HTMLInputElement).value
        }
        await pb.collection('users').create(data).catch((error) => {
            console.error(error);
        });
    }
</script>
<Header/>
<main>
    <Card>
        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-6">
                <Label for="username" class="block mb-2">Username</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <UserCircleSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input type="text" id="username" placeholder="Username"/>
                </ButtonGroup>
            </div>
            <div class="mb-6">
                <Label for="email" class="block mb-2">Email Address</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <EnvelopeSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input type="email" id="email" placeholder="Email"/>
                </ButtonGroup>
            </div>
            <div class="mb-6">
                <Label for="password" class="block mb-2">Password</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <LockSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input type="password" id="password" placeholder="•••••••"/>
                </ButtonGroup>
            </div>
            <div class="flex items-start">
                <a href="/forgotpassword/" class="ms-auto text-sm text-primary-500 hover:underline dark:text-primary-300 hover:text-primary-50"> Forgot password? </a>
            </div><br>
            <button type="submit" class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800 rounded-lg w-full">Login to your account</button>
        </form>
    </Card>
</main>