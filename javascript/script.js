const homeContainer = document.getElementById("home");
const userList = document.getElementById("userList");
const userListTable = document.getElementsByTagName("table")[0];

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    const {email, status, username} = JSON.parse(localStorage.getItem("admin"))[0];
    if(email === "shaan.mistry@marutitech.com" && status === "true") {
        homeContainer.style.display = "none";
        userList.style.display = "flex";
        getUsers();
        document.getElementById("userName").innerText = username;
    } else {
        homeContainer.style.display = "flex";
        userList.style.display = "none";
    }
} 

const loginContainer = document.getElementById("loginContainer");
function openLogin() {
    loginContainer.style.display = "block";
    homeContainer.style.display = "none";
}
function closeLogin() {
    loginContainer.style.display = "none";
    homeContainer.style.display = "flex";
}

const signupContainer = document.getElementById("signupContainer");
function openSignup() {
    signupContainer.style.display = "block";
    homeContainer.style.display = "none";
}
function closeSignup() {
    signupContainer.style.display = "none";
    homeContainer.style.display = "flex";
}

// Sign Up
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
            country: country.value
        }]));
    } else {
        admin.push({
            username: username.value, 
            email: email.value,
            password: password.value,
            phone: phone.value,
            address: address.value,
            country: country.value
        });
        localStorage.setItem("admin", JSON.stringify(admin));
    }
    username.value = "";
    email.value = "";
    password.value = "";
    phone.value = "";
    address.value = "";
    country.value = "";

    userList.style.display = "flex";
    signupContainer.style.display = "none";

});
// END - Sign Up

// Login
const loginForm = document.getElementById("login");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const addUserContainer = document.getElementById("addUserContainer");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const adminList = JSON.parse(localStorage.getItem("admin"));
    const adminEmail = adminList.map(current => current["email"]);
    const adminPassword = adminList.map(current => current["password"]);
    
    if(adminEmail.includes(loginEmail.value) && adminPassword.includes(loginPassword.value)) {
        loginContainer.style.display = "none";
        userList.style.display = "flex";
        document.getElementById("userName").innerText = adminList[0].username;
        adminList[0].status = "true";
        localStorage.setItem("admin", JSON.stringify(adminList));
        getUsers();
    } else {
        alert("Invalid login credentials. Try again.");
    }

    loginEmail.value = "";
    loginPassword.value = "";
});
// END - Login
const userData = [];
async function getUsers() {
    await fetch(`https://api.airtable.com/v0/appxzAIWceo3zsq84/Table%201?maxRecords=10&view=Grid%20view`, {headers: {"Authorization": "Bearer keyTnehojflD4HoP2"}})
    .then(response => response.json())
    .then(data => {
        data.records.forEach((record) => {
            userData.push(record.fields);
            const row = `
            <tr>
                <td>${record.fields["#"]}</td>
                <td>${record.fields.Name}</td>
                <td>${record.fields.Email}</td>
                <td>${record.fields.Phone}</td>
                <td>${record.fields.Address}</td>
                <td>${record.fields.Country}</td>
                <td onclick="editUser('${record.id}', '${record.fields.Name}', '${record.fields.Email}', '${record.fields.Phone}', '${record.fields.Address}', '${record.fields.Country}')" class="edit">Edit</td>
            </tr>
            `;
            userListTable.innerHTML += row;
        });
    });
}

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
let counter = 5;
addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    counter++;
    fetch(`https://api.airtable.com/v0/appxzAIWceo3zsq84/Table%201`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer keyTnehojflD4HoP2",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "fields": {
                "#": `${counter}`,
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
    .catch(err => console.log(err))
});

function home() {
    userList.style.display = "none";
    homeContainer.style.display = "flex";
    userListTable.innerHTML = `<table>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Address</th>
      <th>Country<i class="fas fa-arrow-up" onclick="sortByCountry()"></i></th>
      <th>Action</th>
    </tr>
  </table>`;
  const admin = JSON.parse(localStorage.getItem("admin"))[0];
  admin.status = "false";
  localStorage.setItem("admin", JSON.stringify([admin]));
}

function sortByCountry() {
    userData.sort((a, b) => {
        let x = a.Country.toLowerCase();
        let y = b.Country.toLowerCase();

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = `<table>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Address</th>
      <th>Country<i class="fas fa-arrow-up" onclick="removeSort()"></i></th>
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

function removeSort() {
    userData.sort((a, b) => {
        let x = a.Country.toLowerCase();
        let y = b.Country.toLowerCase();

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });
    userListTable.innerHTML = `<table>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Address</th>
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

const updateUserContainer = document.getElementById("updateUserContainer");
const updateUserForm = document.getElementById("updateUser");
const updateName = document.getElementById("updatename");
const updateEmail = document.getElementById("updateemail");
const updatePhone = document.getElementById("updatephone");
const updateAddress = document.getElementById("updateaddress");
const updateCountry = document.getElementById("updatecountry");
function editUser(id, name, email, phone, address, country) {
    updateName.value = name;
    updateEmail.value = email;
    updatePhone.value = phone;
    updateAddress.value = address;
    updateCountry.value = country;
    updateUserContainer.style.display = "block";

    updateUserForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await fetch(`https://api.airtable.com/v0/appxzAIWceo3zsq84/Table%201/${id}`, {
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
}

function closeUpdateUser() {
    updateUserContainer.style.display = "none";
}
