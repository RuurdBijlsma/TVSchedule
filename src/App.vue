<template>
    <div id="app">
        <front-page v-if="loggedIn" v-on:logout="logout" v-bind:username="username"></front-page>
        <login-page v-else></login-page>
    </div>
</template>

<script>
    import FrontPage from './components/FrontPage.vue'
    import LoginPage from './components/LoginPage';
    import firebase from 'firebase';
    import swal from 'sweetalert';

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyC-vrzDXHtEFGzbfOMWhKgRMxoMOpv2gXI",
        authDomain: "televisionschedule-69ccd.firebaseapp.com",
        databaseURL: "https://televisionschedule-69ccd.firebaseio.com",
        projectId: "televisionschedule-69ccd",
        storageBucket: "televisionschedule-69ccd.appspot.com",
        messagingSenderId: "303300331151"
    };
    firebase.initializeApp(config);

    export default {
        mounted(){
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.username = user.email;
                    this.loggedIn = true;
                } else {
                    this.loggedIn = false;
                }
            });
        },
        name: 'app',
        components: {
            LoginPage,
            FrontPage
        },
        data() {
            return {
                username: "",
                loggedIn: true
            }
        },
        methods: {
            logout: async function () {
                console.log('hier');
                try {
                    const auth = firebase.auth();
                    await auth.signOut();
                } catch (e) {
                    swal("Logout failed", e.message, "error");
                }
            }
        }
    }
</script>

<style>
    :root {
        --aside-width: 310px;
        --footer-height: 200px;
        --header-height: 110px;
        --primary-color: #db003c;
        --background-color: #222031;
        --foreground-color: #dcdecd;
        --card-color: #0000006e;
    }

    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;

        font-family: 'Montserrat', sans-serif;
    }

    #app {
        min-height: 100%;

        cursor: default;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;

        background-color: var(--background-color);
        color: var(--foreground-color);
        font-weight: normal;
    }

    ::-webkit-scrollbar {
        width: 10px;
        height: 0px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.20);
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb:active {
        background-color: rgba(0, 0, 0, 0.60);
    }

    *:focus {
        outline: none;
    }

    *:link, *:visited {
        color: white;
        text-decoration: none;
    }

    ::-moz-selection {
        color: white;
        background: var(--primary-color);
    }

    ::selection {
        color: white;
        background: var(--primary-color);
    }

    ::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    :-moz-placeholder {
        color: rgba(255, 255, 255, 0.4);
        opacity: 1;
    }

    ::-moz-placeholder {
        color: rgba(255, 255, 255, 0.4);
        opacity: 1;
    }

    :-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    input[type=text], input[type=password], input[type=email], input[type=number] textarea {
        cursor: text;
    }

    input[type='button'], input[type='submit'], a[href] {
        cursor: pointer;
    }
</style>
