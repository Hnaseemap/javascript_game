import promptSync from "prompt-sync";

let prompt = new promptSync()

// Constants for the game
const WIN = "Congratulations! You found the hat!";                                  /* Win */   
const LOSE = "You lost.";                                                           /* Lose */             
const OUT_BOUND = "You are out of the field.";                                      /* Out of Bound */                             
const INTO_HOLE = "You fell into a hole";                                           /* Fall into Hole */
const WELCOME = "Welcome to Find Your Hat game";                                    /* Start game Wlcome Message */
const DIRECTION = "Which direction, (u)p, (d)own, (l)eft, (r)ight?";                /* Keyboard directions */
const QUIT = "Press q or Q to quit the game.";                                      /* To Quit game */
const END_GAME = "Game Ended. Thank you.";                                          /* Game Ended */
const NOT_RECOGNISED = "Input not recognised.";                                     /* Input not recognised */

// Constant Game Elements
const HAT = '^';
const HOLE = 'O';
const GRASS = '░';
const PLAYER = '*';

// Create the class for the game
class Field {

    //constructor, initialise the game
    constructor(rows, cols){
        this.rows = rows;                                   /* property to set up number of rows for the field */                     
        this.cols = cols;                                   /* property to set up number of columns for the field */               
        this.field = new Array();                           /* property that represents the field for game */           
        this.gamePlay = false;                              /* property to set up the game play */
    }

    // methods for the game

    // static method welcomeMessage to welcome
    static welcomeMessage(msg){
        console.log(
            "\n**********************************************\n" +
            msg
            + "\n**********************************************\n"
        );
    }

    generateField() {
        for (let i = 0; i < this.rows; i++) {
          this.field[i] = new Array();                      /* Generate field rows */
          for (let j = 0; j < this.cols; j++) {
            this.field[i][j] = GRASS;                       /* Generate field cols */
          }
        }
    
        // Place hat randomly (not at 0,0)
        let hatPlaced = false;
        while (!hatPlaced) {
          const hatRow = Math.floor(Math.random() * this.rows);
          const hatCol = Math.floor(Math.random() * this.cols);
          if (hatRow !== 0 || hatCol !== 0) {
            this.field[hatRow][hatCol] = HAT;
            hatPlaced = true;
          }
        }
    
        // Place a few holes
        const holesToPlace = Math.floor((this.rows * this.cols) * 0.2);
        let placed = 0;
        while (placed < holesToPlace) {
          const r = Math.floor(Math.random() * this.rows);
          const c = Math.floor(Math.random() * this.cols);
          if (this.field[r][c] === GRASS && (r !== 0 || c !== 0)) {
            this.field[r][c] = HOLE;
            placed++;
          }
        }
      }
    
      printField() {
        this.field.forEach((row) => console.log(row.join("")));
      }
    
      endGame() {
        console.log(END_GAME);
        this.gamePlay = false;
        process.exit();
      }
    
      updatePlayer(position) {
        // Calculate new position
        let newRow = this.playerPos.row;
        let newCol = this.playerPos.col;
    
        if (position === "u") newRow--;
        if (position === "d") newRow++;
        if (position === "l") newCol--;
        if (position === "r") newCol++;
    
        // Check for out-of-bounds
        if (
          newRow < 0 ||
          newRow >= this.rows ||
          newCol < 0 ||
          newCol >= this.cols
        ) {
          console.log(OUT_BOUND);
          console.log(LOSE);
          this.endGame();
          return;
        }
    
        const cell = this.field[newRow][newCol];
    
        if (cell === HOLE) {
          console.log(INTO_HOLE);
          console.log(LOSE);
          this.endGame();
          return;
        }
    
        if (cell === HAT) {
          console.log(WIN);
          this.endGame();
          return;
        }
    
        // Clear previous position
        this.field[this.playerPos.row][this.playerPos.col] = GRASS;
    
        // Update to new position
        this.playerPos = { row: newRow, col: newCol };
        this.field[newRow][newCol] = PLAYER;
      }
    
      updateGame() {                                            /* Update the game */
        let userInput = "";
        do {
          console.log(DIRECTION.concat(" ", QUIT));             /* Request for the user's input */
          userInput = prompt();
          switch (userInput.toLowerCase()) {                    /* Update the position of the player */
            case "u":
            case "d":
            case "l":
            case "r":
              this.updatePlayer(userInput.toLowerCase());       /* user has pressed "u", "d", "l", "R" */
              break;
            case "q":                                           /* user has quit the game */
              this.endGame();
              break;
            default:
              console.log(NOT_RECOGNISED);                      /* input not recognised */
              break;
          }
    
          this.printField();                                    /* Print field */
        } while (userInput.toLowerCase() !== "q");              /* Continue to loop if the player hasn't quit */
      }
    
      startGame() {                                             /* Start the game */
        this.gamePlay = true;
        this.generateField();                                   /* Generate the field first */
        this.field[0][0] = PLAYER;                              /* Set the start position of the character */
        this.playerPos = { row: 0, col: 0 };
        this.printField();                                      /* Print the field once */
        this.updateGame();                                      /* Update the game once */
      }
    }
    
    Field.welcomeMessage(WELCOME);
    const ROWS = 10;
    const COLS = 10;
    const gameField = new Field(ROWS, COLS);                    /* Declaring and creating an instance of Field class */
    gameField.startGame();                                      /* Start the game */
    
