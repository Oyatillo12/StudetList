let modalOuter = document.querySelector(".modal-outer")
let modalInner = document.querySelector(".modal-inner")
let studentInform = document.querySelector(".students-informations")
let elSearch = document.querySelector(".search-input")
let elPopapList = document.querySelector(".popap-list")
let elStudentList = document.querySelector(".student-list")

let studentBasics = document.querySelector(".student-basics")
let cardOFStudent = document.querySelector(".student-wrapper")
let studentName = document.querySelector(".studentname")


let dataUser = JSON.parse(localStorage.getItem("username"))
let adminName = document.querySelector(".user-enter")

let DateNow = new Date().toDateString().slice(3,)

adminName.textContent = dataUser.username

let students = JSON.parse(localStorage.getItem("students")) || []

// modal start
modalOuter.addEventListener("click", function(e){
    if(e.target.classList.contains("modal-outer")){
        modalOuter.classList.add("hidden")
    }
})
// modal end


// Img change part start

let changeInp = document.querySelector(".change-input")
let changeImg = document.querySelector(".change-img")

let ImgAdmin =  JSON.parse(localStorage.getItem("adminImg"))

changeImg.src = ImgAdmin ? ImgAdmin : "./images/avatar.jpg"
changeInp.addEventListener("change", function(e){
    let adminImg = URL.createObjectURL(e.target.files[0]) 
    localStorage.setItem("adminImg", JSON.stringify(adminImg))
    changeImg.src = adminImg 
})
// Img change part end

// logout stwart
let elLogout = document.querySelector(".logout")

elLogout.addEventListener("click", function(){
    modalOuter.classList.remove("hidden")
    modalInner.className = "modal-inner w-[430px] relative bg-[#F8F8F8] rounded-xl px-[12px] py-4"
    modalInner.innerHTML = `
        <p class="text-[25px] mb-[40px] leading-[29px] font-bold text-center"> Are you sure you want to log-off?</p>
        <button onclick="handleLogout()" class="w-full mb-[19px]  py-[12px] bg-[#FEAF00] border text-white text-[20px] leading-[23px] rounded-lg hover:bg-transparent hover:text-[#FEAF00] hover:border-[#FEAF00] duration-300">Logout</button>
        <button onclick="handleCancel()" class="w-full py-[12px] bg-transparent border text-[#FEAF00] text-[20px] border-[#FEAF00] leading-[23px] rounded-lg hover:bg-[#FEAF00] hover:text-white hover:border-transparent duration-300">Cancel</button>

    `
})

function handleLogout(){
    modalInner.className = "bg-transparent"
    modalInner.innerHTML = `
        <img src="../../images/load2.png" alt="loading icon" width="140" />
    `
    setTimeout(() => {
        localStorage.clear()
        location.pathname = "/"
    },300)
}
function handleCancel(){
    modalOuter.classList.add("hidden")
}
// logout end


//add new student start
let addBtn = document.querySelector(".add-button")

