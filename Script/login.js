const USERS = JSON.parse(localStorage.getItem("users"));
console.log(USERS);

function form() {
    const name = document.forms.Form.Name.value;
    const email = document.forms.Form.email.value;
    const password = document.forms.Form.Password.value;
    let flag = true;
    console.log(name, email, password);
    if (name === "" && email === "" && password === "") {
        alert("Please fill the deatils")
        return false
    }
    else {
        if (name === ""
            || name.includes('0') || name.includes('1')
            || name.includes('2') || name.includes('3')
            || name.includes('4') || name.includes('5')
            || name.includes('6') || name.includes('7')
            || name.includes('8') || name.includes('9')) {
            window.alert
                ("Invalid Name");
            name.focus();
            return false;
        }


        if (email === "" || !email.includes('@')) {
            window.alert
                ("Invalid E-mail address.");
            email.focus();
            return false;
        }

        if (password === "") {
            alert("Please enter your password");
            password.focus();
            return false;
        }
    }
    
    for (let i = 0; i < USERS.length; i++) {
        if (email == USERS[i].email && USERS[i].password == password) {
            flag = true;
        }
        else {
            flag = false;
        }
    }

    if(flag){
        window.location.href = "/Html/index.html";
        alert("login successfull");
    }
    else{
        alert("Wrong Credentials")
    }


}


