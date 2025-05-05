const prompt = require("prompt-sync")({sigint:true});

let input = null;

while(input !== "q"){
    console.log("(w)up, (s)down, (a)left, (d)right, (q)uit.");
    input = prompt("which way would you like to move?  ");
    
    switch(input.toLowerCase()){
        case "w":
            console.log("You moved up.\n");           // user moved up
            break;
        case "s":
            console.log("You moved down.\n");         // user moved down
            break;
        case "a":
            console.log("You moved left.\n");         // user moved left
            break;
        case "d":
            console.log("You moved right.\n");        // user moved right
            break;
        case "q":
            console.log("Thank you for playing");     // user exits the game
            process.exit();
            break;
        default:                                      // deal with all other inputs
            console.log("Unrecognised Input!\n")
            break;
    }
}