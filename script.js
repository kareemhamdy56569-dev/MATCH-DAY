// ==========================================
// MatchDay AI - Fast & Clean Script
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupSwipeNavigation();
});

// تهيئة التطبيق والأحداث
function initApp() {
    const matchCards = document.querySelectorAll('.match-card');
    const modal = document.getElementById('match-details-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const tournamentTitle = document.getElementById('modal-tournament-name');

    // عند الضغط على أي مباراة، يظهر تحليلها واسم بطولتها
    matchCards.forEach(card => {
        card.addEventListener('click', () => {
            const groupHeader = card.closest('.matches-group').querySelector('.group-header span');
            if (groupHeader && tournamentTitle) {
                tournamentTitle.innerText = "بطولة: " + groupHeader.innerText;
            }
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // إغلاق مودال التحليل
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}

// ميزة السحب (Swipe) يمين ويسار للتنقل بين الأيام + أزرار الاختصار
function setupSwipeNavigation() {
    const container = document.getElementById('swipe-container');
    const prevBtn = document.getElementById('prev-day');
    const nextBtn = document.getElementById('next-day');
    const dateText = document.getElementById('current-date-text');

    const days = [
        "الخميس، 03/09/2026",
        "الجمعة، 04/09/2026 (اليوم)",
        "السبت، 05/09/2026"
    ];
    let currentIndex = 1;

    function updateDate(index) {
        if (dateText) {
            dateText.innerText = days[index];
            dateText.style.opacity = '0.3';
            setTimeout(() => dateText.style.opacity = '1', 200);
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateDate(currentIndex);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < days.length - 1) {
                currentIndex++;
                updateDate(currentIndex);
            }
        });
    }

    let touchStartX = 0;
    let touchEndX = 0;

    if (container) {
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) {
                if (currentIndex < days.length - 1) {
                    currentIndex++;
                    updateDate(currentIndex);
                }
            }
            if (touchEndX > touchStartX + 50) {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateDate(currentIndex);
                }
            }
        }, {passive: true});
    }
}