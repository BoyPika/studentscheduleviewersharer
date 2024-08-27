<script lang="ts">
    import PocketBase from 'pocketbase';
    import { Label, Input, InputAddon, ButtonGroup, Card } from 'flowbite-svelte';
    import { EnvelopeSolid } from 'flowbite-svelte-icons';
    const pb = new PocketBase('http://127.0.0.1:8090/');
    import Header from '../src/Header.svelte';
    let regex = /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;
    async function resetPassword() {
        const data = {
            "email": (document.getElementById('email') as HTMLInputElement).value,
        }
        if (regex.test(data.email)) {
            await pb.collection('users').requestPasswordReset(data.email).catch((error) => {
                console.error(error);
            });
        } else {
            const email = await pb.collection('users').getList('username=' + data.email + '');
            console.log(email)
        }

    }
</script>
<Header/>
<main>
    <Card>
        <form on:submit|preventDefault={resetPassword}>
            <div class="mb-6">
                <Label for="email" class="block mb-2">Email/Username</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <EnvelopeSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input type="text" id="email" placeholder="Email/Username"/>
                </ButtonGroup>
            </div>
            <button type="submit" class="text-center font-medium focus-within:ring-4 focus-within:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800 rounded-lg w-full">Send Recovery Email</button>
        </form>
    </Card>
</main>