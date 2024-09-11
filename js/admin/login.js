let elLoginForm = document.querySelector(".login-form")
const loginData = JSON.parse(localStorage.getItem("logindata"))

elLoginForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        username:e.target.userlogin.value,
        password:e.target.userpassword.value
    }
    
    if(loginData){
        if(data.username == loginData.newLogin && data.password == loginData.newPassword){
            elLoginForm.lastElementChild.innerHTML = `
                <img class="mx-auto  w-[40px]" src="./images/loading.png" alt="loading icon" width="30" height="30" />
            `
            elLoginForm.lastElementChild.classList.remove("py-[14px]")
            setTimeout(() => {
                location.pathname = "../../admin.html"
            },500)

            localStorage.setItem("username", JSON.stringify(data))
        }
        else{
            alert("not correct")   
        }
    }
    else{
        alert("not correct")
    }
    
})