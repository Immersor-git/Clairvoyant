import { doc, setDoc } from "firebase/firestore"; 

function writeItemName(name) {
    await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      });
      
}

function displayList() {

}

function dbDemo() {
    displayList()
    while (true) {   
        println("Commands: q - QUIT / r - refresh database / a - add an item / d - delete an item");
        var c = prompt("What would you like to do?").toLowerCase();
        if (c == "r") {
            println("")
            print("Refreshing...")
            displayList()
            continue;
        } else if (c == "a") {

        } else if (c == "d") {

        } else if (c == "q") {

        } else {
            println("Invalid entry. Please try again.")
            continue;
        }
    }
}

dbDemo();