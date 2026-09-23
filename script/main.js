window.addEventListener('load', () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.remove('opacity-0');
    } else {
        console.error("Errore: Elemento con id 'main-content' non trovato!");
    }
});