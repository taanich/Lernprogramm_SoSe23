// AJAX-Anfrage senden
$.ajax({
    url: 'dein_server_endpoint',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
        // Antwort erfolgreich empfangen
        if (response.id >= 2 && response.id <= 33) {
            // Überprüfen, ob die Antwort korrekt ist
            var userAnswer = prompt(response.text);
            if (userAnswer === response.options[0]) {
                alert('Richtig!');
            } else {
                alert('Falsch!');
            }
        }
    },
    error: function(xhr, status, error) {
        // Fehler beim Empfangen der Antwort
        console.error('Fehler beim Laden der Aufgabe:', error);
    }
});
