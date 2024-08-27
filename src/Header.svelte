<script>
    import {Navbar, NavLi, NavBrand, NavHamburger, NavUl } from 'flowbite-svelte';
</script>
<Navbar  class="navbar">
    <NavBrand href="/">
        <img src="/assets/svelte.svg" class="me-3 h-10 sm:h-16" alt="[Placeholder] Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">[Placeholder] Hub</span>
    </NavBrand>
    <NavHamburger  />
    <NavUl >
        <NavLi href="/">Home</NavLi>
        <NavLi href="/login/">Log In</NavLi>
        <NavLi href="/signup/">Sign Up</NavLi>
    </NavUl>
</Navbar>