addBtn.addEventListener("click", function(){
    modalOuter.classList.remove("hidden")

    modalInner.className ="modal-inner w-[600px] relative bg-[#F2EAE1] rounded-xl px-[12px] py-4"
    modalInner.innerHTML =`
        <button class="close-modal absolute top-[41px] right-[40px]">
                <img src="./images/close.svg" alt="close img" width="38" height="38">
        </button>
            <form class="added-student flex flex-col items-center" autoComplete="off">
                <label class="mx-auto">
                    <input required autocomplete="off" class="add-img hidden" type="file" name="addimg">
                    <img class="cursor-pointer overflow-hidden w-[300px] h-[200px] mx-auto  empty-img  object-contain" src="./images/avatar.jpg" alt="add image" width="300" height="200">
                </label>
                <div class="flex items-center justify-center gap-[20px] mt-6 flex-wrap ">
                    
                    <label class="categories flex flex-col">
                        <span class="text-[16px] leading-[26px] text-[#898989]">Name</span>
                        <input required type="text" class="text-[18px] leading-[23px]  outline-none py-[10px] px-4 rounded-[4px]" placeholder="Enter Name" name="username" >
                    </label>
                
                    <label class="quantity flex flex-col ">
                        <span  class="text-[16px] leading-[26px] text-[#898989]">Email</span>
                        <input required type="email" class="text-[18px] leading-[23px]  outline-none py-[10px] px-4 rounded-[4px]" placeholder="Enter Email" name="useremail" >
                    </label>
                    <label class="quantity flex flex-col ">
                        <span  class="text-[16px] leading-[26px] text-[#898989]">Phone</span>
                        <input required type="tel" class="text-[18px] leading-[23px]  outline-none py-[10px] px-4 rounded-[4px]" placeholder="Enter Phone" name="userphone" >
                    </label>
                    <label class="quantity flex flex-col">
                        <span  class="text-[16px] leading-[26px] text-[#898989]">Enroll Number</span>
                        <input required type="number" class="text-[18px] leading-[23px]  outline-none py-[10px] px-4 rounded-[4px]" placeholder="Enter Enroll Number" name="enrollnumber" >
                    </label>
                </div>
                <button class="add-btn w-[200px] text-white py-[12px] mx-auto bg-[#FEAF00] mt-8 text-[25px] font-bold leading-[29px] rounded-[12px]" type="submit">Add</button>
            </form>
    `

    let elAddedForm = document.querySelector(".added-student")
    elAddedForm.addEventListener("submit", function(e){
        e.preventDefault()
        let data = {
            id:students.length ? students[students.length - 1].id + 1 : 1,
            studentName:e.target.username.value,
            studentEmail:e.target.useremail.value,
            studentPhone:e.target.userphone.value,
            studentCard:e.target.enrollnumber.value,
            img:emptyImg.src
        }
        students.push(data)

        elAddedForm.lastElementChild.innerHTML =`
            <img class="mx-auto scale-[1]" src="./images/loading.png" alt="Loading..." width="40" > `

            setTimeout(() => {
                modalOuter.classList.add("hidden")
                elAddedForm.lastElementChild.innerHTML = "Add"
                renderStudents(students)
            },1000)
    })

    

    let elAddimg = document.querySelector(".add-img")
    let emptyImg = document.querySelector(".empty-img")
    let closeModal = document.querySelector(".close-modal")

    elAddimg.addEventListener("change", function(e){
        emptyImg.src = URL.createObjectURL(e.target.files[0])
    })
    
    closeModal.addEventListener("click", () =>  modalOuter.classList.add("hidden"))
})

function renderStudents(arr){
    elStudentList.innerHTML = null
    arr.forEach(item => {
        let elStudentItem = document.createElement("li")
        elStudentItem.className = "flex items-center rounded-[8px] bg-white  justify-between pl-[13px] pr-[34px] py-[15px]"
        elStudentItem.innerHTML = `
            <div class=" flex items-center ">
                <img class="mr-[30px] w-[65px] h-[55px] object-contain" src=${item.img} alt="user icon" width="65" height="55">
                <strong class="font-normal text-[14px] leading-[17px]">${item.studentName}</strong>
            </div>
            <a class="font-normal text-[14px] leading-[17px]" href="email:${item.studentEmail}">${item.studentEmail}</a>
            <a class="font-normal text-[14px] leading-[17px]" href="tel:${item.studentPhone}">${item.studentPhone}</a>
            <span class="font-normal text-[14px] leading-[17px]">1${item.studentCard}</span>
            <span>${DateNow}</span>
            <div class="flex items-center gap-[15px]">
                <button onclick="goToStudent(${item.id})">
                    <img class="object-contain hover:scale-[1.3] duration-300" src="./images/more.svg" alt=" More icon" width="25" height="19">
                </button>
                <button onclick="handleUpdate(${item.id})">
                    <img class="hover:scale-[1.3] duration-300" src="./images/update.svg" alt=" More icon" width="19" height="19">
                </button>
                <button onclick="handleDelete(${item.id})">
                    <img class="hover:scale-[1.3] duration-300" src="./images/delete.svg" alt=" More icon" width="16" height="18">
                </button>
            </div>
        `
        elStudentList.appendChild(elStudentItem) 
    })
    localStorage.setItem("students", JSON.stringify(students))
}
renderStudents(students)
//add new student end

// show student inform start

