import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const { root = null, rootMargin = '0px', threshold = 0.25 } = options

  // Un array de umbrales es una referencia nueva en cada render. Lo
  // convertimos a una clave primitiva para no recrear el observer si su
  // contenido no cambió.
  const thresholdKey = Array.isArray(threshold)
    ? threshold.join(',')
    : String(threshold)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      {
        root,
        rootMargin,
        threshold: thresholdKey.includes(',')
          ? thresholdKey.split(',').map(Number)
          : Number(thresholdKey),
      }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [root, rootMargin, thresholdKey])

  return [ref, visible]
}
