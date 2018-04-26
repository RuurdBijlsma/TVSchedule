<template>
    <div class="login-page">
        <form @submit.prevent="login">
            <h2>Login</h2>
            <p>E-mail</p>
            <input class="text-input" type="email" name="email" placeholder="example@mail.com" v-model="email">
            <div class="center-passwords">
                <p>Password</p>
                <input type="button" value="Reset password" class="forgot-password" v-on:click="forgotPassword">
            </div>
            <input class="text-input" type="password" name="password" placeholder="********" v-model="password">
            <div class="buttons">
                <input class="register-button" type="button" value="Register" v-on:click="register">
                <input class="login-button" type="submit" value="Login" v-on:click="login">
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import _ from 'firebase/firestore';
    import swal from 'sweetalert';

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
                const auth = firebase.auth();

                try {
                    await auth.signInWithEmailAndPassword(this.email, this.password);
                } catch (e) {
                    swal("Login failed", e.message, "error");
                }
            },
            register: async function () {
                const firestore = firebase.firestore();
                const auth = firebase.auth();

                try {
                    await auth.createUserWithEmailAndPassword(this.email, this.password);
                    let user = auth.currentUser;
                    await user.sendEmailVerification();
                    await firestore.collection('users').doc(user.uid).set({
                        uid: user.uid,
                        email: user.email,
                        watchList: []
                    });
                } catch (e) {
                    swal("Registering failed", e.message, "error");
                }
            },
            forgotPassword: async function () {
                const auth = firebase.auth();
                try {
                    await auth.sendPasswordResetEmail(this.email);
                    swal("Password reset email sent!", "", "success");
                } catch (e) {
                    swal("Forgot password failed", e.message, "error");
                }
            }
        }
    }
</script>

<style scoped>
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 100000000s ease-in-out 0s;
        -webkit-text-fill-color: var(--foreground-color) !important;
    }

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

    .center-passwords {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    form > p {
        margin-top: 15px;
    }

    .forgot-password {
        font-family: Montserrat, sans-serif;
        display: inline-block;
        width: 120px;
        text-align: right;
        background-color: transparent;
        border: none;
        color: var(--primary-color);
        float: right;
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