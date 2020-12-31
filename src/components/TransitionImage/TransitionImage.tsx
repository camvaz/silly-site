import React, { useEffect, useRef, useState } from "react"
import Image, { FluidObject } from "gatsby-image"

import "./TransitionImage.scss"

interface TransitionImageProps {
  image: FluidObject
  index: number
}

const TransitionImage: React.FC<TransitionImageProps> = ({ image, index }) => {
  const ref = useRef<HTMLDivElement>()
  const [pxCounter, setPxCounter] = useState(index * 100)
  const [pxMultiplier, setPxMultiplier] = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const [mouseOver, setMouseOver] = useState(false)

  const onTransitionEnd = () => {
    if (typeof window === "undefined") return
    const bounding = ref.current.getBoundingClientRect()

    if (bounding.left <= -bounding.width) {
      setPxCounter(() => window.innerWidth)
    }
  }

  const onMouseOver = () => {
    if (typeof window !== "undefined")
      if (window.innerWidth > 420 && !transitioning) {
        setPxMultiplier(() => 50)
        setMouseOver(() => true)
        setTransitioning(() => true)
      }
  }

  const onMouseLeave = () => {
    if (typeof window !== "undefined")
      if (window.innerWidth > 420) {
        setTimeout(() => {
          setPxMultiplier(() => 1)
          setMouseOver(() => false)
          setTransitioning(() => false)
        }, 100)
      }
  }

  const onClick = () => {
    if (typeof alert === "function") {
      alert("Nice catch : )")
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ref) return
      setPxCounter(x => x - pxMultiplier)
    }, 10)
    return () => clearInterval(interval)
  }, [ref, setPxCounter, pxMultiplier, pxCounter])

  return (
    <div
      ref={ref}
      onTransitionEnd={onTransitionEnd}
      onMouseEnter={onMouseOver}
      onMouseOut={onMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${pxCounter + 50}px, ${
          index === 0
            ? 40
            : index < 4
            ? 200 * index
            : index % 4 === 0
            ? 40
            : 200 * (index % 4)
        }px, 0) ${mouseOver ? "scale3d(0.2,0.2,0.2)" : ""}`,
        transition: mouseOver
          ? "transform 100ms ease-in-out"
          : "transform 1ms ease-in-out",
      }}
      className="transition-image"
    >
      <Image fluid={image} />
    </div>
  )
}

export default TransitionImage
