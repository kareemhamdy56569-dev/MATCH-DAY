// ==========================================
//  MatchDay AI - Script
// ==========================================

window.onload = () => {
    fetchLiveMatches();
    setupCleanTabsAndToggle();
    setupTeamSelection();
};

function fetchLiveMatches() {
    console.log("جاري تحميل بيانات المباريات...");
}

// النظام السليم والبسيط للتبويبات وكارت النتيجة
function setupCleanTabsAndToggle() {
    const tabs = document.querySelectorAll('.tab-btn, .nav-tab');
    
    const aiSection = document.querySelector('.ai-analysis-section') || document.getElementById('ai-section');
    const lineupSection = document.querySelector('.lineup-section') || document.getElementById('lineup-section');
    const statsSection = document.querySelector('.stats-section') || document.getElementById('stats-section');
    const eventsSection = document.querySelector('.events-section') || document.getElementById('events-section');

    const allSections = [aiSection, lineupSection, statsSection, eventsSection];

    // إخفاء الكل في البداية وتفعيل التحليل أو إبقاؤهم مخفيين حسب رغبتك (هنا هنخليهم مخفيين في البداية)
    allSections.forEach(sec => {
        if (sec) sec.style.display = 'none';
    });

    // التحكم في التبويبات (تحليل، تشكيل، إحصائيات، أحداث)
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const text = e.currentTarget.innerText.trim();

            // إخفاء الكل أولاً
            allSections.forEach(sec => {
                if (sec) sec.style.display = 'none';
            });

            // إظهار القسم المناسب بالظبط بناءً على الزرار اللي دُست عليه
            if (text.includes('تحليل') && aiSection) {
                aiSection.style.display = 'block';
            } else if ((text.includes('التشكيل') || text.includes('الملعب')) && lineupSection) {
                lineupSection.style.display = 'block';
            } else if (text.includes('الإحصائيات') && statsSection) {
                statsSection.style.display = 'block';
            } else if (text.includes('أحداث') && eventsSection) {
                eventsSection.style.display = 'block';
                formatTimeline(eventsSection); // تصميم الخط الطولي للأحداث
            }
        });
    });

    // كارت النتيجة لإظهار وإخفاء التحليل
    const scoreCard = document.querySelector('.score-board') || document.querySelector('.match-card');
    if (scoreCard && aiSection) {
        scoreCard.style.cursor = 'pointer';
        scoreCard.addEventListener('click', () => {
            aiSection.style.display = (aiSection.style.display === 'none') ? 'block' : 'none';
        });
    }
}

// تنسيق أحداث الماتش بشكل خط طولي (Timeline)
function formatTimeline(section) {
    if (!document.getElementById('timeline-style')) {
        const style = document.createElement('style');
        style.id = 'timeline-style';
        style.innerHTML = `
            .events-section, .match-events {
                position: relative;
                padding-right: 25px !important;
                border-right: 3px solid #3b82f6 !important;
                margin-right: 15px !important;
                margin-top: 15px !important;
                text-align: right;
            }
            .events-section li, .match-events div {
                position: relative;
                margin-bottom: 12px;
            }
        `;
        document.head.appendChild(style);
    }
}

function setupTeamSelection() {
    const teamSelect = document.getElementById('team-select');
    if (teamSelect) {
        teamSelect.addEventListener('change', (e) => {
            const favText = document.getElementById('fav-team-text');
            if (favText) favText.innerText = e.target.value;
        });
    }
}