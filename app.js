/* --- app.js: JavaScript Basics & User Interaction --- */

// 1. Reusable showToast() Function for Notifications
function showToast(message) {
    // Check if a toast already exists and remove it to prevent stacking
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast container element dynamically
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;

    // Apply inline styles for a sleek floating toast banner
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#0b1d3a', // Primary theme color
        color: '#f4c430',          // Accent gold color
        padding: '14px 24px',
        borderRadius: '8px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
        fontWeight: '600',
        zIndex: '10000',
        opacity: '0',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        transform: 'translateY(20px)'
    });

    document.body.appendChild(toast);

    // Trigger smooth fade-in animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);

    // Fade out and remove after 3.5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// 2. Smooth Scrolling & Event Handling on DOM Content Load
document.addEventListener('DOMContentLoaded', () => {
    
    // Target all book buttons/links that link to #booking
    const bookLinks = document.querySelectorAll('a[href="#booking"]');

    bookLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent instant jump

            const bookingSection = document.querySelector('#booking');
            if (bookingSection) {
                // Perform smooth scroll behavior
                bookingSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });

                // Display custom toast notification
                showToast('Redirected to Ticket Booking Section!');
            }
        });
    });

    // Optional: Interactive feedback on booking form submission if present
    const bookingForm = document.querySelector('form');
    if (bookingForm && !bookingForm.hasAttribute('onsubmit')) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Booking submitted successfully!');
        });
    }
});