function goToStudent(id){
    
    let findedObj = students.find(item => item.id == id)
    
    modalOuter.classList.remove("hidden")
    modalInner.className = "bg-transparent"
    modalInner.innerHTML = `
        <img src="../../images/load2.png" alt="loading icon" width="140" />
    `
    setTimeout(() => {
        modalOuter.classList.add("hidden")
        studentInform.classList.add("hidden")
        studentBasics.classList.remove("hidden")
        studentName.textContent = findedObj.studentName
        cardOFStudent.innerHTML = `
                    <div class="flex items-center gap-[51px]">
                        <img class="w-[209px] h-[216px] rounded-lg object-contain" src=${findedObj.img} alt="user Img" width="209" height="216">
                        <ul >
                            <li class="flex flex-col mb-[15px]">
                                <span class="text-[12px] text-[#ACACAC] font-semibold leading-[16px]">Name</span>
                                <strong class="text-[16px] font-normal leading-[19px]">${findedObj.studentName}</strong>
                            </li>
                            <li class="flex flex-col mb-[15px]">
                                <span class="text-[12px] text-[#ACACAC] font-semibold leading-[16px]">Email</span>
                                <strong class="text-[16px] font-normal leading-[19px]">${findedObj.studentEmail}</</strong>
                            </li>
                            <li class="flex flex-col mb-[15px]">
                                <span class="text-[12px] text-[#ACACAC] font-semibold leading-[16px]">Phone</span>
                                <strong class="text-[16px] font-normal leading-[19px]">${findedObj.studentPhone}</strong>
                            </li>
                            <li class="flex flex-col">
                                <span class="text-[12px] text-[#ACACAC] font-semibold leading-[16px]">Date admission</span>
                                <strong class="text-[16px] font-normal leading-[19px]">${DateNow}</strong>
                            </li>
                        </ul>
                    </div>
                    <img src="./images/icon.svg" alt="icon" width="11" height="83">
            `


    },1000)

}

// show student inform end


// sort by name start 
function sortedByName(){
    students.sort((a,b) => a.studentName > b.studentName ? 1 : -1)
    renderStudents(students)
}
// sort by name end 


// back to student list 

function goBacktoList(){
    modalOuter.classList.remove("hidden")
    modalInner.className = "bg-transparent"
    modalInner.innerHTML = `
        <img src="../../images/load2.png" alt="loading icon" width="140" />
    `
    setTimeout(() => {
        modalOuter.classList.add("hidden")
        studentInform.classList.remove("hidden")
        studentBasics.classList.add("hidden")
    },1000)
}

// delete start

function handleDelete(id){

    modalOuter.classList.remove("hidden")
    modalInner.className = "modal-inner w-[450px] relative bg-[#F2EAE1] rounded-xl px-[12px] py-4"
    modalInner.innerHTML = `
        <p class="text-[25px] font-semibold text-center leading-[33px]">Are you sure you want to remove this student?</p>
        <div class="flex justify-between flex-col gap-[15px] mt-[15px]">
            <button onclick="handleCancel()" class="bg-[#FEAF00] hover:opacity-70 text-[#FFFFFF] py-[13px]  rounded-[5px] font-semibold">Cancel</button>
            <button onclick="handledeleteYes(${id})"  class="bg-transparent hover:bg-[#FEAF00] duration-300 border border-[#FEAF00] text-[#FFFFFF] py-[13px]  rounded-[5px] font-semibold" onclick="deleteProduct()">Delete</button>
        </div>
    `
}

function handledeleteYes(id){
    const findedIndex = students.findIndex(item => item.id == id)
    students.splice(findedIndex, 1)
    modalOuter.classList.add("hidden")
    renderStudents([...students])
    localStorage.setItem("products", JSON.stringify(products))
 }

//  delete end

// update start

