// VAR ELEMENTS HTML
let getCategories = document.querySelector('.allCateg');
let getStates = document.querySelector('.allOrigin');
let getIngredients = document.querySelector('.allIngredients');
let content =  document.querySelector('.result');
let main = document.querySelector('main');
let popupBasket = document.querySelector('.popup-basket');


// REQUETE AJAX GENERAL
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
        let addImg = document.createElement("IMG");


        var main = document.querySelector(".result");
        //console.log();
        addImg.src = "./img/add.png";
        addImg.classList.add('add-img');
        div.classList.add('card');
        element.classList.add('el');
        element.dataset.id = list[i].idMeal;
        element.innerHTML = list[i][param];
        img.src = list[i].strMealThumb;
        img.classList.add('thumb');

        element.appendChild(addImg);
        div.appendChild(element);
        div.appendChild(img);
        main.appendChild(div); 
        debugger;
    }
}

// REQUETE AJAX WITH ID
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

// DELETE ITEM FROM THE BASKET WITH THE ID 
function deleteItemFromBasket(el) {
    
    //localStorage.removeItem('favorites', clickedElement);
    //Storage.removeItem(favorites.splice(index, 1));
    
    if(el.target.classList[0] == "delete") {
        let clickedElement = el.target.dataset.id;
        let index = favorites.indexOf(clickedElement);
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        el.target.parentElement.remove();
        //debugger;
    }
}

// SEARCH 
function search(search) {
    content.innerHTML = "";
    getAjax("https://www.themealdb.com/api/json/v1/1/search.php?s="+search, "strMeal");
}

// ADD ITEM TO THE LOCAL STORAGE 

function addItem(el) {
    if(el.target.classList[0] == "add-img") { 

    let id = el.target.parentElement.dataset.id;
    let name = el.target.previousSibling.nodeValue;

    if(favorites.includes(name)) {
        // DO NOTHING
    } else {
        let deleteImg = document.createElement("IMG");
        let p = document.createElement("P");
        p.classList.add(id);
        
        deleteImg.dataset.id = id;
        deleteImg.src = "./img/64x64.png";
        deleteImg.classList.add('delete');
        
        p.innerHTML = name;
        p.appendChild(deleteImg);
        popupBasket.appendChild(p);

        favorites.push(name);
        localStorage.setItem('favorites', JSON.stringify(favorites));
       }
     }
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



//BUTTON TOGGLE POPUP
document.querySelector('body').addEventListener('click', function(el) {
    if(el.target.classList[0] === "el" ) {
        getAjaxById(el.target.dataset.id);
    } else if(el.target.classList[0] == "thumb") {
        getAjaxById(el.target.previousElementSibling.dataset.id);
    }
    
    if(el.target.classList[0] === "leave" ) {
        el.target.parentElement.remove();
    }
});
// END BUTTON TOGGLE POPUP




// REGISTER LOCALSTORAGE ID AND NAME


document.querySelector('body').addEventListener('click', function(el) {
    addItem(el);

});

var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
for (let i = 0; i < favorites.length; i++) {

    //  var storageKey = localStorage.key(i);
    //  var storageValue = JSON.parse(localStorage.getItem(storageKey));

    let element = favorites[i];
    let deleteImg = document.createElement("IMG");
    let p = document.createElement("P");

    p.classList.add(element.replace(/ /g, ""));
    
    deleteImg.dataset.id = element;
    deleteImg.src = "./img/64x64.png";
    deleteImg.classList.add('delete');
    
    p.innerHTML = element;
    p.appendChild(deleteImg);
    popupBasket.appendChild(p);
     
}

// DELETE BASKET ITEM
document.querySelector('body').addEventListener('click',function(el){
    deleteItemFromBasket(el);
});
// END DELETE ITEM BASKET

// BASKET TOGGLE 
document.querySelector('.basket').addEventListener('click', function() {
    popupBasket.classList.toggle('remove');
});
// END BASKET TOGGLE




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
