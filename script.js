document.addEventListener('DOMContentLoaded', () => {
  const musicBtn = document.getElementById('music-toggle');
  const music = document.getElementById('background-music');
  const quizScreen = document.getElementById('quiz-screen');
  const scoreScreen = document.getElementById('score-screen');
  const scoreValue = document.getElementById('score-value');
  const scoreMessage = document.getElementById('score-message');

  if (musicBtn && music) {
    music.volume = 0.8;
    music.loop = true;

    musicBtn.addEventListener('click', () => {
      if (music.paused) {
        music.play();
        musicBtn.textContent = 'Pause Music';
      } else {
        music.pause();
        musicBtn.textContent = 'Play Music';
      }
    });
  }

  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleQuiz = document.getElementById('theme-toggle-quiz');
  const themeToggleScore = document.getElementById('theme-toggle-score');

    // Removed setDarkMode function and isDarkMode variable

  function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    if (themeToggle) {
      themeToggle.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
    if (themeToggleQuiz) {
      themeToggleQuiz.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
    if (themeToggleScore) {
      themeToggleScore.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);
  }
  if (themeToggleQuiz) {
    themeToggleQuiz.addEventListener('click', toggleDarkMode);
  }
  if (themeToggleScore) {
    themeToggleScore.addEventListener('click', toggleDarkMode);
  }
  const startBtn = document.getElementById('start-btn');
  const startScreen = document.getElementById('start-screen');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startScreen.style.display = 'none';
      quizScreen.style.display = 'block';
    });
  }

    // Quiz logic for multiple questions
    const questions = [
      {
        question: "According to India's census 2011, how much is India's sex ratio?",
        options: ["940", "930", "943", "935"],
        answer: 2,
        explanation: "According to India's census 2011, sex ratio of India is 943."
      },
      {
        question: "Which of the following Union Territories has highest sex ratio in India?",
        options: [
          "Daman and Diu",
          "Lakshadweep",
          "Puducherry",
          "Andaman and Nicobar Islands"
        ],
        answer: 2,
        explanation: "The Union Territory of Puducherry has sex ratio of 1037 which is highest among all union territories in India."
      },
      {
        question: "Which state is the lowest sex ratio in India?",
        options: ["Haryana", "Punjab", "Jammu and Kashmir", "Assam"],
        answer: 0,
        explanation: "Haryana has the lowest sex ratio in India i.e.879."
      },
      {
        question: "Which of the following Union Territories has the lowest sex ratio?",
        options: ["Daman and Diu", "Chandigarh", "Dadra and Nagar Haveli", "Andaman and Nicobar Islands"],
        answer: 0,
        explanation: "India Daman and Diu has lowest sex ratio i.e.618."
      },
      {
        question: "Which of the following statements is not correct?",
        options: [
          "Sex ratio of Nagaland and Madhya Pradesh is equal.",
          "Chandigarh's sex ratio is higher than Haryana.",
          "India's sex ratio is 943.",
          "Uttar Pradesh's sex ratio is lower than India's sex ratio."
        ],
        answer: 1,
        explanation: "Chandigarh's sex ratio is 818 whereas Haryana's sex ratio is 879."
      }
    ];

    let currentQuestion = 0;
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    const answerDiv = document.getElementById('answer');

    // Create Next button
    let nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.style.display = 'none';
    nextBtn.style.marginTop = '20px';
    nextBtn.style.padding = '15px 40px';
    nextBtn.style.fontSize = '1.3rem';
    nextBtn.style.fontFamily = "'Poppins', sans-serif";
    nextBtn.style.fontWeight = '700';
    nextBtn.style.border = 'none';
    nextBtn.style.borderRadius = '15px';
    nextBtn.style.background = 'linear-gradient(135deg, #f7b267 , #73ea85)';
    nextBtn.style.color = '#181818';
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
    nextBtn.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    nextBtn.onmouseover = function() {
      nextBtn.style.background = 'linear-gradient(135deg, #73ea85, #f7b267)';
      nextBtn.style.transform = 'translateY(-3px) scale(1.05)';
      nextBtn.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
      nextBtn.style.letterSpacing = '1px';
    };
    nextBtn.onmouseout = function() {
      nextBtn.style.background = 'linear-gradient(135deg, #f7b267, #73ea85)';
      nextBtn.style.transform = 'none';
      nextBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
      nextBtn.style.letterSpacing = 'normal';
    };
    optionsDiv.parentNode.appendChild(nextBtn);

    function showQuestion(idx) {
      const q = questions[idx];
      questionDiv.textContent = q.question;
      optionsDiv.innerHTML = '';
      answerDiv.textContent = '';
      nextBtn.style.display = 'none';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => {
          if (i === q.answer) {
            answerDiv.textContent = 'Correct! ' + q.explanation;
            answerDiv.style.color = 'green';
            score++;
          } else {
            answerDiv.textContent = 'Incorrect! ' + q.explanation;
            answerDiv.style.color = 'red';
          }
          Array.from(optionsDiv.children).forEach(b => b.disabled = true);
          if (currentQuestion < questions.length - 1) {
            nextBtn.style.display = 'inline-block';
            finishBtn.style.display = 'none';
          } else {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'inline-block';
          }
        };
        optionsDiv.appendChild(btn);
      });
    }

    // Create Finish button
    let finishBtn = document.createElement('button');
    finishBtn.textContent = 'Finish';
    finishBtn.style.display = 'none';
    finishBtn.style.marginTop = '20px';
    finishBtn.style.padding = '15px 40px';
    finishBtn.style.fontSize = '1.3rem';
    finishBtn.style.fontFamily = "'Poppins', sans-serif";
    finishBtn.style.fontWeight = '700';
    finishBtn.style.border = 'none';
    finishBtn.style.borderRadius = '15px';
    finishBtn.style.background = 'linear-gradient(135deg, #f7b267, #e0e7ff, #73ea85)';
    finishBtn.style.color = '#181818';
    finishBtn.style.cursor = 'pointer';
    finishBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
    finishBtn.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    finishBtn.onmouseover = function() {
      finishBtn.style.background = 'linear-gradient(135deg, #73ea85, #e0e7ff, #f7b267)';
      finishBtn.style.transform = 'translateY(-3px) scale(1.05)';
      finishBtn.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
      finishBtn.style.letterSpacing = '1px';
    };
    finishBtn.onmouseout = function() {
      finishBtn.style.background = 'linear-gradient(135deg, #f7b267, #e0e7ff, #73ea85)';
      finishBtn.style.transform = 'none';
      finishBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
      finishBtn.style.letterSpacing = 'normal';
    };
    optionsDiv.parentNode.appendChild(finishBtn);

    let score = 0;
    nextBtn.onclick = () => {
      currentQuestion++;
      showQuestion(currentQuestion);
    };
    
