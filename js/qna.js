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

// POST from data
document
  .getElementById("formCustomer")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission

    // Collect form data
    var formData = {
      name: document.getElementById("name").value,
      message: document.getElementById("message").value,
      // Tidak perlu lagi menyertakan timestamp di sini
    };

    // Send data to the backend API
    fetch("https://puzzled-hare-fashion.cyclic.app//proses_qna", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Your message has been submitted successfully!");
          // Clear form fields
          document.getElementById("name").value = "";
          document.getElementById("message").value = "";
        } else {
          alert("Failed to submit message. Please try again.");
        }
      })
      .catch((error) => {
        alert(`Error message: ${error.message}`);
      });
  });

// OUTPUT
document.addEventListener("DOMContentLoaded", function () {
  const outputSection = document.getElementById("outputSection");
  const paginationContainer = document.getElementById("pagination");

  const itemsPerPage = 3; // Sesuaikan sesuai kebutuhan
  let currentPage = 1;

  function loadData() {
    fetch("https://puzzled-hare-fashion.cyclic.app//return_qna")
      .then((response) => response.json())
      .then((data) => {
        // Mengurutkan data berdasarkan ID terbesar
        const sortedData = data.sort((a, b) => b.id - a.id);
        updateHTML(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function updateHTML(data) {
    outputSection.innerHTML = ""; // Menghapus konten sebelumnya

    // Menampilkan data sesuai halaman saat ini
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = data.slice(startIndex, endIndex);

    dataToDisplay.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("qna-item");

      const name = document.createElement("div");
      name.classList.add("name");
      name.innerHTML = `<i class="fa-solid fa-user"></i> ${item.name}`;

      const message = document.createElement("div");
      message.classList.add("message");
      message.textContent = item.message;

      const timestamp = document.createElement("div");
      timestamp.classList.add("timestamp");
      timestamp.textContent = calculateTimeAgo(item.timestamp);

      const commentIcon = document.createElement("i");
      commentIcon.classList.add("fa-regular", "fa-comment");
      commentIcon.style.marginLeft = "90%"; // Sesuaikan jika perlu

      itemElement.appendChild(name);
      itemElement.appendChild(message);
      itemElement.appendChild(timestamp);
      itemElement.appendChild(commentIcon);

      outputSection.appendChild(itemElement);
    });
  }

  function calculateTimeAgo(timestamp) {
    const currentTimestamp = Date.now();
    const timeDifference = currentTimestamp - new Date(timestamp).getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    } else if (hours < 24) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    }
  }

  function updatePagination(totalPages) {
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        loadData(); // Memuat data saat halaman berubah
        updatePagination(totalPages);
      });

      paginationContainer.appendChild(pageButton);
    }
  }

  // Inisialisasi dan pembaruan tata letak halaman dan navigasi.
  fetch("https://puzzled-hare-fashion.cyclic.app//return_qna")
    .then((response) => response.json())
    .then((data) => {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      loadData(); // Memuat data awal
      updatePagination(totalPages);
      setInterval(loadData, 5000); // Set interval untuk polling setiap 5 detik
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
