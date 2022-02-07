const homeContainer = document.getElementById("home");
const userList = document.getElementById("userList");
const userListTable = document.getElementsByTagName("table")[0];
const message = document.getElementById("message");
const loginMessage = document.getElementById("loginMessage");

// Check for page refresh for session management
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    if(JSON.parse(localStorage.getItem("admin")) !== null) {
        const {username, email, status} = JSON.parse(localStorage.getItem("admin"))[0];
        if(status === "true") {
            userList.style.display = "flex";
            homeContainer.style.display = "none";
            document.getElementById("userName").innerText = username;
            getUsers();
        } else {
            userList.style.display = "none";
            homeContainer.style.display = "flex";
        }
    }
}

window.addEventListener("load", () => {
    if(JSON.parse(localStorage.getItem("admin")) !== null) {
        const {username, email, status} = JSON.parse(localStorage.getItem("admin"))[0];
        if(status === "true") {
            userList.style.display = "flex";
            homeContainer.style.display = "none";
            document.getElementById("userName").innerText = username;
            getUsers();
        } else {
            userList.style.display = "none";
            homeContainer.style.display = "flex";
        }
    }
})
// END - Check for page refresh for session management

// Sign Up
const signupContainer = document.getElementById("signupContainer");
function openSignup() {
    signupContainer.style.display = "block";
    homeContainer.style.display = "none";
}
function closeSignup() {
    signupContainer.style.display = "none";
    homeContainer.style.display = "flex";
}

const signupForm = document.getElementById("signup");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const country = document.getElementById("country");

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const admin = JSON.parse(localStorage.getItem("admin"));
    if(admin === null) {
        localStorage.setItem("admin", JSON.stringify([{
            username: username.value, 
            email: email.value,
            password: password.value,
            phone: phone.value,
            address: address.value,
            country: country.value,
            status: "true"
        }]));
    } else {
        admin.push({
            username: username.value, 
            email: email.value,
            password: password.value,
            phone: phone.value,
            address: address.value,
            country: country.value,
            status: "true"
        });
        localStorage.setItem("admin", JSON.stringify(admin));
    }

    getUsers();

    username.value = "";
    email.value = "";
    password.value = "";
    phone.value = "";
    address.value = "";
    country.value = "";

    userList.style.display = "flex";
    signupContainer.style.display = "none"

});
// END - Sign Up

// Login
const loginContainer = document.getElementById("loginContainer");
function openLogin() {
    loginContainer.style.display = "block";
    homeContainer.style.display = "none";
}
function closeLogin() {
    loginContainer.style.display = "none";
    homeContainer.style.display = "flex";
}

const loginForm = document.getElementById("login");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const addUserContainer = document.getElementById("addUserContainer");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const adminList = JSON.parse(localStorage.getItem("admin"));
    if(adminList === null) {
        loginMessage.style.display = "block";
        loginMessage.innerText = "Please signup first.";
        setTimeout(() => loginMessage.style.display = "none", 2000);
    } else {
        const adminEmail = adminList.map(current => current["email"]);
        const adminPassword = adminList.map(current => current["password"]);
        if(adminEmail.includes(loginEmail.value) && adminPassword.includes(loginPassword.value)) {
            loginContainer.style.display = "none";
            userList.style.display = "flex";
            adminList[0].status = "true";
            localStorage.setItem("admin", JSON.stringify([adminList[0]]));
            document.getElementById("userName").innerText = adminList[0].username;
            getUsers();
        } else {
            loginMessage.style.display = "block";
            loginMessage.innerText = "Invalid login credentials. Try again";
            setTimeout(() => loginMessage.style.display = "none", 2000);
        }
    }

    loginEmail.value = "";
    loginPassword.value = "";
});
// END - Login

// Fetch users from Airtable API
const userData = [];
const userID = new Map();

async function getUsers() {
    await fetch(`https://api.airtable.com/v0/appxzAIWceo3zsq84/Table%201?&view=Grid%20view`, {headers: {"Authorization": "Bearer keyTnehojflD4HoP2"}})
    .then(response => response.json())
    .then(data => {
        console.log(typeof(+data.records[0].fields["#"]));
        userListTable.innerHTML = `<table>
        <tr>
          <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
          <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
          <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
          <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
          <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
          <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
          <th>Action</th>
        </tr>
      </table>`;
        data.records.forEach((record) => {
            userData.push(record.fields);
            userID.set(record.fields.Email, record.id);
            const row = `
            <tr>
                <td>${record.fields["#"]}</td>
                <td>${record.fields.Name}</td>
                <td>${record.fields.Email}</td>
                <td>${record.fields.Phone}</td>
                <td>${record.fields.Address}</td>
                <td>${record.fields.Country}</td>
                <td onclick="editUser(this)" class="edit">Edit</td>
            </tr>
            `;
            userListTable.innerHTML += row;
        });
    });
}
// END - Fetch users from Airtable API

