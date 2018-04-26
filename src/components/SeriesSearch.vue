<template>
    <div class="series-search">
        <div class="result-series">
            <h2 v-if="isSearching">Searching...</h2>
            <h2 v-else-if="results.length === 0">No results found for "{{searchQuery}}" :(</h2>
            <div class="series" v-for="series in results">
                <img v-if="series.banner !== ''" class="series-image"
                     v-bind:src="'https://www.thetvdb.com/banners/' + series.banner"/>
                <div class="series-info">
                    <h3 class="series-title">{{series.seriesName}}</h3>
                    <p class="series-desc">{{series.overview}}</p>
                </div>
                <div class="actions">
                    <div class="action" v-on:click="toggleSeries(series.id)">
                        <i class="material-icons" v-if="watchList.includes(series.id)" title="Remove from watchlist">check</i>
                        <i class="material-icons" v-else title="Add to watchlist">playlist_add</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import _ from 'firebase/firestore';
    import TvApi from '../js/TvApi';

    const api = new TvApi();

    export default {
        name: "SeriesSearch",
        props: ['searchQuery'],
        data() {
            return {
                results: [],
                isSearching: true,
                watchList: [],
                updateWatchList: false
            }
        },
        async mounted() {
            const firestore = firebase.firestore();
            const auth = firebase.auth();
            const docRef = firestore.collection('users').doc(auth.currentUser.uid);
            let doc = await docRef.get();
            this.watchList = doc.data().watchList;

            this.search();
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
            },
            removeSeries: async function (id) {
                this.watchList.splice(this.watchList.indexOf(id), 1);
            },
            search: async function () {
                console.log("SEARCH CALLED");
                this.isSearching = true;
                this.results = [];
                let result = (await api.search(this.searchQuery)).data;
                this.isSearching = false;
                if (result === undefined) {
                    return;
                }

                result.sort((a, b) => {
                    if (a.banner === "")
                        return 1;
                    else if (b.banner === "")
                        return -1;

                    if (a.status === "ended")
                        return 1;
                    else if (b.status === "ended")
                        return -1;

                    return new Date(b.firstAired) - new Date(a.firstAired);
                });

                this.results = result;
            }
        },
        watch: {
            searchQuery: function () {
                this.search();
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
    .result-series {
        display: flex;
        width: 100%;
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