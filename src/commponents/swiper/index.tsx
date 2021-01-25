import React, { useState, useEffect, useRef, useMemo } from 'react';
import './css/index.css'

interface Props {
    style?: any;
    className?: string;
    autoplay?: string;
    datas: any[];
}

const Swiper = (props: Props): any => {
    const [that, setThat] = useState<any>({
        left: -500,
        transition: 'all .8s',
        block: true,
        list: [],
        copyImages: [],
    });
    const timer: any = useRef<any>()
    const [isStop, setIsStop] = useState<boolean>(true);

    useEffect(() => {
        if(props.datas.length > 0) {
            that.copyImages = JSON.parse(JSON.stringify(props.datas)).map((item: any, index: number) => ({
                src: item.src,
                id: index
            }))
            let imageList: any[] = JSON.parse(JSON.stringify(that.copyImages))
            let first: any = JSON.parse(JSON.stringify(imageList[0]))
            let last: any = JSON.parse(JSON.stringify(imageList[imageList.length - 1]))
            imageList.unshift(last)
            imageList.push(first)
            that.list = imageList
            setThat({ ...that })
            //启动轮播
            setIsStop(false)
        }
    }, [props.datas])

    useEffect(() => {
        isStop ? clearInterval(timer.current) : play()
        return () => clearInterval(timer.current)
    }, [isStop])

    //开始轮播
    const play = () => {
        timer.current = setInterval(() => {
            that.block = true
            setThat({...that})
            props.autoplay ? pageTurning(props.autoplay) : pageTurning('next')
        }, 3000)
    }

    //上一张
    const previous = (length: number): void => {
        if(that.left === 0) {
            that.transition = ''
            that.left = (length - 2) * -500
            setThat({...that})
            setTimeout(() => {
                that.transition = 'all .8s'
                that.left += 500
                setThat({...that})
            }, 30)
        } else {
            that.left += 500
            setThat({...that})
        }
    }

    //下一张
    const next = (length: number): void => {
        if(that.left === (length - 1) * -500) {
            that.transition = ''
            that.left = -500
            setThat({...that})
            setTimeout(() => {
                that.transition = 'all .8s'
                that.left -= 500
                setThat({...that})
            }, 30)
        } else {
            that.left -= 500
            setThat({...that})
        }
    }

    //切换当前页
    const pageTurning = (status: string): void => {
        if(!that.block) return
        that.block = false
        if(status === 'previous') {
            previous(that.list.length)
        } else if(status === 'next') {
            next(that.list.length)
        }
        setTimeout(() => {
            that.block = true
            setThat({...that})
        }, 800)
    }

    //小圆点active
    const active = useMemo((): number => {
        let index: number = -1
        let num: number = Math.abs(that.left / 500)
        if(num === that.list.length - 1) {
            index = 1
        } else if(num === 0) {
            index = that.copyImages.length
        } else {
            index = num
        }
        return index
    }, [that.left])

    return (
        <div 
            className={props.className ? 'jk-swiper ' +  props.className: 'jk-swiper'} 
            onMouseOver={() => {setIsStop(true)}} 
            onMouseOut={() => {setIsStop(false)}}
            style={props.style}
        >
            <ul style={{ left: that.left, transition: that.transition }}>
                {that.list.map((item: any, index: number) => (
                    <li key={index}><img src={item.src} alt=""/></li>
                ))}
            </ul>
            <div className="jk-dot">
                {that.copyImages.map((item: any, index: number) => (
                    <span key={item.id} style={{ background: active === index + 1 ? '#fff' : 'rgba(256, 256, 256, 0.6)' }}></span>
                ))}
            </div>
            <p onClick={() => pageTurning('previous')}><i className="iconfont icon-arrow-left-bold"></i></p>
            <p onClick={() => pageTurning('next')}><i className="iconfont icon-arrow-right"></i></p>
        </div>
    )
}

export default Swiper
