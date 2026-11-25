/* --- Activity 8: Responsive Layout, Filtering, View Toggle & Booking Logic --- */

function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;

    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#0b1d3a',
        color: '#f4c430',
        padding: '13px 22px',
        borderRadius: '8px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
        fontWeight: '700',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(16px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease'
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(16px)';
        setTimeout(() => toast.remove(), 250);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.querySelector('#hamburger-btn');
    const mainNav = document.querySelector('#main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        });

        mainNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Match Team Filter
    const teamFilter = document.querySelector('#team-filter');
    const matchCards = document.querySelectorAll('.match-card');

    if (teamFilter && matchCards.length > 0) {
        teamFilter.addEventListener('change', () => {
            const selectedTeam = teamFilter.value.toUpperCase();

            matchCards.forEach((card) => {
                const teamsAttr = (card.getAttribute('data-teams') || '').toUpperCase();
                const teamList = teamsAttr.split(/\s+/);
                const matchesFilter = selectedTeam === 'ALL' || teamList.includes(selectedTeam);
                card.classList.toggle('hidden', !matchesFilter);
            });

            showToast(
                selectedTeam === 'ALL'
                    ? 'Showing all scheduled matches'
                    : `Filtered matches by ${selectedTeam}`
            );
        });
    }

    // 3. Grid / List View Toggle
    const viewToggleBtn = document.querySelector('#view-toggle-btn');
    const matchesContainer = document.querySelector('#matches-container');

    if (viewToggleBtn && matchesContainer) {
        viewToggleBtn.addEventListener('click', () => {
            const isListView = matchesContainer.classList.toggle('list-view');
            viewToggleBtn.textContent = isListView ? 'Switch to Grid View' : 'Switch to List View';
            showToast(isListView ? 'Switched to List View' : 'Switched to Grid View');
        });
    }

    // 4. Booking Form, Live Summary & Bookings Table
    const matchSelect = document.querySelector('#match-select');
    const standSelect = document.querySelector('#stand-select');
    const ticketQtyInput = document.querySelector('#ticket-qty');
    const bookingForm = document.querySelector('#booking-form');

    const sumMatch = document.querySelector('#sum-match');
    const sumStand = document.querySelector('#sum-stand');
    const sumPrice = document.querySelector('#sum-price');
    const sumQty = document.querySelector('#sum-qty');
    const sumTotal = document.querySelector('#sum-total');

    const pricingTable = {
        'RCB vs CSK': { General: 800, Premium: 1500, VIP: 3000 },
        'MI vs KKR': { General: 900, Premium: 1800, VIP: 3500 },
        'CSK vs SRH': { General: 700, Premium: 1400, VIP: 2800 },
        'RCB vs MI': { General: 950, Premium: 2000, VIP: 4000 }
    };

    function getUnitPrice() {
        if (!matchSelect || !standSelect) return 0;
        const match = matchSelect.value;
        const stand = standSelect.value;
        return (pricingTable[match] && pricingTable[match][stand]) || 0;
    }

    function updateSummary() {
        if (!matchSelect || !standSelect || !ticketQtyInput) return;

        const match = matchSelect.value || 'Not Selected';
        const stand = standSelect.value || 'Not Selected';
        const qty = parseInt(ticketQtyInput.value, 10) || 0;
        const unitPrice = getUnitPrice();
        const total = unitPrice * qty;

        if (sumMatch) sumMatch.textContent = match;
        if (sumStand) sumStand.textContent = stand;
        if (sumPrice) sumPrice.textContent = `₹${unitPrice}`;
        if (sumQty) sumQty.textContent = String(qty);
        if (sumTotal) sumTotal.textContent = `₹${total}`;
    }

    // Pre-select match when clicking "Book" on a match card
    document.querySelectorAll('.book-match-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const matchName = btn.getAttribute('data-match');
            if (matchSelect && matchName) {
                matchSelect.value = matchName;
                updateSummary();
                showToast(`Selected ${matchName} for booking`);
            }
        });
    });

    if (matchSelect) matchSelect.addEventListener('change', updateSummary);
    if (standSelect) standSelect.addEventListener('change', updateSummary);
    if (ticketQtyInput) ticketQtyInput.addEventListener('input', updateSummary);

    updateSummary();

    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const match = matchSelect.value;
            const stand = standSelect.value;
            const qty = parseInt(ticketQtyInput.value, 10) || 1;
            const total = getUnitPrice() * qty;

            const tbody = document.querySelector('#bookings-tbody');
            const emptyRow = document.querySelector('#empty-bookings-row');

            if (tbody) {
                if (emptyRow) {
                    emptyRow.remove();
                }

                const bookingId = 'IPL-' + Math.floor(1000 + Math.random() * 9000);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${bookingId}</td>
                    <td>${match}</td>
                    <td>${stand}</td>
                    <td>${qty}</td>
                    <td>₹${total}</td>
                    <td>Confirmed</td>
                `;
                tbody.appendChild(row);
            }

            showToast('Booking confirmed successfully!');
            bookingForm.reset();
            updateSummary();
        });
    }
});