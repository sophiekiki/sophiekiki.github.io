// 引入相关模块
import { initHeader } from '/util/headerLoad.js'
import { jumpToPageOrReading, joinTo } from '/util/jumpOrJoin.js';
import { readingBook } from '/util/sharedData.js';
const chapterContent = document.getElementById('chapterContent');
const prevChapterButton = document.getElementById('prevChapter');
const nextChapterButton = document.getElementById('nextChapter');
const changeBackgroundColorButton = document.getElementById('changeBackgroundColor');
const changeFontSizeButton = document.getElementById('changeFontSize');
const joinContainer = document.querySelector('.join-container');
let currentChapter = 0;
let backgroundColorIndex = 0;
let fontSizeIndex = 0;

// 渲染头部
initHeader();

// 获取URL中的参数
const urlParams = new URLSearchParams(window.location.search);
// 从URL参数中获取chapter参数的值
const chapterParam = urlParams.get('chapter');
// 如果URL中包含chapter参数
if (chapterParam !== null) {
    const chapterIndex = parseInt(chapterParam);
    if (chapterIndex >= 0 && chapterIndex <= readingBook.chapters.length) {
        currentChapter = chapterIndex - 1;
        updateChapter(readingBook);
    }
}

// 切换到上一章
prevChapterButton.addEventListener('click', () => {
    if (currentChapter > 0) {
        currentChapter--;
        updateChapter(readingBook);
    }
});

// 切换到下一章
nextChapterButton.addEventListener('click', () => {
    if (currentChapter < readingBook.chapters.length - 1) {
        currentChapter++;
        updateChapter(readingBook);
    }
});

// 切换背景颜色
changeBackgroundColorButton.addEventListener('click', () => {
    const backgroundColors = ['#fff', '#f0f0f0', '#ebebeb', 'RGB(250,249,222)', 'RGB(255,242,226)', 'RGB(253,230,224)', 'RGB(227,237,205)', 'RGB(220,226,241)', 'RGB(234,234,239)'];
    backgroundColorIndex = (backgroundColorIndex + 1) % backgroundColors.length;
    document.querySelector('.reader-container').style.backgroundColor = backgroundColors[backgroundColorIndex];
});

// 切换字体大小
changeFontSizeButton.addEventListener('click', () => {
    const fontSizes = ['16px', '18px', '20px'];
    fontSizeIndex = (fontSizeIndex + 1) % fontSizes.length;
    chapterContent.style.fontSize = fontSizes[fontSizeIndex];
    alert(' 现在是：' + fontSizes[fontSizeIndex]);
});

// 更新章节内容
function updateChapter(book) {
    const currentChapterData = book.chapters[currentChapter];
    // 章节内容
    chapterContent.innerHTML = `
       <a href='' class="book-title" data-pageid='${book.id}'>
         < ${book.title}
       </a>
       <h2>${currentChapterData.chapterTitle}</h2>
        <p class="chapter-info">${currentChapterData.chapterContent}</p>`;

    // 加入书籍按钮更新
    joinContainer.innerHTML = `
        <button class="join-to-shelf joining" data-shelfid='${book.id}'>
        加入书架
        </button>
        `;

    // 更新URL参数
    const newUrl = window.location.origin + window.location.pathname + `?chapter=${currentChapter + 1}`;
    history.pushState(null, '', newUrl);

    // 面包屑跳转
    jumpToPageOrReading(document.querySelector('.book-title'));

    // 加入书架
    joinTo();
}
