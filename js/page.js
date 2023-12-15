// 引入相关模块
import { initHeader } from '/util/headerLoad.js'
import { jumpToPageOrReading, joinTo } from '/util/jumpOrJoin.js';
import { pageBook } from '/util/sharedData.js';

// 渲染头部
initHeader();

// 根据对象渲染页面
init(pageBook);

// 渲染页面
function init(book) {
    const bookAll = document.querySelector('.book');
    bookAll.innerHTML =
        `
        <div class="book-intro-block wrapper">
        <div class="item-self-book">
            <a href="" class="item-img">
                <img src="${book.coverImg}" alt="">
            </a>
            <div class="item-intro">
                <h1><a href="" class="item-title">${book.title}</a></h1>
                <div class="item-isOver">${book.completed ? '已完结' : '连载中'}</div>
                <div class="item-detail">
                    <div class="item-words"><span>${book.wordCount}</span>万字</div>
                    <div class="item-reader"><span>${book.readCount}</span>万人在读</div>
                </div>

                <div>
                    <span class="chapter">
                    <a href="" data-readid='${book.id}' data-chapterid='${book.chapters[book.chapters.length - 1].chapterId}'>最近更新：${book.chapters[(book.chapters).length - 1].chapterTitle} ></a>
                    </span>
                    <span class="update-time">${book.updateTime}</span>
                </div>

                <div class="join-container">
                    <a href='' class="reading" data-readid='${book.id}'>立刻阅读</a>
                    <a href='' class="joining"  data-shelfid='${book.id}' >加入书架</a>
                </div>
            </div>
        </div>
        <div class="item-self-author">
            <a href="" class="author-img"><img src="/images/default-img.png" alt=""></a>
            <a href="" class="item-author">作者：${book.author}</a>
        </div>
    </div>
    <div class="book-intro">
        <div class="book-intro-title">
            作品简介
        </div>
        <div class=" intro-content">
        ${book.description}
        </div>
        <div class="book-intro-title">
            章节列表
        </div>
        <ul class="chapter-list">
        </ul>
    </div>
    `
    // 更新章节列表
    initBookList(book)
    // 加入书籍
    joinTo();
    // 跳转阅读或介绍页面
    jumpToPageOrReading(bookAll);
}

function initBookList(book) {
    const chapterList = document.querySelector('.chapter-list');
    let str = '';
    (book.chapters).forEach(element => {
        str += `
    <li><a href="" data-readid='${book.id}' data-chapterid='${element.chapterId}'>${element.chapterTitle}</a></li>
    `
    });
    chapterList.innerHTML = str;
}