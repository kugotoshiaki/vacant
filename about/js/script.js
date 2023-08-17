/*
ローディングから画面遷移*/
const loadingAreaGrey = document.querySelector('#loading');
const loadingAreaGreen = document.querySelector('#loading-screen');
const loadingText = document.querySelector('#loading p');

window.addEventListener('load', () => {
  // ローディング中グレーの背景
  loadingAreaGrey.animate(
    {
      opacity: [1, 0],
      visibility: 'hidden',
    },
    {
      duration: 2000,
      delay: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );

  // ローディング中薄緑の背景
  loadingAreaGreen.animate(
    {
      translate: ['o 100vh', '0 0', '0 -100vh'],
    },
    {
      duration: 2000,
      delay: 800,
      easing: 'ease',
      fill: 'forwards',
    }
  );

  // ローディング中テキスト
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

/*
ホバーしたら画像が拡大表示*/
const mainImage = document.querySelector('.gallery-image img');
const thumbImages = document.querySelectorAll('.gallery-thumbnails img');

// for (let i = 0; i < thumbImages.length; i++) {
//   thumbImages[i].addEventListener('mouseover', (e) => {
//     mainImage.src = e.target.src;
//     mainImage.animate(
//       {
//         opacity: [0, 1],
//       },
//       500
//     );
//   });
// }

thumbImages.forEach((thumbImage) => {
  thumbImage.addEventListener('mouseover', (e) => {
    mainImage.src = e.target.src;
    mainImage.animate(
      {
        opacity: [0, 1],
      },
      500
    );
  });
});

/*
メニュー*/
const menuOpen = document.querySelector('#menu-open');
const menuClose = document.querySelector('#menu-close');
const menuPanel = document.querySelector('#menu-panel');
const menuItems = document.querySelectorAll('.menu-list li');
const menuOptions = {
  duration: 1400,
  easing: 'ease',
  fill: 'forwards',
};

// メニューを開く
menuOpen.addEventListener('click', () => {
  menuPanel.animate(
    {
      translate: ['100vw', '0'],
    },
    menuOptions
  );

  // メニュー項目をひとつずつ表示
  menuItems.forEach((menuItem, index) => {
    // console.log(`${index}番目`);
    menuItem.animate(
      {
        opacity: ['0', '1'],
        translate: ['2rem', 0],
      },
      {
        duration: 2400,
        delay: index * 300,
        easing: 'ease',
        fill: 'forwards',
      }
    );
  });
});

// メニューを閉じる
menuClose.addEventListener('click', () => {
  menuPanel.animate(
    {
      translate: ['0', '100vw'],
    },
    menuOptions
  );
  menuItems.forEach((menuItem) => {
    menuItem.animate(
      {
        opacity: ['1', '0'],
      },
      menuOptions
    );
  });
});

/*
スクロールで表示*/

// 実行する動作
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          filter: ['blur(.4rem)', 'blur(0)'],
          translate: ['0 4rem', 0],
        },
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      // 一度通ったら監視をやめる
      obs.unobserve(entry.target);
    }
  });
};

// 監視設定（引数に関数指定）
const fadeObserver = new IntersectionObserver(animateFade);

// 監視対象（class名など）
const fadeElementes = document.querySelectorAll('.fadein');
fadeElementes.forEach((fadeElemente) => {
  fadeObserver.observe(fadeElemente);
});

/*
モーダル*/
const open = document.querySelector('#open');
const close = document.querySelector('#close');
const modal = document.querySelector('#modal');
const mask = document.querySelector('#mask');
const showKeyframes = {
  opacity: [0, 1],
  visibility: 'visible',
};
const hideKeyframes = {
  opacity: [1, 0],
  visibility: 'hidden',
};
const options = {
  duration: 800,
  easing: 'ease',
  fill: 'forwards',
};

// モーダルウィンドウを開く
open.addEventListener('click', () => {
  modal.animate(showKeyframes, options);
  mask.animate(showKeyframes, options);
});

// モーダルウィンドウを閉じる
close.addEventListener('click', () => {
  modal.animate(hideKeyframes, options);
  mask.animate(hideKeyframes, options);
});

// マスクをクリックしてモーダルウィンドウを閉じる
mask.addEventListener('click', () => {
  close.click();
});
