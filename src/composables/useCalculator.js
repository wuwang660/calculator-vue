import { ref } from 'vue';

export class useCalculator {
    constructor() {
        this.putoutP = ref(''); // 计算器显示框
        this.putoutInput = ref('0'); // 计算器输入框的值
        this.putoutInputChar = ref('0'); // 计算器输入框显示值
        this.currentValue = ref(0); // 当前值
        this.currentOp = ref(''); // 当前操作符
        this.judgeOp = ref(0); // 判断是否需要清空计算器输入框的值

        this.init();
    }

    /**
     * 初始化计算器
     */
    init() {
        // 设置初始值
        this.putoutP.value = '';
        this.putoutInput.value = '0';
        this.putoutInputChar.value = '0';
        this.currentValue.value = 0;
        this.currentOp.value = '';
        this.judgeOp.value = 0;
    }

    /**
     * 向输入框追加数字
     * @param {string} appendNum - 要追加的数字
     */
    appendNumber(appendNum) {
        if (this.currentOp.value !== '' && this.judgeOp.value === 0) {
            this.putoutInput.value = '0';
            this.judgeOp.value = 1;
        }

        if (this.currentOp.value === '' && this.judgeOp.value === 1) {
            this.putoutInput.value = '0';
            this.judgeOp.value = 0;
        }

        if (this.putoutInput.value.length < 12) {
            if (this.putoutInput.value === '0') {
                this.putoutInput.value = appendNum;
                this.putoutInputChar.value = this.putoutInput.value;
            } else {
                this.putoutInput.value += appendNum;
                this.putoutInputChar.value = this.putoutInput.value;
            }
        } else {
            this.putoutInput.value += appendNum;
            this.putoutInputChar.value = this.putoutInput.value.slice(0, 11) + '...';
        }
    }

    /**
     * 设置运算符并执行相应操作
     * @param {string} op - 运算符
     */
    setOperator(op) {
        const operations = {
            'AC': () => this.clearCalculator(),
            '⌫': () => this.handleBackspace(),
            '%': () => this.handlePercentage(),
            '.': () => this.handleDecimal(),
            '=': () => this.handleEquals(),
            'default': () => this.handleArithmeticOp(op)
        };

        const operation = operations[op] || operations['default'];
        operation();
    }

    /**
     * 清空计算器状态
     */
    clearCalculator() {
        this.putoutP.value = '';
        this.putoutInput.value = '0';
        this.putoutInputChar.value = '0';
        this.currentValue.value = 0;
        this.currentOp.value = '';
        this.judgeOp.value = 0;
    }

    /**
     * 处理退格操作
     */
    handleBackspace() {
        if (this.putoutInput.value.length > 1) {
            this.putoutInputChar.value = this.putoutInput.value.slice(0, -1);
            this.putoutInput.value = this.putoutInputChar.value;
        } else {
            this.putoutInput.value = '0';
            this.putoutInputChar.value = this.putoutInput.value;
        }
    }

    /**
     * 处理百分比操作
     */
    handlePercentage() {
        if (this.putoutInput.value !== '0') {
            this.putoutInput.value = (parseFloat(this.putoutInput.value) / 100).toString();
            this.putoutInputChar.value = this.putoutInput.value;
        }
    }

    /**
     * 处理小数点添加
     */
    handleDecimal() {
        if (parseFloat(this.putoutInput.value) === this.currentValue) {
            this.putoutInput.value = '0';
            this.putoutInputChar.value = this.putoutInput.value;
        }

        if (!this.putoutInput.value.includes('.')) {
            this.putoutInput.value += '.';
            this.putoutInputChar.value = this.putoutInput.value;
        }
    }

    /**
     * 处理算术运算符
     * @param {string} op - 算术运算符
     */
    handleArithmeticOp(op) {
        if (this.currentOp.value === '') {
            this.putoutP.value = this.putoutInput.value + ' ' + op;
            this.currentValue.value = parseFloat(this.putoutInput.value);
            this.currentOp.value = op;
            this.judgeOp.value = 0;
        } else {
            this.putoutP.value += ' ' + this.putoutInput.value + ' ' + op;
            this.performCalculation();
            this.currentOp.value = op;
            this.judgeOp.value = 0;
        }
    }

    /**
     * 执行当前运算
     */
    performCalculation() {
        const inputNum = parseFloat(this.putoutInput.value);

        const operations = {
            '÷': () => this.currentValue.value = precise(this.currentValue.value / inputNum),
            '×': () => this.currentValue.value = precise(this.currentValue.value * inputNum),
            '+': () => this.currentValue.value = precise(this.currentValue.value + inputNum),
            '-': () => this.currentValue.value = precise(this.currentValue.value - inputNum)
        };

        if (operations[this.currentOp.value]) {
            operations[this.currentOp.value]();
        }

        this.putoutInput.value = this.currentValue.value.toString();
        this.putoutInputChar.value = this.putoutInput.value;
    }

    /**
     * 处理等于号操作
     */
    handleEquals() {
        if (this.currentOp.value) {
            this.performCalculation();
            this.currentOp.value = '';
        }
    }

    /**
     * 处理键盘按键事件
     * @param {KeyboardEvent} event - 键盘事件对象
     */
    handleKeydown(event) {
        const keyMap = {
            'Escape': 'AC',
            'Backspace': '⌫',
            '%': '%',
            '.': '.',
            '/': '÷',
            '*': '×',
            '-': '-',
            '+': '+',
            'Enter': '='
        };

        const key = event.key;

        if (!isNaN(key)) {
            this.appendNumber(key);
        } else if (keyMap[key]) {
            this.setOperator(keyMap[key]);
        }
    }
}

/**
 * 添加精确计算方法
 * @param {*} value
 * @param {*} decimals
 * @returns
 */
function precise(value, decimals = 1) {
    if (typeof value !== 'number') return value;

    // 将数字放大为整数进行计算，避免浮点误差
    const factor = Math.pow(10, decimals);
    const adjustedValue = Math.round(value * factor) / factor;

    // 检查是否需要修正
    const stringValue = value.toString();
    const hasDecimal = stringValue.includes('.');

    if (hasDecimal) {
        const decimalPlaces = stringValue.split('.')[1].length;
        if (decimalPlaces > decimals) {
            return adjustedValue;
        }
    }

    return value;
}