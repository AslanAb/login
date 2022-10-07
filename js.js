class User {
    constructor(email, password, name, surname, age) {
        this.email = email;
        this.password = password;
        this.Name = name;
        this.Surname = surname;
        this.age = age;
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
let ageCheck = /^[1-9][0-9]$|^[1-9]$|^100$/
let passwordCheck = /[A-Z]\S*/g
function checkData(newUser) {
    if (!validateEmail(newUser.email)) {
        alert("Incorrect email!")
        return false;
    } else if (newUser.Name.length < 1 || newUser.Surname.length < 1
        || newUser.password.length < 1 || newUser.age.length < 1) {
        alert('Complete all data!')
        return false;
    } else if(!ageCheck.test(newUser.age)){
        alert('Incorrect age')
        return false;
    } else if(!passwordCheck.test(newUser.password)) {
        alert('Incorrect password')
        return false;
    } else {
        return true
    }
}

function fnRegistraton() {
    let email = document.querySelector('.email').value
    let password = document.querySelector('.password').value
    let name = document.querySelector('.name').value
    let surname = document.querySelector('.surname').value
    let age = document.querySelector('.age').value
    let newUser = new User(
        email,
        password,
        name,
        surname,
        age
    )
    let Users = []
    if (localStorage.getItem('Users')) {
        Users = JSON.parse(localStorage.getItem('Users'))
    }
    let checkSimilarEmail = Users.filter(user => user.email == newUser.email)
    if (checkData(newUser) && checkSimilarEmail.length < 1) {
        Users.push(newUser)
        localStorage.setItem('Users', JSON.stringify(Users))
        window.location.href = './index.html'
    } else if (checkSimilarEmail.length > 0) {
        alert('You are already registered')
    }
}

function fnLogin() {
    let checkUserInArr = JSON.parse(localStorage.getItem('Users'))
    let email = document.querySelector('.loginEmail').value
    let password = document.querySelector('.loginPassword').value
    if (!validateEmail(email)) {
        alert("Please write correct login!")
        return false;
    }
    if (localStorage.getItem('Users')) {
        let checkSimilarEmail = JSON.parse(localStorage.getItem('Users')).filter(user => user.email == email)
        for (let i = 0; i <= checkUserInArr.length - 1; i++) {
            if (email === checkUserInArr[i].email && password === checkUserInArr[i].password) {
                localStorage.setItem('currentUser', JSON.stringify({ ...checkUserInArr[i], isRemember: document.querySelector('#checkbox').checked }))
                window.location.href = './Home_page.html'
                break
            } else if (email === checkUserInArr[i].email && password !== checkUserInArr[i].password) {
                alert('Incorrect password')
                break
            } else if (checkSimilarEmail < 1) {
                alert('Incorrect email or You are not registered')
                break
            }
        }
    } else {
        alert('You are not registered')
    }
}

function logOut() {
    window.location.href = './index.html'
    localStorage.removeItem('currentUser')
}

function deleteAcc() {
    let toDelete = JSON.parse(localStorage.getItem('Users'))
    let toCheck = JSON.parse(localStorage.getItem('currentUser'))
    for (let i = 0; i <= toDelete.length - 1; i++) {
        if (toDelete[i].email === toCheck.email && toDelete[i].password === toCheck.password) {
            toDelete.splice(i, 1)
            localStorage.setItem('Users', JSON.stringify(toDelete))
            localStorage.removeItem('currentUser')
            window.location.href = './registration.html'
        }
    }
}

// if (window.location.href != './Home_page.html' && JSON.parse(localStorage.getItem('currentUser')).isRemember) {
//     logOut()}
// // } else {
// //     localStorage.removeItem("currentUser")
// // }

if (localStorage.getItem('currentUser') && window.location.href == './Home_page.html') {
    let homePageName = document.querySelector('.homePageName')
    let homePageSurname = document.querySelector('.homePageSurname')
    let homePageAge = document.querySelector('.homePageAge')
    let homePageArr = JSON.parse(localStorage.getItem('currentUser'))
    homePageName.textContent = homePageName.textContent + ': ' + homePageArr.Name
    homePageSurname.textContent = homePageSurname.textContent + ': ' + homePageArr.Surname
    homePageAge.textContent = homePageAge.textContent + ': ' + homePageArr.age
}