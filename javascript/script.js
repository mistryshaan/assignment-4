const homeContainer = document.getElementById("home");
const userList = document.getElementById("userList");
const userListTableContainer = document.getElementById("userListTable");
const userListTable = document.getElementsByTagName("table")[0];
const message = document.getElementById("message");
const loginMessage = document.getElementById("loginMessage");

// Check for page refresh for session management
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    if(JSON.parse(localStorage.getItem("admin")) !== null) {
        const {username, email, status} = JSON.parse(localStorage.getItem("admin"))[0];
        if(status === "true") {
            homeContainer.style.display = "none";
            document.getElementById("userName").innerText = username;
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
const signupForm = document.getElementById("signup");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const country = document.getElementById("country");

function openSignup() {
    signupContainer.style.display = "block";
    homeContainer.style.display = "none";
}

function closeSignup() {
    signupContainer.style.display = "none";
    homeContainer.style.display = "flex";
    username.nextElementSibling.style.visibility = "hidden";
    email.nextElementSibling.style.visibility = "hidden";
    password.nextElementSibling.style.visibility = "hidden";
    phone.nextElementSibling.style.visibility = "hidden";
    address.nextElementSibling.style.visibility = "hidden";
    country.nextElementSibling.style.visibility = "hidden";
    username.style.borderColor = "#40189d";
    email.style.borderColor = "#40189d";
    password.style.borderColor = "#40189d";
    phone.style.borderColor = "#40189d";
    address.style.borderColor = "#40189d";
    country.style.borderColor = "#40189d";

}

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(username.value === "" && email.value === "" && password.value === "" && phone.value === "" && address.value === "" && country.value === "") {
        username.nextElementSibling.style.visibility = "visible";
        email.nextElementSibling.style.visibility = "visible";
        password.nextElementSibling.style.visibility = "visible";
        phone.nextElementSibling.style.visibility = "visible";
        address.nextElementSibling.style.visibility = "visible";
        country.nextElementSibling.style.visibility = "visible";
    }

    if(username.value === "") {
        username.style.borderColor = "red";
        username.nextElementSibling.style.visibility = "visible";
    } else {
        username.style.borderColor = "#40189d";
        username.nextElementSibling.style.visibility = "hidden";
    }

    if(email.value === "") {
        email.style.borderColor = "red";
        email.nextElementSibling.style.visibility = "visible";
    } else {
        email.style.borderColor = "#40189d"
        email.nextElementSibling.style.visibility = "hidden";
    }

    if(password.value === "") {
        password.style.borderColor = "red";
        password.nextElementSibling.style.visibility = "visible";
    } else {
        password.style.borderColor = "#40189d"
        password.nextElementSibling.style.visibility = "hidden";
    }

    if(phone.value === "") {
        phone.style.borderColor = "red";
        phone.nextElementSibling.style.visibility = "visible";
    } else {
        phone.style.borderColor = "#40189d"
        phone.nextElementSibling.style.visibility = "hidden";
    }

    if(address.value === "") {
        address.style.borderColor = "red";
        address.nextElementSibling.style.visibility = "visible";
    } else {
        address.style.borderColor = "#40189d"
        address.nextElementSibling.style.visibility = "hidden";
    }

    if(country.value === "") {
        country.style.borderColor = "red";
        country.nextElementSibling.style.visibility = "visible";
    } else {
        country.style.borderColor = "#40189d"
        country.nextElementSibling.style.visibility = "hidden";
    }

    if(username.value !== "" && email.value !== "" && password.value !== "" && phone.value !== "" && address.value !== "" && country.value !== "") {
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
    
        document.getElementById("userName").innerText = username.value;
    
        username.value = "";
        email.value = "";
        password.value = "";
        phone.value = "";
        address.value = "";
        country.value = "";
    
        userList.style.display = "flex";
        signupContainer.style.display = "none"
    }
});
// END - Sign Up

