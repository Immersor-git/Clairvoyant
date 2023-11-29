import { doc, setDoc, deleteDoc } from "firebase/firestore"; 

function writeItemName(name) {
    await setDoc(doc(db, "Stored_Data", name), {
        value: name
      });
}

function deleteName(name) {
    await deleteDoc(doc(db, "Stored_Data", name));   
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
            var s = prompt("Enter a string to add")
            writeItemName(s)
            continue;
        } else if (c == "d") {
            var s = prompt("Enter a string to remove")
            deleteName(s)
            continue;            
        } else if (c == "q") {
            break;
        } else {
            println("Invalid entry. Please try again.")
            continue;
        }
    }
}

dbDemo();