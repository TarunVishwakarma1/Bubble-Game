import { useEffect, useRef } from 'react';
import "/src/components/stylesheet/style.scss"

// eslint-disable-next-line react/prop-types
export default function Bubble({children}){
    const interBubble = useRef(null);

    useEffect(() => {
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            if (interBubble.current) {
                interBubble.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(() => {
                move();
            });
        }

        function mouseMove(event) {
            tgX = event.clientX;
            tgY = event.clientY;
           /* console.log("x : "+tgX+" y : "+tgY);*/
        }

        window.addEventListener('mousemove', mouseMove);
        move();

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    return(<>
            <div className="text-container">
                {children}
            </div>
            <div className="gradient-bg">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                           result="goo"/>
                            <feBlend in="SourceGraphic" in2="goo"/>
                        </filter>
                    </defs>
                </svg>
                <div className="gradients-container">
                    <div className="g1"></div>
                    <div className="g2"></div>
                    <div className="g3"></div>
                    <div className="g4"></div>
                    <div className="g5"></div>
                    <div ref={interBubble} className="interactive"></div>
                </div>
            </div>
        </>
    )
}