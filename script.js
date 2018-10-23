// VAR ELEMENTS HTML
let getCategories = document.querySelector('.allCateg');
let getStates = document.querySelector('.allOrigin');
let getIngredients = document.querySelector('.allIngredients');
let content =  document.querySelector('.result');
let main = document.querySelector('main');

// REQUETE AJAX
function getAjax(url, param) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", url, false);
    xhttp.send();
    let results = JSON.parse(xhttp.response);
    let list = results.meals;
    for (let i = 0; i < list.length; i++) {

        //debugger;
        let element = document.createElement("P");
        let div = document.createElement("DIV");    
        let img = document.createElement("IMG");

        var main = document.querySelector(".result");
        //console.log();
        div.classList.add('card');
        element.classList.add('el');
        element.dataset.id = list[i].idMeal;
        element.innerHTML = list[i][param];
        img.src = list[i].strMealThumb;
        img.classList.add('thumb');
        div.appendChild(element);
        div.appendChild(img);
        main.appendChild(div); 
        //debugger;
    }
}

function getAjaxById(id) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id, false);
    xhttp.send();
    let objResponse = JSON.parse(xhttp.response);
    let results = objResponse.meals;

    for (let i = 0; i < results.length; i++) {
        //debugger;
        
        let div = document.createElement("DIV");
        div.classList.add("popup");
        

        let name = document.createElement("H3");
        let categ = document.createElement("P");
        let area = document.createElement("P");
        let instructions = document.createElement("P");
        let leaveCross = document.createElement('IMG');

        leaveCross.classList.add('leave');
        leaveCross.src = "./img/64x64.png";
        name.innerHTML = results[0].strMeal;
        categ.innerHTML = results[0].strCategory;
        area.innerHTML = results[0].strArea;
        instructions.innerHTML = results[0].strInstructions;

        div.appendChild(leaveCross);
        div.appendChild(name);
        div.appendChild(categ);
        div.appendChild(area);
        div.appendChild(instructions);
        main.appendChild(div); 

        
        console.log(results[0].strArea);
        console.log(results[0].strCategory);
    }
}




// SEARCH 
function search(search) {
    content.innerHTML = "";
    getAjax("https://www.themealdb.com/api/json/v1/1/search.php?s="+search, "strMeal");
}
document.querySelector('.search').addEventListener('click', function() {
    let input = document.querySelector('.inputSearch').value;
    search(input);
});
document.querySelector('body').addEventListener('keydown', function(el) {
    if (el.key === "Enter") {
        let input = document.querySelector('.inputSearch').value;
        search(input);
    }
});
// END SEARCH

// BUTTON TO SORT

// getCategories.addEventListener('click', function() {
//     content.innerHTML = "";
//     getAjax("https://www.themealdb.com/api/json/v1/1/list.php?c=list", "strCategory");
// });

// getStates.addEventListener('click', function() {
//     content.innerHTML = "";
//     getAjax("https://www.themealdb.com/api/json/v1/1/list.php?a=list", "strArea");
// });

// getIngredients.addEventListener('click', function() {
//     content.innerHTML = "";
//     getAjax("https://www.themealdb.com/api/json/v1/1/list.php?i=list", "strIngredient");
// });
// END BUTTON TO SORT

//BUTTON TOGGLE POPUP
document.querySelector('body').addEventListener('click', function(el) {
    console.log(el.target);

    
    if(el.target.classList[0] === "el" ) {
        getAjaxById(el.target.dataset.id);

    } if(el.target.classList[0] === "leave" ) {
        el.target.parentElement.remove();
    }


});
// END BUTTON TOGGLE POPUP

