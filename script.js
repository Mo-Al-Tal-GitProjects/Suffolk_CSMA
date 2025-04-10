// JavaScript
// Enhanced button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.left = e.clientX - e.target.offsetLeft + 'px';
        ripple.style.top = e.clientY - e.target.offsetTop + 'px';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 500);
    });
});

// // Search functionality
// document.querySelector('.search-btn').addEventListener('click', () => {
//     const query = document.querySelector('input').value;
//     // Implement search logic
//     console.log('Searching for:', query);
// });

// // Smooth scroll for anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// Map

// Rosalie K. Stahl Center: 73 Tremont Street, Boston, Massachusetts
const map = L.map("map").setView([42.357813, -71.061027], 18)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
})
.addTo(map);
