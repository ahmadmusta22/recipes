
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let searchName = document.getElementById("searchName");
let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let phoneInput = document.getElementById("phoneInput")
let ageInput = document.getElementById("ageInput")
let passwordInput = document.getElementById("passwordInput")
submitBtn = document.getElementById("submitBtn")
let repasswordInput = document.getElementById("repasswordInput")

let recipeList = []

$(document).ready(function () {

    $(".loading-icon").fadeOut(500, function () {
        $('.loading-screen').fadeOut(500)
    })
    $("body").css("overflow", "visible")
})


function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 600)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    $('.links li').animate({ top: 0 }, 600)
}

function closeSideNav() {

    $('.side-nav-menu').animate({ left: '-256.562px' }, 600)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({ top: 300 }, 600)
}




$(".open-close-icon").click(function () {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})








// CALLING FUNCTIONS *************

$('.search').click(function () {

    showSearchInputs()
    closeSideNav()
})


$('.category').click(function () {

    getCategories()
    closeSideNav()
})


$('.area').click(function () {

    getArea()
    closeSideNav()
})


$('.ingredients').click(function () {

    getIngredients()
    closeSideNav()
})


$('.contact').click(function () {

    showContacts()
    closeSideNav()


})


// END CALLING FUNCTIONS*********************


// START 20 MEALS ON LOADING

async function displayData(recipeList) {
    rowData.innerHTML = ""

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeList}`)
    let finalData = await respone.json()
    recipeList = finalData;

    console.log(recipeList.meals);
    displayMeals(recipeList.meals)


}


function displayMeals(recipeList) {
    let cartoona = "";

    for (let i = 0; i < recipeList.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${recipeList[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${recipeList[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${recipeList[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


displayData(recipeList)


// END 20 MEALS ON LOADING

// START INGREDIENTS *********************************

async function getIngredients() {
    rowData.innerHTML = ""
    searchContainer.innerHTML = ""
    $(".loading-icon").fadeIn(50, function () {
        $('.loading-screen').fadeIn(50)
    })
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let finalData = await respone.json()
    recipeList = finalData;

    console.log(recipeList.meals);
    displayIngredients(recipeList.meals.slice(0, 20))
    $(".loading-icon").fadeOut(50, function () {
        $('.loading-screen').fadeOut(50)
    })



}


function displayIngredients(recipeList) {
    let box = "";

    for (let i = 0; i < recipeList.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${recipeList[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${recipeList[i].strIngredient}</h3>
                        <p>${recipeList[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}





async function getIngredientsMeals(sito) {

    rowData.innerHTML = ""
    $(".loading-icon").fadeIn(50, function () {
        $('.loading-screen').fadeIn(50)
    })
    let response = await fetch(`https:www.themealdb.com/api/json/v1/1/filter.php?i=${sito}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".loading-icon").fadeOut(50, function () {
        $('.loading-screen').fadeOut(50)
    })
}



// END INGREDIANTS ****************************************



// START CATEGORIES ***************

async function getCategories() {
    rowData.innerHTML = ""
    searchContainer.innerHTML = ""
    $(".loading-icon").fadeIn(50, function () {
        $('.loading-screen').fadeIn(50)
    })
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let finalData = await response.json()
    recipeList = finalData;
    console.log(finalData);
    displayCategories(recipeList.categories)
    $(".inner-loading-screen").fadeOut(300)
    $(".loading-icon").fadeOut(50, function () {
        $('.loading-screen').fadeOut(50)
    })

}