finishBtn.onclick = () => {
  quizScreen.style.display = 'none';
  scoreScreen.style.display = 'block';
  scoreValue.textContent = `You scored ${score} out of ${questions.length}!`;

  // ✅ High Score Storage
  let highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
    highScore = score;
  }

  // Show high score below the score value
  let highScoreDisplay = document.getElementById('high-score');
  if (!highScoreDisplay) {
    highScoreDisplay = document.createElement('div');
    highScoreDisplay.id = 'high-score';
    highScoreDisplay.style.fontSize = '1.5rem';
    highScoreDisplay.style.marginBottom = '20px';
    highScoreDisplay.style.fontWeight = 'bold';
    scoreValue.insertAdjacentElement("afterend", highScoreDisplay);
  }
  highScoreDisplay.textContent = `🏆 High Score: ${highScore}`;

  // ✅ Score message
  let msg = '';
  if (score === questions.length) {
    msg = "Outstanding! You know India's sex ratio facts perfectly!";
  } else if (score >= questions.length - 1) {
    msg = "Great job! You know a lot about India's sex ratio.";
  } else if (score >= Math.ceil(questions.length / 2)) {
    msg = "Good effort! You have some knowledge about India's sex ratio.";
  } else {
    msg = "Keep learning! India's sex ratio facts are important.";
  }
  scoreMessage.textContent = msg;
};

        showQuestion(currentQuestion);

    // Handle Return to Home button
    const backHomeBtn = document.getElementById('back-home');
    if (backHomeBtn) {
      backHomeBtn.addEventListener('click', () => {
        console.log("Back Home button clicked!"); // debug log

        // Hide score screen and quiz screen
        scoreScreen.style.display = 'none';
        quizScreen.style.display = 'none';

        // Show home screen
        startScreen.style.display = 'block';

        // Reset quiz state
        currentQuestion = 0;
        score = 0;

        // Reset quiz display
        questionDiv.textContent = '';
        optionsDiv.innerHTML = '';
        answerDiv.textContent = '';

        // Reset buttons
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'none';
      });
    }
}); 
