import $ from "jquery";

class Search {
  //1. describe and create/initiate our object
  constructor() {
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.events();

    //. for a class and # for an id;
  }
  //2.events

  events() {
    this.openButton.on("click", this.openOverlay.bind(this)); //when the button gets clicked we want to call this function
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keypressDispatcher.bind(this));
  }
  //3.methods(function,action...)
  keypressDispatcher(e) {
    //   console.log(e.keyCode);

      if (e.keyCode==83) {
          this.openOverlay();
      }
      if (e.keyCode == 27) {
          this.closeOverlay();
      }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
      $("body").addClass("body-no-scroll");
      console.log("our method just ran");
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
  }
}

export default Search;
