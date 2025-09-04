<script setup>
    import { useCalculator } from '@/composables/useCalculator';
    import { ref, watch } from 'vue';

    const props = defineProps({
        receivedData: {
            type: Object,
            default: () => ({})
        }
    });
    const calculator = new useCalculator();
    const emit = defineEmits(['send-data']);
    const putoutP = calculator.putoutP;
    const putoutInput = calculator.putoutInput;
    const putoutInputChar = calculator.putoutInputChar;
    const historyName = ref('');
    const historyValue = ref(0);
    const history = ref([]);
    let isHistory = 0;
    let item = 0;
    let input = 0;

    if (localStorage.getItem('history')) {
        history.value = JSON.parse(localStorage.getItem('history'));
        item = 1;
        emit('send-data', { putoutP, putoutInputChar, history, isHistory, item, input });
        item = 0;
    }

    // 点击触发事件并将数据传递给父组件
    document.addEventListener('DOMContentLoaded', function () {
        // 为按钮绑定事件（假设按钮有相应的类或ID）
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                calculator.appendNumber(btn.textContent);
                emit('send-data', { putoutP, putoutInputChar, history, isHistory, item, input });
            });
        });

        document.getElementById('is_history').addEventListener('click', () => {
            isHistory = 1;
            emit('send-data', { putoutP, putoutInputChar, history, isHistory, item, input });
            isHistory = 0;
        })

        document.querySelectorAll('.operator-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.textContent === '=') {
                    historyName.value = putoutP.value + ' ' + putoutInput.value;
                    calculator.setOperator(btn.textContent);
                    historyValue.value = putoutInput.value;
                    history.value.unshift({  expression: historyName.value, result: historyValue.value});
                    if (props.receivedData.historyItem.value !== 0) {
                        history.value = history.value.slice(0, history.value.length - props.receivedData.historyItem.value);
                    }
                    item = 1;
                    localStorage.setItem('history', JSON.stringify(history.value));
                    emit('send-data', { putoutP, putoutInputChar, history, isHistory, item, input });
                    item = 0;
                } else {
                    calculator.setOperator(btn.textContent);
                    emit('send-data', { putoutP, putoutInputChar, history, isHistory, item, input });
                }
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                historyName.value = putoutP.value + ' ' + putoutInput.value;
                calculator.setOperator(btn.textContent);
                historyValue.value = putoutInput.value;
                history.value.unshift({  expression: historyName.value, result: historyValue.value});
                if (props.receivedData.historyItem.value !== 0) {
                    history.value = history.value.slice(0, history.value.length - props.receivedData.historyItem.value);
                }
                item = 1;
                emit('send-data', { putoutP, putoutInputChar, history, isHistory, item, input });
                item = 0;
            } else {
                calculator.handleKeydown(event);
                emit('send-data', { putoutP, putoutInputChar, history, isHistory, item, input });
            }
        })
    });

    watch(() => props.receivedData.putoutInput.value, () => {
        if (props.receivedData.putoutInput.value !== 0) {
            calculator.judgeOp.value = 1;
            calculator.appendNumber(props.receivedData.putoutInput.value);
            input = 1;
            emit('send-data', { putoutP, putoutInputChar, history, isHistory, item, input });
            input = 0;
        }
    })
</script>

<template>
    <!-- 按钮 -->
    <div class="buttons">
        <button class="btn operator-btn">AC</button>
        <button class="btn operator-btn">⌫</button>
        <button class="btn operator-btn">%</button>
        <button class="btn operator-btn">÷</button>
        <button class="btn number-btn">7</button>
        <button class="btn number-btn">8</button>
        <button class="btn number-btn">9</button>
        <button class="btn operator-btn">×</button>
        <button class="btn number-btn">4</button>
        <button class="btn number-btn">5</button>
        <button class="btn number-btn">6</button>
        <button class="btn operator-btn">-</button>
        <button class="btn number-btn">1</button>
        <button class="btn number-btn">2</button>
        <button class="btn number-btn">3</button>
        <button class="btn operator-btn">+</button>
        <button id="is_history" class="btn"><img src="../assets/icons/最近使用.png"></button>
        <button class="btn number-btn">0</button>
        <button class="btn operator-btn">.</button>
        <button class="btn operator-btn">=</button>
    </div>
</template>

<style scoped>
.buttons {
    width: 100%;
    /* 全宽 */
    height: 360px;
    /* 高度 */
    padding-top: 20px;
    /* 上内边距 */
    display: grid;
    /* 网格布局 */
    grid-auto-rows: 60px;
    /* 自动行高 */
    grid-template-columns: 70px 70px 70px 70px;
    /* 四列布局 */
    justify-content: space-around;
    /* 水平间距 */
    row-gap: 10px;
    /* 行间距 */
    column-gap: 13.4px;
    /* 列间距 */
}

.btn {
    border: none;
    /* 无边框 */
    border-radius: 10px;
    /* 圆角边框 */
    background-color: rgba(255, 255, 255, 0.15);
    /* 背景颜色 */
    color: #fff;
    /* 白色文字 */
    font-size: 20px;
    /* 字体大小 */
    cursor: pointer;
    /* 鼠标指针样式 */
}

.btn img {
    width: 50px;
    /* 图片宽度 */
    height: 50px;
    /* 图片高度 */
}

.btn:hover {
    transform: translateY(-2px);
    /* 鼠标悬停时向上偏移 */
    background-color: rgba(255, 255, 255, 0.15);
    /* 背景颜色 */
}

@keyframes animate {
    0% {
        transform: translateY(0);
        /* 初始位置 */
    }

    50% {
        transform: translateY(1px);
        /* 向上偏移 */
    }

    100% {
        transform: translateY(-2px);
        /* 回到初始位置 */
    }
}

.btn:active {
    animation: animate 0.2s ease;
    /* 点击时动画效果 */
}

</style>