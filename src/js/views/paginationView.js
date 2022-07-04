import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _genrateNextButtonMarkup(page) {
    return `
    <button class="btn--inline pagination__btn--next" data-goto="${page}">
        <span>Page ${page}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _genratePrevButtonMarkup(page) {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto="${page}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${page}</span>
    </button>
    `;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;
    console.log(currPage, numPages);
    if (currPage === 1 && numPages > 1) {
      return this._genrateNextButtonMarkup(currPage + 1);
    }
    if (currPage === numPages && numPages > 1) {
      return this._genratePrevButtonMarkup(currPage - 1);
    }
    if (currPage < numPages) {
      return `
      ${this._genratePrevButtonMarkup(currPage - 1)}
      ${this._genrateNextButtonMarkup(currPage + 1)}
      `;
    }
    return "onl1 1";
  }
}

export default new PaginationView();
