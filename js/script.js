const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const textArea = document.getElementById('textArea');

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;

btnStart.addEventListener('click', () => {
    recognition.start();
});

btnStop.addEventListener('click', () => {
    recognition.abort();
});

recognition.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript;
    ejecutarFuncion(texto);
    console.log(texto);
}

recognition.onerror = (event) => {
    console.error('Error de reconocimiento de voz:', event.error);
};

function leerTexto(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.volume = 1;
    speech.rate = 1.3;
    speech.pitch = 0.4;
    speech.lang = 'es-ES'

    window.speechSynthesis.speak(speech);
}

function ejecutarFuncion (text) {
    // Separar el texto en palabras
    const palabras = text.split(/\s+/);
    
    // Inicializar una variable para indicar si se encontró alguna palabra
    let palabraEncontrada = false;
    
    // Utilizar un switch para verificar cada palabra
    palabras.forEach(palabra => {
        switch (palabra.toLowerCase()) {
            case "navegador":
                textArea.value = "Abriendo navegador";

                leerTexto("Abriendo navegador");

                palabraEncontrada = true;
                break;
            case "página":
                 // Crear una expresión regular para encontrar la palabra junto con todo lo que la precede
                const regex = new RegExp('.*?' + "página", 'i');
                
                // Reemplazar todo lo que coincide con la expresión regular por una cadena vacía
                resultado = text.replace(regex, '');

                resultado = resultado.replace(/\s+/g, '');
                
                console.log(resultado);

                window.open('http://www.'+resultado);

                textArea.value = "Abriendo la página "+resultado;
                leerTexto("Abriendo la página "+resultado);

                palabraEncontrada = true;
                break;
            default:
                // Si no se encuentra ninguna palabra coincidente, no hacer nada
                break;
        }
    });
    
    // Si no se encontró ninguna palabra coincidente
    if (!palabraEncontrada) {
        console.log("No se encontraron palabras específicas en el texto.");
        textArea.value = "No te entendí pendejo";
        leerTexto("No te entendí pendejo");
    }
}