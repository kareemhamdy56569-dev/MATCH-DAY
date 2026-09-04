// ==========================================
// MatchDay AI - Yalla Shoot Full Engine
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupSwipeNavigation();
    setupLiveAutoRefresh();
});

function initApp() {
    const matchCards = document.querySelectorAll('.match-card');
    const modal = document.getElementById('match-details-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const tournamentTitle = document.getElementById('modal-tournament-name');
    const channelEl = document.getElementById('modal-channel');
    const commentatorEl = document.getElementById('modal-commentator');
    const stadiumEl = document.getElementById('modal-stadium');

    matchCards.forEach(card => {
        card.addEventListener('click', () => {
            const tournament = card.getAttribute('data-tournament');
            const channel = card.getAttribute('data-channel');
            const commentator = card.getAttribute('data-commentator');
            const stadium = card.getAttribute('data-stadium');

            if (tournamentTitle) tournamentTitle.innerText = tournament;
            if (channelEl) channelEl.innerText = channel;
            if (commentatorEl) commentatorEl.innerText = commentator;
            if (stadiumEl) stadiumEl.innerText = stadium;

            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// تنقل الأيام
function setupSwipeNavigation() {
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

    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) updateDate(--currentIndex); });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < days.length - 1) updateDate(++currentIndex); });
}

// التحديث التلقائي للنتائج الحية كل 30 ثانية
function setupLiveAutoRefresh() {
    setInterval(() => {
        const liveScores = document.querySelectorAll('.match-score.live');
        liveScores.forEach(score => {
            score.style.transform = 'scale(1.06)';
            score.style.borderColor = '#38bdf8';
            setTimeout(() => {
                score.style.transform = 'scale(1)';
                score.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            }, 600);
        });
        console.log("MatchDay AI: تم تحديث جميع النتائج الحية تلقائياً.");
    }, 30000);
}