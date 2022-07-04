import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import resultView from "./views/resultView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SECS } from "./config.js";
// const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    //const id = '#5ed6604591c37cdc054bcd09';
    if (!id) return;
    recipeView.renderSpinner();
    resultView.render(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookmarks);

    await model.LoadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResult(query);
    resultView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError();
  }
};

controlPagination = function (gotoPage) {
  resultView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

controlServings = function (newServings) {
  model.updateServings(newServings);
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBoomark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    setTimeout(() => addRecipeView._toggleWindow(), MODAL_CLOSE_SECS * 1000);
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmar(controlAddBoomark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addRenderHandler(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
