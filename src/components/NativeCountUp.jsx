"use client";

import { useState, useEffect, useRef } from 'react';
import { useInView } from "framer-motion"; // Puedes reutilizar el hook de framer-motion

const DURATION = 1500; // 1.5 segundos (1500ms)

export function NativeCountUp({ endNumber, duration, enableScrollSpy = true }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Usamos once: true para que se anime una sola vez

    useEffect(() => {
        if (!enableScrollSpy || isInView) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = timestamp - startTimestamp;
                const percentage = Math.min(progress / (duration * 1000 || DURATION), 1);
                
                // Calcular el valor actual de forma progresiva
                const current = Math.floor(percentage * endNumber);
                setCount(current);

                if (percentage < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [endNumber, duration, enableScrollSpy, isInView]);

    // Renderiza el número y el ref para el useInView
    return <span ref={ref}>{count}</span>;
}