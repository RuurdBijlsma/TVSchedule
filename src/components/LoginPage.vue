<template>
    <div class="login-page">
        <form>
            <h2>Login</h2>
            <p>E-mail</p>
            <input class="text-input" type="email" name="email" placeholder="example@mail.com" v-model="email">
            <p>Password</p>
            <input class="text-input" type="password" name="password" placeholder="********" v-model="password">
            <div class="buttons">
                <input class="register-button" type="button" value="Register" v-on:click="register()">
                <input class="login-button" type="button" value="Login" v-on:click="login()">
            </div>
        </form>
    </div>
</template>

<script>
    import FireBase from 'firebase';


    export default {
        name: "LoginPage",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            login: async function () {
                const auth = FireBase.auth();
                console.log(this.email, this.password);
                let credentials;
                try {
                    credentials = await auth.signInWithEmailAndPassword(this.email, this.password);
                } catch (e) {
                    console.warn("Login failed", e.message);
                }
                console.log("Login success!", credentials);
            },
            register: async function () {
                const auth = FireBase.auth();
                let credentials;
                try {
                    credentials = await auth.createUserWithEmailAndPassword(this.email, this.password);
                } catch (e) {
                    console.warn("Register failed", e.message);
                }
                console.log("Register success!", credentials);
            }
        }
    }
</script>

<style scoped>
    .login-page {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    form {
        text-align: left;
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        background-color: var(--card-color);
        font-size: 13px;
        border-radius: 5px;
        box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.65);
        padding: 20px;
        position: relative;
        top: 50px;
    }

    form > p {
        margin-top: 15px;
    }

    h2 {
        text-align: center;
    }

    .text-input {
        border-radius: 4px;
        border: 0px;
        padding: 10px;
        font-size: 16px;
        margin: 5px 0;
        background-color: rgba(255, 255, 255, 0.15);
        color: var(--foreground-color);
        font-weight: bold;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .buttons input {
        padding: 10px 20px;
        border-radius: 4px;
        border: none;
        font-weight: bold;
        color: var(--foreground-color);
        background-color: var(--card-color);
        transition: background-color 0.2s;
    }

    .login-button {
        box-shadow: inset 0px 0px 0px 1px var(--primary-color) !important;
    }

    .register-button:hover {
        background-color: var(--foreground-color);
        color: var(--background-color);
    }

    .login-button:hover {
        background-color: var(--primary-color);
    }
</style>