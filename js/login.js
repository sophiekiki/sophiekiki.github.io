// 引入相关模块
import { initHeader } from '/util/headerLoad.js'
import { userData, saveTokens } from '/util/sharedData.js';
const loginForm = document.querySelector('#loginForm');
const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById('password');
const loginWarning = document.querySelector('.login-warning');

// 渲染头部
initHeader();

// 监听提交按钮会默认触发form的提交事件
loginForm.onsubmit = function (evt) {
    evt.preventDefault();
    const enteredUsername = loginUsername.value;
    const enteredPassword = loginPassword.value;
    loginWarning.style.display = 'none';
    // 在存储的用户数据中查找匹配的用户名和密码
    const userFlag = userData.find(u => u.username === enteredUsername && u.password === enteredPassword);
    if (userFlag) {
        const tokens = userData.filter(u => u.username === enteredUsername && u.password === enteredPassword);
        saveTokens(tokens);
        alert(`欢迎登录，${enteredUsername}！`);
        window.location.href = '/index.html';
    } else if (!userData.some(u => u.username === enteredUsername)) {
        loginWarning.style.display = 'block';
        loginWarning.innerHTML = '该用户尚未注册';
    } else {
        loginWarning.innerHTML = '用户名或密码不正确，请重试';
        loginWarning.style.display = 'block';
    }
}

