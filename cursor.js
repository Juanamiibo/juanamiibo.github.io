// Custom Cursor Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    // Create and add the cursor image
    const cursorImg = document.createElement('img');
    cursorImg.src = 'cursor/Cursor.png';
    cursorImg.alt = 'cursor';
    cursor.appendChild(cursorImg);
    
    // Add cursor to the body
    document.body.appendChild(cursor);
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Update mouse position on mousemove
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation using requestAnimationFrame
    function animateCursor() {
        // Smooth following effect (easing)
        const speed = 0.2; // Lower = smoother but slower, Higher = faster but less smooth
        
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        // Update cursor position (offset by half the cursor size for centering)
        cursor.style.left = cursorX - 0 + 'px'; // 16 is half of 32px
        cursor.style.top = cursorY - 0 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start the animation
    animateCursor();
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
});
