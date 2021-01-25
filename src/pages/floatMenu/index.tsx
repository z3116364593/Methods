import React, { useState, useRef, useEffect } from 'react'
import './css/index.css'

const FloatMenu = () => {
    const [state, setState] = useState<any>({
        list: [
            { name: 'add' },
            { name: 'del' },
            { name: 'update' },
            { name: 'find' },
            { name: 'find' },
        ],
        unfold: false,
        left: 'calc(-100px + 40px)',
        top: 'calc(100% - 100px - 40px)',
        timer: null,
        rotationAngle: 'rotate(0deg)',
        isReverse: false,
        radian: 90,
        inputShow: false,
        longTouch: null,
        isInputWidth: false,
    });
    const [strikes, setStrikes] = useState<any>({
        clickNum: 0,
        threeStrikesTimer: null
    });
    const input = useRef<any>()

    useEffect(() => {
        document.addEventListener('click', threeStrikes, false)
        return () => {
            document.removeEventListener("click", threeStrikes, false)
        }
    }, [])

    //三击 设定指定位置
    const threeStrikes = (e: any) => {
        clearTimeout(strikes.threeStrikesTimer)
        strikes.threeStrikesTimer = null
        strikes.clickNum += 1
        setStrikes({ ...strikes })

        strikes.threeStrikesTimer = setTimeout(() => {
            strikes.clickNum = 0
            setStrikes({ ...strikes })
        }, 200)

        if(strikes.clickNum === 3) {
            let clientX: number = e.clientX
            let clientY: number = e.clientY
            state.left = clientX - 100
            state.top = clientY - 100
            setState({ ...state })

            strikes.clickNum = 0
            setStrikes({ ...strikes })

            //重置展开方向
            if(clientX < 30) {
                clientX = 30
            }
            if(window.innerWidth - clientX < 30) {
                clientX = window.innerWidth - 30
            }
            if(clientY < 30) {
                clientY = 30
            }
            if(window.innerHeight - clientY < 30) {
                clientY = window.innerHeight - 30
            }
            state.left = clientX - 100
            state.top = clientY - 100
            setState({ ...state })
            let params: any = {
                changedTouches: [{
                    clientX,
                    clientY
                }]
            }
            onEnd(params)
        }
    }

    //是否反转
    const getRotationAngle = (index: number): number => {
        let num: number = 0
        if(state.isReverse) {
            num = -((state.radian / (state.list.length - 1)) * index)
        } else {
            num = (state.radian / (state.list.length - 1)) * index
        }
        return num
    }

    const onStart = (e: any): void =>{
        e.preventDefault()
        state.timer = new Date().getTime()
        state.longTouch = setTimeout(() => {
            if(state.unfold) return
            state.inputShow = true
            setState({ ...state })
            setTimeout(() => {
                state.isInputWidth = true
                setState({ ...state })
                input.current.focus()
                console.log(input)
            }, 100)
        }, 800)
        setState({ ...state })
    }

    const onMove = (e: any): void => {
        e.preventDefault()
        clearTimeout(state.longTouch)
        state.longTouch = null

        if(state.unfold) return
        let clientX: number = e.targetTouches[0].clientX
        let clientY: number = e.targetTouches[0].clientY
        if(clientX < 30) {
            clientX = 30
        }
        if(window.innerWidth - clientX < 30) {
            clientX = window.innerWidth - 30
        }
        if(clientY < 30) {
            clientY = 30
        }
        if(window.innerHeight - clientY < 30) {
            clientY = window.innerHeight - 30
        }
        state.left = clientX - 100
        state.top = clientY - 100
        setState({ ...state })
    }

    const onEnd = (e: any): void => {
        try {
            e.preventDefault()
        } catch {}
        let time: number = new Date().getTime()
        if(time - state.timer < 200) {
            state.unfold = !state.unfold

            clearTimeout(state.longTouch)
            state.longTouch = null
            setState({ ...state })
        } else {
            if(state.unfold) return
            let clientX: number = e.changedTouches[0].clientX
            let clientY: number = e.changedTouches[0].clientY
            if(clientX < 120 && clientY < 120) {
                // console.log('左上角')
                state.rotationAngle = 'rotate(90deg)'
                state.isReverse = false
                state.radian = 90
            } else if(window.innerWidth - clientX < 120 && clientY < 120) {
                // console.log('右上角')
                state.rotationAngle = 'rotate(-90deg)'
                state.isReverse = true
                state.radian = 90
            } else if((clientX >= 120 && window.innerWidth - clientX >= 120) && clientY <= 120) {
                // console.log('上中区')
                state.rotationAngle = 'rotate(-90deg)'
                state.isReverse = true
                state.radian = 180
            } else if(clientX <= 120 && (clientY >= 120 && window.innerHeight - clientY >= 120)) {
                // console.log('左中区')
                state.rotationAngle = 'rotate(0deg)'
                state.isReverse = false
                state.radian = 180
            } else if(window.innerWidth - clientX <= 120 && (clientY >= 120 && window.innerHeight - clientY >= 120)) {
                // console.log('右中区')
                state.rotationAngle = 'rotate(0deg)'
                state.isReverse = true
                state.radian = 180
            } else if(clientX <= 120 && window.innerHeight - clientY <= 120) {
                // console.log('左下角')
                state.rotationAngle = 'rotate(0deg)'
                state.isReverse = false
                state.radian = 90
            } else if(window.innerWidth - clientX <= 120 && window.innerHeight - clientY <= 120) {
                // console.log('右下角')
                state.rotationAngle = 'rotate(0deg)'
                state.isReverse = true
                state.radian = 90
            } else {
                // console.log('其他区域')
                state.rotationAngle = 'rotate(-90deg)'
                state.isReverse = false
                state.radian = 180
            }
            setState({ ...state })
        }
    }

    const onBlur = (e: any): void => {
        e.preventDefault()
        state.isInputWidth = false
        setState({ ...state })
        setTimeout(() => {
            state.inputShow = false
            setState({ ...state })
        }, 250)
    }

    return (
        <div className="float-menu" style={{ left: state.left, top: state.top }}>
            {
                state.inputShow ? (
                    <input onBlur={(e) => onBlur(e)} ref={input} style={{ width: state.isInputWidth ? '5.4rem' : '0' }} type="text" className="float-input" />
                ) : (
                    <div 
                        onTouchStart={(e) => onStart(e)}
                        onTouchMove={(e) => onMove(e)} 
                        onTouchEnd={(e) => onEnd(e)}
                        className="float-centre"
                    ></div>
                )
            }
            <ul className="menu-item" style={{ transform: state.rotationAngle }}>
                {state.list.map((item: any, index: number) => (
                    <li style={{ transform: state.unfold ? `rotate(${getRotationAngle(index)}deg) translate(-50%, -50%)` : '', opacity: state.unfold ? 1 : 0 }} key={index}></li>
                ))}
            </ul>
        </div>
    )
}

export default FloatMenu
