let search=document.getElementById("search")
let categories=document.getElementById("categories")
let vertical=document.getElementById("vertical")
let horizontal=document.getElementById("horizontal")
let mode=document.getElementById("mode")

let add=document.getElementById("add")

let nextUp=document.querySelector("#nextUp .card-body")
let inProgress=document.querySelector("#inProgress .card-body")
let done=document.querySelector("#done .card-body")



let nextUpIndex=document.querySelector("#nextUp span")
let inProgressIndex=document.querySelector("#inProgress span")
let doneIndex=document.querySelector("#done span")

let form=document.getElementById("form")

let status= document.getElementById("status")
let category= document.getElementById("category")
let title= document.getElementById("title")
let invalidTitle= document.getElementById("invalidTitle")
let description= document.getElementById("description")
let invalidDescription= document.getElementById("invalidDescription")

let addTask= document.getElementById("addTask")
let updateTask= document.getElementById("updateTask")


let row=document.getElementsByClassName("row")[0]
let cardBody=document.getElementsByClassName("card-body")
let box=document.querySelectorAll(".box")
/////////////////////////////////////////////////////checking local storage
let tasks;
if(localStorage.getItem("tasks")==null){
    tasks=[];
}
else{
    tasks=JSON.parse(localStorage.getItem("tasks")) 
    display(tasks)
}
////////////////////////////////////////////////////// showing form

add.onclick=function(){
    form.classList.remove("d-none")
    document.body.style="overflow:hidden"
    scroll(0,0)
    
}
/////////////////////////////////////////////////////// hiding form 
form.onclick=function (event) {
    if (event.target.id=="form") {
        form.classList.add(("d-none"))
        document.body.style="overflow:auto"
        updateTask.classList.add("d-none")
        addTask.classList.remove("d-none")
        clear()
    }   
}

////////////////////////////////////////////////////// taking inputs
title.oninput=function () {
    validation(titleRegex,title)
}

description.oninput=function () {
    validation(descriptionRegex,description)
}

function create() {

  
    if(validation(titleRegex,title)==true && validation(descriptionRegex,description) ==true ){
        let task={
            status:status.value,
            category:category.value,
            title:title.value,
            description:description.value,
        }
        
        tasks.push(task)
        saveTasks()
    }
    
}
////////////////////////////////////////////////////////saving in local storage
function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
//////////////////////////////////////////////////////// adding tasks to page
addTask.onclick=function(){
    if(validation(titleRegex,title)==true 
    && validation(descriptionRegex,description) ==true ){
        create()
        display(tasks)
        clear()
        form.classList.add("d-none")
        document.body.style="overflow:auto"
        title.classList.remove("is-valid")
        description.classList.remove("is-valid")
    }
  
}

///////////////////////////////////////////////////////displaying tasks

function display(array) {
    let nextUpbox=[];
    let inProgressbox=[];
    let donebox=[];
    nextUpIndex.innerHTML=0
    inProgressIndex.innerHTML=0
    doneIndex.innerHTML=0
    for (let i = 0; i < array.length; i++) {
        if(array[i].status=="nextUp"){
            nextUpbox+=taskPosition(array[i],i)
           nextUpIndex.innerHTML++            
        }
        else if(array[i].status=="inProgress"){
            inProgressbox+=taskPosition(array[i],i);
            inProgressIndex.innerHTML++
        }
        else{
            donebox+=taskPosition(array[i],i)
            doneIndex.innerHTML++
        }       
    }

    nextUp.innerHTML=nextUpbox;
    inProgress.innerHTML=inProgressbox
    done.innerHTML=donebox  
}
///////////////////////////////////////////////////////// task position

function taskPosition(object,index) {
    return `<div class="box border border-1 rounded-3 p-3 borderColor backSecColor fs-5 vstack gap-3">
    <div class="fw-bold fontColor">${object.title}</div>
    <div class="fontColor">${object.description}</div>
    <div class="btn ${object.category} p-1 text-nowrap">${object.category}</div>
    <ul class="list-unstyled d-flex gap-3 m-0">
        <li onclick="update(${index})"><i class="fa-regular fa-pen-to-square fontColor"></i></li>
        <li onclick="del(${index})"><i class="fa-solid fa-trash-can fontColor"></i></li>
        <li onclick="randomColor(this)"><i class="fa-solid fa-palette fontColor"></i></li>
    </ul>
    </div>`
}
///////////////////////////////////////////////////////deleting tasks

function del(i) {
    tasks.splice(i,1)
    saveTasks()
    display(tasks)
}

//////////////////////////////////////////////////////updating tasks

