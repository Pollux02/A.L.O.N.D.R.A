import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { sendEmailVerification, getAuth, signInWithPopup, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,  
    onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';


const firebaseConfig = {
  apiKey: "AIzaSyCoYZfbPT3XZusFF-0lFSJUML3hZGrjjiU",
  authDomain: "alondra-9034b.firebaseapp.com",
  projectId: "alondra-9034b",
  storageBucket: "alondra-9034b.appspot.com",
  messagingSenderId: "263742125078",
  appId: "1:263742125078:web:4b5575d3feaa8f712cf137"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

login.addEventListener('click', (e) => {
    var email = document.getElementById("emaillog").value;
    var password = document.getElementById("passwordlog").value;

    //auth.signOut();

    signInWithEmailAndPassword(auth, email, password).then(cred =>{
        console.log(cred.user);
    }).catch(error => {
        const errorCode = error.code;
        console.log(errorCode)

        if(errorCode == 'auth/user-disabled')
            alert('el usuario ha sido deshabilitado');
        else if(errorCode == 'auth/invalid-email')
            alert('El correo no es válido')
        else if(errorCode == 'auth/invalid-credential')
            alert('Credenciales inválidas')
        else if(errorCode == 'auth/wrong-password')
            alert('Contraseña incorrecta');
        else if(errorCode == 'auth/user-not-found')
            alert('El usuario no existe');
    });
});

auth.onAuthStateChanged(user => {
    if(user){
        console.log("Usuario Activo");
        var email = user.emailVerified;
        if(email){
            window.location.href = 'main.html'
            auth.signOut();
        }
        else{
            auth.signOut();
        }
    }else{
        console.log("Usuario inactivo");
    }
})