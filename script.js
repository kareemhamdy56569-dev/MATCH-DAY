// ==========================================
//  MatchDay AI - Script
// ==========================================

window.onload = () => {
    fetchLiveMatches();
    setupMatchToggle();
    setupTeamSelection();
    setupScoreClickToggle();
};

function fetchLiveMatches() {
    console.log("جاري تحميل بيانات المباريات...");
}

function setupMatchToggle() {
    const tabs = document.querySelectorAll('.tab-btn, .nav-tab');
    tabs.dispose = tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

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
    if (favText) favText.innerText = team;
    if (transferBox) transferBox.innerHTML = `أخبار الانتقالات الخاصة بـ <strong>${team}</strong>`;
}

// 5. إخفاء التحليل وإظهاره عند الضغط على النتيجة أو كارت الماتش
function setupScoreClickToggle() {
    // هنجيب قسم التحليل بأكتر من طريقة عشان نضمن إنه يمسكه
    const aiSection = document.querySelector('.ai-analysis-section') || 
                      document.querySelector('.ai-section') || 
                      document.getElementById('ai-section') ||
                      document.querySelector('div[style*="background"]');

    // إخفاء التحليل أول ما الصفحة تفتح
    if (aiSection) {
        aiSection.style.display = 'none';
    }

    // هندور على كارت النتيجة أو كارت الماتش نفسه اللي فوق النتيجة 1-2
    // هنا بنختار الكارت الأزرق الكبير اللي فيه نتيجة الماتش والأهلي والزمالك
    const matchCards = document.querySelectorAll('div');
    
    matchCards.forEach(card => {
        // لو الكارت جواة النتيجة "1-2" أو أسماء الفرق
        if (card.innerText && card.innerText.includes("1 - 2") || (card.innerText && card.innerText.includes("الأهلي") && card.innerText.includes("الزمالك"))) {
            // نتاكد إنه الكارت الرئيسي مش الصفحة كلها
            if (card.clientHeight < 400 && card.clientHeight > 50) {
                card.style.cursor = 'pointer';
                card.title = "اضغط لإظهار/إخفاء التحليل";
                
                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (aiSection) {
                        if (aiSection.style.display === 'none' || aiSection.style.display === '') {
                            aiSection.style.display = 'block';
                        } else {
                            aiSection.style.display = 'none';
                        }
                    }
                });
            }
        }
    });
}