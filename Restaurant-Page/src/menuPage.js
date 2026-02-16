function initMenuPage() {
  const contentDiv = document.getElementById("content");

  // Create menu page container
  const menuPageDiv = document.createElement("div");
  menuPageDiv.className = "menu-page";

  // Create headline
  const headline = document.createElement("h1");
  headline.textContent = "Menu";

  // Create menu items container
  const menuItemsDiv = document.createElement("div");
  menuItemsDiv.className = "menu-items";

  // Sample menu items
  const menuItems = [
    {
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with seasonal vegetables",
      price: "$24.99",
    },
    {
      name: "Ribeye Steak",
      description: "Premium aged beef with garlic butter",
      price: "$32.99",
    },
    {
      name: "Pasta Carbonara",
      description: "Creamy Italian classic with pancetta and pecorino",
      price: "$18.99",
    },
    {
      name: "Truffle Risotto",
      description: "Arborio rice with black truffle and parmesan",
      price: "$22.99",
    },
    {
      name: "Pan-Seared Halibut",
      description: "Delicate white fish with citrus glaze",
      price: "$26.99",
    },
    {
      name: "Beef Bourguignon",
      description: "Slow-cooked beef in red wine reduction",
      price: "$28.99",
    },
  ];

  // Create menu item elements
  menuItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "menu-item";

    const itemName = document.createElement("h2");
    itemName.textContent = item.name;

    const itemDescription = document.createElement("p");
    itemDescription.textContent = item.description;

    const itemPrice = document.createElement("p");
    itemPrice.className = "price";
    itemPrice.textContent = item.price;

    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemDescription);
    itemDiv.appendChild(itemPrice);
    menuItemsDiv.appendChild(itemDiv);
  });

  // Append elements to menu page div
  menuPageDiv.appendChild(headline);
  menuPageDiv.appendChild(menuItemsDiv);

  // Append menu page div to content
  contentDiv.appendChild(menuPageDiv);
}

export default initMenuPage;
