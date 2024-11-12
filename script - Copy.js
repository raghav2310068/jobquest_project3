"use script";
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".image-slider .slide");
  let currentIndex = 0;

  // Function to switch images
  function showNextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }

  // Set the first image to be visible
  slides[currentIndex].classList.add("active");

  // Trigger the next image on hover
  const imageSlider = document.querySelector(".image-slider");
  imageSlider.addEventListener("mouseenter", showNextSlide);
});

//------------------------------------------
function showEligibleCompanies() {
  // Get CGPA values from the form
  const firstYearCgpa = parseFloat(
    document.getElementById("1st-year-cgpa").value
  );
  const secondYearCgpa = parseFloat(
    document.getElementById("2nd-year-cgpa").value
  );
  const thirdYearCgpa = parseFloat(
    document.getElementById("3rd-year-cgpa").value
  );

  // Sample company lists based on CGPA ranges
  const companies = {
    high: ["Google", "Microsoft", "Amazon"],
    mid: ["Infosys", "TCS", "Wipro"],
    low: ["Tech Mahindra", "Cognizant"],
  };

  let eligibleCompanies = [];

  // Decide eligible companies based on CGPA averages
  const averageCgpa = (firstYearCgpa + secondYearCgpa + thirdYearCgpa) / 3;

  if (averageCgpa >= 8.5) {
    eligibleCompanies = [...companies.high, ...companies.mid, ...companies.low];
  } else if (averageCgpa >= 7.0) {
    eligibleCompanies = [...companies.mid, ...companies.low];
  } else {
    eligibleCompanies = companies.low;
  }

  // Display the list of eligible companies
  const companyListDiv = document.getElementById("companyList");
  companyListDiv.innerHTML =
    "<ul>" +
    eligibleCompanies.map((company) => `<li>${company}</li>`).join("") +
    "</ul>";

  // Show the modal
  document.getElementById("companyModal").style.display = "block";
}
document.getElementById("studentForm").reset();

// Close the modal
function closeModal() {
  document.getElementById("companyModal").style.display = "none";
}

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
  const modal = document.getElementById("companyModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function sendMail(email) {
  // Predefined subject and message body
  const subject = "Request for Job Application Information";
  const body =
    "Hello,\n\nI am interested in potential job opportunities with your company. Please let me know if there are open positions or if I can provide any additional information.\n\nThank you!";

  // Encode the subject and body to ensure special characters are correctly handled
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open the user's default mail client
  window.location.href = mailtoLink;
}

function toggleCompanyForm() {
  // Toggle the visibility of the form
  const form = document.getElementById("company-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function addCompany() {
  // Get form values
  const name = document.getElementById("company-name").value;
  const tagline = document.getElementById("company-tagline").value;
  const logoUrl = document.getElementById("company-logo-url").value;
  const websiteUrl = document.getElementById("company-website-url").value;
  const email = document.getElementById("company-email").value;

  // Create a new company element
  const newCompany = document.createElement("div");
  newCompany.className = "company1";
  newCompany.innerHTML = `
    <a href="${websiteUrl}">
      <img src="${logoUrl}" alt="${name} Logo" class="company1--logo" />
      <h1 class="tagline">${tagline}</h1>
    </a>
    <button class="button-apply" onclick="sendMail('${email}', '${name}')">
      Send Email
    </button>
  `;

  // Append the new company element to the container
  document.getElementById("new-companies-container").appendChild(newCompany);

  // Hide the form and clear input fields
  toggleCompanyForm();
  document.getElementById("company-form").reset();
}
// Toggle the form's visibility
function toggleCompanyForm() {
  const form = document.getElementById("company-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

// Load companies from localStorage on page load
window.onload = function () {
  loadCompanies();
};

// Function to add a new company
function addCompany() {
  const name = document.getElementById("company-name").value;
  const tagline = document.getElementById("company-tagline").value;
  const logoUrl = document.getElementById("company-logo-url").value;
  const websiteUrl = document.getElementById("company-website-url").value;
  const email = document.getElementById("company-email").value;

  const newCompany = {
    name,
    tagline,
    logoUrl,
    websiteUrl,
    email,
  };

  // Save to localStorage
  saveCompanyToLocalStorage(newCompany);

  // Display the new company
  displayCompany(newCompany);

  // Reset form and hide it
  toggleCompanyForm();
  document.getElementById("company-form").reset();
}

// Function to save company to localStorage
function saveCompanyToLocalStorage(company) {
  let companies = JSON.parse(localStorage.getItem("companies")) || [];
  companies.push(company);
  localStorage.setItem("companies", JSON.stringify(companies));
}

// Function to load companies from localStorage
function loadCompanies() {
  let companies = JSON.parse(localStorage.getItem("companies")) || [];
  companies.forEach(displayCompany);
}

// Function to display a company in the DOM
function displayCompany(company) {
  const newCompany = document.createElement("div");
  newCompany.className = "company1";
  newCompany.innerHTML = `
    <a href="${company.websiteUrl}">
      <img src="${company.logoUrl}" alt="${company.name} Logo" class="company1--logo" />
      <h1 class="tagline">${company.tagline}</h1>
    </a>
    <button class="button-apply" onclick="sendMail('${company.email}', '${company.name}')">
      Send Email
    </button>
  `;
  document.getElementById("new-companies-container").appendChild(newCompany);
}
