// ==========================================
//  MatchDay AI - Clean Script
// ==========================================

window.onload = () => {
    setupExactTabs();
    setupTeamSelectionDropdown();
};

// 1. نظام التبويبات الدقيق (كل زرار يفتح القسم الخاص بيه فقط)
function setupExactTabs() {
    // تحديد الأزرار والأسئلة بدقة
    const tabButtons = document.querySelectorAll('.tab-btn, .nav-tab');
    
    // الأقسام الأساسية
    const aiSection = document.querySelector('.ai-analysis-section') || document.getElementById('ai-section');
    const lineupSection = document.querySelector('.lineup-section') || document.getElementById('lineup-section');
    const statsSection = document.querySelector('.stats-section') || document.getElementById('stats-section');
    const eventsSection = document.querySelector('.events-section') || document.getElementById('events-section');

    const allSections = [aiSection, lineupSection, statsSection, eventsSection];

    // إخفاء كل الأقسام مبدئياً
    allSections.forEach(sec => {
        if (sec) sec.style.display = 'none';
    });

    // تشغيل الأزرار
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabButtons.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const text = e.currentTarget.innerText.trim();

            // إخفاء الكل عند الضغط
            allSections.forEach(sec => {
                if (sec) sec.style.display = 'none';
            });

            // فتح القسم المطابق للكلمة بالضبط
            if (text.includes('تحليل') && aiSection) {
                aiSection.style.display = 'block';
            } else if ((text.includes('التشكيل') || text.includes('الملعب')) && lineupSection) {
                lineupSection.style.display = 'block';
            } else if (text.includes('الإحصائيات') && statsSection) {
                statsSection.style.display = 'block';
            } else if (text.includes('أحداث') && eventsSection) {
                eventsSection.style.display = 'block';
                formatTimelineEvents(eventsSection);
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

// 2. تصميم أحداث الماتش كخط طولي متصل (Timeline)
function formatTimelineEvents(section) {
    if (!document.getElementById('timeline-custom-css')) {
        const style = document.createElement('style');
        style.id = 'timeline-custom-css';
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

// 3. إصلاح مشكلة اختيار الفريق والأزرار العلوية (دوري أبطال إفريقيا، الدوري الإنجليزي، إلخ)
function setupTeamSelectionDropdown() {
    const leagueButtons = document.querySelectorAll('.league-btn, .top-nav-btn, [class*="btn"]');
    
    leagueButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            leagueButtons.forEach(b => b.classList.remove('active-league'));
            this.classList.add('active-league');
        });
    });
}