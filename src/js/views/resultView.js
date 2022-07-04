import View from "./view";
import previewView from "./previewView";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipe found for your query!";
  _message = "Search for a term to see relevant recipes";

  _generateMarkup() {
    return this._data.map((el) => previewView.render(el, false)).join();
  }
}

export default new ResultView();
