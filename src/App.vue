<script setup>
    import Display from './components/Display.vue';
    import ButtonGrid from './components/ButtonGrid.vue';
    import { ref, onUpdated, watch } from 'vue';

    const isDisplay = ref(false);
    const isHistory = ref(true);

    const backData = {
        putoutInput: ref('0'),
        historyItem: ref(0)
    }

    const sharedData = {
        putoutP: ref(''),
        putoutInputChar: ref('0'),
        history: ref([]),
        isHistory: 0,
        item: 0,
        input: 0
    };

    const handleData = (data) => {
        sharedData.putoutP.value = data.putoutP.value;
        sharedData.putoutInputChar.value = data.putoutInputChar.value;
        sharedData.history.value = data.history.value;
        sharedData.isHistory = data.isHistory;
        sharedData.item = data.item;
        sharedData.input = data.input;

        if (sharedData.isHistory === 1) {
            isDisplay.value = !isDisplay.value;
            if (isDisplay.value === true) {
                if (sharedData.history.value.length === 0) {
                    isHistory.value = true;
                } else {
                    isHistory.value = false;
                }
            }
        }

        if (sharedData.item === 1) {
            backData.historyItem.value = 0;
        }

        if (sharedData.input === 1) {
            backData.putoutInput.value = 0;
        }
    }

    onUpdated(() => {
        if (sharedData.history.value.length === 0) {
            isHistory.value = true;
        } else {
            if (sharedData.item === 1) {
                isHistory.value = false;
            }
        }
    });

    watch(() => sharedData.history.value.length, () => {
        if (sharedData.history.value.length === 0) {
            isHistory.value = true;
        } else {
            if (sharedData.item === 1) {
                isHistory.value = false;
            }
        }
    });

    function clearHistory() {
        isHistory.value = !isHistory.value;
        backData.historyItem.value += sharedData.history.value.length;
        sharedData.history.value = [];
        localStorage.removeItem('history');
    }

    function clickHistory(item) {
        backData.putoutInput.value = item.result;
    }
</script>

<template>
    <div id="app">
        <div id="calculator">
            <Display :receivedData="sharedData" />
            <ButtonGrid @send-data="handleData" :receivedData="backData"/>

            <!-- 历史记录 -->
            <div id="history" v-show="isDisplay">
                <h2>历史记录</h2>
                <div id="history_list">
                    <p id="history_p" v-if="isHistory">暂无历史记录</p>
                    <ul id="history_ul" v-else >
                        <!-- 历史记录将动态添加到这里 -->
                        <li class="history_li" v-for="(item, index) in sharedData.history.value" :key="index" @click="clickHistory(item)">
                            <p class="history_name">{{ item.expression }}</p>
                            <p class="history_value">{{ item.result }}</p>
                        </li>
                    </ul>
                </div>
                <div id="history_btn">
                    <button id="close_history" @click="isDisplay = !isDisplay"><img src="./assets/icons/最近使用.png"></button>
                    <button id="clear_history" @click="clearHistory()"><img src="./assets/icons/清空.png"></button>
                </div>
            </div>
        </div>

        <div class="tips">
            <p>
                1.使用鼠标或数字键盘输入数字，回车键计算结果;
            </p>
            <p>
                2.使用 ESC 键清空显示框的值;
            </p>
            <p>
                3.本计算器将存储计算的数据和结果，通过清空历史按钮可删除存储的数据和结果!
            </p>
        </div>
    </div>
</template>

