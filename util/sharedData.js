let shelfBook = JSON.parse(localStorage.getItem('shelfBook')) || [];
let readingBook = JSON.parse(localStorage.getItem('readingBook')) || [];
let pageBook = JSON.parse(localStorage.getItem('pageBook')) || [];
let userData = JSON.parse(localStorage.getItem('userData')) || [];
let tokens = JSON.parse(localStorage.getItem('tokens')) || [];

// 数据存储
function saveReadingBook(readingBook) {
    localStorage.setItem('readingBook', JSON.stringify(readingBook));
}
function saveShelfBook(shelfBook) {
    localStorage.setItem('shelfBook', JSON.stringify(shelfBook));
}
function savePageBook(pageBook) {
    localStorage.setItem('pageBook', JSON.stringify(pageBook));
}
// 不能隐藏，否则不能匹配用户
function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

function saveTokens(tokens) {
    const sanitizedTokens = tokens.map(user => ({
        ...user,
        password: "******"
    }));
    localStorage.setItem('tokens', JSON.stringify(sanitizedTokens));
}

export { shelfBook, readingBook, pageBook, userData, tokens, saveReadingBook, saveShelfBook, savePageBook, saveUserData, saveTokens }