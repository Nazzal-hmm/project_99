document.addEventListener("DOMContentLoaded", () => {
  class ItemInRoom {
    constructor() {
      this.roomItems = {
        'Corridor2.html': {
          'keycard': 'A security keycard with level 3 clearance'
        }
      };
      this.items = window.location.pathname.includes('Corridor2.html') ? this.roomItems['Corridor2.html'] : {};
    }

    async checkInventory() {
      let userId = sessionStorage.getItem('userId');
      if (!userId) return [];

      let dbConfig = new FormData();
      dbConfig.append('hostname', DatabaseConnectionData.hostname);
      dbConfig.append('username', DatabaseConnectionData.username);
      dbConfig.append('password', DatabaseConnectionData.password);
      dbConfig.append('database', DatabaseConnectionData.database);

      let query = `SELECT items FROM Session WHERE u_id = ${userId}`;
      dbConfig.append('query', query);

      try {
        let response = await fetch(dbConnectorUrl, {
          method: "POST",
          body: dbConfig
        });
        let result = await response.json();
        
        if (result.success && result.data[0].items) {
          return JSON.parse(result.data[0].items);
        }
        return [];
      } catch (error) {
        console.error('Error checking inventory:', error);
        return [];
      }
    }

    async updateInventory(newItem) {
      let userId = sessionStorage.getItem('userId');
      if (!userId) return false;

      let currentItems = await this.checkInventory();
      currentItems.push(newItem);

      let dbConfig = new FormData();
      dbConfig.append('hostname', DatabaseConnectionData.hostname);
      dbConfig.append('username', DatabaseConnectionData.username);
      dbConfig.append('password', DatabaseConnectionData.password);
      dbConfig.append('database', DatabaseConnectionData.database);

      let query = `UPDATE Session SET items = '${JSON.stringify(currentItems)}' WHERE u_id = ${userId}`;
      dbConfig.append('query', query);

      try {
        let response = await fetch(dbConnectorUrl, {
          method: "POST",
          body: dbConfig
        });
        let result = await response.json();
        return result.success;
      } catch (error) {
        console.error('Error updating inventory:', error);
        return false;
      }
    }

    async handleInput(inputValue) {
      if (window.location.pathname === "/HTML/Corridor1.html") {
        if (inputValue === "go window") {
          location.href = "../HTML/Corridor2.html";
        } else if (inputValue === "go door") {
          let inventory = await this.checkInventory();
          
          if (inventory.includes('keycard')) {
            location.href = "../HTML/Starting2.html";
          } else {
            displayBlock.innerHTML = "You need to find and take the keycard first, its by the window!";
          }
        } else {
          this.handleCommands(inputValue);
        }
      }

      if (window.location.pathname === "/HTML/Corridor2.html") {
        if (inputValue === "go corridor") {
          location.href = "../HTML/Corridor1.html";
        } else {
          this.handleCommands(inputValue);
        }
      }
    }

    handleCommands(inputValue) {
      let parts = inputValue.split(' ');
      if (parts[0] === 'look') {
        this.displayItems();
      } else if (parts[0] === 'take') {
        if (parts[1]) {
          this.takeItem(parts[1]);
        } else {
          displayBlock.innerHTML = 'What would you like to take?';
        }
      } else if (parts[0] === 'inventory') {
        this.displayInventory();
      } else {
        if (Object.keys(this.items).length > 0) {
          displayBlock.innerHTML = 'Unknown command. Try: LOOK, TAKE [item], INVENTORY, or movement commands';
        } else {
          displayBlock.innerHTML = 'Unknown command. Try: INVENTORY or movement commands';
        }
      }
      userInput.value = "";
    }

    displayItems() {
      if (Object.keys(this.items).length === 0) {
        displayBlock.innerHTML = 'There are no items in this room.';
        return;
      }

      let itemList = 'Items in the room:\n';
      for (let item in this.items) {
        itemList += `- ${item}: ${this.items[item]}\n`;
      }
      displayBlock.innerHTML = itemList;
    }

    async takeItem(item) {
      if (this.items[item]) {
        let success = await this.updateInventory(item);
        if (success) {
          displayBlock.innerHTML = `Successfully picked up: ${item}`;
          delete this.items[item];
          await this.displayInventory();
        } else {
          displayBlock.innerHTML = "Failed to pick up item";
        }
      } else {
        displayBlock.innerHTML = "That item isn't here.";
      }
    }

    async displayInventory() {
      let inventory = await this.checkInventory();
      let inventoryDisplay = document.querySelector('.inventoryBlock');
      if (inventoryDisplay) {
        inventoryDisplay.innerHTML = `<h2>Inventory</h2>${inventory.join('<br>')}`;
      }
    }
  }

  let room = new ItemInRoom();
  let userInput = document.getElementById("userIn");
  let displayBlock = document.getElementById("displayBlock");

  userInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      let inputValue = userInput.value.toLowerCase().trim();
      if (!inputValue) {
        displayBlock.innerHTML = "Please enter a command!";
        userInput.value = "";
        return;
      }
      await room.handleInput(inputValue);
    }
  });

  if (window.location.pathname === "/HTML/Corridor2.html") {
    document.getElementById('cluesBlock').innerHTML = "<span style='font-size: 3vh;'>Hint: Look around the room for a keycard. Use 'LOOK' to see items and 'TAKE keycard' to pick it up. Then try to use the door again.</span>";
  }

  room.displayInventory();
});
