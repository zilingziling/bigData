export default {
    /**
     * 防抖函数
     */
    debounce: (method: Function, delay: number) => {
        let timer: any = null;
        return function () {
            let self = this,
                args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(self, args);
            }, delay);
        };
    },

    /**
     * 获取数组指定的值数据
     * @param array 
     * @param key 
     */
    getArrayValue(array: Array<any>, key: any): Array<any> {
        var key = key || "value";
        var res: Array<any> = [];
        if (array) {
            array.forEach(function (t) {
                res.push(t[key]);
            });
        }
        return res;
    },

    randomNum(minNum: number, maxNum: number): number {
        switch (arguments.length) {
            case 1:
                return Math.floor(Math.random() * minNum + 1);
                break;
            case 2:
                return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
                break;
            default:
                return 0;
                break;
        }
    }
}