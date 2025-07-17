function form()
{
const name = document.forms.Form.Name.value
const email = document.forms.Form.email.value
const password = document.forms.Form.Password.value
const confirmPassword = document.forms.Form.confirmPassword.value


console.log( name,email,password );
if (name === "" && email === "" && password === "")
    {
        alert("Please fill the deatils");
        return false;
    }
else 
{
if (name === ""
|| name.includes('0') || name.includes('1')
|| name.includes('2') || name.includes('3')
|| name.includes('4') || name.includes('5')
|| name.includes('6') || name.includes('7')
|| name.includes('8') || name.includes('9')) {
window.alert
    ("Please enter a valid Name");
return false;
}


if (email === "" || !email.includes('@')) {
    window.alert
        ("Please enter a E-mail address");
    return false;
}

if (password === "") {
    alert("Please enter your password");
    return false;
}

if (password.length < 6) {
    alert("Please enter a  Password that is atleast 6 character long");
    return false;

}
if (password !== confirmPassword){
    alert("The Passwords do not match")
    return false;
}
}

const users = JSON.parse(localStorage.getItem("users")) || [];
users.push({name: name, email: email, password: password});
localStorage.setItem("users",JSON.stringify(users));

window.location.href = "login.html";
alert("Signup successful");
}