// Login
const loginContainer = document.getElementById("loginContainer");
const loginForm = document.getElementById("login");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const addUserContainer = document.getElementById("addUserContainer");

function openLogin() {
    loginContainer.style.display = "block";
    homeContainer.style.display = "none";
}

function closeLogin() {
    loginContainer.style.display = "none";
    homeContainer.style.display = "flex";
    loginEmail.value = "";
    loginPassword.value = "";
    loginEmail.nextElementSibling.style.visibility = "hidden";
    loginPassword.nextElementSibling.style.visibility = "hidden";
    loginEmail.style.borderColor = "#40189d";
    loginPassword.style.borderColor = "#40189d";
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(loginEmail.value === "" && loginPassword.value === "") {
        loginEmail.nextElementSibling.style.visibility = "visible";
        loginPassword.nextElementSibling.style.visibility = "visible";
    }

    if(loginEmail.value === "") {
        loginEmail.style.borderColor = "red";
        loginEmail.nextElementSibling.style.visibility = "visible";
    } else {
        loginEmail.style.borderColor = "#40189d";
        loginEmail.nextElementSibling.style.visibility = "hidden";
    }

    if(loginPassword.value === "") {
        loginPassword.style.borderColor = "red";
        loginPassword.nextElementSibling.style.visibility = "visible";
    } else {
        loginPassword.style.borderColor = "#40189d";
        loginPassword.nextElementSibling.style.visibility = "hidden";
    }

    if(loginEmail.value !== "" && loginPassword.value !== "") {
        const adminList = JSON.parse(localStorage.getItem("admin"));
        if(adminList === null) {
            loginMessage.style.visibility = "visible";
            loginMessage.innerText = "Please signup first.";
            setTimeout(() => loginMessage.style.visibility = "hidden", 2000);
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
                loginMessage.style.visibility = "visible";
                loginMessage.innerText = "Invalid login credentials. Try again";
                setTimeout(() => loginMessage.style.visibility = "hidden", 2000);
            }
        }
    }
});
// END - Login

// Fetch users from Airtable API
const userData = [];
const userID = new Map();
let numberOfPage;
let recordPerPage = 3;
let currentPage = 1;