function handleUpdate(id){
    const findedObj = students.find(item => item.id == id)
    modalOuter.classList.remove("hidden")
    modalInner.className = "modal-inner w-[600px] relative bg-[#F2EAE1] rounded-xl px-[12px] py-4"
    modalInner.innerHTML = `
        <button class="close-modal absolute top-[41px] right-[40px]">
                <img src="./images/close.svg" alt="close img" width="38" height="38">
        </button>
            <form class="update-student flex flex-col items-center" autoComplete="off">
                <label class="mx-auto">
                    <input class="update-input hidden" type="file" name="addimg">
                    <img class="cursor-pointer overflow-hidden w-[300px] h-[200px] mx-auto  update-img  object-contain" src="${findedObj.img}" alt="add image" width="300" height="200">
                </label>
                <div class="flex items-center justify-center gap-[20px] mt-6 flex-wrap ">
                    
                    <label class="categories flex flex-col">
                        <span class="text-[16px] leading-[26px] text-[#898989]">Name</span>
                        <input value=${findedObj.studentName} type="text" class="text-[18px] leading-[23px]  outline-none py-[10px] px-4 rounded-[4px]" placeholder="Enter Name" name="username" >
                    </label>
                
                    <label class="quantity flex flex-col ">
                        <span  class="text-[16px] leading-[26px] text-[#898989]">Email</span>
                        <input value=${findedObj.studentEmail} type="email" class="text-[18px] leading-[23px]  outline-none py-[10px] px-4 rounded-[4px]" placeholder="Enter Email" name="useremail" >
                    </label>
                    <label class="quantity flex flex-col ">
                        <span  class="text-[16px] leading-[26px] text-[#898989]">Phone</span>
                        <input value=${findedObj.studentPhone} type="tel" class="text-[18px] leading-[23px]  outline-none py-[10px] px-4 rounded-[4px]" placeholder="Enter Phone" name="userphone" >
                    </label>
                    <label class="quantity flex flex-col">
                        <span  class="text-[16px] leading-[26px] text-[#898989]">Enroll Number</span>
                        <input value=${findedObj.studentCard} type="number" class="text-[18px] leading-[23px]  outline-none py-[10px] px-4 rounded-[4px]" placeholder="Enter Enroll Number" name="enrollnumber" >
                    </label>
                </div>
                <button class=" w-[200px] text-white py-[12px] mx-auto bg-[#FEAF00] mt-8 text-[25px] font-bold leading-[29px] rounded-[12px]" type="submit">Add</button>
            </form>
    `
    let updatedImg = document.querySelector(".update-img")
    let updatedInput = document.querySelector(".update-input")
    updatedInput.addEventListener("change", function(e){
        updatedImg.src = URL.createObjectURL(e.target.files[0])
    } )

    let closeModal = document.querySelector(".close-modal")
    closeModal.addEventListener("click", () =>  modalOuter.classList.add("hidden"))

    let updatedForm = document.querySelector(".update-student")
    updatedForm.addEventListener("submit", function(e){
        e.preventDefault()
        findedObj.studentName = e.target.username.value
        findedObj.studentEmail = e.target.useremail.value
        findedObj.studentPhone = e.target.userphone.value
        findedObj.studentCard = e.target.enrollnumber.value
        findedObj.img = updatedImg.src
        
        modalOuter.classList.remove("hidden")
        modalInner.className = "bg-transparent"
        modalInner.innerHTML = `
            <img src="../../images/load2.png" alt="loading icon" width="140" />
        `

        setTimeout(() => {
            modalOuter.classList.add("hidden")
            },500)
            renderStudents(students)
        localStorage.setItem("students", JSON.stringify(students))
    })
}

// update end

// search part start 

elSearch.addEventListener("input", function(e){
    const searchValue = e.target.value.toLowerCase().trim();
    elPopapList.innerHTML = null

    const filteredstudents = students.filter(item => item.studentName.toLowerCase().includes(searchValue));
 
    if(searchValue == ""){
        renderStudents(students)
        elPopapList.classList.add("h-0");
        elPopapList.classList.add("p-0")
        elPopapList.classList.remove("p-2")
    }
    else{ 
        if(e.target.value && filteredstudents.length){
            elPopapList.classList.remove("h-0")
            elPopapList.classList.remove("p-0")
            elPopapList.classList.add("p-2")

            filteredstudents.forEach(item => {
                let elPopoverItem = document.createElement("li");
                elPopoverItem.className = "py-[7px] text-black px-[7px] bg-white rounded-lg text-[15px] leading-[17px] hover:bg-[#F8F8F8] duration-300 "
                elPopoverItem.innerHTML = item.studentName
                elPopapList.appendChild(elPopoverItem)

                elPopoverItem.setAttribute('data-id', item.id);  // Set student id on list item


                elPopoverItem.addEventListener("click", function (e) {
                    const studentId = parseInt(elPopoverItem.getAttribute('data-id'));
                    console.log(studentId);
                    
                    goToStudent(studentId);
                    
                    elSearch.value = "";
                    elPopapList.innerHTML = null
                    elPopapList.classList.add("h-0")
                    elPopapList.classList.add("p-0")
                    elPopapList.classList.remove("p-2")

                });

            })

        }
        else{
            elPopapList.classList.add("h-0")
            elPopapList.classList.add("p-0")
            elPopapList.classList.remove("p-2")
        }
    }

})

elSearch.addEventListener("blur", function(){
    setTimeout(() => {
     elPopapList.classList.add("h-0")
    elPopapList.classList.add("p-0")
    elPopapList.classList.remove("p-2")
    }, 400)
    
})