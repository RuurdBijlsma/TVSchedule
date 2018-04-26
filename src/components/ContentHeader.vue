<template>
    <div class="content-header">
        <i class="material-icons content-header-icon">{{icon}}</i>
        <span class="content-header-name">{{value}}</span>
    </div>
</template>

<script>
    export default {
        name: "ContentHeader",
        props: ['icon', 'value']
    }
</script>

<style scoped>
    .content-header {
        font-size: 20px;
        font-weight: bold;
        line-height: 20px;
        vertical-align: middle;
        display: flex;
    }

    .content-header * {
        line-height: 30px;
        height: 30px;
        display: inline-block;
    }

    .content-header-icon {
        color: var(--primary-color);
    }

    .content-header-name {
        margin-left: 10px;
    }
</style>