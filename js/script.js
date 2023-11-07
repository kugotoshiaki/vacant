const loadingGrey = document.querySelector('#loading');
const loadingPink = document.querySelector('#loading-screen');
const loadingText = document.querySelector('#loading p');

window.addEventListener('load', () => {
  loadingGrey.animate(
    {
      opacity: [1, 0],
      visibility: 'hidden',
    },
    {
      duration: 2000,
      delay: 1200,
      easing: 'ease-in',
      fill: 'forwards',
    }
  );

  loadingPink.animate(
    {
      translate: ['0 100vh', '0 0', '0 -100vh'],
    },
    {
      duration: 2000,
      delay: 800,
      easing: 'ease',
      fill: 'forwards',
    }
  );

  loadingText.animate(
    [
      {
        opacity: 1,
        offset: 0.8,
      },
      {
        opacity: 0,
        offset: 1,
      },
    ],
    {
      duration: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );
});

const fadeIn = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          filter: ['blur(.4rem', 'blur(0)'],
          translate: ['0 4rem', 0],
        },
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      obs.unobserve(entry.target);
    }
  });
};

const fadeObserver = new IntersectionObserver(fadeIn);

const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});

// 監視対象が範囲内に現れたら実行する動作
const animateScroll = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          translate: [0, '100%'],
        },
        {
          duration: 2000,
          pseudoElement: '::before',
          easing: 'ease',
          fill: 'forwards',
        }
      );

      // 一度実行されたら監視をやめる
      obs.unobserve(entry.target);
    }
  });
};

// 監視設定
const scrollObserver = new IntersectionObserver(animateScroll);

// 監視の指示
const scrollElements = document.querySelectorAll('.scroll');
scrollElements.forEach((scrollElement) => {
  scrollObserver.observe(scrollElement);
});

// スクロールするとアドレスバー（仮）が出る
let prevScrollTop = window.pageYOffset;

window.addEventListener('scroll', () => {
  let currentScrollPos = window.pageYOffset;
  let addressBar = document.querySelector('.shop-area');
  if (currentScrollPos > prevScrollTop) {
    addressBar.animate(
      {
        height: 150 + 'px',
      },
      {
        duration: 1000,
        delay: 100,
        easing: 'ease-in',
        fill: 'forwards',
      }
    );
  } else {
    addressBar.animate(
      {
        height: 70 + 'px',
      },
      {
        duration: 1000,
        delay: 100,
        easing: 'ease-in',
        fill: 'forwards',
      }
    );
  }
  prevScrollTop = currentScrollPos;
});

// タイマー

function displayTime() {
  const now = new Date();
  // const hour = now.getHours();
  // const minute = now.getMinutes();
  // const second = now.getSeconds();

  const padZero = (value) => {
    return value.toString().padStart(2, '0');
  };

  const hour = padZero(now.getHours());
  const minute = padZero(now.getMinutes());
  const second = padZero(now.getSeconds());

  const currentTime = `${hour}:${minute}:${second}`;

  document.querySelector('.timer').textContent = currentTime;
}

displayTime();
setInterval(displayTime, 1000);
