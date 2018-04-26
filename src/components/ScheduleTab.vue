<template>
    <div class="schedule-tab">
        <div class="content-section content-today">
            <content-header v-bind:value="'Available today'" v-bind:icon="'check'"></content-header>
            <div class="content-body">
                <div class="today-episodes">
                    <div class="episode-large">
                        <div class="episode-image"
                             style="background-image:url('https://2.bp.blogspot.com/-emLOWDofzzo/WsZzX7uvQMI/AAAAAAAANUM/3VjHNSYAKIMCg91Rq6Xndclcgd-W7_FqACLcBGAs/s0/Screen%2BShot%2B2018-04-06%2Bat%2B7.04.04%2BAM%2B%255Bwww.imagesplitter.net%255D.jpeg')"></div>
                        <div class="episode-info">
                            <div class="episode-show">Marvel's Agents of S.H.I.E.L.D.</div>
                            <div class="episode-title">All Roads Lead...</div>
                            <div class="episode-buttons">
                                <div class="watch-episode">Download</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-section content-schedule">
            <content-header v-bind:value="'Schedule'" v-bind:icon="'schedule'"></content-header>
            <div class="content-body">
                <div class="schedule-grid">
                    <div class="schedule-days">
                        16 april - 20 april
                    </div>
                    <div class="schedule-content">
                        <div class="schedule-day">
                            <div class="day-name">Monday 16/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 19/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 20/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 21/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 22/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                    </div>
                    <div class="schedule-days current-week">
                        21 april - 25 april
                    </div>
                    <div class="schedule-content">

                        <div class="schedule-day">
                            <div class="day-name">Monday 16/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 19/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 20/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 21/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 22/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                    </div>
                    <div class="schedule-days">
                        26 april - 30 april
                    </div>
                    <div class="schedule-content">

                        <div class="schedule-day">
                            <div class="day-name">Monday 16/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 19/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 20/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 21/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                        <div class="schedule-day">
                            <div class="day-name">Tuesday 22/4</div>
                            <div class="episode-info-short">
                                <div class="episode-show">American Dad</div>
                                <div class="episode-title short">Railroaded</div>
                                <div class="episode-time">4:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ContentHeader from "./ContentHeader";
    export default {
        name: "ScheduleTab",
        components: {ContentHeader}
    }
</script>

<style scoped>

    .content-body {
        width: 100%;
        /* background-color: rgba(0, 0, 0, 0.2); */
        border-radius: 5px;
        margin: 10px 0 35px 0;
    }

    .today-episodes {
        display: flex;
    }

    .episode-large {
        display: flex;
        flex-direction: column;
        background-color: var(--card-color);
        flex-basis: 200px;
        height: 200px;
        max-width: 200px;
        margin: 10px;
        font-size: 13px;
        border-radius: 5px;
        box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.65);
    }

    .episode-info {
        padding: 10px;
    }

    .episode-image {
        width: 100%;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        height: calc(100% - 50px);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .episode-show {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        margin-bottom: 5px;
    }

    .episode-title {
        opacity: 0.8;
    }

    .episode-buttons {
        margin-top: 10px;
        text-transform: uppercase;
        color: var(--primary-color);
        display: flex;
        padding: 5px 0px;
    }

    .episode-buttons > * {
        cursor: pointer;
        padding: 0px 10px;
    }

    .schedule-grid {
        display: flex;
        flex-direction: column;
    }

    .schedule-days {
        text-transform: uppercase;
        font-size: 13px;
        text-align: center;
        box-shadow: 0px 1px 0px 0px var(--primary-color);
        padding: 5px;
        margin: 10px 0px;
    }

    .current-week {
        font-weight: bold;
        background-color: var(--primary-color);
    }

    .schedule-content {
        display: flex;
        justify-content: space-around;
    }

    .schedule-day {
        display: flex;
        flex-direction: column;
    }

    .day-name {
        color: var(--primary-color);
        padding: 4px;
        font-weight: bold;
        border-radius: 5px;
        font-size: 13px;
        text-transform: uppercase;
        text-align: center;
    }

    .episode-info-short {
        margin-top: 15px;
    }

    .episode-title.short {
        margin: 0;
    }

    .episode-time, .episode-title.short {
        opacity: 0.8;
        font-size: 13px;
    }
</style>