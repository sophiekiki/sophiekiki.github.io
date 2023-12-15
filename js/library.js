// 引入头部模块
import { initHeader } from '/util/headerLoad.js'
import { conditionFilterClick } from '/util/filterBooks.js'
import { jumpToPageOrReading, joinTo } from '/util/jumpOrJoin.js';
import { books } from '/db/db.js';
const filterDel = document.querySelectorAll('.filter-del');
const completed = document.querySelectorAll('.filter-isOver');
const ziShu = document.querySelectorAll('.filter-ziShu');
const filterNav = document.querySelectorAll('.filterNav');
let filterItem = document.querySelector('.filter-item');
let filterHot = document.querySelector('.filter-nav-hot');
let filterNew = document.querySelector('.filter-nav-new');
// 渲染头部
initHeader(".library");

// 渲染data
init(books);

// 渲染页面
async function init(books) {
    // 添加自动排序
    if (filterHot.style.color === ' #ff5f00') {
        books = navSortData(books, 'readCount');
    } else if (filterNew.style.color === ' #ff5f00') {
        books = navSortData(books, 'updateTime');
    }
    // 渲染页面
    let str = '';
    books.forEach(function (element) {
        str += ` 
    <div class="item-self">
    <a href="" class="item-img" data-pageid='${element.id}'>
    <div class="join-container" data-pageid='${element.id}'>
                    <button class="toIntro" data-pageid='${element.id}'>查看简介</button>
                    <button class="joining" data-shelfid='${element.id}'>加入书架</button>
                </div>
    <img src="${element.coverImg}" alt="" data-pageid='${element.id}'>
    </a>

    <div class="item-intro">
        <h2><a href="" class="item-title" data-pageid='${element.id}'>${element.title}</a></h2>
        <a href="" class="item-author item-desc" data-pageid='${element.id}'>作者：${element.author}</a>
        <p class="item-desc">${element.completed ? '已完结' : '连载中'}-<span class="item-words">${element.wordCount}万字</span>-<span class="item-reader">${element.readCount}万人在读</span>
        </p>
        <p class="item-desc">
            <a href="" class="intro-content" data-pageid='${element.id}'>${element.description}</a>
        </p>
        <p class="item-desc update-time">
        最近更新--${element.updateTime}
        </p>
    </div>
    </div>`
    })
    filterItem.innerHTML = str;

    // 加入书架
    joinTo();
    // 跳转到简介
    const itemAll = document.querySelector('.filter-item')
    jumpToPageOrReading(itemAll);
}

// 导航栏未开发点击事件
filterDel.forEach(element => {
    element.addEventListener('click', () => {
        alert('该项功能正在开发中,尽情期待~');
    })
})

// 条件分类
conditionFilterClick(ziShu, books, '', init);
conditionFilterClick(completed, books, '', init);
conditionFilterClick(filterNav, books, '', init);