// Add user
function openaddUser() {
    addUserContainer.style.display = "block";
}

function closeAddUser() {
    addUserContainer.style.display = "none";
    userList.style.display = "flex";
}

const addUserForm = document.getElementById("addUser");
const addName = document.getElementById("addname");
const addEmail = document.getElementById("addemail");
const addPhone = document.getElementById("addphone");
const addAddress = document.getElementById("addaddress");
const addCountry = document.getElementById("addcountry");
addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailList = userData.map(element => element.Email);
    if(emailList.includes(addEmail.value)) {
        message.style.display = "block";
        message.innerHTML = "User alredy exists";
        console.log(userData.length);
        setTimeout(() => message.style.display = "none", 2000);
    } else {
        message.style.display = "none";
        fetch(`https://api.airtable.com/v0/appxzAIWceo3zsq84/Table%201`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer keyTnehojflD4HoP2",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "fields": {
                    "#": `${userData.length + 1}`,
                    "Name": `${addName.value}`,
                    "Email": `${addEmail.value}`,
                    "Phone": `${addPhone.value}`,
                    "Address": `${addAddress.value}`,
                    "Country": `${addCountry.value}`
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            addUserContainer.style.display = "none";
            location.reload();
        })
        .catch(err => console.log(err));
    }
});
// END - Add user

// Redirect when logout
function home() {
    userListTable.innerHTML = `<table>
    <tr>
      <th>#</th>
      <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
      <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
      <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
      <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
      <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
      <th>Action</th>
    </tr>
  </table>`;
    userList.style.display = "none";
    homeContainer.style.display = "flex";

  const admin = JSON.parse(localStorage.getItem("admin"))[0];
  admin.status = "false";
  localStorage.setItem("admin", JSON.stringify([admin]));
  location.reload();
}
// END - Redirect when logout

