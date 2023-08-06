let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Ferdi Tayfur",
        "answer_2": "Michael Jackson",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Otto Rehagel",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "reate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1
    },
    {
        "question": "Welches Attribuut kann man NICHT für Textarea verwenden?",
        "answer_1": "redonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    }
];


let righQuestions = 0;          // Variable für die richtigen Antworten

let currentQuestion = 0;        // Varible für die Fragen aufzustellen

let AUDIO_SUCCESS = new Audio('audio/win.mp3');         //  Variable für Audio definieren
let AUDIO_FAIL = new Audio('audio/lose.mp3');


function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;       // Anzeige bei welcher Frage man ist

    showQuestion();
}



function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {        // Frage anzeigen
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;           // wenn die Zahl der Anzahl der Fragen erreicht wird, soll es nicht mehr weiter gehen
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;       // berechnen des Prozensatzes
    percent = Math.round(percent * 100);        // Aufrunden auf zwei Stellen des Ergebnisses 

    document.getElementById('progress-bar').innerHTML = `${percent} %`;     // Einfügen in die Spalte      (Progress-Bar)
    document.getElementById('progress-bar').style = `width: ${percent}%;`;      // um den blauen Balken auch prozentual zu vergrößern
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];          // mit dieser Variable holen wir uns aus dem Json das erste Arry raus

    document.getElementById('question-number').innerHTML = currentQuestion + 1;         // Anzeige bei welcher Frage man sich befindet
    document.getElementById('questionText').innerHTML = question['question'];       // Frage in die Karte einfügen
    document.getElementById('answer_1').innerHTML = question['answer_1'];           // Antworten einfügen 
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function showEndScreen() {
    document.getElementById('end-screen').style = '';       // wenn das Quiz beendet ist, soll das erscheinen  (img-Fragezeichen)
    document.getElementById('question-body').style = 'display: none';       // solange das Quiz weiter geht   (img-Trophey)

    document.getElementById('amount-of-puestions').innerHTML = questions.length;        // untere Leiste, Anzahl der Fragen
    document.getElementById('amount_of-right-questions').innerHTML = righQuestions;         // Anzahl der richtigen Antworten
    document.getElementById('header-image').src = 'img/trophy.png';         // zum Ende das img ersetzten mit der Trophey

}



function answer(selection) {
    let question = questions[currentQuestion];          // mit dieser Variable holen wir uns aus dem Json das erste Arry raus
    let selectedQuestionNumber = selection.slice(-1);       // mit slice(-1) kann man auf das letzte Zeichen der Variable zugreifen z.B. 'answer_1' auf die '1'
    let idOfRightAnswer = `answer_${question['right_answer']}`;         // diese Variable ist dafür da, dass bei einer Auswahl von Antwort das Feld die entsprechende Farbe bekommt     

    if (selectedQuestionNumber == question['right_answer']) {       // Frage wurde richtig beantwortet
        document.getElementById(selection).parentNode.classList.add('bg-success');         //mit parentNode können wir der übergeordneten class eine Eigenschaft zufügen

        AUDIO_SUCCESS.play();
        righQuestions++;             // die richtigen Antworten werden zusammengezählt und zum Schluss angezeigt

    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');           // bei falscher Antwort wird farbig angezeigt
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');           // bei richtiger Antwort wird farbig angezeigt

        AUDIO_FAIL.play();
    }

    document.getElementById('next-question').disabled = false;          // um den button "Nächste Frage" aktiv zu machen
}



function nextQuestion() {
    currentQuestion++;      // Varable von 0 auf 1 setzen
    document.getElementById('next-question').disabled = true;       // um den button "Nächste Frage" passiv zu machen

    resetAnswerButton()
    showQuestion();        // nächste Frage anzeigen
}



function resetAnswerButton() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');      // um die Farbmarkierung zu entfernen
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}


function restartGame() {            //      erneut Start button
    document.getElementById('header-image').src = 'img/question-mark.png';         // bei erneutem Start, das img zum ursprünglichen img wechseln
    document.getElementById('question-body').style = '';       //      qustionBody wieder anzeigen
    document.getElementById('end-screen').style = 'display: none';       //      Endscreen ausblenden

    righQuestions = 0;              //      Zähler auf null setzen
    currentQuestion = 0;            //      Zähler auf null setzen
    init();
}