async function getUsers() {
    document.getElementById("loader").style.display = "block"
    await fetch(`https://api.airtable.com/v0/appxzAIWceo3zsq84/Table%201?&view=Grid%20view`, {headers: {"Authorization": "Bearer keyTnehojflD4HoP2"}})
    .then(response => response.json())
    .then(data => {
        data.records.forEach((record) => {
            userData.push(record.fields);
            userID.set(record.fields.Email, record.id);
        });
        numberOfPage = Math.ceil(userData.length / 3);
    });

    if(userData !== null) {
        document.getElementById("loader").style.display = "none";
        userListTable.style.display = "";
        document.getElementById("pagination").style.display = "flex";
    }

    userListTable.innerHTML = 
    `<tr>
        <th>#<i class="fas fa-arrow-down" onclick="removeSortID()"></i></th>
        <th>Profile Image</th>
        <th>Name<i class="fas fa-arrow-down" onclick="sortUp('Name')"></i></th>
        <th>Email<i class="fas fa-arrow-down" onclick="sortUp('Email')"></i></th>
        <th>Phone<i class="fas fa-arrow-down" onclick="sortUp('Phone')"></i></th>
        <th>City<i class="fas fa-arrow-down" onclick="sortUp('Address')"></i></th>
        <th>Country<i class="fas fa-arrow-down" onclick="sortUp('Country')"></i></th>
        <th>Action</th>
    </tr>`;

    for(let i = 0; i < 3; i++) {
    const row = `
        <tr>
            <td>${userData[i]["#"]}</td>   
            <td><img src="${userData[i].Image[0].url}"/></td>   
            <td>${userData[i].Name}</td>
            <td>${userData[i].Email}</td>
            <td>${userData[i].Phone}</td>
            <td>${userData[i].Address}</td>
            <td>${userData[i].Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
        userListTable.innerHTML += row;
    }
    document.getElementById("previousPageButton").style.opacity = "0.7";
    document.getElementById("previousPageButton").disabled = true;
}
// END - Fetch users from Airtable API
function nextPage() {
    if(currentPage < numberOfPage) {
        document.getElementById("nextPageButton").style.opacity = "1";
        document.getElementById("nextPageButton").disabled = false;
        document.getElementById("previousPageButton").style.opacity = "1";
        document.getElementById("previousPageButton").disabled = false;
        currentPage++;
        userListTable.innerHTML = 
            `<table>
                <tr>
                    <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
                    <th>Profile Image</th>
                    <th>Name<i class="fas fa-arrow-down" onclick="sortUp('Name')"></i></th>
                    <th>Email<i class="fas fa-arrow-down" onclick="sortUp('Email')"></i></th>
                    <th>Phone<i class="fas fa-arrow-down" onclick="sortUp('Phone')"></i></th>
                    <th>City<i class="fas fa-arrow-down" onclick="sortUp('Address')"></i></th>
                    <th>Country<i class="fas fa-arrow-down" onclick="sortUp('Country')"></i></th>
                    <th>Action</th>
                </tr>
            </table>`
        ;

        for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
            if(i === userData.length) {
                break;
            } else {
                const row = `
                    <tr>
                        <td>${userData[i]["#"]}</td>
                        <td><img src="${userData[i].Image[0].url}"/></td>
                        <td>${userData[i].Name}</td>
                        <td>${userData[i].Email}</td>
                        <td>${userData[i].Phone}</td>
                        <td>${userData[i].Address}</td>
                        <td>${userData[i].Country}</td>
                        <td onclick="editUser(this)" class="edit">Edit</td>
                    </tr>
                `;
                userListTable.innerHTML += row;
            }
        }

        
        if(currentPage == numberOfPage) {
            document.getElementById("nextPageButton").style.opacity = "0.7";
            document.getElementById("nextPageButton").disabled = true;
        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

function previousPage() {
    if(currentPage > 1) {
        document.getElementById("previousPageButton").style.opacity = "1";
        document.getElementById("previousPageButton").disabled = false;
        document.getElementById("nextPageButton").style.opacity = "1";
        document.getElementById("nextPageButton").disabled = false;
        currentPage--;
        userListTable.innerHTML = 
            `<table>
                <tr>
                    <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
                    <th>Profile Image</th>
                    <th>Name<i class="fas fa-arrow-down" onclick="sortUp('Name')"></i></th>
                    <th>Email<i class="fas fa-arrow-down" onclick="sortUp('Email')"></i></th>
                    <th>Phone<i class="fas fa-arrow-down" onclick="sortUp('Phone')"></i></th>
                    <th>City<i class="fas fa-arrow-down" onclick="sortUp('Address')"></i></th>
                    <th>Country<i class="fas fa-arrow-down" onclick="sortUp('Country')"></i></th>
                    <th>Action</th>
                </tr>
            </table>`;

        for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
            const row = `
            <tr>
                <td>${userData[i]["#"]}</td>
                <td><img src="${userData[i].Image[0].url}"/></td>
                <td>${userData[i].Name}</td>
                <td>${userData[i].Email}</td>
                <td>${userData[i].Phone}</td>
                <td>${userData[i].Address}</td>
                <td>${userData[i].Country}</td>
                <td onclick="editUser(this)" class="edit">Edit</td>
            </tr>
            `;
            userListTable.innerHTML += row;
        }

        if(currentPage === 1) {
            document.getElementById("previousPageButton").style.opacity = "0.7";
            document.getElementById("previousPageButton").disabled = true;
        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

// Add user
const addUserForm = document.getElementById("addUser");
const addName = document.getElementById("addname");
const addEmail = document.getElementById("addemail");
const addPhone = document.getElementById("addphone");
const addAddress = document.getElementById("addaddress");
const addCountry = document.getElementById("addcountry");
const addImage = document.getElementById("addimage");

function openaddUser() {
    addUserContainer.style.display = "block";
}

function closeAddUser() {
    addUserContainer.style.display = "none";
    addName.value = "";
    addEmail.value = "";
    addPhone.value = "";
    addAddress.value = "";
    addCountry.value = "";
    userList.style.display = "flex";

    addName.nextElementSibling.style.visibility = "hidden";
    addEmail.nextElementSibling.style.visibility = "hidden";
    addPhone.nextElementSibling.style.visibility = "hidden";
    addAddress.nextElementSibling.style.visibility = "hidden";
    addCountry.nextElementSibling.style.visibility = "hidden";
    addImage.nextElementSibling.style.visibility = "hidden";
    addName.style.borderColor = "#40189d";
    addEmail.style.borderColor = "#40189d";
    addPhone.style.borderColor = "#40189d";
    addAddress.style.borderColor = "#40189d";
    addCountry.style.borderColor = "#40189d";
    addImage.style.borderColor = "#40189d";
}

addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if(addEmail.value === "" && addName.value === "" && addPhone.value === "" && addAddress.value === "" && addCountry.value === "" && addImage.value === "") {
        addName.nextElementSibling.style.visibility = "visible";
        addEmail.nextElementSibling.style.visibility = "visible";
        addPhone.nextElementSibling.style.visibility = "visible";
        addAddress.nextElementSibling.style.visibility = "visible";
        addCountry.nextElementSibling.style.visibility = "visible";
        addImage.nextElementSibling.style.visibility = "visible";
    }

    if(addName.value === "") {
        addName.nextElementSibling.style.visibility = "visible";
        addName.style.borderColor = "red";
    } else {
        addName.nextElementSibling.style.visibility = "hidden";
        addName.style.borderColor = "#40189d";
    }

    if(addEmail.value === "") {
        addEmail.nextElementSibling.style.visibility = "visible";
        addEmail.style.borderColor = "red";
    } else {
        addEmail.nextElementSibling.style.visibility = "hidden";
        addEmail.style.borderColor = "#40189d";
    }

    if(addPhone.value === "") {
        addPhone.nextElementSibling.style.visibility = "visible";
        addPhone.style.borderColor = "red";
    } else {
        addPhone.nextElementSibling.style.visibility = "hidden";
        addPhone.style.borderColor = "#40189d";
    }

    if(addAddress.value === "") {
        addAddress.nextElementSibling.style.visibility = "visible";
        addAddress.style.borderColor = "red";
    } else {
        addAddress.nextElementSibling.style.visibility = "hidden";
        addAddress.style.borderColor = "#40189d";
    }

    if(addCountry.value === "") {
        addCountry.nextElementSibling.style.visibility = "visible";
        addCountry.style.borderColor = "red";
    } else {
        addCountry.nextElementSibling.style.visibility = "hidden";
        addCountry.style.borderColor = "#40189d";
    }

    if(addImage.value === "") {
        addImage.nextElementSibling.style.visibility = "visible";
        addImage.style.borderColor = "red";
    } else {
        addImage.nextElementSibling.style.visibility = "hidden";
        addImage.style.borderColor = "#40189d";
    }

    if(addEmail.value !== "" && addName.value !== "" && addPhone.value !== "" && addAddress.value !== "" && addCountry.value !== "" && addImage.value !== "") {
        const emailList = userData.map(element => element.Email);
        if(emailList.includes(addEmail.value)) {
            message.style.display = "block";
            message.innerHTML = "User alredy exists";
            setTimeout(() => message.style.display = "none", 2000);
        } else {
            message.style.display = "none";
            let storeImage =  await fetch("https://www.filestackapi.com/api/store/S3?key=AEKNiDPBQYe9I6feOVqkAz", {
                method: "POST",
                body:  document.getElementById("addimage").files[0],
                headers: {
                    "Content-Type": "image/png"
                }
            })
            .then(response => response.json())
            let url = await storeImage.url;
    
            await fetch(`https://api.airtable.com/v0/appxzAIWceo3zsq84/Table%201`, {
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
                        "Country": `${addCountry.value}`,
                        "Image": [{
                            "url": `${url}`
                        }]
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
            <th>#<i class="fas fa-arrow-down" onclick="removeSortID()"></i></th>
            <th>Profile Image</th>
            <th>Name<i class="fas fa-arrow-down" onclick="sortDown('Name')"></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick="sortDown('Email')"></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick="sortDown('Phone')"></i></th>
            <th>City<i class="fas fa-arrow-down" onclick="sortDown('Address')"></i></th>
            <th>Country<i class="fas fa-arrow-down" onclick="sortDown('Country')"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

    for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
        const row = `
        <tr>
            <td>${userData[i]["#"]}</td>
            <td><img src="${userData[i].Image[0].url}"/></td>
            <td>${userData[i].Name}</td>
            <td>${userData[i].Email}</td>
            <td>${userData[i].Phone}</td>
            <td>${userData[i].Address}</td>
            <td>${userData[i].Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
        userListTable.innerHTML += row;
    }
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
            <th>Profile Image</th>
            <th>Name<i class="fas fa-arrow-down" onclick="sortDown('Name')"></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick="sortDown('Email')"></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick="sortDown('Phone')"></i></th>
            <th>City<i class="fas fa-arrow-down" onclick="sortDown('Address')"></i></th>
            <th>Country<i class="fas fa-arrow-down" onclick="sortDown('Country')"></i></th>
            <th>Action</th>
        </tr>
    </table>`;

    for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
        const row = `
        <tr>
            <td>${userData[i]["#"]}</td>
            <td><img src="${userData[i].Image[0].url}"/></td>
            <td>${userData[i].Name}</td>
            <td>${userData[i].Email}</td>
            <td>${userData[i].Phone}</td>
            <td>${userData[i].Address}</td>
            <td>${userData[i].Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
        userListTable.innerHTML += row;
    }
    
}

function sortUp(field) {
    userData.sort((a, b) => {
        let x = a[field].toLowerCase();
        let y = b[field].toLowerCase();

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    userListTable.innerHTML = 
    `<table>
        <tr>
            <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
            <th>Profile Image</th>
            <th>Name<i class="fas fa-arrow-down" onclick=${field == 'Name' ? "sortDown('Name')" : "sortUp('Name')"}></i></th>
            <th>Email<i class="fas fa-arrow-down" onclick=${field == 'Email' ? "sortDown('Email')" : "sortUp('Email')"}></i></th>
            <th>Phone<i class="fas fa-arrow-down" onclick=${field == 'Phone' ? "sortDown('Phone')" : "sortUp('Phone')"}></i></th>
            <th>City<i class="fas fa-arrow-down" onclick=${field == 'Address' ? "sortDown('Address')" : "sortUp('Address')"}></i></th>
            <th>Country<i class="fas fa-arrow-down" onclick=${field == 'Country' ? "sortDown('Country')" : "sortUp('Country')"}></i></th>
            <th>Action</th>
        </tr>
    </table>`;

    for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
        const row = `
        <tr>
            <td>${userData[i]["#"]}</td>
            <td><img src="${userData[i].Image[0].url}"/></td>
            <td>${userData[i].Name}</td>
            <td>${userData[i].Email}</td>
            <td>${userData[i].Phone}</td>
            <td>${userData[i].Address}</td>
            <td>${userData[i].Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
        userListTable.innerHTML += row;
    }

}

function sortDown(field) {
    userData.sort((a, b) => {
        let x = a[field].toLowerCase();
        let y = b[field].toLowerCase();

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });
    userListTable.innerHTML = `<table>
    <tr>
      <th>#<i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
      <th>Profile Image</th>
      <th>Name<i class="fas fa-arrow-down" onclick=${field == 'Name' ? "sortUp('Name')" : "sortDown('Name')"}></i></th>
      <th>Email<i class="fas fa-arrow-down" onclick=${field == 'Email' ? "sortUp('Email')" : "sortDown('Email')"}></i></th>
      <th>Phone<i class="fas fa-arrow-down" onclick=${field == 'Phone' ? "sortUp('Phone')" : "sortDown('Phone')"}></i></th>
      <th>City<i class="fas fa-arrow-down" onclick=${field == 'Address' ? "sortUp('Address')" : "sortDown('Address')"}></i></th>
      <th>Country<i class="fas fa-arrow-down" onclick=${field == 'Country' ? "sortUp('Country')" : "sortDown('Country')"}></i></th>
      <th>Action</th>
    </tr>
  </table>`;

    for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
        const row = `
        <tr>
            <td>${userData[i]["#"]}</td>
            <td><img src="${userData[i].Image[0].url}"/></td>
            <td>${userData[i].Name}</td>
            <td>${userData[i].Email}</td>
            <td>${userData[i].Phone}</td>
            <td>${userData[i].Address}</td>
            <td>${userData[i].Country}</td>
            <td onclick="editUser(this)" class="edit">Edit</td>
        </tr>
        `;
        userListTable.innerHTML += row;
    }
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
    updateName.value = values[2].innerText;
    updateEmail.value = values[3].innerText;
    updatePhone.value = values[4].innerText;
    updateAddress.value = values[5].innerText;
    updateCountry.value = values[6].innerText;
    updateUserContainer.style.display = "block";
}

