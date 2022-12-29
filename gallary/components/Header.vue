<template>
    <div id="container">
        <ul class="navi_container">
            <NuxtLink to="/"><li class="navi">Material</li></NuxtLink>
            <NuxtLink to="/shadow"><li class="navi">Shadow</li></NuxtLink>
            <NuxtLink to="/camera"><li class="navi">Camera / Fog</li></NuxtLink>
        </ul>
    </div>    
</template>

<style scoped>
a {
    color: gray;
    text-decoration: none;
}

#container {
    margin: 3rem 0;
    display: flex;
    justify-content: center;
}

.navi_container {
    list-style: none;
    display: flex;
    width: 80vw;
}

.navi {
    text-align: center;
    margin: 0 0.5rem;
    padding: 0.7rem 1.2rem;
    min-width: 10rem;
    border: 1px solid gray;
    color: gray;
    border-radius: 2rem;
}
</style>

<style>
a.nuxt-link-exact-active .navi{
    text-align: center;
    margin: 0 0.5rem;
    padding: 0.7rem 1.2rem;
    min-width: 10rem;
    border: 1px solid #3d03fc;
    color: #3d03fc;
    border-radius: 2rem;
}
</style>