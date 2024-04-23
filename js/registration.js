
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

const btnRegister = document.getElementById('registro');


btnRegister.addEventListener('click', () => {
    var email = document.getElementById('emailreg').value;
    var password = document.getElementById('passwordreg').value;

    createUserWithEmailAndPassword(auth, email, password).then(cred =>{
        alert("Usuario creado");
        sendEmailVerification(auth.currentUser).then(() => {
            alert("Se ha enviado un correo electrónico");
        });
    }).catch(error => {
        console.log(error.code)
        const errorCode = error.code;

        if(errorCode == 'auth/email-already-in-use')
            alert('El correo ya está en uso');
        else if(errorCode == 'auth/invalid-email')
            alert('El correo no es válido');
        else if(errorCode == 'auth/missing-password')
            alert('No se ingresó una contraseña');
        else if(errorCode == 'auth/weak-password')
            alert('La contraseña debe tener al menos 6 caracteres');
    });
});