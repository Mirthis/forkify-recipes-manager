import View from "./view";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet!";

  _generateMarkup() {
    return this._data.map((result) => previewView.render(result, false)).join();
  }

  addRenderHandler(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookmarksView();
