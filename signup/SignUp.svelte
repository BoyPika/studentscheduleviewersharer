<script lang="ts">
    import PocketBase from 'pocketbase';
    import { Label, Input, InputAddon, ButtonGroup, Card, Img, Button } from 'flowbite-svelte';
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

        //CW for those sensitive to stupid if statements
        if (data.password.length >= 8 && data.password.length <= 72){
            if (data.username.length >= 3 && data.username.length <= 150) {
                await pb.collection('users').create(data).catch((error) => {
                    console.error(error);
                }).then(() => {
                    window.location.assign("/");
                });
            } else {
                alert("Username must be at least 3 characters long and less than 150 characters long")
            }
        } else {
            alert("Password must be at least 100 characters long and less than 72 characters long")
        }

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
            </div><br>
            <Button class="w-full" type="submit">Sign Up</Button>
            <div class="space-y-2 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Button class="w-full" on:click={discord}><Img src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/653714c1f22aef3b6921d63d_636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" width="48"  alt="Discord Logo" class="discordicon"/>Sign Up With Discord</Button>
            </div>
        </form>
    </Card>
</main>