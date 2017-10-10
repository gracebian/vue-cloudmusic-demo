/**
 * 播放数超过10000的,用万代替
 */
export default function(value) {
    value = Number(value);
    // Number.isNaN(value)ES6方法，不会转换成对象类型
    if (Number.isNaN(value)) {
        return 0;
    }
    return value < 10000 ? value : Math.floor(value / 10000) + '万';
}
