<script>
    import {Navbar, NavLi, NavBrand, NavHamburger, NavUl } from 'flowbite-svelte';
    import PocketBase from "pocketbase";
    const pb = new PocketBase('http://127.0.0.1:8090/');
    async function logout() {
        await pb.authStore.clear()
        window.location.assign("/");
    }
</script>
<Navbar class="navbar">
    <NavBrand href="/">
        <img src="/assets/svelte.svg" class="me-3 h-10 sm:h-16" alt="[Placeholder] Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">[Placeholder] Hub</span>
    </NavBrand>
    <NavHamburger  />
    {#if pb.authStore.isValid}
        <NavUl >
            <NavLi href="/settings/">Profile</NavLi>
            <NavLi href="/login/" on:click={logout}>Log Out</NavLi>
        </NavUl>
        {:else}
        <NavUl >
            <NavLi href="/">Home</NavLi>
            <NavLi href="/login/">Log In</NavLi>
            <NavLi href="/signup/">Sign Up</NavLi>
        </NavUl>
    {/if}
</Navbar>