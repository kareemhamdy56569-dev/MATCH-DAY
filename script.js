// ==========================================
//  MatchDay AI - Script
// ==========================================

// 1. تشغيل الوظائف عند تحميل الصفحة
window.onload = () => {
    fetchLiveMatches();
    setupMatchToggle();
    setupTeamSelection();
    setupScoreClickToggle(); // تفعيل ميزة إظهار التحليل عند الضغط على النتيجة
};

// 2. محاكاة جلب بيانات المباريات
function fetchLiveMatches() {
    console.log("جاري تحميل بيانات المباريات...");
}

// 3. التنقل بين التبويبات (تحليل، تشكيل، إحصائيات...)
function setupMatchToggle() {
    const tabs = document.querySelectorAll('.tab-btn, .nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// 4. تحديث واجهة الفريق المفضل
function setupTeamSelection() {
    const teamSelect = document.getElementById('team-select');
    if (teamSelect) {
        teamSelect.addEventListener('change', (e) => {
            updateTeamUI(e.target.value);
        });
    }
}

function updateTeamUI(team) {
    const favText = document.getElementById('fav-team-text');
    const transferBox = document.getElementById('transfer-box');

    if (favText) {
        favText.innerText = team;
    }
    if (transferBox) {
        transferBox.innerHTML = `أخبار الانتقالات الخاصة بـ <strong>${team}</strong>`;
    }
}

// 5. إخفاء التحليل وإظهاره فقط عند الضغط على النتيجة
function setupScoreClickToggle() {
    // تحديد عنصر النتيجة وقسم التحليل
    const scoreCard = document.querySelector('.score-board') || document.querySelector('.match-card') || document.querySelector('.score-display');
    const aiSection = document.querySelector('.ai-analysis-section') || document.querySelector('.ai-section') || document.getElementById('ai-section');

    if (aiSection) {
        // إخفاء قسم التحليل افتراضياً عند بداية الفتح
        aiSection.style.display = 'none';
    }

    if (scoreCard && aiSection) {
        scoreCard.style.cursor = 'pointer';
        scoreCard.title = "اضغط هنا لإظهار/إخفاء تحليل الذكاء الاصطناعي";

        scoreCard.addEventListener('click', () => {
            if (aiSection.style.display === 'none' || aiSection.style.display === '') {
                aiSection.style.display = 'block';
            } else {
                aiSection.style.display = 'none';
            }
        });
    }
}