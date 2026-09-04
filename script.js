// 1. نظام التبويبات والتحكم في ظهور الأقسام
function setupTabsAndToggle() {

    // جميع التبويبات
    const tabs = document.querySelectorAll('.tab-btn, .nav-tab');

    // الأقسام
    const aiSection =
        document.querySelector('.ai-analysis-section') ||
        document.getElementById('ai-section');

    const lineupSection =
        document.querySelector('.lineup-section') ||
        document.querySelector('.lineup') ||
        document.getElementById('lineup-section');

    const statsSection =
        document.querySelector('.stats-section') ||
        document.getElementById('stats-section');

    const eventsSection =
        document.querySelector('.events-section') ||
        document.getElementById('events-section');

    const sections = [
        aiSection,
        lineupSection,
        statsSection,
        eventsSection
    ];

    // إخفاء كل الأقسام في البداية
    sections.forEach(section => {
        if (section) {
            section.style.display = 'none';
        }
    });

    // ==============================
    // التبويبات
    // ==============================

    tabs.forEach(tab => {

        tab.addEventListener('click', function (e) {

            // مهم جداً:
            // يمنع ضغطة التبويب من الوصول لكارت المباراة
            e.stopPropagation();

            // استخدام currentTarget بدل target
            const clickedTab = e.currentTarget;

            // إزالة Active من كل التبويبات
            tabs.forEach(t => {
                t.classList.remove('active');
            });

            // تفعيل التبويب الحالي
            clickedTab.classList.add('active');

            // النص الموجود في التبويب
            const tabText = clickedTab.innerText.trim();

            // إخفاء كل الأقسام
            sections.forEach(section => {
                if (section) {
                    section.style.display = 'none';
                }
            });

            // ==============================
            // تحديد القسم المطلوب
            // ==============================

            if (tabText.includes('تحليل')) {

                if (aiSection) {
                    aiSection.style.display = 'block';
                }

            } else if (
                tabText.includes('التشكيل') ||
                tabText.includes('الملعب')
            ) {

                if (lineupSection) {
                    lineupSection.style.display = 'block';
                }

            } else if (tabText.includes('الإحصائيات')) {

                if (statsSection) {
                    statsSection.style.display = 'block';
                }

            } else if (tabText.includes('أحداث')) {

                if (eventsSection) {
                    eventsSection.style.display = 'block';
                    formatTimelineEvents(eventsSection);
                }
            }

        });
    });

    // ==============================
    // كارت المباراة
    // ==============================

    const scoreCard =
        document.querySelector('.score-board') ||
        document.querySelector('.match-card');

    if (scoreCard && aiSection) {

        scoreCard.style.cursor = 'pointer';

        scoreCard.addEventListener('click', function (e) {

            // لو الضغط كان على تبويب، ما تعملش حاجة
            if (e.target.closest('.tab-btn, .nav-tab')) {
                return;
            }

            // فتح / إغلاق تحليل الـAI
            aiSection.style.display =
                aiSection.style.display === 'none'
                    ? 'block'
                    : 'none';
        });
    }
}