function initHomePage() {
  const contentDiv = document.getElementById("content");

  // Create home page container
  const homePageDiv = document.createElement("div");
  homePageDiv.className = "home-page";

  // Create image
  const img = document.createElement("img");
  img.src =
    "https://images.unsplash.com/photo-1504674900610-545525eca3e7?w=800&q=80";
  img.alt = "Delicious restaurant dish";
  img.className = "home-image";

  // Create headline
  const headline = document.createElement("h1");
  headline.textContent = "Welcome to Delights Restaurant";

  // Create description text
  const description = document.createElement("p");
  description.textContent =
    "Experience culinary excellence in every bite. Our restaurant is dedicated to providing you with the finest dining experience, featuring expertly crafted dishes made from the freshest ingredients. Whether you're celebrating a special occasion or enjoying a casual meal with friends and family, Delights Restaurant is the perfect destination for unforgettable flavors and warm hospitality.";

  // Append all elements to the home page div
  homePageDiv.appendChild(img);
  homePageDiv.appendChild(headline);
  homePageDiv.appendChild(description);

  // Append home page div to content
  contentDiv.appendChild(homePageDiv);
}

export default initHomePage;
