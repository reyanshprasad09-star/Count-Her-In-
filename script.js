document.addEventListener('DOMContentLoaded', () => {
  const musicBtn = document.getElementById('music-toggle');
  const music = document.getElementById('background-music');
  const correctSound = document.getElementById('correct-sound');
  const wrongSound = document.getElementById('wrong-sound');
  const gameOverSound = document.getElementById('game-over-sound');
  const quizScreen = document.getElementById('quiz-screen');
  const calculatingScreen = document.getElementById('calculating-screen');
  const scoreScreen = document.getElementById('score-screen');
  const scoreValue = document.getElementById('score-value');
  const scoreMessage = document.getElementById('score-message');
  const confettiContainer = document.getElementById('confetti-container');

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

  // Set volume for sound effects
  if (correctSound) {
    correctSound.volume = 0.6;
  }
  if (wrongSound) {
    wrongSound.volume = 0.6;
  }
  if (gameOverSound) {
    gameOverSound.volume = 0.7;
  }

  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleQuiz = document.getElementById('theme-toggle-quiz');
  const themeToggleScore = document.getElementById('theme-toggle-score');
  const themeToggleCalculating = document.getElementById('theme-toggle-calculating');

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
    if (themeToggleCalculating) {
      themeToggleCalculating.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
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
  if (themeToggleCalculating) {
    themeToggleCalculating.addEventListener('click', toggleDarkMode);
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
      },
      {
        question: "According to Census 2011, what is the correct descending order of sex ratio in states?",
        options: [
          "Kerala> Tamil Nadu> Andhra Pradesh> Chhattisgarh",
          "Kerala> Chhattisgarh> Andhra Pradesh> Madhya Pradesh",
          "Kerala> Andhra Pradesh> Chhattisgarh> Tamil Nadu",
          "Kerala> Chhattisgarh> Bihar> Tamil Nadu"
        ],
        answer: 0,
        explanation: "Kerala's sex ratio is 1084, Tamil Nadu's sex ratio is 996, Andhra Pradesh's 993 and Chhattisgarh's 991."
      },
      {
        question: "How sex ratio is measured?",
        options: [
          "According to the number of women on 100 men",
          "According to the number of women on 1000 men",
          "According to the number of girls on 1000 boys",
          "According to the number of men on 1000 women"
        ],
        answer: 1,
        explanation: "According to the number of women on 1000 men."
      },
      {
        question: "Which state showed the most improvement in sex ratio from 2001 to 2011?",
        options: [
          "Bihar",
          "Tamil Nadu",
          "Jammu & Kashmir",
          "Uttar Pradesh"
        ],
        answer: 2,
        explanation: "Jammu & Kashmir improved its sex ratio by 55 (from 892 in 2001 to 947 in 2011), the highest improvement among all states."
      },
      {
        question: "As per 2011 Census, India's child sex ratio (0–6 years) was:",
        options: [
          "950",
          "919",
          "935",
          "940"
        ],
        answer: 1,
        explanation: "Child sex ratio dropped to 919 girls per 1000 boys in 2011, down from 927 in 2001. This shows persistent gender bias at birth."
      },
      {
        question: "Which of the following states had a sex ratio above 1000 in 2011?",
        options: [
          "Kerala",
          "Tamil Nadu",
          "Andhra Pradesh",
          "Chhattisgarh"
        ],
        answer: 0,
        explanation: "Kerala had a sex ratio of 1084, which was above 1000. Tamil Nadu (996), Andhra Pradesh (993), and Chhattisgarh (991) all had sex ratios below 1000."
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let lives = 3;
    const MAX_LIVES = 3;
    let shuffledQuestions = [...questions]; // Copy of questions array for shuffling
    let questionTimer = null;
    let timeLeft = 15;
    const QUESTION_TIME = 15; // seconds per question
    
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    const answerDiv = document.getElementById('answer');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const timerText = document.getElementById('timer-text');
    const timerCircle = document.querySelector('.timer-circle');
    const livesDisplay = document.getElementById('lives-display');

    // Fisher-Yates shuffle algorithm
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    // Shuffle options and return new correct answer index
    function shuffleOptions(options, correctIndex) {
      const correctAnswer = options[correctIndex];
      const shuffledOptions = shuffleArray(options);
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
      return { shuffledOptions, newCorrectIndex };
    }

    function startTimer() {
      timeLeft = QUESTION_TIME;
      timerText.textContent = timeLeft;
      timerCircle.className = 'timer-circle'; // Reset classes
      
      questionTimer = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        
        // Change timer appearance based on time left
        if (timeLeft <= 5) {
          timerCircle.className = 'timer-circle danger';
        } else if (timeLeft <= 10) {
          timerCircle.className = 'timer-circle warning';
        }
        
        if (timeLeft <= 0) {
          clearInterval(questionTimer);
          handleTimeUp();
        }
      }, 1000);
    }

    function stopTimer() {
      if (questionTimer) {
        clearInterval(questionTimer);
        questionTimer = null;
      }
    }

    function handleTimeUp() {
      // Lose a life for timeout
      loseLife();
      
      // Disable all option buttons
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      
      // Get the current question and show correct answer
      const q = shuffledQuestions[currentQuestion];
      const correctAnswerText = q.options[q.answer];
      
      // Show time up message
      answerDiv.textContent = `Time's up! The correct answer was: ${correctAnswerText}. ${q.explanation}`;
      answerDiv.style.color = '#ff6b6b';
      
      // Play wrong sound effect for timeout
      if (wrongSound) {
        wrongSound.currentTime = 0;
        wrongSound.play().catch(e => console.log('Could not play wrong sound'));
      }
      
      // Show next/finish button after a short delay (only if game isn't over)
      setTimeout(() => {
        if (lives > 0) {
          if (currentQuestion < shuffledQuestions.length - 1) {
            nextBtn.style.display = 'inline-block';
            finishBtn.style.display = 'none';
          } else {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'inline-block';
          }
        }
      }, 1500);
    }

    function updateProgress() {
      const progressPercent = (currentQuestion / shuffledQuestions.length) * 100;
      progressFill.style.width = progressPercent + '%';
      progressText.textContent = `Question ${currentQuestion + 1} of ${shuffledQuestions.length}`;
    }

    function updateLives() {
      const hearts = livesDisplay.querySelectorAll('.life-heart');
      hearts.forEach((heart, index) => {
        heart.className = 'life-heart';
        if (index >= lives) {
          heart.classList.add('lost');
        }
      });
    }

    function loseLife() {
      if (lives > 0) {
        lives--;
        const hearts = livesDisplay.querySelectorAll('.life-heart');
        const heartToLose = hearts[lives]; // Heart at the lost life index
        
        // Add breaking animation
        heartToLose.classList.add('losing');
        
        // After animation, update to lost state
        setTimeout(() => {
          heartToLose.classList.remove('losing');
          heartToLose.classList.add('lost');
          
          // Check for game over
          if (lives <= 0) {
            handleGameOver();
          }
        }, 600); // Match animation duration
      }
    }

    function handleGameOver() {
      // Stop timer
      stopTimer();
      
      // Disable all buttons
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      
      // Show game over message
      answerDiv.innerHTML = '<strong style="color: #ff4444;">Game Over!</strong><br>You ran out of lives. Better luck next time!';
      answerDiv.style.color = '#ff4444';
      
      // Play game over sound
      if (gameOverSound) {
        gameOverSound.currentTime = 0;
        gameOverSound.play().catch(e => console.log('Could not play game over sound'));
      }
      
      // Show finish button after delay
      setTimeout(() => {
        finishBtn.style.display = 'inline-block';
        nextBtn.style.display = 'none';
      }, 2000);
    }

    function createConfetti() {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      
      // Random shapes
      const shapes = ['square', 'circle', 'triangle'];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      confetti.classList.add(randomShape);
      
      // Random colors
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c', '#be2edd', '#ff9ff3', '#54a0ff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      if (randomShape === 'triangle') {
        confetti.style.borderBottomColor = randomColor;
      } else {
        confetti.style.backgroundColor = randomColor;
      }
      
      // Position at center of screen (behind score box) - invisible starting point
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      
      // Random explosion animation - now includes all 12 directions for full coverage
      const animations = ['explode1', 'explode2', 'explode3', 'explode4', 'explode5', 'explode6', 'explode7', 'explode8', 'explode9', 'explode10', 'explode11', 'explode12'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      confetti.style.animation = `${randomAnimation} ${2.5 + Math.random() * 1.5}s ease-out forwards`;
      
      // Random delay for staggered explosion
      confetti.style.animationDelay = Math.random() * 0.3 + 's';
      
      return confetti;
    }

    function startConfetti() {
      confettiContainer.style.display = 'block';
      confettiContainer.innerHTML = '';
      
      // Create multiple bursts of confetti
      const createBurst = (count, delay) => {
        setTimeout(() => {
          for (let i = 0; i < count; i++) {
            const confetti = createConfetti();
            confettiContainer.appendChild(confetti);
          }
        }, delay);
      };
      
      // Create 4 bursts for maximum explosion effect and screen coverage
      createBurst(30, 0);     // First burst
      createBurst(25, 200);   // Second burst  
      createBurst(20, 400);   // Third burst
      createBurst(15, 600);   // Fourth burst
      
      // Stop confetti after 5 seconds to allow full animation
      setTimeout(() => {
        confettiContainer.style.display = 'none';
        confettiContainer.innerHTML = '';
      }, 5000);
    }

    function stopConfetti() {
      if (confettiContainer) {
        confettiContainer.style.display = 'none';
        confettiContainer.innerHTML = '';
      }
    }

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
      const q = shuffledQuestions[idx];
      questionDiv.textContent = q.question;
      optionsDiv.innerHTML = '';
      answerDiv.textContent = '';
      nextBtn.style.display = 'none';
      finishBtn.style.display = 'none';
      
      // Update progress bar and lives
      updateProgress();
      updateLives();
      
      // Start the timer
      startTimer();
      
      // Shuffle options and get new correct answer index
      const { shuffledOptions, newCorrectIndex } = shuffleOptions(q.options, q.answer);
      
      shuffledOptions.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => {
          // Stop the timer when answer is selected
          stopTimer();
          
          if (i === newCorrectIndex) {
            answerDiv.textContent = 'Correct! ' + q.explanation;
            answerDiv.style.color = 'green';
            score++;
            // Play correct sound effect
            if (correctSound) {
              correctSound.currentTime = 0; // Reset to beginning
              correctSound.play().catch(e => console.log('Could not play correct sound'));
            }
          } else {
            // Wrong answer - lose a life
            loseLife();
            answerDiv.textContent = 'Incorrect! ' + q.explanation;
            answerDiv.style.color = 'red';
            // Play wrong sound effect
            if (wrongSound) {
              wrongSound.currentTime = 0; // Reset to beginning
              wrongSound.play().catch(e => console.log('Could not play wrong sound'));
            }
          }
          
          Array.from(optionsDiv.children).forEach(b => b.disabled = true);
          
          // Only show next/finish buttons if game isn't over
          if (lives > 0) {
            if (currentQuestion < shuffledQuestions.length - 1) {
              nextBtn.style.display = 'inline-block';
              finishBtn.style.display = 'none';
            } else {
              nextBtn.style.display = 'none';
              finishBtn.style.display = 'inline-block';
            }
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

    nextBtn.onclick = () => {
      currentQuestion++;
      showQuestion(currentQuestion);
    };
    
    finishBtn.onclick = () => {
      // Calculate actual progress based on game state
      let actualProgress, progressMessage;
      
      if (lives <= 0) {
        // Game over scenario - show progress only up to current question
        actualProgress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
        progressMessage = `Game Over at Question ${currentQuestion + 1} of ${shuffledQuestions.length}`;
      } else {
        // Normal completion - show full progress
        actualProgress = 100;
        progressMessage = `Completed ${shuffledQuestions.length} of ${shuffledQuestions.length}`;
      }
      
      // Set progress to calculated value
      progressFill.style.width = actualProgress + '%';
      progressText.textContent = progressMessage;
      
      quizScreen.style.display = 'none';
      calculatingScreen.style.display = 'block';
      
      // Update calculating screen progress bar to match
      const progressFillCalculating = document.getElementById('progress-fill-calculating');
      const progressTextCalculating = document.getElementById('progress-text-calculating');
      progressFillCalculating.style.width = actualProgress + '%';
      progressTextCalculating.textContent = progressMessage;
      
      // Show calculating animation for 3 seconds, then show score screen
      setTimeout(() => {
        calculatingScreen.style.display = 'none';
        scoreScreen.style.display = 'block';
        
        scoreValue.textContent = `You scored ${score} out of ${shuffledQuestions.length}!`;
        
        let msg = '';
        if (lives <= 0) {
          msg = "Game Over! You ran out of lives. Practice more to improve your knowledge of India's sex ratio.";
        } else if (score === shuffledQuestions.length) {
          msg = "Outstanding! You know India's sex ratio facts perfectly!";
          // Trigger confetti for perfect score
          setTimeout(() => {
            startConfetti();
          }, 500); // Small delay for dramatic effect
        } else if (score >= shuffledQuestions.length - 1) {
          msg = "Great job! You know a lot about India's sex ratio.";
        } else if (score >= Math.ceil(shuffledQuestions.length / 2)) {
          msg = "Good effort! You have some knowledge about India's sex ratio.";
        } else {
          msg = "Keep learning! India's sex ratio facts are important.";
        }
        scoreMessage.textContent = msg;
      }, 3000); // 3 second delay
    };

  const startBtn = document.getElementById('start-btn');
  const startScreen = document.getElementById('start-screen');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startScreen.style.display = 'none';
      quizScreen.style.display = 'block';
      
      // Reset quiz state when starting
      currentQuestion = 0;
      score = 0;
      lives = MAX_LIVES;
      
      // Shuffle questions for new playthrough
      shuffledQuestions = shuffleArray(questions);
      
      // Reset lives display
      updateLives();
      
      // Show the first question
      showQuestion(currentQuestion);
    });
  }

    // Handle Return to Home button
    const backHomeBtn = document.getElementById('back-home');
    if (backHomeBtn) {
      backHomeBtn.addEventListener('click', () => {
        // Hide score screen and quiz screen
        scoreScreen.style.display = 'none';
        quizScreen.style.display = 'none';
        calculatingScreen.style.display = 'none';

        // Show home screen
        startScreen.style.display = 'block';

        // Reset quiz state
        currentQuestion = 0;
        score = 0;
        lives = MAX_LIVES;

        // Stop any running timer
        stopTimer();

        // Stop confetti if running
        stopConfetti();

        // Reset quiz display
        questionDiv.textContent = '';
        optionsDiv.innerHTML = '';
        answerDiv.textContent = '';

        // Reset progress bar
        progressFill.style.width = '0%';
        progressText.textContent = 'Question 1 of 5';

        // Reset timer display
        timerText.textContent = '15';
        timerCircle.className = 'timer-circle';

        // Reset lives display
        updateLives();

        // Reset buttons
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'none';
        
        // Clear any existing option buttons
        const existingButtons = optionsDiv.querySelectorAll('button');
        existingButtons.forEach(btn => btn.remove());
      });
    }
}); 
