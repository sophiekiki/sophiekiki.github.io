// 引入相关模块
import { initHeader } from '/util/headerLoad.js';
import { jumpToPageOrReading } from '/util/jumpOrJoin.js';
import { books } from '/db/db.js';

const banner = document.querySelector('.header-banner');
const bannerArr = document.querySelectorAll('.header-banner img');
const homeItemBlock = document.querySelector('.home-item-block');
const homeItem = document.querySelector('.home-item');
const updateItem = document.querySelector('.update-table-block');
const homeImg = document.querySelector('.home-img');
let currentIndex = 0;
let timer = null;

// 渲染初始化
homeImg.innerHTML = init(books.slice(15));
homeItemBlock.innerHTML = init(books.slice(0, 12));
updateItem.innerHTML = init(books.slice(0, 5));

// 渲染头部
initHeader(".index")

// 初始化
function init(data) {
    let str = ''
    if (data.length === 12) {
        data.forEach(element => {
            str +=
                `
        <li class= 'home-item-block-self'>
        <a href="" class="hover-bigger">
        <img src="${element.coverImg}" data-pageid='${element.id}'></a>
             <p class="item-title" ><a href="" data-pageid='${element.id}'>${element.title}</a></p>
             <p class="item-author" data-pageid='${element.id}' ><a href="" data-pageid='${element.id}'>${element.author}</a></p>
        </li>
        `
        });
    } else if (data.length === 5) {
        data.forEach(element => {
            str +=
                `
            <tr>
                <td class="update-item">${element.category}</td>
                <td class="enter-book"><a href="" data-pageid='${element.id}'>${element.title}</a></td>
                <td><a href="" class="enter-chapter" data-chapterid='${element.chapters[element.chapters.length - 1].chapterId}' data-readid='${element.id}'>${element.chapters[element.chapters.length - 1].chapterTitle}</a></td>
                <td><a href="" class="enter-author" data-pageid='${element.id}'>${element.author}</a></td>
                <td>${String(element.updateTime.split('-').splice(1).join('-'))}</td>
            </tr >
        `
        });
    }
    else if (data.length === 1) {
        str = `
        <a href ="" class="hover-bigger">
        <img src="${data[0].coverImg.replace('..', '.')}" alt="" data-pageid='${data[0].id}'>
        </a>
        <div class="title">
        <a href="" data-pageid='${data[0].id}'>${data[0].title}</a></div>
        <div class="author">
        <a href="" data-pageid='${data[0].id}'>${data[0].author}</a>
        </div>
        <p class="intro" ><a href="" data-pageid='${data[0].id}'>
        ${data[0].description}</a></p>
        `
    }
    return str;
}

jumpToPageOrReading(homeImg);
jumpToPageOrReading(homeItem);
jumpToPageOrReading(updateItem);

// 轮播
function nextSlide() {
    let nextIndex = (currentIndex + 1) % bannerArr.length;
    if (nextIndex === 0) {
        banner.style.left = "0";
    } else {
        banner.style.left = `-${1190 * nextIndex}px`;
    }
    currentIndex = nextIndex;
}

// 开启轮播
function startCarousel() {
    timer = setInterval(nextSlide, 3000);
}
// 开始轮播
startCarousel();

// 悬浮停止
bannerArr.forEach((img) => {
    img.addEventListener('mouseover', () => {
        clearInterval(timer);
    });
    img.addEventListener('mouseout', () => {
        startCarousel();
    });
});