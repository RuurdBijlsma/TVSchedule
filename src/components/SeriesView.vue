<template>
    <div class="series-view">
        <div class="series" v-for="series in results">
            <img v-if="series.banner !== ''" class="series-image"
                 v-bind:src="'https://www.thetvdb.com/banners/' + series.banner"/>
            <div class="series-info">
                <h3 class="series-title">{{series.seriesName}}</h3>
                <p class="series-desc">{{series.overview}}</p>
            </div>
            <div class="actions">
                <div class="action" v-on:click="toggleSeries(series.id)">
                    <i class="material-icons" v-if="watchList.includes(series.id)"
                       title="Remove from watchlist">check</i>
                    <i class="material-icons" v-else title="Add to watchlist">playlist_add</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import _ from 'firebase/firestore';
    import TvApi from '../js/TvApi';

    export default {
        async mounted() {
            const firestore = firebase.firestore();
            const auth = firebase.auth();
            const docRef = firestore.collection('users').doc(auth.currentUser.uid);
            let doc = await docRef.get();
            this.watchList = doc.data().watchList;
        },
        name: "SeriesView",
        props: ['results', 'token'],
        data() {
            return {
                watchList: [],
                api: new TvApi("")
            }
        },
        methods: {
            toggleSeries: function (id) {
                if (this.watchList.includes(id)) {
                    this.removeSeries(id);
                } else {
                    this.addSeries(id);
                }
            },
            addSeries: async function (id) {
                this.watchList.push(id);
                this.saveSeriesInfo(id);
            },
            removeSeries: async function (id) {
                this.watchList.splice(this.watchList.indexOf(id), 1);
            },
            saveSeriesInfo: async function (id) {
                id = id.toString();
                const firestore = firebase.firestore();
                const document = await firestore.collection('series').doc(id).get();
                if (!document.exists) {
                    console.log("New series found, saving to database");
                    const info = (await this.api.series(id)).data;
                    info.added = new Date(info.added);
                    info.firstAired = new Date(info.firstAired);

                    await firestore.collection("series").doc(id).set(info);
                    console.log("Save complete");
                }
            },
        },
        watch: {
            token: function () {
                this.api.token = this.token;
            },
            watchList: async function () {
                if (!this.updateWatchList) {
                    this.updateWatchList = true;
                    return;
                }

                const firestore = firebase.firestore();
                const auth = firebase.auth();
                const docRef = firestore.collection('users').doc(auth.currentUser.uid);

                await firestore.runTransaction(transaction => {
                    return transaction.get(docRef).then(snapshot => {
                        transaction.update(docRef, 'watchList', this.watchList);
                    });
                });

                console.log('watchlist updated');
            }
        }
    }
</script>

<style scoped>
    .series-view {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .series {
        display: flex;
        flex-basis: calc(50% - 40px);
        flex-grow: 1;
        flex-direction: column;
        background-color: var(--card-color);
        border-radius: 5px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        margin: 20px;
        justify-content: space-between;
    }

    .series-image {
        width: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .series-info {
        display: flex;
        flex-direction: column;
        padding: 10px;
        font-size: 14px;
    }

    .series-desc {
        overflow: hidden;
        opacity: 0.8;
        max-height: 57px;
    }

    .actions {
        padding: 10px;
        display: flex;
        flex-direction: row;
    }

    .action {
        display: flex;
        cursor: pointer;
    }

    .action:hover > .material-icons {
        color: var(--primary-color);
    }

    .material-icons {
        color: var(--foreground-color);
        transition: 0.2s;
    }
</style>