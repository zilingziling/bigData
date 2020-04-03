
interface Window {
    // 也可以添加 
    // 字符串签名 可以允许添加未知名称属性
    [p: string]: any
}

// vue.d.ts
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
declare module 'echarts/extension/bmap/bmap'
declare module 'ant-design-vue/lib/locale-provider/zh_CN'
declare module 'ant-design-vue/es/notification'
declare module 'mockjs';
declare module 'qs';
declare module 'vue-ls';
declare module 'spark-md5';
// interface THREE extends Window {}
