<script setup>
    defineProps({
        receivedData: {
            type: Object,
            default: () => ({})
        }
    })
</script>

<template>
    <div id="putout">
        <p id="putout_p">{{ receivedData.putoutP }}</p>
        <p id="putout_input">{{ receivedData.putoutInputChar }}</p>
    </div>
</template>

<style scoped>
    #putout {
        width: 320px;   /* 全宽 */
        height: 100px;  /* 高度 */
        border-radius: 10px;  /* 圆角边框 */
        background-color: rgba(255, 255, 255, 0.1);  /* 半透明背景 */
        padding: 10px;  /* 内边距 */
    }

    #putout_p {
        width: 100%;   /* 全宽 */
        height: 40px;  /* 高度 */
        line-height: 20px;  /* 行高 */
        font-size: 17px;  /* 字体大小 */
        color: #c7c7c7;  /* 灰色文字 */
        text-align: right;  /* 文字右对齐 */
        overflow: hidden;  /* 隐藏溢出部分 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis; /* 显示省略号 */
    }

    #putout_input {
        width: 100%;   /* 全宽 */
        height: 40px;  /* 高度 */
        border: none;  /* 无边框 */
        font-size: 42px;  /* 字体大小 */
        font-weight: 500;  /* 字体粗细 */
        line-height: 30px;  /* 行高 */
        color: #fff;  /* 白色文字 */
        background-color: rgba(255, 255, 255, 0);  /* 透明背景 */
        border-radius: 10px;  /* 圆角边框 */
        text-align: right;  /* 文字右对齐 */
        overflow: hidden;  /* 隐藏溢出部分 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis; /* 显示省略号 */
    }
</style>