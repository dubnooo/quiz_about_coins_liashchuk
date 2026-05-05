document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ (Масив об'єктів)
    const questions = [
       
        
        
        {
            question: "З якою датою були випущені перші монети?",
            answers: ["1994", "2000", "1991", "1992"],
            correct: 3
        },
        
        {
            question: "Як називали перші дрібні монети України?",
            answers: ["Монети", "Копійки", "Шаги", "Металики"],
            correct: 2
        },
        
        {
            question: "В якому місті був верстато-будівний завод, де випускалися перші монети?",
            answers: ["Рівне", "Київ", "Черкаси", "Луганськ"],
            correct: 3
        },
        
          {   
            question: "З чого була виготовлена перша монета номіналом 1 гривня?",
            answers: ["Алюміній-бронза", "Латунь", "Олово-латунь", "Нержавіюча сталь"],
            correct: 2
        },
        
        {
        
            question: "Скільки колекційних монет випустила Україна?",
            answers: ["~1000", "~100", "~250", "~2000"],
            correct: 0
        },
        
        {
            
            question: "Скільки важить найважча монета?",
            answers: ["250 г", "1000 г", "500 г", "2500 г"],
            correct: 1
        },
            
      
            
        {  
            question: "Як називався перший чекан пробних монет?",
            answers: ["Італійський", "Український", "Англійський", "Польський"],
            correct: 2
        },
            
         {  
            question: "Яку назву мала дрібна монета часів Київської Русі?",
            answers: ["Куна", "Гривня", "Карбованець", "Злотий"],
            correct: 0
        },

        {  
            question: "Слово “гривня” спочатку означало прикрасу, яку носили на шиї.",
            answers: ["Правда", "Неправда"],
            correct: 0
        },
        
        {  
            question: "У 1990-х роках в Україні використовувався карбованець перед введенням гривні.",
            answers: ["Правда", "Неправда"],
            correct: 0
        },
        
        {  
            question: "Монети номіналом 25 копійок досі перебувають в обігу.",
            answers: ["Правда", "Неправда"],
            correct: 1
        },
        
        {  
            question: "Існували пробні монети номіналом 20 копійок",
            answers: ["Правда", "Неправда"],
            correct: 0
        },
        
        {  
            question: "Перші сучасні українські монети були викарбувані ще до офіційного введення гривні.",
            answers: ["Правда", "Неправда"],
            correct: 0
        },
        
        {  
            question: "Усі українські монети мають однаковий дизайн з моменту їх введення.",
            answers: ["Правда", "Неправда"],
            correct: 1
        }
        ]
       // Створення елементів
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');

    let questionIndex = 0;
    let score = 0;
    let timer = 15; // Таймер на 15 секунд
    const timerDisplay = document.querySelector('#timer');
    const scoreL = document.querySelector('#score-display');
    
    let interval; // Змінна для зберігання інтервалу

    // Функція для відображення запитання
    function showQuestion(question) {

        clearInterval(interval); // Скидаємо таймер
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);

        }
    }
    showQuestion(questions[questionIndex]);
    // Завдання 5 - Функція для переходу до наступного запитання
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }
    // Завдання 4 - Перевірка відповіді
    function checkAnswer(button, i) {
        if (i == questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        // Відключення кнопок після вибору відповіді
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        })
        // Таймер на 1 секунду
        setTimeout(nextQuestion, 1000);
    }


    // Завдання 7 - Відображення результату і статистики
    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        const finalScore = document.querySelector('#final-score');
        finalScore.innerText = score;
    }
    // Завдання 3 - Керування екранами (JS)
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);


    // Завдання 6 - Таймер
    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        scoreL.innerText = `Бали: ${score}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    restartBtn.addEventListener('click', () => {
        startGame();
        resultScreen.classList.add('hide');
    });

});

