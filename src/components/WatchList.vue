<template>
    <div class="watch-list">
        <content-header v-bind:icon="'playlist_add'" v-bind:value="'Watch List'"></content-header>
        <series-view v-bind:results="infoList" v-bind:token="token" v-on:toggle="toggleList"></series-view>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import _ from 'firebase/firestore';
    import SeriesView from "./SeriesView";
    import TvApi from '../js/TvApi';
    import ContentHeader from "./ContentHeader";

    export default {
        name: "WatchList",
        props: ['token'],
        components: {ContentHeader, SeriesView},
        data() {
            return {
                watchList: [],
                infoList: []
            }
        },
        methods: {
            toggleList: function (id) {
                console.log('toggle', id);
            }
        },
        async mounted() {
            const firestore = firebase.firestore();
            const auth = firebase.auth();
            const docRef = firestore.collection('users').doc(auth.currentUser.uid);
            let doc = await docRef.get();
            this.watchList = doc.data().watchList;

            this.infoList = [];
            for (let seriesId of this.watchList) {
                firestore.collection('series').doc(seriesId.toString()).get().then(seriesInfo => {
                    console.log(seriesInfo);
                    this.infoList.push(seriesInfo.data());
                });
            }
        },
        watch: {
            token: function () {
                this.api = new TvApi(this.token);
            }
        }
    }
</script>

<style scoped>

</style>