// Sort filters
function sortByID() {
    userData.sort((a, b) => {
        let x = +a["#"];
        let y = +b["#"];

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = 
    `<table>
        <tr>
            <th>#<i class="fas fa-arrow-up" onclick="removeSortID()"></i></th>
            <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
            <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
            <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function sortByCountry() {
    userData.sort((a, b) => {
        let x = a.Country.toLowerCase();
        let y = b.Country.toLowerCase();

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = 
    `<table>
        <tr>
            <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
            <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
            <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
            <th>Country<i class="fas fa-arrow-up" onclick="removeSortCountry()"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function sortByPhone() {
    userData.sort((a, b) => {
        let x = a.Phone.toLowerCase();
        let y = b.Phone.toLowerCase();

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = 
    `<table>
        <tr>
            <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
            <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
            <th>Phone<i class="fas fa-arrow-up" onclick="removeSortPhone()"></i></th>
            <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
            <th>Country<i class="fas fa-arrow-down" onclick="removeSortCountry()"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function sortByCity() {
    userData.sort((a, b) => {
        let x = a.Address.toLowerCase();
        let y = b.Address.toLowerCase();

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = 
    `<table>
        <tr>
            <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
            <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
            <th>City<i class="fas fa-arrow-up" onclick="removeSortCity()"></i></th>
            <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function sortByEmail() {
    userData.sort((a, b) => {
        let x = a.Email.toLowerCase();
        let y = b.Email.toLowerCase();

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = 
    `<table>
        <tr>
            <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
            <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
            <th>Email<i class="fas fa-arrow-up" onclick="removeSortEmail()"></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
            <th>City<i class="fas fa-arrow-down" onclick="removeSortCity()"></i></th>
            <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function sortByName() {
    userData.sort((a, b) => {
        let x = a.Name.toLowerCase();
        let y = b.Name.toLowerCase();

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = 
    `<table>
        <tr>
            <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
            <th>Name<i class="fas fa-arrow-up" onclick="removeSortName()"></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick="removeSortEmail()"></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
            <th>City<i class="fas fa-arrow-down" onclick="removeSortCity()"></i></th>
            <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function removeSortID() {
    userData.sort((a, b) => {
        let x = +a["#"];
        let y = +b["#"];

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = 
    `<table>
        <tr>
            <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
            <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
            <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
            <th>Country<i class="fas fa-arrow-up" onclick="removeSortCountry()"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function removeSortCountry() {
    userData.sort((a, b) => {
        let x = a.Country.toLowerCase();
        let y = b.Country.toLowerCase();

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });
    userListTable.innerHTML = `<table>
    <tr>
      <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
      <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
      <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
      <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
      <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
      <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
      <th>Action</th>
    </tr>
  </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function removeSortCity() {
    userData.sort((a, b) => {
        let x = a.Address.toLowerCase();
        let y = b.Address.toLowerCase();

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });
    userListTable.innerHTML = `<table>
    <tr>
      <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
      <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
      <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
      <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
      <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
      <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
      <th>Action</th>
    </tr>
  </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function removeSortPhone() {
    userData.sort((a, b) => {
        let x = a.Phone.toLowerCase();
        let y = b.Phone.toLowerCase();

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });
    userListTable.innerHTML = `<table>
    <tr>
      <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
      <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
      <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
      <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
      <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
      <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
      <th>Action</th>
    </tr>
  </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function removeSortEmail() {
    userData.sort((a, b) => {
        let x = a.Email.toLowerCase();
        let y = b.Email.toLowerCase();

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });
    userListTable.innerHTML = `<table>
    <tr>
      <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
      <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
      <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
      <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
      <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
      <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
      <th>Action</th>
    </tr>
  </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}

function removeSortName() {
    userData.sort((a, b) => {
        let x = a.Name.toLowerCase();
        let y = b.Name.toLowerCase();

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });
    userListTable.innerHTML = `<table>
    <tr>
      <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
      <th>Name<i class="fas fa-arrow-down" onclick="sortByName()"></i></th>
      <th>Email<i class="fas fa-arrow-down" onclick="sortByEmail()"></i></th>
      <th>Phone<i class="fas fa-arrow-down" onclick="sortByPhone()"></i></th>
      <th>City<i class="fas fa-arrow-down" onclick="sortByCity()"></i></th>
      <th>Country<i class="fas fa-arrow-down" onclick="sortByCountry()"></i></th>
      <th>Action</th>
    </tr>
  </table>`;

  userData.forEach(current => {
    const row = `
        <tr>
            <td>${current["#"]}</td>
            <td>${current.Name}</td>
            <td>${current.Email}</td>
            <td>${current.Phone}</td>
            <td>${current.Address}</td>
            <td>${current.Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
    userListTable.innerHTML += row;
  });
}
// END - Sort filters

// Update user
const updateUserContainer = document.getElementById("updateUserContainer");
const updateUserForm = document.getElementById("updateUser");
const updateName = document.getElementById("updatename");
const updateEmail = document.getElementById("updateemail");
const updatePhone = document.getElementById("updatephone");
const updateAddress = document.getElementById("updateaddress");
const updateCountry = document.getElementById("updatecountry");
function editUser(e) {
    let values = e.parentNode.children;
    updateName.value = values[1].innerText;
    updateEmail.value = values[2].innerText;
    updatePhone.value = values[3].innerText;
    updateAddress.value = values[4].innerText;
    updateCountry.value = values[5].innerText;
    updateUserContainer.style.display = "block";
}

function closeUpdateUser() {
    updateUserContainer.style.display = "none";
}

updateUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e.target.children[3].children[1].value);
    await fetch(`https://api.airtable.com/v0/appxzAIWceo3zsq84/Table%201/${userID.get(e.target.children[2].children[1].value)}`, {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer keyTnehojflD4HoP2",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "fields": {
                "Name": `${updateName.value}`,
                "Email": `${updateEmail.value}`,
                "Phone": `${updatePhone.value}`,
                "Address": `${updateAddress.value}`,
                "Country": `${updateCountry.value}`
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        updateUserContainer.style.display = "none";
        location.reload();
    })
    .catch(error => console.log(error))
});
// END - Update user

// Search filter for country
const searchCountryInput = document.getElementById("searchCountry");
searchCountryInput.addEventListener("input", () => {
    const rows = document.getElementsByTagName("tr");
    let i;
    for(i = 1; i < rows.length; i++) {
        if(rows[i].children[5].innerText.toString().toLowerCase() === searchCountryInput.value.toString().toLowerCase()) {
            rows[i].style.display = "";
        } else {
           rows[i].style.display = "none";
        }
    }
    if(searchCountryInput.value === "") {
        for(i = 1; i < rows.length; i++) {
            rows[i].style.display = "";
        }
    }
});
// END - Search filter for country

