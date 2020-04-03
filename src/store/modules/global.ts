const globalStore = {
    state: {
        browser: 0
    },
    mutations: {
        UPDATE_BROWSER: (state: any, info: any): void => {
            console.log("浏览器尺寸有更新>>>", info)
            state.browser = info
        },
    },
    actions: {
        Updated_Browser(context: any, info: any): Promise<any> {
            return new Promise((resolve) => {
                context.commit('UPDATE_BROWSER', info);
                resolve()
            })
        },
    }
}

export default globalStore