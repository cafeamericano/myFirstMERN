//#######################################################################################
//###############################               #########################################
//###############################    GLOBAL     #########################################
//###############################               #########################################
//#######################################################################################

//FIREBASE SETUP#########################################################################
//#######################################################################################

var firebaseConfig = {
    apiKey: "AIzaSyCkY8pddUjBGX2SXVX3MHzQLSdlGGlGXyU",
    authDomain: "tasksreact-c0577.firebaseapp.com",
    databaseURL: "https://tasksreact-c0577.firebaseio.com",
    projectId: "tasksreact-c0577",
    storageBucket: "",
    messagingSenderId: "252159934850",
    appId: "1:252159934850:web:310cffee5aa9f64d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser)
        sessionStorage.setItem("mernTasksUserID", firebaseUser.uid);
        sessionStorage.setItem("mernTasksUserEmail", firebaseUser.email);
    } else {
        console.log('not logged in')
        sessionStorage.clear()
    }
})

//EVENT LISTENERS########################################################################
//#######################################################################################



//#######################################################################################
//###############################               #########################################
//############################### PAGE SPECIFIC #########################################
//###############################               #########################################
//#######################################################################################


//VARIABLES##############################################################################
//#######################################################################################

const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const loginButton = document.getElementById('loginButton')
const signUpButton = document.getElementById('signUpButton')

//EVENT LISTENERS########################################################################
//#######################################################################################

//Login
$(document).on('submit', '#loginForm', function () {
    event.preventDefault()
    const email = inputEmail.value;
    const pass = inputPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function (error) {
        console.log(error.message)
    });
})

//Sign up
signUpButton.addEventListener('click', e => {
    alert('making a new account')
    const email = inputEmail.value;
    const pass = inputPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
        .then(user => console.log(user))
        .catch(e => console.log(e.message));
})