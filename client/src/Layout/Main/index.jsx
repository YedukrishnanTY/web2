import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react"
import { useRef } from "react"
import { StyleSheet } from './style'
function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance])
}


export default function Main({ children }) {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div id="example">
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', gap: 16, padding: '16px' }}>
                {children}
            </div>
            <motion.div className="progress" style={{ scaleX }} />
            <StyleSheet />
        </div>
    )
}

