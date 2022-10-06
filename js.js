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

function checkData(newUser) {
    if (!validateEmail(newUser.email)) {
        alert("Incorrect email!")
        return false;
    } else if (newUser.Name.length < 1 || newUser.Surname.length < 1
    || newUser.password.length < 1 || newUser.age.length < 1) {
        alert('Complete all data!')
        return false;
    } else {
        return true;
    }   
}

let Users = []
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
    if (checkData(newUser)) {
        Users.push(newUser)
        localStorage.setItem('Users', JSON.stringify(Users))
    }
}


function fnLogin() {
    let checkUserInArr = JSON.parse(localStorage.getItem('Users'))
    let email = document.querySelector('.loginEmail').value
    let password = document.querySelector('.loginPassword').value
    if(localStorage.getItem('Users')){
        for (let i = 0; i <= checkUserInArr.length - 1; i++) {
            if (email === checkUserInArr[i].email && password === checkUserInArr[i].password) {
                window.location.href = './Home_page.html'
                localStorage.setItem('currentUser', JSON.stringify(checkUserInArr[i]))
            }
        }
    }
    
}

if(localStorage.getItem('currentUser')){
    let homePageName = document.querySelector('.homePageName')
    let homePageSurname = document.querySelector('.homePageSurname')
    let homePageAge = document.querySelector('.homePageAge')
    let homePageArr = JSON.parse(localStorage.getItem('currentUser'))
    homePageName.textContent = `Name: ${homePageArr.Name}`
    homePageSurname.textContent = homePageSurname.textContent + ': ' + homePageArr.Surname
    homePageAge.textContent = homePageAge.textContent + ': ' + homePageArr.age
}

function logOut(){
    window.location.href = './index.html'
    localStorage.removeItem('currentUser')
}

function deleteAcc(){
    let toDelete = JSON.parse(localStorage.getItem('Users'))
    let toCheck = JSON.parse(localStorage.getItem('currentUser'))
    for(let i = 0; i <= toDelete.length - 1; i++){
        if(toDelete[i].email === toCheck.email && toDelete[i].password === toCheck.password){
            toDelete.splice(i, 1)
            localStorage.setItem('Users', JSON.stringify(toDelete))
            localStorage.removeItem('currentUser')
            window.location.href = './registration.html'
        }
    }
}






