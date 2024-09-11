let elRegisterForm = document.querySelector(".register-form")

elRegisterForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const newData = {
        newLogin: e.target.userlogin.value,
        newPassword:e.target.userpassword.value
    }
    localStorage.setItem("logindata", JSON.stringify(newData))
    elRegisterForm.lastElementChild.innerHTML = `
        <img class="mx-auto  w-[40px]" src="./images/loading.png" alt="loading icon" width="30" height="30" />
    `
    elRegisterForm.lastElementChild.classList.remove("py-[14px]")

    setTimeout(() => location.pathname = "/" ,500)
    
})