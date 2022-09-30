class User {
    constructor(email, password, name, surname, age){
        this.email = email;
        this.password = password;
        this.Name = name;
        this.Surname = surname;
        this.age = age;
    }

}
function fnRegistraton(){
    let user = new User(
        document.querySelector('.email').value,
        document.querySelector('.password').value,
        document.querySelector('.name').value,
        document.querySelector('.surname').value,
        document.querySelector('.age').value
    )
    let newUser = JSON.stringify(user)
    if(localStorage.getItem('Users')){
        newUser += localStorage.getItem('Users')
    }
    localStorage.setItem('Users', newUser)
    console.log(localStorage.getItem('Users'))
}
console.log(localStorage.getItem('Users'))

