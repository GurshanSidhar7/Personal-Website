import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

const Cursor = () => {
  const cursorRefs = useRef([]) // Stores references to all cursor elements
  const coords = useRef({ x: 0, y: 0 }) // Tracks mouse coordinates
  const animationFrameId = useRef(null) // Store the animation frame ID
  const location = useLocation() // Track route changes

  const colors = [
    "#ffffff", "#faf3ff", "#f5e7ff", "#f0dbff", "#ebcfff", 
  "#e6c3ff", "#e1b7ff", "#dcabff", "#d79fff", "#d293ff", 
  "#cd87ff", "#c87bff", "#c36fff", "#be63ff", "#b957ff", 
  "#b44bff", "#af3fff", "#aa33ff", "#a527ff", "#a01bff"
  ]

  const animateCircles = () => {
    let x = coords.current.x
    let y = coords.current.y

    cursorRefs.current.forEach((circle, index) => {
      if (!circle) return

      circle.style.transform = `translate(${x - 12}px, ${y - 12}px) scale(${(cursorRefs.current.length - index) / cursorRefs.current.length})`

      circle.dataset.x = x.toString()
      circle.dataset.y = y.toString()

      const nextCircle = cursorRefs.current[index + 1] || cursorRefs.current[0]
      if (nextCircle) {
        const nextX = Number.parseFloat(nextCircle.dataset.x || "0")
        const nextY = Number.parseFloat(nextCircle.dataset.y || "0")
        x += (nextX - x) * 0.3
        y += (nextY - y) * 0.3
      }
    })

    animationFrameId.current = requestAnimationFrame(animateCircles)
  }

  // Function to apply cursor: none to all elements
  const hideDefaultCursor = () => {
    document.body.style.cursor = 'none';
    
    // Also hide cursor on all clickable elements to maintain consistency
    const clickableElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    clickableElements.forEach(element => {
      element.style.cursor = 'none';
    });
  }

  // Main effect for cursor setup
  useEffect(() => {
    // Hide default cursor immediately
    hideDefaultCursor();
    
    // Initialize cursor positions
    cursorRefs.current.forEach((circle, index) => {
      if (!circle) return
      circle.dataset.x = coords.current.x.toString()
      circle.dataset.y = coords.current.y.toString()
      circle.style.backgroundColor = colors[index % colors.length]
    })

    const handleMouseMove = (e) => {
      coords.current.x = e.clientX
      coords.current.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)
    
    // Start the animation loop
    animationFrameId.current = requestAnimationFrame(animateCircles)

    return () => {
      // Restore the default cursor when component unmounts
      document.body.style.cursor = '';
      
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  // Additional effect that runs when routes change
  useEffect(() => {
    // Re-apply cursor hiding after route changes
    // Use a small timeout to ensure all new DOM elements are rendered
    const timeoutId = setTimeout(hideDefaultCursor, 50);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname]); // This effect runs every time the route changes

  return (
    <div className="cursor-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99999 }}>
      {Array.from({ length: 21 }).map((_, index) => (
        <div
          key={`cursor-${index}`}
          ref={(el) => (cursorRefs.current[index] = el)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: colors[index % colors.length],
            pointerEvents: 'none',
            zIndex: 99999,
            willChange: "transform",
            opacity: 0.7 - (index * 0.03), // Decreasing opacity for trailing circles
          }}
        />
      ))}
    </div>
  )
}

export default Cursor