document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById('typing-text');
    const asciiGrid = document.getElementById('ascii-grid');
    const inputSection = document.getElementById('input-section');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const message = document.getElementById('message');
    const keySound = document.getElementById('keySound');

    let failCount = 0;
    const correctAnswers = [
        'SABADO 20HS',
        'Ψ ▲ ◆ ▲ ¤ Ω ▀ ◇ ☼ Ξ',
        'Ψ▲◆▲¤Ω▀◇☼Ξ', // Without spaces
        'ψ ▲ ◆ ▲ ¤ ω ▀ ◇ ☼ ξ', // Lowercase version
        'ψ▲◆▲¤ω▀◇☼ξ' // Lowercase without spaces
    ];

    // Make grid cells clickable
    const gridCells = document.querySelectorAll('.grid div');
    gridCells.forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', () => {
            const symbol = cell.textContent;
            answerInput.value += symbol;
            keySound.currentTime = 0;
            keySound.play();
            cell.classList.add('clicked');
            setTimeout(() => cell.classList.remove('clicked'), 200);
        });
    });

    // Initial typing animation
    setTimeout(() => {
        typingText.classList.remove('hidden');
        typeText('@16400S20CES', typingText).then(() => {
            // Blink effect after typing
            typingText.classList.add('blink');
            setTimeout(() => {
                typingText.classList.remove('blink');
                
                // Show ASCII grid
                setTimeout(() => {
                    asciiGrid.classList.remove('hidden');
                    
                    // Show input section
                    setTimeout(() => {
                        inputSection.classList.remove('hidden');
                    }, 5000);
                }, 2000);
            }, 2000);
        });
    }, 1000);

    // Typing sound effect for input
    answerInput.addEventListener('keypress', () => {
        keySound.currentTime = 0;
        keySound.play();
    });

    // Submit button handler
    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    function checkAnswer() {
        const userAnswer = answerInput.value.trim();
        const normalizedUserAnswer = normalizeAnswer(userAnswer);
        
        if (correctAnswers.some(answer => normalizeAnswer(answer) === normalizedUserAnswer)) {
            // Correct answer animation
            asciiGrid.classList.add('hidden');
            inputSection.classList.add('hidden');
            message.classList.remove('hidden');
            message.style.color = '#00ff00';
            typeText('CODIGO CORRECTO: "SABADO 20HS"', message);
        } else {
            // Wrong answer animation
            failCount++;
            message.textContent = 'INCORRECTO';
            message.style.color = '#ff0000';
            message.classList.remove('hidden');
            answerInput.classList.add('shake');
            
            setTimeout(() => {
                answerInput.classList.remove('shake');
            }, 500);

            if (failCount >= 3) {
                setTimeout(() => {
                    message.style.color = '#666';
                    message.textContent = 'Observa bien los símbolos en @16400S20CES';
                }, 1500);
            }
        }
    }

    function normalizeAnswer(answer) {
        return answer.toLowerCase()
            .replace(/\s+/g, '') // Remove all whitespace
            .replace(/ψ/g, 'Ψ')
            .replace(/ω/g, 'Ω')
            .replace(/ξ/g, 'Ξ');
    }

    async function typeText(text, element) {
        element.textContent = '';
        for (let char of text) {
            element.textContent += char;
            keySound.currentTime = 0;
            keySound.play();
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
});