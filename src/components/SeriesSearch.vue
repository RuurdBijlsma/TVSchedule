<template>
    <div class="series-search">
        <content-header v-bind:value="'Search'" v-bind:icon="'search'"></content-header>
        <div class="result-series">
            <h2 v-if="isSearching">Searching...</h2>
            <h2 v-else-if="results.length === 0">No results found for "{{searchQuery}}" :(</h2>
            <series-view v-bind:results="results" v-bind:token="token"></series-view>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import _ from 'firebase/firestore';
    import TvApi from '../js/TvApi';
    import SeriesView from "./SeriesView";
    import ContentHeader from "./ContentHeader";

    export default {
        name: "SeriesSearch",
        components: {ContentHeader, SeriesView},
        props: ['searchQuery', 'token'],
        data() {
            return {
                api: new TvApi(""),
                results: [],
                isSearching: true,
                watchList: [],
                updateWatchList: false
            }
        },
        async mounted() {
            this.search();
        },
        methods: {
            search: async function () {
                this.isSearching = true;
                this.results = [];
                let result = await this.api.search(this.searchQuery);
                console.log(result);
                result = result.data;
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
            token: function () {
                this.api.token = this.token;
            },
            searchQuery: function () {
                this.search();
            },
        }
    }
</script>

<style scoped>
    .result-series {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 100%;
    }

</style>