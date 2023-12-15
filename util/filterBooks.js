// 引入相关模块
import { books } from '/db/db.js';

// 处理点击分类
function conditionFilterClick(objArr, books, value, callback) {
    objArr.forEach(function (obj) {
        const ziShu = document.querySelectorAll('.filter-ziShu');
        const completed = document.querySelectorAll('.filter-isOver');
        const filterNav = document.querySelectorAll('.filterNav');
        let sortedData = books;
        let checkedZiShu = '';
        let checkedCompleted = '';
        let checkedNav = '';
        obj.addEventListener('click', function (e) {
            e.preventDefault();
            // class移动
            objArr.forEach(function (el) {
                el.classList.remove('checked');
            });
            e.target.classList.toggle('checked');
            // 获取条件的内容
            if (ziShu) { checkedZiShu = getCheckedHtml(ziShu); }
            if (completed) { checkedCompleted = getCheckedHtml(completed); }
            if (filterNav) { checkedNav = getCheckedHtml(filterNav) };
            books = sortedData;
            // 条件同时作用
            books = filterCondition(books, { checkedCompleted, checkedZiShu, checkedNav }, value);
            // 重新渲染页面
            callback(books);
        });
    });
}

//过滤条件
function filterCondition(data, { checkedCompleted, checkedZiShu, checkedNav }, value) {
    let sortedData = data.slice();
    if (checkedCompleted === '已完结') {
        sortedData = sortedData.filter(item => item.completed === true);
    } else if (checkedCompleted === '连载中') {
        sortedData = sortedData.filter(item => item.completed === false);
    }

    if (checkedZiShu === '30万以下') {
        sortedData = sortedData.filter(item => parseFloat(item.wordCount) < 30);
    } else if (checkedZiShu === '30-50万') {
        sortedData = sortedData.filter(item => parseFloat(item.wordCount) >= 30 && parseFloat(item.wordCount) <= 50);
    } else if (checkedZiShu === '50-100万') {
        sortedData = sortedData.filter(item => parseFloat(item.wordCount) > 50 && parseFloat(item.wordCount) <= 100);
    } else if (checkedZiShu === '100-200万') {
        sortedData = sortedData.filter(item => parseFloat(item.wordCount) > 100 && parseFloat(item.wordCount) <= 200);
    } else if (checkedZiShu === '200万以上') {
        sortedData = sortedData.filter(item => parseFloat(item.wordCount) > 200);
    }

    if (checkedNav === '最新') {
        sortedData = navSortData(sortedData, "updateTime");
    } else if (checkedNav === '最热') {
        sortedData = navSortData(sortedData, "readCount");
    } else if (checkedNav === '相关') {
        sortedData = filterData(value);
        console.log(sortedData);
    }
    return sortedData;
}

// 获取选中目标的文本节点
function getCheckedHtml(objArr) {
    const obj = Array.from(objArr);
    return obj.filter(function (element) {
        return element.classList.contains('checked');
    }).map(function (element) {
        return element.innerHTML;
    })[0];
}

//根据input筛选book
function filterData(value) {
    return books.filter(function (element) {
        return (
            element.title.includes(value) ||
            element.author.includes(value)
        );
    }) || [];
}

// nav分类
function navSortData(data, sortCondition) {
    const sortedData = data.slice();
    sortedData.sort((a, b) => {
        if (sortCondition === 'updateTime') {
            const timeA = new Date(a.updateTime);
            const timeB = new Date(b.updateTime);
            return timeB - timeA;
        } else if (sortCondition === 'readCount') {
            let readerA = parseFloat(a.readCount);
            let readerB = parseFloat(b.readCount);
            return readerB - readerA;
        }
    });
    if (sortCondition === 'link') {
        return filterData(searchQuery);
    }
    return sortedData;
}

export { conditionFilterClick, filterData } 