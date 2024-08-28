<script lang="ts">
    import PocketBase from 'pocketbase';
    import { Label, Input, InputAddon, ButtonGroup, Card, Button, Img } from 'flowbite-svelte';
    import { UserCircleSolid, LockSolid } from 'flowbite-svelte-icons';
    const pb = new PocketBase('http://127.0.0.1:8090/');
    import Header from '../src/Header.svelte';
    async function handleSubmit() {
        const data = {
            "username": (document.getElementById('username') as HTMLInputElement).value,
            "password": (document.getElementById('password') as HTMLInputElement).value,
        }
        await pb.collection('users').authWithPassword(
            data.username,
            data.password
        ).catch(err => {
            console.error(err);
        }).then(() => {
            window.location.assign("/");
        });
    }
    async function discord(){
        await pb.collection('users').authWithOAuth2({ provider: 'discord' });
        window.location.assign("/");
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
            <Button class="w-full" type="submit">Login</Button>
            <div class="space-y-2 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Button class="w-full" on:click={discord}><Img src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/653714c1f22aef3b6921d63d_636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" width="48"  alt="Discord Logo" class="discordicon"/>Login With Discord</Button>
            </div>
        </form>
    </Card>
</main>