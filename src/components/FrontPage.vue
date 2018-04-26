<template>
    <div class="front-page">
        <header class="header">
            <div class="logo-section">
                <div class="logo">
                    <div class="logo-image"></div>
                    <div class="logo-text">
                        <p>Television</p>
                        <p>Schedule</p>
                    </div>
                </div>
            </div>
            <div class="search-section">
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="Search series" v-model="query"
                           v-on:keydown="checkSearchKey">
                    <i v-on:click="search" class="material-icons search-icon">search</i>
                </div>
            </div>
            <div class="user-section">
                <div class="user" v-on:click="logout" title="Click to sign out">
                    <i class="material-icons user-face">face</i>
                    <span class="user-name">{{username}}</span>
                </div>
            </div>
        </header>
        <aside class="left-menu">
            <div class="menu-items">
                <div class="menu-item" v-bind:active="index === pageIndex" v-for="(page, index) in pages"
                     v-on:click="pageIndex = index">
                    <i class="material-icons menu-icon">{{page.icon}}</i>
                    <span class="menu-item-name">{{page.name}}</span>
                </div>
            </div>
        </aside>
        <div class="main">
            <div class="main-content">
                <schedule-tab v-if="pageIndex === 0"></schedule-tab>
                <watch-list v-if="pageIndex === 1" v-bind:token="token"></watch-list>
                <preferences v-if="pageIndex === 2"></preferences>
                <series-search v-if="pageIndex === 3" v-bind:searchQuery="searchQuery"
                               v-bind:token="token"></series-search>
            </div>
        </div>
        <footer class="footer"></footer>
    </div>
</template>

<script>
    import ScheduleTab from "./ScheduleTab";
    import WatchList from "./WatchList";
    import Preferences from "./Preferences";
    import SeriesSearch from "./SeriesSearch";
    import swal from 'sweetalert';
    import TvApi from '../js/TvApi';


    export default {
        mounted() {
            this.api = new TvApi();
            this.api.on('token', () => {
                this.token = this.api.token
                ;console.log(this.api);
            });
        },
        name: 'FrontPage',
        components: {SeriesSearch, Preferences, WatchList, ScheduleTab},
        props: ['username'],
        data() {
            return {
                api: {},
                token: '',
                searchResult: {},
                query: "",
                searchQuery: "",
                pageIndex: 0,
                pages: [
                    {
                        name: "Schedule",
                        icon: "schedule"
                    },
                    {
                        name: "Watch List",
                        icon: "playlist_play"

                    },
                    {
                        name: "Preferences",
                        icon: "settings"
                    }
                ]
            }
        },
        methods: {
            logout: function () {
                this.$emit('logout');
            },
            search: async function () {
                this.searchQuery = this.query;
                this.pageIndex = 3;
            },
            checkSearchKey: function (e) {
                if (e.key === "Enter")
                    this.search();
            }
        },
    }
</script>

<style scoped>
    .front-page {
        display: flex;
        flex-flow: row wrap;
        flex-direction: row;
    }

    .front-page > * {
        flex: 1 100%;
    }

    .header {
        height: var(--header-height);
        display: flex;
    }

    .logo-section {
        order: 1;
        flex-basis: var(--aside-width);
        font-weight: bold;
        display: flex;
        align-items: flex-end;
    }

    .logo {
        transform: translateX(39px);
        display: flex;
        cursor: pointer;
    }

    .logo * {
        pointer-events: none
    }

    .logo-image {
        width: 40px;
        height: 40px;
        background-image: url(../assets/logo.png);
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        margin: 5px;
    }

    .logo-text {
        height: 40px;
        width: 90px;
        color: var(--primary-color);
        margin: 5px;
    }

    .search-section {
        order: 2;
        flex-basis: calc(100% - var(--aside-width) * 2);
        display: flex;
        justify-content: center;
    }

    .search-bar {
        width: 50%;
        min-width: 400px;
    }

    .search-input {
        background-color: rgba(255, 255, 255, 0.15);
        border: none;
        padding: 10px 30px;
        border-radius: 5px;
        cursor: text;
        color: white;
        width: calc(100% - 60px);
        font-size: 16px;
        margin-right: -39px;
        position: relative;
        top: calc(50% - 39px / 2);
    }

    .search-icon {
        color: rgba(255, 255, 255, 0.5);
        line-height: 39px;
        vertical-align: middle;
        font-size: 18px;
        position: relative;
        top: calc(50% - 39px / 2);
        cursor: pointer;
    }

    .user-section {
        order: 3;
        flex-basis: var(--aside-width);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .user {
        cursor: pointer;
    }

    .user * {
        line-height: 39px;
        vertical-align: middle;
        pointer-events: none;
    }

    .user-face {
        font-size: 35px;
        margin-right: 20px;
    }

    /* Header end */

    .main {
        text-align: left;
        order: 2;
        flex-basis: calc(100% - var(--aside-width));
        display: flex;
        justify-content: center;
    }

    @media (min-width: 1700px) {
        .main-content {
            transform: translateX(calc(0px - var(--aside-width) / 2));
        }
    }

    .main-content {
        width: calc(100% - 60px);
        margin-top: 35px;
        max-width: 1000px;
        position: relative;
    }

    .left-menu {
        background-color: var(--primary-color);
        order: 1;
        height: 480px;
        flex-basis: calc(var(--aside-width) - 40px);
        margin-bottom: 50px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 5px 8px 15px 0px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: flex-end;
        padding: 35px 20px;
    }

    .menu-item {
        width: 210px;
        margin-bottom: 20px;
        padding: 10px;
        display: flex;
        color: white;
        font-weight: bold;
        font-size: 12px;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.1s;
    }

    .menu-item * {
        pointer-events: none;
    }

    .menu-item:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    .menu-item:active {
        background-color: rgba(0, 0, 0, 0.25);
    }

    .menu-item[active="true"] {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .menu-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        color: var(--primary-color);
        font-size: 17px;
        line-height: 24px;
        margin: 0px 10px;
    }

    .menu-item-name {
        display: inline-block;
        height: 24px;
        line-height: 24px;
    }

    .footer {
        background-color: var(--primary-color);
        order: 3;
        height: var(--footer-height);
    }
</style>