function closeUpdateUser() {
    updateUserContainer.style.display = "none";
}

updateUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.getElementById("updateloader").style.display = "block";
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
        if(data !== null) {
            updateUserContainer.style.display = "none";
            document.getElementById("updateloader").style.display = "none";
            location.reload();
        }
    })
    .catch(error => console.log(error))
});
// END - Update user

// Search filter for country
const searchCountryInput = document.getElementById("searchCountry");
const searchCountry = debounce(() => search());
function debounce(f, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {f.apply(this, args);}, timeout);
    };
}

function search() {
    const rows = document.getElementsByTagName("tr");
    let i;
    for(i = 1; i < rows.length; i++) {
        if(!rows[i].children[6].innerText.toString().toLowerCase().startsWith(searchCountryInput.value.toString().toLowerCase())) {
            rows[i].style.display = "none";  
        }
    }

    if(searchCountryInput.value === "") {
        for(i = 1; i < rows.length; i++) {
            rows[i].style.display = "";
        }
    }
}

searchCountryInput.addEventListener("input", searchCountry);
// END - Search filter for country

const updateAdminFormContainer = document.getElementById("adminFormContainer");
const adminForm = document.getElementById("adminForm");
const adminUpdateName = document.getElementById("adminname");
const adminUpdateEmail = document.getElementById("adminemail");
const adminUpdatePassword = document.getElementById("adminpassword");
const adminUpdatePhone = document.getElementById("adminphone");
const adminUpdateAddress = document.getElementById("adminaddress");
const adminUpdateCountry = document.getElementById("admincountry");

function openUpdateAdmin() {
    updateAdminFormContainer.style.display = "block";
    const adminData = JSON.parse(localStorage.getItem("admin"))[0];
    adminUpdateName.value = adminData.username;
    adminUpdateEmail.value = adminData.email;
    adminUpdatePassword.value = adminData.password;
    adminUpdatePhone.value = adminData.phone;
    adminUpdateAddress.value = adminData.address;
    adminUpdateCountry.value = adminData.country;
}

function closeUpdateAdmin() {
    updateAdminFormContainer.style.display = "none";
}

adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const adminData = {
        username: adminUpdateName.value,
        email: adminUpdateEmail.value,
        password: adminUpdatePassword.value,
        phone: adminUpdatePhone.value,
        address: adminUpdateAddress.value,
        country: adminUpdateCountry.value,
        status: "true"
    }

    localStorage.setItem("admin", JSON.stringify([adminData]));
    location.reload();
})