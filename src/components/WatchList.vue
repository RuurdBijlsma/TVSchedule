<template>
    <div class="watch-list">
        <ul>
            <li v-for="id in watchList">{{id}}</li>
        </ul>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import _ from 'firebase/firestore';

    export default {
        name: "WatchList",
        data() {
            return {watchList: []}
        },
        async mounted() {
            const firestore = firebase.firestore();
            const auth = firebase.auth();
            const docRef = firestore.collection('users').doc(auth.currentUser.uid);
            let doc = await docRef.get();
            this.watchList = doc.data().watchList;
        }
    }
</script>

<style scoped>

</style>