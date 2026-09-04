// ==========================================
//  MatchDay AI - Script
// ==========================================

window.onload = () => {
    fetchLiveMatches();
    setupTabsAndToggle();
    setupTeamSelection();
};

function fetchLiveMatches() {
    console.log("جاري تحميل بيانات المباريات...");
}

// 1. نظام التبويبات والتحكم في ظهور الأقسام بدقة
function setupTabsAndToggle() {
    // تحديد عناصر التبويبات والأقسام المختلفة
    const tabs = document.querySelectorAll('.tab-btn, .nav-tab');
    
    // الأقسام الأساسية في الصفحة
    const aiSection = document.querySelector('.ai-analysis-section') || document.getElementById('ai-section');
    const lineupSection = document.querySelector('.lineup-section') || document.querySelector('.lineup') || document.getElementById('lineup-section');
    const statsSection = document.querySelector('.stats-section') || document.getElementById('stats-section');
    const eventsSection = document.querySelector('.events-section') || document.getElementById('events-section');

    // إخفاء التحليل وباقي الأقسام افتراضياً عند فتح الصفحة، وترك النتيجة فقط
    [aiSection, lineupSection, statsSection, eventsSection].forEach(sec => {
        if (sec) sec.style.display = 'none';
    });

    // إمكانية الضغط على كارت النتيجة لإظهار وإخفاء التحليل الافتراضي
    const scoreCard = document.querySelector('.score-board') || document.querySelector('.match-card');
    if (scoreCard && aiSection) {
        scoreCard.style.cursor = 'pointer';
        scoreCard.addEventListener('click', () => {
            aiSection.style.display = (aiSection.style.display === 'none') ? 'block' : 'none';
        });
    }

    // ربط التبويبات بالأقسام بتاعتها بالظبط عشان كل زرار يفتح جزئه المخصص
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');

            const tabText = e.target.innerText.trim();

            // إخفاء الكل الأول
            [aiSection, lineupSection, statsSection, eventsSection].forEach(sec => {
                if (sec) sec.style.display = 'none';
            });

            // إظهار القسم المناسب حسب التبويب اللي دُست عليه
            if (tabText.includes('تحليل') && aiSection) {
                aiSection.style.display = 'block';
            } else if (tabText.includes('التشكيل') && lineupSection) {
                lineupSection.style.display = 'block';
            } else if (tabText.includes('الإحصائيات') && statsSection) {
                statsSection.style.display = 'block';
            } else if (tabText.includes('أحداث') && eventsSection) {
                eventsSection.style.display = 'block';
                formatTimelineEvents(eventsSection); // تنسيق الأحداث كخط زمني رأسي
            }
        });
    });
}

// 2. تحويل أحداث الماتش لشكل خط طولي (Timeline) رائع
function formatTimelineEvents(container) {
    // إضافة تصميم الخط الطولي للأحداث لو مش موجود
    if (!document.getElementById('timeline-custom-style')) {
        const style = document.createElement('style');
        style.id = 'timeline-custom-style';
        style.innerHTML = `
            .events-section, .match-events {
                position: relative;
                padding-left: 30px !important;
                border-left: 3px solid #3b82f6 !important;
                margin-left: 20px !important;
                margin-top: 15px !important;
            }
            .event-item, li, .event-row {
                position: relative;
                margin-bottom: 15px;
                list-style: none;
            }
            .event-item::before, li::before {
                content: '';
                position: absolute;
                left: -33.5px;
                top: 5px;
                width: 12px;
                height: 12px;
                background: #3b82f6;
                border-radius: 50%;
                border: 2px solid #fff;
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