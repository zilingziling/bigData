import router from './index'
import { Route } from 'vue-router'

router.beforeEach(async (to: Route, _: Route, next: any) => {
    if (to.path == "/") {
        next({ name: 'user' })
    } else {
        next()
    }
})

router.afterEach((to: Route) => {
})
