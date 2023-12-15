// 引入相关模块
import { initHeader } from '/util/headerLoad.js'
import { conditionFilterClick, filterData } from '/util/filterBooks.js'
import { jumpToPageOrReading, joinTo } from '/util/jumpOrJoin.js';
import { books } from '/db/db.js';
const filterNav = document.querySelectorAll('.filterNav');
const useInput = document.querySelector('#use-input');
const searchButton = document.querySelector('.search-button');
let bookList = document.querySelector('.muye-search-book-list');
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let searchQuery = urlParams.get('q');

// 渲染头部
initHeader();

// 只有在URL中有搜索参数时才初始化页面
if (searchQuery) {
    useInput.value = searchQuery;
    init(filterData(searchQuery));
} else {
    init(books);
}

// 渲染页面
function init(books) {
    let str = '';
    books.forEach(function (element) {
        // 高亮匹配的文本
        let highlightedTitle = highlightMatch(element.title, useInput.value);
        let highlightedAuthor = highlightMatch(element.author, useInput.value);
        str += `
        <div class="item-self">
            <a href="" class="item-img" data-pageid='${element.id}'>
                <img src="${element.coverImg}" alt="" data-pageid='${element.id}'>
            </a>
            <div class="item-intro">
                <h2><a href="" class="item-title" data-pageid='${element.id}'>${highlightedTitle}</a></h2>

                <div class="item-desc">
                    <a href="" class="item-author" data-pageid='${element.id}'>作者：${highlightedAuthor}</a>
                    <span>${element.completed ? '已完结' : '连载中'} - </span>
                    <span class="item-words">${element.wordCount}万字 - </span>
                    <span class="item-reader">${element.readCount}万人在读</span>
                </div>

                <div class="item-desc intro-content" >
                    ${element.description}
                </div>

                <div>
                    <span class="chapter"><a href="" data-readid='${element.id}' data-chapterid='${element.chapters[element.chapters.length - 1].chapterId}'>最近更新：${element.chapters[element.chapters.length - 1].chapterTitle} ></a></span>
                    <span class="update-time">${element.updateTime}</span>
                </div>
            </div>
            <div class="join-container">
                <a href='' class="reading" data-readid='${element.id}'>立刻阅读</a>
                <a href='' class="joining" data-shelfid='${element.id}'>加入书架</a>
            </div>
        </div>`;
    });
    bookList.innerHTML = str;
    joinTo();

    bookList = document.querySelector('.muye-search-book-list');
    jumpToPageOrReading(bookList);
}

// 处理搜索按钮点击事件
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = `../pages/search.html?q=${useInput.value}`
});


// 简化高亮匹配的文本
function highlightMatch(text, query) {
    if (!query) {
        return text;
    }
    return text.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);
}

// 条件分类
conditionFilterClick(filterNav, books, useInput.value, init);