function update(i) {
    form.classList.remove("d-none")
    status.value=tasks[i].status
    category.value=tasks[i].category
    title.value=tasks[i].title
    description.value=tasks[i].description

    addTask.classList.add("d-none")
    updateTask.classList.remove("d-none")

    document.body.style="overflow:hidden"
    scroll(0,0)


    updateTask.onclick=function(){
        tasks[i].status=status.value
        tasks[i].category=category.value
        tasks[i].title=title.value
        tasks[i].description=description.value

        addTask.classList.remove("d-none")
        updateTask.classList.add("d-none")
        saveTasks()
        display(tasks)
        clear()
        form.classList.add("d-none")
        document.body.style="overflow:auto"
    }
}
///////////////////////////////////////////////// clearing inputs

function clear() {
    status.value="nextUp"
    category.value="education"
    title.value=""
    description.value=""
}

//////////////////////////////////////////// search

function searchTask() {
    let searchArr=[]
    tasks.forEach(function (element) {
        if (element.title.toLowerCase().includes(search.value.toLowerCase())
         ||element.category.toLowerCase().includes(search.value.toLowerCase()) ) {
           searchArr.push(element) 
        }
    })
    display(searchArr)
    
}

search.oninput=searchTask
search.onblur=function () {
    search.value=""
    display(tasks)
}

////////////////////////////////////////// random color

// function randomColor(i) {
    
//    let chars=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]  //16
//    let randomcolor="#"
//    for(let i=0 ;i<6;i++){
//     let randomIndex=Math.floor(Math.random()*16) 
//     randomcolor+=chars[randomIndex] 
//    }
//    i.parentElement.parentElement.style=`background-color:${randomcolor} !important`  

// }

function randomColor(i) {
    
    let colors=["#A9A9A9","#808080","#818589","#D3D3D3","#C0C0C0","#E5E4E2"]  //6
    let randomcolor=""
    let randomIndex=Math.floor(Math.random()*6) 
    randomcolor=colors[randomIndex] 
    i.parentElement.parentElement.style=`background-color:${randomcolor} !important`  
 
 }
 
 ////////////////////////////////////////////////////// change App View

 vertical.onclick=function () {
    horizontal.classList.remove("active")
    vertical.classList.add("active")
    row.classList.add("row-cols-lg-3","row-cols-md-2")
    for (let i = 0; i <3; i++) {
        cardBody[i].classList.replace("hstack","vstack") 
        Array.from(cardBody[i].children).forEach(function (element) {
            element.classList.remove("grid")
        })      
    }
    
 }
 
 horizontal.onclick=function () {
    row.classList.remove("row-cols-lg-3","row-cols-md-2")
    vertical.classList.remove("active")
    horizontal.classList.add("active")
    for (let i = 0; i <3; i++) {
        cardBody[i].classList.replace("vstack","hstack") 
        cardBody[i].classList.add("overflow-x-auto")
        Array.from(cardBody[i].children).forEach(function (element) {
            element.classList.add("grid")
        }) 
    } 
 }
 
////////////////////////////////////////////////////// change app mode
let root=document.querySelector(":root")
function changeMode() {
   
    if(mode.dataset.mode=="light"){
        mode.innerHTML=`<i class="bi bi-moon-stars-fill"></i>`
        root.style.setProperty("--mainColor","#161B22")
        root.style.setProperty("--secColor","#0D1117")
        root.style.setProperty("--borderColor","rgba(255, 255, 255, 0.5)")
        root.style.setProperty("--fontColor","rgba(255, 255, 255, 0.5)")
        root.style.setProperty("--hoverColor","rgba(255, 255, 255, 0.5)")
        mode.dataset.mode="night"
    }
    else{
        
        mode.innerHTML=`<i class="bi bi-brightness-high"></i>`
        root.style.setProperty("--mainColor","#DDDDDD")
        root.style.setProperty("--secColor","white")
        root.style.setProperty("--borderColor","#333")
        root.style.setProperty("--fontColor","#333")
        root.style.setProperty("--hoverColor","white")
        mode.dataset.mode="light"
    }

}

mode.onclick=changeMode

///////////////////////////////////////////////////////// validation
let titleRegex=/^\w{3,}$/
let descriptionRegex=/^\w{5,100}$/
function validation(regex,input) {
    if(regex.test(input.value)){
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    input.parentElement.nextElementSibling.classList.add("d-none")
    return true
    }
    else{
        input.classList.add("is-invalid")
        input.classList.remove("is-valid")
        input.parentElement.nextElementSibling.classList.remove("d-none")
        return false
    }
}