function displayCategories(recipeList) {
    let box = "";

    for (let i = 0; i < recipeList.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${recipeList[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${recipeList[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${recipeList[i].strCategory}</h3>
                        <p>${recipeList[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}



async function getCategoryMeals(sito) {
    rowData.innerHTML = ""
    $(".loading-icon").fadeIn(50, function () {
        $('.loading-screen').fadeIn(50)
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${sito}`)
    let finalData = await response.json()
    recipeList = finalData;
    displayMeals(recipeList.meals.slice(0, 20))
    $(".loading-icon").fadeOut(50, function () {
        $('.loading-screen').fadeOut(50)
    })


}


// END CATEGORY **************************

// START DETAILS ****************************

async function getMealDetails(sito) {
    rowData.innerHTML = ""
    $(".loading-icon").fadeIn(50, function () {
        $('.loading-screen').fadeIn(50)
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${sito}`)
    let finalData = await response.json()
    recipeList = finalData;
    displayDetails(recipeList.meals)
    $(".loading-icon").fadeOut(50, function () {
        $('.loading-screen').fadeOut(50)
    })


}


function displayDetails(recipeList) {
    let box = "";

    for (let i = 0; i < recipeList.length; i++) {
        box += `
     <div class="col-md-4">
                <img class="w-100 py-4 rounded-3" src="${recipeList[i].strMealThumb}" alt="">
                    <h2>${recipeList[i].strMeal}</h2>
            </div>
            <div class="col-md-8">
             <h2>Instructions</h2>
                <h2 class=" fs-6" >${recipeList[i].strInstructions}</h2>
                <p>${recipeList[i].strTags}</p>
                <h3><span class="fw-bolder">Area : </span>${recipeList[i].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${recipeList[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert  alert-info m-2 p-1">${recipeList[i].strMeasure1}${recipeList[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${recipeList[i].strMeasure2}${recipeList[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${recipeList[i].strMeasure3}${recipeList[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${recipeList[i].strMeasure4}${recipeList[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${recipeList[i].strMeasure5}${recipeList[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${recipeList[i].strMeasure6}${recipeList[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${recipeList[i].strMeasure7}${recipeList[i].strIngredient7}</li>
                    <li class="alert alert-info m-2 p-1">${recipeList[i].strMeasure8}${recipeList[i].strIngredient8}</li>
                    <li class="alert alert-info m-2 p-1">${recipeList[i].strMeasure9}${recipeList[i].strIngredient9}</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
                </ul>

                <a target="_blank" href="https://oukosher.org/recipes/tamiya-egyptian-dried-fava-bean-fritters/" class="btn btn-success">Source</a>
                <a target="_blank" href="https://www.youtube.com/watch?v=mulqW-J3Yy4" class="btn btn-danger">Youtube</a>
            </div>
        `
    }

    rowData.innerHTML = box
}





// END DETAILS ****************************

// START AREA *******************************


async function getArea() {

    rowData.innerHTML = ""
    searchContainer.innerHTML = ""
    $(".loading-icon").fadeIn(50, function () {
        $('.loading-screen').fadeIn(50)
    })
    let respone = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let finalData = await respone.json()
    recipeList = finalData;
    console.log(recipeList.meals);
    displayArea(recipeList.meals)
    $(".loading-icon").fadeOut(50, function () {
        $('.loading-screen').fadeOut(50)
    })

}



function displayArea(recipeList) {

    let box = "";
    for (let i = 0; i < recipeList.length; i++) {

        box +=
            `
         <div class="col-md-3">
                <div onclick="getAreaMeals('${recipeList[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${recipeList[i].strArea}</h3>
                </div>
        </div>

        `


    }

    rowData.innerHTML = box
}


async function getAreaMeals(sito) {
    rowData.innerHTML = "";
    $(".loading-icon").fadeIn(50, function () {
        $('.loading-screen').fadeIn(50)
    })
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${sito}`)
    let finalData = await respone.json()
    recipeList = finalData
    displayMeals(recipeList.meals.slice(0, 20))
    $(".loading-icon").fadeOut(50, function () {
        $('.loading-screen').fadeOut(50)
    })

}



// END AREA *********************************



// START SEARCH **************************

function showSearchInputs() {


    rowData.innerHTML = ''



    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input oninput="searchByName(this.value)" id="#searchName"  class=" searchName form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input oninput="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

}



async function searchByName(sito) {

    rowData.innerHTML = ""
    $(".loading-icon").fadeIn(50, function () {
        $('.loading-screen').fadeIn(50)
    })

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${sito}`)
    let finalData = await response.json()
    recipeList = finalData;
    if (recipeList.meals) {
        displayMeals(recipeList.meals)
    }
    else {
        displayMeals([])
    }
    $(".loading-icon").fadeOut(50, function () {
        $('.loading-screen').fadeOut(50)
    })

}


async function searchByFLetter(sito) {

    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${sito}`)
    let finalData = await response.json()
    recipeList = finalData;
    if (recipeList.meals) {
        displayMeals(recipeList.meals)

    }
    else {
        displayMeals([])
    }



}


// END SEARCH *******************************

// START CONTACTS

function showContacts() {
    searchContainer.innerHTML = ""
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  onkeyup="inputsValidation(this) type="text" class="form-control" placeholder="Enter Your Name">
                <div " class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation(this)" type="email" class="form-control " placeholder="Enter Your Email">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation(this)" type="text" class="form-control " placeholder="Enter Your Phone">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation(this)" type="number" class="form-control " placeholder="Enter Your Age">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Enter Your Password">
                <div  class="  alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Repassword">
                <div  class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `


}


// END CONTACTS **********************************************


// START VALIDATION ***********************

function inputsValidation(element) {

    var regex = {

        nameInput: /^[a-zA-Z ]+$/,
        emailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phoneInput: /^(?:\+?\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        ageInput: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        passwordInput: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
        repasswordInput: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
    }

    if (regex[element.id].test(element.value) == true) {

        element.nextElementSibling.classList.replace("d-block", "d-none")

    }

    else {

        element.nextElementSibling.classList.replace("d-none", "d-block")

    }
}


// END VALIDATION **************************************





