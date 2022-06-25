import $ from "jquery";

class Search {
  //1. describe and create/initiate our object
  constructor() {
    this.resultsDiv = $("#search-overlay__results");
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;

    //. for a class and # for an id;
  }

  //2.events

  events() {
    this.openButton.on("click", this.openOverlay.bind(this)); //when the button gets clicked we want to call this function
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keypressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }
  //3.methods(function,action...)

  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
    }

    this.previousValue = this.searchField.val();
  }

  getResults() {
    // this.resultsDiv.html("search results.."); //loading

    // this.isSpinnerVisible = false;
    // $.getJSON(url, func);
    $.getJSON(
      "http://localhost:10005/wp-json/wp/v2/posts?search=" +
        this.searchField.val(),
      (posts) => {
        // alert(posts[0].title.rendered); //check the url in postman



        this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General Information</h2>
        <ul class="link-list min-list">
        
        ${posts.map(item=>`<li><a href"${item.link}">${item.title.rendered}</a></li>`).join('')}
        </ul>

        `);
      })
      //instead of using bind this here to point this to search we can use ES6 arrow function
    //adding / to new html line without red marks or indentation ``);
  }

  keypressDispatcher(e) {
    //   console.log(e.keyCode);

    if (
      e.keyCode == 83 &&
      !this.isOverlayOpen &&
      !$("input,textarea").is(":focus")
    ) {
      this.openOverlay();
    }
    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    console.log("our method just ran");
    this.isOverlayOpen = true;
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }
}

export default Search;
