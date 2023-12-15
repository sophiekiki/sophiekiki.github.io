// 引入相关模块
import { initHeader } from '/util/headerLoad.js'
import { userData, saveUserData } from '/util/sharedData.js';
const username = document.getElementById('username');
const passone = document.querySelector(".password-one");
const passtwo = document.querySelector('.password-two');
const registerForm = document.querySelector('#registerForm');
const registerWarning = document.querySelector('.register-warning');

// 渲染头部
initHeader();

// 监听提交按钮会默认触发form的提交事件
registerForm.onsubmit = function (event) {
    event.preventDefault();
    registerWarning.style.display = 'block';
    if (username.value == '' || passone.value == '' || passtwo.value == '') {
        registerWarning.innerHTML = '请输入相关信息';
    } else if (!isPasswordValid(passone.value)) {
        registerWarning.innerHTML = '密码要求为6位以上字母和数字的组合';
    } else if (passone.value !== passtwo.value) {
        registerWarning.innerHTML = '两次输入密码不一致';
    } else if (isUsernameTaken(username.value)) {
        registerWarning.innerHTML = '该用户名已被注册';
    }
    else {
        const newUser = {
            id: userData.length + 1,
            username: username.value,
            password: passone.value,
            avatar: '/images/default-img.png'
        };
        registerWarning.innerHTML = `注册成功~欢迎${username.value}!`;
        // 将新用户添加到userData数组中
        userData.push(newUser);
        // 将更新后的userData数组保存到本地存储
        saveUserData(userData);

        alert('注册成功！正在前往登录页面');
        location = '/pages/login.html';
    }
}

passone.addEventListener('focus', function () {
    passone.placeholder = '密码要求为至少6位的字母和数字的组合';
});

passone.addEventListener('blur', function () {
    passone.placeholder = '请输入密码';
});

passtwo.addEventListener('focus', function () {
    passtwo.placeholder = '密码要求为至少6位的字母和数字的组合';
});

passtwo.addEventListener('blur', function () {
    passtwo.placeholder = '请确认密码';
});


// 密码要求为至少6位的字母和数字的组合
function isPasswordValid(password) {
    let regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return regex.test(password);
}


// 检查现有用户数据数组中是否存在相同的用户名
function isUsernameTaken(username) {
    return userData.find(user => user.username === username);
}
