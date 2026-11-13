/**
 * 국가공무원인재개발원 (NHI) 포털 - 보노보노 테마 스크립트
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 모바일 햄버거 메뉴 토글
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('active');
        }
      });
    });
  }

  // 2. 주요 업무 탭 전환
  const taskTabs = document.querySelectorAll('.task-tab');
  const taskPanels = document.querySelectorAll('.task-panel');

  taskTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      taskTabs.forEach(t => t.classList.remove('active'));
      taskPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 3. 찾아오는 길 캠퍼스 탭 전환 (진천 / 과천)
  const campusTabs = document.querySelectorAll('.campus-tab');
  const campusPanels = document.querySelectorAll('.campus-panel');

  campusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      campusTabs.forEach(t => t.classList.remove('active'));
      campusPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const campus = tab.getAttribute('data-campus');
      const panel = document.getElementById(`campus-${campus}`);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });

  // 4. FAQ 아코디언 기능
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 5. 보노보노 조개 흔들기 이펙트 버튼
  const bonoSoundBtn = document.getElementById('bonoSoundBtn');
  if (bonoSoundBtn) {
    bonoSoundBtn.addEventListener('click', () => {
      showToast('🐚 보노보노: "포로리야~ 조개 줄 테니까 때리지 마~"');
    });
  }
});

// 주소 복사 토스트 알림 함수
function copyAddress(addressText) {
  navigator.clipboard.writeText(addressText).then(() => {
    showToast(`📋 주소 복사 완료: "${addressText}" 💧`);
  }).catch(() => {
    const tempInput = document.createElement('input');
    tempInput.value = addressText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`📋 주소 복사 완료: "${addressText}" 💧`);
  });
}

// 토스트 메시지 함수
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
