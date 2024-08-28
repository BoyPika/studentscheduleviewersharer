<script lang="ts">
    import PocketBase from 'pocketbase';
    import { Label, Input, InputAddon, ButtonGroup, Card, Button } from 'flowbite-svelte';
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
            //const email = await pb.collection('users').getList('username=' + data.email + '');
            //console.log(email)
            // i'm holding off on this; should probably do a forgot email page for this instead
        }

    }
</script>
<Header/>
<main>
    <Card>
        <form on:submit|preventDefault={resetPassword}>
            <div class="mb-6">
                <Label for="email" class="block mb-2">Email</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <EnvelopeSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </InputAddon>
                    <Input type="email" id="email" placeholder="Email"/>
                </ButtonGroup>
            </div>
            <Button class="w-full" type="submit">Send Recovery Email</Button>
        </form>
    </Card>
</main>