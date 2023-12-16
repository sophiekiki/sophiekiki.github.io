import { tokens, saveTokens } from "/util/sharedData.js";
// 头部渲染
function initHeader(objClass = '.class') {
    const headerNav = document.querySelector('.header-nav');
    // 除登录部分渲染
    headerNav.innerHTML =
        `
        <div class="header-content">
    <div class="header-logo">
        <a href="/index.html" id="logo">
            <img src="/images/logo.png">
        </a>
        <a href="/index.html" id="logo-name">言说阅读</a>
    </div>
    <div class="nav-item">
        <ul class="nav-item-content">
            <li><a href="/index.html" class='index'>首页</a></li>
            <li><a href="/pages/library.html" class='library'>书屋</a></li>
            <li><a href="/pages/bookshelf.html" class='bookshelf'>书架</a></li>
        </ul>
    </div>
    <div class="header-search">
        <input type="text" placeholder="请输入书名或作者名" id="header-search">
        <i  class="search-item">
        <img src="/images/search.svg" alt="">
        </i>
    </div>
    <div class="user-item">
        <ul class="user-login">
        </ul>
    </div>
</div>
        `;
    // 登录部分渲染
    hasLoginHtml();
    // 跳转到搜索
    jumpToSearch();
    // 头部链接选中变色
    headCheckedColor(objClass)
    // 渲染完成头部移动效果
    headerMove();
}

// 登录部分渲染
function hasLoginHtml() {
    const tokens = JSON.parse(localStorage.getItem('tokens')) || [];
    if (tokens.length > 0) {
        const user = tokens[0];
        document.querySelector('.user-login').innerHTML = `
    <li>
    <img src='${user.avatar}' alt="" class='user-img'>
    <div class="userImg-block">
        <label for="change" class="label-for-userImg">
            <img src="/images/拍照.svg" alt="" class="useImg">
        </label>
        <input id="change" type="file" style="display: none;" />
    </div>
    </li>
    <li>
    <a href="" class='user-name'>${user.username}</a>
    <a class="log-out">退出登录</a>
    </li>
    `;
        // 显示退出键和更换头像
        showLogOutOrImgChange();
        // 更换头像
        changeUserImg();
    } else {
        document.querySelector('.user-login').innerHTML = `
        <li><a href="/pages/login.html">登录</a></li>
        <li><a href="/pages/register.html">注册</a></li>
        `
    }
}

// 头部链接选中变色
function headCheckedColor(objClass) {
    const obj = document.querySelector(objClass);
    if (obj !== null) {
        obj.style.color = '#ff5f00';
    }
}

// 跳转到搜索
function jumpToSearch() {
    const searchButton = document.querySelector('.search-item');
    searchButton.addEventListener('click', function (event) {
        event.preventDefault();
        let searchQuery = document.getElementById('header-search').value;
        window.location.href = `/pages/search.html?q=${encodeURIComponent(searchQuery)} `;
    });
}

// 检测页面滚动
function headerMove() {
    const headerNav = document.querySelector('.header-nav');
    const headerSearch = document.querySelector('.header-search');
    window.addEventListener('scroll', () => {
        headerNav.style.background = 'rgba(255, 255, 255, .9)';
        headerSearch.style.background = '#cfc7c22d';
        let scrollDistance = document.documentElement.scrollTop;
        if (scrollDistance === 0) {
            headerNav.style.background = '';
            headerSearch.style.background = '';
        }
    });

}

// 悬浮显示退出
function showLogOutOrImgChange() {
    const useName = document.querySelector('.user-name');
    const logOut = document.querySelector('.log-out');
    const userImg = document.querySelector('.user-img');
    const userImgBlock = document.querySelector('.userImg-block');
    if (useName && logOut) {
        showLogOut(useName);
        hiddenLogOut(useName);
        showLogOut(logOut);
        hiddenLogOut(logOut);
    }
    if (userImg && userImgBlock) {
        showChangeImg(userImg);
        hiddenChangeImg(userImg);
        showChangeImg(userImgBlock);
        hiddenChangeImg(userImgBlock);
    }
    // 点击退出
    logOutFun();
}

function showLogOut(obj) {
    const logOut = document.querySelector('.log-out');
    obj.addEventListener('mouseover', function (event) {
        event.preventDefault();
        clearTimeout(obj.timeoutId);
        logOut.style.display = 'block';
    });
}

function hiddenLogOut(obj) {
    const logOut = document.querySelector('.log-out');
    obj.addEventListener('mouseout', function (event) {
        event.preventDefault();
        obj.timeoutId = setTimeout(function () {
            logOut.style.display = 'none';
        }, 3000);
    });
}

function showChangeImg(obj) {
    const userImgBlock = document.querySelector('.userImg-block');
    obj.addEventListener('mouseover', function (event) {
        event.preventDefault();
        userImgBlock.style.display = 'block';
    });
}

function hiddenChangeImg(obj) {
    const userImgBlock = document.querySelector('.userImg-block');
    obj.addEventListener('mouseout', function (event) {
        event.preventDefault();
        userImgBlock.style.display = 'none';
    });
}

//更换头像
function changeUserImg() {
    const inp = document.querySelector('#change');
    const userImg = document.querySelector('.user-img');
    const useImg = document.querySelector('.useImg');
    const user = tokens[0];
    useImg.onclick = function () {
        inp.onchange = function (e) {
            e.preventDefault();
            const reader = new FileReader();
            reader.onload = function (event) {
                user.avatar = event.target.result;
                userImg.src = event.target.result;
                localStorage.setItem('tokens', JSON.stringify([user]));
            }
            reader.readAsDataURL(inp.files[0]);
        }
    }
}

// 点击退出
function logOutFun() {
    const logOut = document.querySelector('.log-out');
    if (logOut) {
        logOut.addEventListener('click', function (event) {
            event.preventDefault();
            const userConfirmed = confirm('确认退出吗？');
            if (userConfirmed) {
                saveTokens([]);
                hasLoginHtml();
            }
        })
    }
}
export { initHeader };