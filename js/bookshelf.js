// 引入模块
import { initHeader } from '/util/headerLoad.js'
import { jumpToPageOrReading } from '/util/jumpOrJoin.js';
import { shelfBook } from '/util/sharedData.js';
// 渲染头部 
initHeader(".bookshelf");

// 渲染主体内容
init();

// 渲染
function init() {
    const itemAll = document.querySelector('.item-all');
    let str = '';
    if (shelfBook.length === 0) {
        str = `<div class="item-all">
    <div class="item-empty">
        书架空空如如也呢，快去书屋添加书籍吧~
    </div>`;
    }
    shelfBook.forEach(element => {
        str += `
        <a href="">
        <div class="item-self" data-pageid='${element.id}'>
            <div class="item-img" data-pageid='${element.id}'>
                <img src="${element.coverImg}" alt="" data-pageid='${element.id}'>
            </div>
            <div class="item-title">${element.title}</div>
        </div>
        </a>
        `
    })
    itemAll.innerHTML = str;
    jumpToPageOrReading(itemAll);
}