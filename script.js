// قائمة الأندية والشعارات الخاصة بها
const teamLogos = {
    'الأهلي': 'https://upload.wikimedia.org/wikipedia/ar/8/8c/Ahly_SC_logo.svg',
    'الزمالك': 'https://upload.wikimedia.org/wikipedia/ar/0/04/ZamalekSC.png',
    'مانشستر سيتي': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    'ليفربول': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    'ريال مدريد': 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    'برشلونة': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona.svg'
};

// وظيفة جلب وتحديث بيانات المباريات
function fetchLiveMatches() {
    console.log("جاري تحديث بيانات المباريات...");
    
    // يمكن هنا ربط الـ API الخارجي مستقبلاً
    // حالياً يتم استخدام هذه البنية لتحديث الواجهة تلقائياً
    updateMatchUI();
}

// وظيفة التحكم في إظهار وإخفاء تفاصيل المباراة (Accordion/Toggle)
function setupMatchToggle() {
    document.querySelectorAll('.match-card').forEach(card => {
        const scoreElement = card.querySelector('.match-score');
        const detailsElement = card.querySelector('.match-details');
        
        if (scoreElement && detailsElement) {
            // جعل كارت النتيجة كأنه زر قابل للضغط
            scoreElement.style.cursor = 'pointer';
            
            scoreElement.addEventListener('click', () => {
                // تبديل حالة العرض بين إخفاء وإظهار التفاصيل
                if (detailsElement.style.display === 'none' || !detailsElement.style.display) {
                    detailsElement.style.display = 'block';
                } else {
                    detailsElement.style.display = 'none';
                }
            });
        }
    });
}

// تحديث اختيار الفريق المفضل
function setupTeamSelection() {
    document.querySelectorAll('.team-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedTeam = e.target.getAttribute('data-team');
            localStorage.setItem('userFavTeam', selectedTeam);
            updateTeamUI(selectedTeam);
            
            const model = document.getElementById('team-modal');
            if (model) {
                model.style.display = 'none';
            }
        });
    });
}

// تحديث واجهة الفريق المفضل
function updateTeamUI(team) {
    const favText = document.getElementById('fav-team-text');
    const transferBox = document.getElementById('transfer-box');
    
    if (favText) {
        favText.innerText = team;
    }
    if (transferBox) {
        transferBox.innerHTML = `اخبار الانتقالات الخاصة بـ <strong>${team}</strong>`;
    }
}

// تشغيل الوظائف عند تحميل الصفحة
window.onload = () => {
    fetchLiveMatches();
    setupMatchToggle();
    setupTeamSelection();
    
    const savedTeam = localStorage.getItem('userFavTeam');
    if (savedTeam) {
        updateTeamUI(savedTeam);
    }
};

// التحديث التلقائي المباشر كل 30 ثانية لتفادي استهلاك كوتا الـ API
setInterval(fetchLiveMatches, 30000);