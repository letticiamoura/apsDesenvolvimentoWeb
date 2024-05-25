function Login() {

    var inputUser = document.getElementById('user').value;
    var inputPassword = document.getElementById('password').value;

    console.log(inputUser + inputPassword)

    if(inputUser === "user" && inputPassword === "123") {
        window.location.href = "./pages/Home.html";
    } else {
        alert("Usuário ou senha errados!")
    }
    
}