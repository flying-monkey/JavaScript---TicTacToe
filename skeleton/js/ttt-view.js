class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }


  bindEvents() {
    const $board = $("ul.grid li");
    $board.click((event) => {
      let pos = $(event.currentTarget).data("pos");
      console.log(pos);
      console.log(this.game.board.isEmptyPos(pos));
      let oppositePlayer;
      let currentPlayer = this.game.currentPlayer;
      if (currentPlayer === "x") {
       oppositePlayer = "o";
    } else {
       oppositePlayer = "x";
    }
      if (this.game.board.isEmptyPos(pos)) {
        this.game.playMove(pos);
        $(event.currentTarget).append(currentPlayer);
        $(event.currentTarget).addClass(currentPlayer);
        if (this.game.board.winner()){
          $(`.${currentPlayer}`).each(function(i, bx) {
          $( bx ).css("background-color", "green");
          $(bx).css("font-weight", "bold");
          $(bx).css("font-size", "500%");
          $(bx).css("text-align", "center");
          $(bx).css("color", "white");
        });
        $(`.${oppositePlayer}`).each(function(i, bx) {
          $( bx ).css("background-color", "white");
          $(bx).css("font-weight", "bold");
          $(bx).css("font-size", "500%");
          $(bx).css("text-align", "center");
          $(bx).css("color", "red");
          $board.unbind("click");
          alert ("Game Won!");
        });
      }else if (this.game.board.isOver() === true ) {
          $board.unbind("click");
          alert ("Game Over!");
        }
        else{
          $(event.currentTarget).css("background-color", "white");
          $(event.currentTarget).css("font-weight", "bold");
          $(event.currentTarget).css("font-size", "500%");
          $(event.currentTarget).css("text-align", "center");
        }
        } else{
          alert ("IS NOT AN EMPTY POSITION!");
        }
      });
  }

  makeMove($square) {}

  setupBoard() {
    const $grid = $("<ul class ='grid'></ul>");

    for (let i = 0; i < 3; i++) {
      let $row = $("<ul class ='row'></ul>");

      $row.append($(`<li data-pos=[${i},0] class ='cell'></li>`));
      $row.append($(`<li data-pos=[${i},1] class ='cell'></li>`));
      $row.append($(`<li data-pos=[${i},2] class ='cell'></li>`));
      $grid.append($row);
      this.$el.append($grid);
    }




  }
}

module.exports = View;
