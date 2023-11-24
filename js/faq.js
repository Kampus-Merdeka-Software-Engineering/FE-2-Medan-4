// Navbar
let navScroll = window.pageYOffset;
let screenWidth = window.innerWidth;

window.onscroll = function () {
  let currentNavScroll = window.pageYOffset;
  screenWidth = window.innerWidth;
  if (navScroll > currentNavScroll) {
    document.querySelector(".header").style.top = "0";
  } else {
    document.querySelector(".header").style.top = "-260px";
  }
  navScroll = currentNavScroll;
};

const navLink = document.getElementById("toggleButton");

navLink.addEventListener("click", () => {
  let responsiv = document.getElementById("navbarRight");
  if (responsiv.className === "navbar-right") {
    responsiv.className += " responsive";
  } else {
    responsiv.className = "navbar-right";
  }
});

// Random ticketID
function generateTicketID() {
  // Generate a random number (you can customize the range as needed)
  var randomNumber = Math.floor(Math.random() * 100000);

  // Set the generated number as the value of the ticketid input
  document.getElementById('ticketid').value = 'T' + randomNumber;
}
// Automatically generate Ticket ID when the page loads
window.onload = generateTicketID;

// POST from data 

document.getElementById('formCustomer').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  // Collect form data
  var formData = {
    ticketid: document.getElementById('ticketid').value,
    name: document.getElementById('name').value,
    message: document.getElementById('message').value,
  };

  // Send data to the backend API
  fetch('URL_API', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (response.ok) {
      alert('Your question has been submitted successfully!');
      // Clear form fields
      document.getElementById('ticketid').value = '';
      document.getElementById('name').value = '';
      document.getElementById('message').value = '';
    } else {
      alert('Failed to submit question. Please try again.');
    }
  })
  .catch(error => {
    alert(`Error message: ${error.message}`);
  });
});



// OUTPUT
document.addEventListener('DOMContentLoaded', function () {
  const outputSection = document.getElementById('outputSection');
  const paginationContainer = document.getElementById('pagination');

  // Sample data (replace this with the actual data from your API or storage)
  const faqs = [
    { ticketId: "T1234", name: "Layla Freya", question: "Will this tour be guided by a tour guide?" },
    { ticketId: "T5434", name: "Gusion Tampan", question: "How much person can book for travel?" },
    { ticketId: "T6547", name: "Jhonson Goo", question: "Does GoTrip Provide Assistance Services During Travel?" },
    { ticketId: "T7678", name: "Alucard ", question: "Does GoTrip offer exclusive promotions or offers for loyal customers?" },
    { ticketId: "T5413", name: "Lesley Gea", question: "Is it possible for group/family bookings?" },
    { ticketId: "T3232", name: "Aldous Renald", question: "Are there any additional costs to the stated price?" },
    // ... (more FAQs)
  ];

  const itemsPerPage = 3; // Adjust as needed
  let currentPage = 1;

  function displayFAQs(page) {
    outputSection.innerHTML = ''; // Clear previous content

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const faqsToDisplay = faqs.slice(startIndex, endIndex);

    faqsToDisplay.forEach(createFaqElement);
  }

  function createFaqElement(faq) {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');

    const ticketId = document.createElement('div');
    ticketId.classList.add('ticket-id');
    ticketId.textContent = faq.ticketId;

    const name = document.createElement('div');
    name.classList.add('name');
    name.innerHTML = `<i class="fa-solid fa-user"></i> ${faq.name}`;

    const question = document.createElement('div');
    question.classList.add('question');
    question.textContent = faq.question;

    const commentIcon = document.createElement('i');
    commentIcon.classList.add('fa-regular', 'fa-comment');
    commentIcon.style.marginLeft = '90%'; // Adjust as needed

    faqItem.appendChild(ticketId);
    faqItem.appendChild(name);
    faqItem.appendChild(question);
    faqItem.appendChild(commentIcon);

    outputSection.appendChild(faqItem);
  }

  function updatePagination() {
    const totalPages = Math.ceil(faqs.length / itemsPerPage);

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        displayFAQs(currentPage);
        updatePagination();
      });

      paginationContainer.appendChild(pageButton);
    }
  }

  displayFAQs(currentPage);
  updatePagination();
});

