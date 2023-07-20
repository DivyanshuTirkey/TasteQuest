const searchBox = document.querySelector("#search-recipe")
const searchBtn = document.querySelector("#search-btn")
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        console.log(meal.strArea);
        console.log(meal.strCategory);
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span></p>
            <p><span>${meal.strCategory}</span></p>
        `;

        const button = document.createElement('button');
        button.textContent = "view recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });

}
const fetchIngredients = (meal) => {
    let ingredientsList = '';
    for (let index = 1; index <= 20; index++) {
        const ingredient = meal[`strIngedient${index}`];
        if(ingredient){
            const measure = meal[`strMeasure${index}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
        else{
            break;
        }
        return 
    }
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class='recipe-name'>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class='ingredient-list'>${fetchIngredients(meal)}</ul>

        <div>
            <h3>Instructions</h3>
            <p class='instructions'>${meal.strInstructions}</p>
        </div>
    `

    
    recipeDetailsContent.parentElement.style.display = "block";

}

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);

})