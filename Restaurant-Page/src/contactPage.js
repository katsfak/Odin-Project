function initContactPage() {
  const contentDiv = document.getElementById("content");

  // Create contact page container
  const contactPageDiv = document.createElement("div");
  contactPageDiv.className = "contact-page";

  // Create headline
  const headline = document.createElement("h1");
  headline.textContent = "Contact Us";

  // Create contact information container
  const infoDiv = document.createElement("div");
  infoDiv.className = "contact-info";

  // Address section
  const addressSection = document.createElement("div");
  const addressTitle = document.createElement("h2");
  addressTitle.textContent = "Address";
  const address = document.createElement("p");
  address.textContent = "123 Flavor Street, Culinary City, CC 12345";
  addressSection.appendChild(addressTitle);
  addressSection.appendChild(address);

  // Phone section
  const phoneSection = document.createElement("div");
  const phoneTitle = document.createElement("h2");
  phoneTitle.textContent = "Phone";
  const phone = document.createElement("p");
  phone.textContent = "(555) 123-4567";
  phoneSection.appendChild(phoneTitle);
  phoneSection.appendChild(phone);

  // Email section
  const emailSection = document.createElement("div");
  const emailTitle = document.createElement("h2");
  emailTitle.textContent = "Email";
  const email = document.createElement("p");
  email.textContent = "info@delightsrestaurant.com";
  emailSection.appendChild(emailTitle);
  emailSection.appendChild(email);

  // Hours section
  const hoursSection = document.createElement("div");
  const hoursTitle = document.createElement("h2");
  hoursTitle.textContent = "Hours";
  const hours = document.createElement("p");
  hours.innerHTML =
    "Monday - Thursday: 5PM - 10PM<br>Friday - Saturday: 5PM - 11PM<br>Sunday: 4PM - 9PM";
  hoursSection.appendChild(hoursTitle);
  hoursSection.appendChild(hours);

  // Append all sections to info div
  infoDiv.appendChild(addressSection);
  infoDiv.appendChild(phoneSection);
  infoDiv.appendChild(emailSection);
  infoDiv.appendChild(hoursSection);

  // Append elements to contact page div
  contactPageDiv.appendChild(headline);
  contactPageDiv.appendChild(infoDiv);

  // Append contact page div to content
  contentDiv.appendChild(contactPageDiv);
}

export default initContactPage;
