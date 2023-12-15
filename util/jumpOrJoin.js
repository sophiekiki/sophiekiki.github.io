// 引入数据
import { books } from '/db/db.js';
import { shelfBook, saveShelfBook, savePageBook, saveReadingBook } from '/util/sharedData.js';
// 通过属性id定位书籍
function getThisBook(id) {
    return books.filter(function (element) {
        return id === element.id;
    })[0];
}

function jumpToPageOrReading(obj) {
    obj.addEventListener('click', function (event) {
        event.preventDefault();
        const pageId = Number(event.target.dataset.pageid);
        const readId = Number(event.target.dataset.readid);
        const chapterid = Number(event.target.dataset.chapterid);

        if (pageId) {
            let pageBook = getThisBook(pageId);
            savePageBook(pageBook);
            window.location.href = `/pages/page.html?q=${event.target.innerHTML === ' ' ? `${event.target.innerHTML}` : `${pageBook.title}`}`;
        }

        if (readId) {
            let readingBook = getThisBook(readId);
            saveReadingBook(readingBook);
            if (chapterid) {
                window.location.href = `/pages/reading.html?chapter=${chapterid}`;
            } else {
                window.location.href = `/pages/reading.html?q=${event.target.innerHTML === ' ' ? `${event.target.innerHTML}` : `${readingBook.title}`}&chapter=1`;
            }
        }
    });
}
// 加入书架
function joinTo() {
    const joining = document.querySelectorAll('.joining');
    joining.forEach((element) => {
        const shelfid = element.dataset.shelfid;
        let isJoin = shelfBook.find(item => item && item.id === parseInt(shelfid, 10));
        if (isJoin) {
            element.disabled = true;
            element.style.opacity = '0.5';
            element.addEventListener('click', (event) => {
                event.preventDefault();
                alert('它已经在书架中啦，快去看看吧！');
            });
        }
        else {
            element.addEventListener('click', (event) => {
                if (event.target.disabled) {
                    event.preventDefault();
                    alert('它已经在书架中啦，快去看看吧！');
                } else {
                    event.preventDefault();
                    event.target.disabled = true;
                    event.target.style.opacity = '0.5';
                    alert('加入书架成功~');
                    const selectedItem = books.find(item => item.id === parseInt(shelfid));

                    if (selectedItem) {
                        shelfBook.push(selectedItem);
                        saveShelfBook(shelfBook);
                    }
                }
            });
        }
    });
}
export { joinTo, jumpToPageOrReading }