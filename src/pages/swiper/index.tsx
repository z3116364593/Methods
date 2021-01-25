import React, { useEffect, useState } from 'react'
import Swiper from '../../commponents/swiper'
import img1 from '../../assets/image/previewFix1.jpg'
import img2 from '../../assets/image/previewFix2.jpg'
import img3 from '../../assets/image/previewFix2000391269.jpg'
import img4 from '../../assets/image/previewFix203.jpg'

const SwiperView = (): any => {
    const [data, setData] = useState<any>({
        list: []
    });
    
    useEffect(() => {
        data.list = [{ src: img1 }, { src: img2 }, { src: img3 }, { src: img4 }]
        setData({ ...data })
    }, [])

    return (
        <Swiper datas={data.list} style={{ margin: '100px auto' }}></Swiper>
    )
}

export default SwiperView
