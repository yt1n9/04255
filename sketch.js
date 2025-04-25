let hearts = [];
let iframe; // 用於顯示網頁的 iframe
let questionDiv; // 用於顯示問題的容器
let videoDiv; // 用於顯示影片的容器

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 182, 193); // 粉色背景

  // 建立選單
  createMenu();

  let heartCount = int(random(50, 101)); // 隨機生成 50-100 個愛心
  for (let i = 0; i < heartCount; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      color: color(random(255), random(255), random(255)), // 隨機顏色
      dx: random(-2, 2), // 水平移動速度
      dy: random(-2, 2), // 垂直移動速度
    });
  }
}

function draw() {
  background(255, 182, 193); // 粉色背景
  let heartSize = map(mouseX, 0, width, 5, 50); // 根據滑鼠水平位置調整大小

  for (let heart of hearts) {
    // 更新愛心位置
    heart.x += heart.dx;
    heart.y += heart.dy;

    // 確保愛心不會超出畫布邊界
    if (heart.x < 0 || heart.x > width) heart.dx *= -1;
    if (heart.y < 0 || heart.y > height) heart.dy *= -1;

    // 繪製愛心
    fill(heart.color);
    noStroke();
    drawHeart(heart.x, heart.y, heartSize);
  }
}

// 繪製愛心的函式
function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

// 建立選單的函式
function createMenu() {
  let menu = createElement('ul'); // 建立 ul 元素
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('right', '10px');
  menu.style('list-style', 'none');
  menu.style('padding', '10px');
  menu.style('background-color', 'rgba(255, 255, 255, 0.8)');
  menu.style('border', '1px solid #ccc');
  menu.style('border-radius', '5px');

  let items = ['自我介紹', '作品集第一周', '作品集第二周', '作品集第三周', '測驗卷', '教學影片', '帥哥'];
  let urls = {
    '自我介紹': 'https://yt1n9.github.io/1/',
    '作品集第一周': 'https://yt1n9.github.io/241226/',
    '作品集第二周': 'https://yt1n9.github.io/04188/',
    '作品集第三周': 'https://yt1n9.github.io/041888/',
    '帥哥': 'https://www.instagram.com/saythename_17/' // 更新為 Instagram 網址
  };

  for (let item of items) {
    let li = createElement('li', item); // 建立 li 元素
    li.style('margin', '5px 0');
    li.style('cursor', 'pointer');
    if (urls[item]) {
      li.mousePressed(() => {
        clearPreviousContent(); // 清除前一個內容
        showIframe(urls[item]); // 顯示對應的 iframe
      });
    } else if (item === '測驗卷') {
      li.mousePressed(() => {
        clearPreviousContent(); // 清除前一個內容
        showRandomQuestion(); // 顯示隨機問題
      });
    } else if (item === '教學影片') {
      li.mousePressed(() => {
        clearPreviousContent(); // 清除前一個內容
        showVideo(); // 顯示教學影片
      });
    } else {
      li.mousePressed(() => alert(item)); // 點擊顯示對應內容
    }
    menu.child(li); // 將 li 加入 ul
  }
}

// 清除前一個內容的函式
function clearPreviousContent() {
  if (iframe) {
    iframe.remove();
    iframe = null;
  }
  if (questionDiv) {
    questionDiv.remove();
    questionDiv = null;
  }
  if (videoDiv) {
    videoDiv.remove();
    videoDiv = null;
  }
}

// 顯示 iframe 的函式
function showIframe(url) {
  iframe = createElement('iframe'); // 建立 iframe 元素
  iframe.attribute('src', url); // 設定 iframe 的來源網址
  iframe.style('position', 'absolute');
  iframe.style('top', '50%');
  iframe.style('left', '50%');
  iframe.style('transform', 'translate(-50%, -50%)'); // 置中
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', '2px solid #ccc');
  iframe.style('border-radius', '10px');
  iframe.style('z-index', '1000');
}

// 顯示隨機問題的函式
function showRandomQuestion() {
  const questions = [
    {
      question: '地球上最大的生物是什麼？',
      options: ['藍鯨', '紅杉樹', '大象', '珊瑚礁'],
      answer: '紅杉樹'
    },
    {
      question: '珊瑚礁主要由什麼組成？',
      options: ['岩石', '珊瑚蟲', '沙子', '貝殼'],
      answer: '珊瑚蟲'
    },
    {
      question: '哪種動物被稱為「沙漠之舟」？',
      options: ['駱駝', '袋鼠', '蜥蜴', '蛇'],
      answer: '駱駝'
    },
    {
      question: '哪種鳥類可以倒飛？',
      options: ['蜂鳥', '鴿子', '老鷹', '企鵝'],
      answer: '蜂鳥'
    },
    {
      question: '雨林中最常見的植物是什麼？',
      options: ['蕨類', '蘭花', '苔蘚', '棕櫚樹'],
      answer: '蕨類'
    }
  ];

  const randomIndex = int(random(questions.length));
  const selectedQuestion = questions[randomIndex];

  questionDiv = createDiv();
  questionDiv.style('position', 'absolute');
  questionDiv.style('top', '50%');
  questionDiv.style('left', '50%');
  questionDiv.style('transform', 'translate(-50%, -50%)');
  questionDiv.style('padding', '20px');
  questionDiv.style('background-color', 'rgba(255, 255, 255, 0.9)');
  questionDiv.style('border', '1px solid #ccc');
  questionDiv.style('border-radius', '10px');
  questionDiv.style('text-align', 'center');
  questionDiv.style('z-index', '1000');

  const questionText = createElement('h3', selectedQuestion.question);
  questionDiv.child(questionText);

  selectedQuestion.options.forEach(option => {
    const button = createButton(option);
    button.style('margin', '5px');
    button.mousePressed(() => {
      if (option === selectedQuestion.answer) {
        alert('答對了！');
      } else {
        alert('答錯了，正確答案是：' + selectedQuestion.answer);
      }
      questionDiv.remove();
      questionDiv = null;
    });
    questionDiv.child(button);
  });
}

// 顯示影片的函式
function showVideo() {
  const videoUrl = 'https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/A2/week8/20250411_094048.mp4';

  videoDiv = createDiv();
  videoDiv.style('position', 'absolute');
  videoDiv.style('top', '50%');
  videoDiv.style('left', '50%');
  videoDiv.style('transform', 'translate(-50%, -50%)');
  videoDiv.style('padding', '20px');
  videoDiv.style('background-color', 'rgba(0, 0, 0, 0.8)');
  videoDiv.style('border', '1px solid #ccc');
  videoDiv.style('border-radius', '10px');
  videoDiv.style('text-align', 'center');
  videoDiv.style('z-index', '1000');

  const video = createElement('video');
  video.attribute('src', videoUrl);
  video.attribute('controls', 'true');
  video.style('width', '80%');
  video.style('height', 'auto');
  video.style('border-radius', '10px');

  const closeButton = createButton('關閉');
  closeButton.style('margin-top', '10px');
  closeButton.mousePressed(() => {
    videoDiv.remove();
    videoDiv = null;
  });

  videoDiv.child(video);
  videoDiv.child(closeButton);
}
