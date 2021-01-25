import { lazy } from 'react';
// const SwiperView = lazy(() => import('../pages/swiper'));

export default [
    {
        path:"/swiper" ,
        component: lazy(() => import('../pages/swiper')),
        exact: true
    },
    {
        path:"/backTop" ,
        component: lazy(() => import('../pages/scroll')),
        exact: true
    },
    {
        path:"/floatMenu" ,
        component: lazy(() => import('../pages/floatMenu')),
        exact: true
    },
]