<style scoped>
    #app {
        width: 360px;   /* 宽度 */
        height: 650px;  /* 高度 */
        position: absolute;  /* 绝对定位 */
        top: 50%;   /* 垂直居中 */
        left: 50%;  /* 水平居中 */
        transform: translate(-50%, -50%);  /* 位移到中心 */
    }

    #calculator {
        width: 100%;   /* 宽度 */
        height: 500px;  /* 高度 */
        background-color: rgba(255, 255, 255, 0.1);  /* 半透明背景 */
        border-radius: 20px;  /* 圆角边框 */
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);  /* 阴影效果 */
        padding: 20px;  /* 内边距 */
    }

   #history {
        width: 320px;   /* 全宽 */
        height: 340px;  /* 高度 */
        background: linear-gradient(135deg, #6a11cb, #2575fc);    /* 渐变色背景 */
        border-radius: 10px;  /* 圆角边框 */
        position: absolute; /* 绝对定位 */
        top: 140px;  /* 上边距 */
        z-index: 30;  /* 层级 */
    }

    #history h2 {
        width: 100%;   /* 全宽 */
        height: 40px;  /* 高度 */
        text-align: center;  /* 文字居中 */
        color: #fff;  /* 白色文字 */
        font-size: 20px;  /* 字体大小 */
        border-bottom: #fff 1px solid;  /* 白色下边框 */
    }

    #history_list {
        width: 100%;   /* 全宽 */
        height: 260px;  /* 高度 */
        overflow-y: auto;  /* 垂直滚动条 */
        padding: 10px;  /* 内边距 */
    }

    /* 隐藏滚动条但保留功能 */
    #history_list {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
    }

    #history_list::-webkit-scrollbar {
        width: 0;   /* Chrome, Safari */
        background: transparent;  /* 背景透明 */
    }

    #history_p {
        width: 100%;   /* 全宽 */
        height: 30px;  /* 高度 */
        line-height: 30px;  /* 行高 */
        text-align: center;  /* 文字居中 */
        color: #c7c7c7;  /* 灰色文字 */
        font-size: 14px;  /* 字体大小 */
        margin-bottom: 10px;  /* 下外边距 */
    }

    #history_ul {
        width: 100%;   /* 全宽 */
        height: 100%;  /* 全高 */
        list-style: none;  /* 无列表样式 */
        padding: 0;  /* 清除内边距 */
        margin: 0;  /* 清除外边距 */
    }

    #history_list li {
        width: 100%;   /* 全宽 */
        height: 40px;  /* 高度 */
        border-bottom: #fff 1px solid;  /* 白色下边框 */
        margin-bottom: 5px;  /* 下外边距 */
        text-align: right; /* 右对齐 */
        cursor: pointer;  /* 鼠标指针样式 */
    }

    .history_name {
        width: 100%; /* 全宽 */
        height: 15px;  /* 高度 */
        font-size: 12px;    /* 字体大小 */
        color: #c7c7c7;  /* 灰色文字 */
        overflow: hidden;  /* 隐藏溢出部分 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis; /* 显示省略号 */
    }

    .history_value {
        width: 100%; /* 全宽 */
        height: 25px;  /* 高度 */
        color: #fff;  /* 白色文字 */
    }

    #history_btn {
        width: 100%;   /* 全宽 */
        height: 40px;   /* 高度 */
        display: flex;  /* 弹性布局 */
        flex-wrap: nowrap;  /* 不换行 */
        justify-content: space-between;  /* 两端对齐 */
    }

    #history_btn button {
        width: 40px;    /* 全宽 */
        height: 40px;   /* 高度 */
        background-color: rgba(255, 255, 255, 0.15);  /* 半透明背景 */
        border: none;  /* 无边框 */
        border-radius: 10px;  /* 圆角边框 */
        cursor: pointer;  /* 鼠标指针样式 */
    }

    #history_btn button img {
        width: 100%;    /* 全宽 */
        height: 100%;   /* 高度 */
    }

    #history_btn button:hover {
        transform: translateY(-2px); /* 鼠标悬停时向上偏移 */
        background-color: rgba(255, 255, 255, 0.15);  /* 半透明背景 */
    }

    #history_btn button:active {
        animation: animate 0.2s ease; /* 点击时动画效果 */
    }

    @keyframes animate {
        0% {
            transform: translateY(0); /* 初始位置 */
        }
        50% {
            transform: translateY(1px); /* 向上偏移 */
        }
        100% {
            transform: translateY(-2px); /* 回到初始位置 */
        }
    }

    #clear_history {
        width: 40px;        /* 全宽 */
        height: 40px;       /* 高度 */
        background-color: rgba(255, 255, 255, 0.15);  /* 半透明背景 */
        margin-left: 236.35px;
        border: none;  /* 无边框 */
        border-radius: 10px;  /* 圆角边框 */
    }

    .tips {
        width: 360px;   /* 全宽 */
        height: 130px;  /* 高度 */
        background-color: rgba(255, 255, 255, 0.1);  /* 半透明背景 */
        border: #fff 1px solid;  /* 白色边框 */
        box-sizing: border-box; /* 盒模型设置 */
        border-radius: 20px;  /* 圆角边框 */
        margin-top: 20px;  /* 上外边距 */
        color: #fff;  /* 白色文字 */
        font-size: 14px;  /* 字体大小 */
        padding: 15px;  /* 内边距 */
    }

    .tips p {
        width: 100%;   /* 全宽 */
        height: 30px;  /* 高度 */
    }
</style>