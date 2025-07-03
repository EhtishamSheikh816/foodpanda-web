window.onload = () => {
  const pakistanCities = [
    { cityName: "Karachi", image: "/images/karachi.jpg" },
    { cityName: "Lahore", image: "/images/lahore.jpg" },
    { cityName: "Faisalabad", image: "/images/faisalabad.jpg" },
    { cityName: "Rawalpindi", image: "/images/rawalpindi.jpg" },
    { cityName: "Murree", image: "/images/murree.jpg" },
    { cityName: "Gujranwala", image: "/images/gujranwala.jpg" },
    { cityName: "Abottabad", image: "/images/abottabad.jpg" },
    { cityName: "Quetta", image: "/images/quetta.jpg" },
    { cityName: "Islamabad", image: "/images/islamabad.jpg" },
    { cityName: "Mangla", image: "/images/mangla.jpg" },
    { cityName: "Bahawalpur", image: "/images/bahawalpur.jpg" },
    { cityName: "Sargodha", image: "/images/sargodha.jpg" },
    { cityName: "Kamoke", image: "/images/kamoke.jpg" },
    { cityName: "Wahh Cannt", image: "/images/wahhCannt.jpg" },
    { cityName: "Rahim Yar Khan", image: "/images/rahimYarKhan.jpg" },
    { cityName: "Sadiqabad", image: "/images/sadiqabad.jpg" },
    { cityName: "Sahiwal", image: "/images/sahiwal.jpg" },
    { cityName: "Mardan", image: "/images/mardan.jpg" },
    { cityName: "Larkana", image: "/images/larkana.jpg" },
    { cityName: "Jhelum", image: "/images/jhelum.jpg" },
    { cityName: "Dera Ghazi", image: "/images/DeraGhaziKhan.jpg" },
    { cityName: "Pano Aqil", image: "/images/panoAqil.jpg" },
  ];
  const getCitySec = document.querySelector("#citySec");
  pakistanCities.map((city) => {
    getCitySec.innerHTML += `<div class="cityCard">
        <img src="${city.image}" alt="City Image" />
        <p>${city.cityName}</p>
      </div>`;
  });
};

const authentication = () => {
  location.href = "/authentication.html";
};

function logIn() {
  location.href = "/login.html";
}

function signUp() {
  location.href = "/signUp.html";
}

const signupAsAdmin = () => {
  location.href = "adminSignup.html";
};

const loginToAdmin = () => {
  location.href = "adminLogin.html";
};

//                                                                      AUTHENTICATION
//                      ADMIN AUTHENTICATION
const getReturantName = document.querySelector("#returantName");
const getAdminName = document.querySelector("#adminName");
const getAdminEmail = document.querySelector("#adminEmail");
const getAdminPassword = document.querySelector("#adminPassword");

let adminArr = JSON.parse(localStorage.getItem("adminData") || "[]");

const adminSignup = (event) => {
  event.preventDefault();

  let isResturantExist = adminArr.find(
    (checker) => checker.resturantName === getReturantName.value
  );
  if (isResturantExist) {
    Swal.fire({
      icon: "error",
      title: "Restaurant Already Exists!",
      text: "Try a different name or check your list.",
    });
    return;
  }

  let isEmailExist = adminArr.find(
    (check) => check.adminEmail === getAdminEmail.value
  );
  if (isEmailExist) {
    Swal.fire({
      icon: "warning",
      title: "Email Already Exists!",
      text: "This email is already registered. Do you want to log in instead?",
      showCancelButton: true,
      confirmButtonText: "Yes, Login",
      cancelButtonText: "No, Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "adminLogin.html";
      }
    });
    return;
  }

  let adminUser = {
    resturantName: getReturantName.value,
    adminName: getAdminName.value,
    adminEmail: getAdminEmail.value,
    adminPasswoard: getAdminPassword.value,
  };
  adminArr.push(adminUser);
  localStorage.setItem("adminData", JSON.stringify(adminArr));

  getReturantName.value = "";
  getAdminName.value = "";
  getAdminEmail.value = "";
  getAdminPassword.value = "";

  location.href = "adminpage.html";
};

const adminLogin = (event) => {
  event.preventDefault();

  let notEmailExist = adminArr.find(
    (check) => check.adminEmail === getAdminEmail.value
  );
  if (!notEmailExist) {
    Swal.fire({
      icon: "warning",
      title: "Email Not Found!",
      text: "Please sign up before logging in.",
      confirmButtonText: "Go to Signup",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = "adminSignup.html";
      }
    });
    return;
  }

  let found = adminArr.find(
    (u) =>
      u.adminEmail === getAdminEmail.value &&
      u.adminPasswoard === getAdminPassword.value
  );
  if (!found) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password!",
    });
    return;
  }

  localStorage.setItem("currentUser", getAdminEmail.value);
  location.href = "adminpage.html";
};

let availableUser = localStorage.getItem("currentUser");

const getRestaurantName = document.querySelector("#restaurantName");
const getImageUrl = document.querySelector("#imageUrl");
const getItemName = document.querySelector("#itemName");
const getPrice = document.querySelector("#price");
const getDescription = document.querySelector("#description");
const getShowItems = document.querySelector("#resturantItems");
const getAdminUserName = document.querySelector("#adminUserName");
const getBrandName = document.querySelector(".brand-name");

let a = adminArr.map((items) => {
  if (items.adminEmail === availableUser) {
    getAdminUserName.innerHTML = items.adminName;
  }
  if (items.adminEmail === availableUser) {
    getBrandName.innerHTML = items.resturantName;
    getRestaurantName.value = items.resturantName;
  }
});

let itemsArr = JSON.parse(localStorage.getItem(availableUser) || "[]");

const showAdminData = () => {
  getShowItems.innerHTML = "";

  itemsArr.map((items, index) => {
    getShowItems.innerHTML += `<div class="card">
          <img
            src=${items.itemImageUrl}
            alt="Pizza"
          />
          <div class="card-body">
            <div class="restName">
              Resturant: <span class="restaurant-name">${items.restaurantName}</span>
            </div>
            <div class="food-name">${items.itemName}</div>
            <div class="description">
              ${items.itemDescription}
            </div>
            <div class="price">Rs. ${items.itemPrice}</div>
            <button class="restBtn" onclick="delAdminItem(${index})">Delete</button>
          </div>
        </div>`;
  });
};

const addItems = (event) => {
  event.preventDefault();

  let items = {
    restaurantName: getRestaurantName.value,
    itemImageUrl: getImageUrl.value,
    itemName: getItemName.value,
    itemPrice: getPrice.value,
    itemDescription: getDescription.value,
  };

  itemsArr.push(items);
  localStorage.setItem(availableUser, JSON.stringify(itemsArr));

  getImageUrl.value = "";
  getItemName.value = "";
  getPrice.value = "";
  getDescription.value = "";

  showAdminData();
};
showAdminData();

const delAdminItem = (index) => {
  itemsArr.splice(index, 1);
  localStorage.setItem(availableUser, JSON.stringify(itemsArr));
  showAdminData();
};

const adminLogOut = () => {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
};
