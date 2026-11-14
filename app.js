/* --- IPL 2027 Ticket Booking: Live Summary & Interactivity --- */

document.addEventListener('DOMContentLoaded', () => {
    const matchSelect = document.querySelector('#match-select');
    const standSelect = document.querySelector('#stand-select');
    const ticketQtyInput = document.querySelector('#ticket-qty');
    const bookingForm = document.querySelector('#booking-form');

    const sumMatch = document.querySelector('#sum-match');
    const sumStand = document.querySelector('#sum-stand');
    const sumPrice = document.querySelector('#sum-price');
    const sumQty = document.querySelector('#sum-qty');
    const sumTotal = document.querySelector('#sum-total');

    // Pricing matrix matching the match schedule table
    const pricingTable = {
        'CSK vs MI': { General: 1000, Premium: 2500, VIP: 5000 },
        'RCB vs KKR': { General: 1200, Premium: 3000, VIP: 6000 }
    };

    function getUnitPrice() {
        if (!matchSelect || !standSelect) return 0;
        const match = matchSelect.value;
        const stand = standSelect.value;
        if (pricingTable[match] && pricingTable[match][stand]) {
            return pricingTable[match][stand];
        }
        return 0;
    }

    function updateLiveSummary() {
        if (!matchSelect || !standSelect || !ticketQtyInput) return;

        const match = matchSelect.value || 'Not Selected';
        const stand = standSelect.value || 'Not Selected';
        const qty = parseInt(ticketQtyInput.value) || 0;
        const price = getUnitPrice();
        const total = price * qty;

        if (sumMatch) sumMatch.textContent = match;
        if (sumStand) sumStand.textContent = stand;
        if (sumPrice) sumPrice.textContent = price;
        if (sumQty) sumQty.textContent = qty;
        if (sumTotal) sumTotal.textContent = total;
    }

    // Event listeners for live updates
    if (matchSelect) matchSelect.addEventListener('change', updateLiveSummary);
    if (standSelect) standSelect.addEventListener('change', updateLiveSummary);
    if (ticketQtyInput) ticketQtyInput.addEventListener('input', updateLiveSummary);

    // Form Submission Handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const match = matchSelect.value;
            const stand = standSelect.value;
            const qty = parseInt(ticketQtyInput.value) || 1;
            const price = getUnitPrice();
            const total = price * qty;

            const myBookingsTableBody = document.querySelector('#my-bookings tbody');
            if (myBookingsTableBody) {
                // Remove "No past bookings found." placeholder if present
                const emptyRow = myBookingsTableBody.querySelector('td[colspan]');
                if (emptyRow) {
                    emptyRow.parentElement.remove();
                }

                const bookingId = 'IPL2027-' + Math.floor(1000 + Math.random() * 9000);
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${bookingId}</td>
                    <td>${match}</td>
                    <td>${stand}</td>
                    <td>${qty}</td>
                    <td>₹${total}</td>
                    <td><span style="color: green; font-weight: bold;">Confirmed</span></td>
                `;
                myBookingsTableBody.appendChild(newRow);
            }

            showToast('Ticket booking confirmed successfully!');
            bookingForm.reset();
            updateLiveSummary();
        });
    }
});

// Reusable Toast Notification Function
function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;

    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#00008b',
        color: '#ff8c00',
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

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}