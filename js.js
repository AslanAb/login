let Users = []
class User {
    constructor(email, password, name, surname, age) {
        this.email = email;
        this.password = password;
        this.Name = name;
        this.Surname = surname;
        this.age = age;
    }
}
function fnRegistraton() {
    let email = document.querySelector('.email').value
    let password = document.querySelector('.password').value
    let name = document.querySelector('.name').value
    let surname = document.querySelector('.surname').value
    let age = document.querySelector('.age').value

    if (email && password && name && surname && age) {
        let newUser = new User(
            email,
            password,
            name,
            surname,
            age
        )
        Users.push(newUser)
        localStorage.setItem('Users', JSON.stringify(Users))
    }
}


function fnLogin() {
    let checkUserInArr = JSON.parse(localStorage.getItem('Users'))
    let email = document.querySelector('.loginEmail').value
    let password = document.querySelector('.loginPassword').value

    for (let i = 0; i <= checkUserInArr.length - 1; i++) {
        if (email === checkUserInArr[i].email && password === checkUserInArr[i].password) {
            document.location.href = './Home_page.html'
            localStorage.setItem('currentUser', JSON.stringify(checkUserInArr[i]))
        }
    }
}

if(localStorage.getItem('currentUser')){
    let homePageName = document.querySelector('.homePageName')
    let homePageSurname = document.querySelector('.homePageSurname')
    let homePageAge = document.querySelector('.homePageAge')
    let homePageArr = JSON.parse(localStorage.getItem('currentUser'))
    homePageName.textContent = homePageName.textContent + ': ' + homePageArr.Name
    homePageSurname.textContent = homePageSurname.textContent + ': ' + homePageArr.Surname
    homePageAge.textContent = homePageAge.textContent + ': ' + homePageArr.age
}

