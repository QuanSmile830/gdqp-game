// Lấy các phần tử HTML
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');

const questionCounterElement = document.getElementById('question-counter');
const scoreDisplayElement = document.getElementById('score-display');
const finalScoreElement = document.getElementById('final-score');

// === NỘI DUNG CÂU HỎI TỪ FILE CỦA BẠN ===
const questions = [
    {
        question: "Đảo Phú Qúy thuộc địa phận tỉnh thành nào của nước ta?",
        options: ["Khánh Hòa", "Kiên Giang", "Bình Thuận", "Ninh Thuận"],
        answer: "Bình Thuận"
    },
    {
        question: "Đảo Phú Quốc thuộc địa phận tỉnh thành nào của nước ta?",
        options: ["An Giang", "Kiên Giang", "Cà Mau", "Bà Rịa – Vũng tàu"],
        answer: "Kiên Giang"
    },
    {
        question: "Vịnh Hạ Long thuộc quản lý của tỉnh, thành phố nào của nước ta?",
        options: ["Bắc Ninh", "Quảng Ninh", "Hải Phòng", "Thái Bình"],
        answer: "Quảng Ninh"
    },
    {
        question: "Tỉnh nào sau đây không giáp biển?",
        options: ["Tây Ninh", "Đà Nẵng", "Thái Bình", "Kiên Giang"],
        answer: "Tây Ninh"
    },
    {
        question: "Vịnh nào ở nước ta có nhiều đảo nhỏ nhất?",
        options: ["Vịnh Lăng Cô", "Vịnh Hạ Long", "Vịnh Cam Ranh", "Vịnh Bắc Bộ"],
        answer: "Vịnh Hạ Long"
    },
    {
        question: "Nước ta có bao nhiêu tỉnh, thành phố tiếp giáp với biển?",
        options: ["26 tỉnh, thành phố", "27 tỉnh, thành phố", "28 tỉnh, thành phố", "29 tỉnh, thành phố"],
        answer: "28 tỉnh, thành phố"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Gắn sự kiện cho các nút
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    quizScreen.classList.add('active');
    nextBtn.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;
    questionCounterElement.innerText = `Câu ${currentQuestionIndex + 1}/${questions.length}`;
    scoreDisplayElement.innerText = `Điểm: ${score}`;

    // Tạo các nút đáp án
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, option));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    optionsContainer.innerHTML = '';
    feedbackElement.innerText = '';
    nextBtn.classList.add('hide');
}

function selectAnswer(selectedButton, selectedOption) {
    // Vô hiệu hóa tất cả các nút sau khi chọn
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });

    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        selectedButton.classList.add('correct');
        feedbackElement.innerText = "Chính xác!";
        feedbackElement.style.color = 'var(--correct)';
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        feedbackElement.innerText = "Sai rồi!";
        feedbackElement.style.color = 'var(--incorrect)';
        // Tô sáng đáp án đúng
        Array.from(optionsContainer.children).forEach(button => {
            if (button.innerText === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }

    // Hiện nút "Câu tiếp theo"
    nextBtn.classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    quizScreen.classList.remove('active');
    endScreen.classList.add('active');
    finalScoreElement.innerText = `Bạn đạt: ${score}/${questions.length}`;
}

function restartGame() {
    startGame();
}