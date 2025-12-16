// Floating Hearts Background
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.fontSize = (10 + Math.random() * 20) + 'px';
    heart.style.animation = `float ${3 + Math.random() * 3}s linear forwards`;
    document.getElementById('heartsContainer').appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 300);

// Love Map
function showLoveMap() {
    const canvas = document.getElementById('loveMap');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw romantic path
    ctx.strokeStyle = '#ff69b4'; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.shadowColor = '#ff1493'; ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(100, 200); ctx.quadraticCurveTo(300, 50, 500, 200);
    ctx.quadraticCurveTo(700, 350, 800, 200); ctx.stroke();
    
    // Milestones
    const milestones = [
        {x: 100, y: 200, text: 'We Met 💕'},
        {x: 300, y: 50, text: 'First Kiss 😘'},
        {x: 500, y: 200, text: 'Forever ❤️'},
        {x: 800, y: 200, text: 'Future Together 💍'}
    ];
    milestones.forEach(m => {
        ctx.fillStyle = '#ff1493'; ctx.beginPath(); ctx.arc(m.x, m.y, 25, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = 'white'; ctx.font = 'bold 18px Dancing Script'; ctx.textAlign = 'center';
        ctx.fillText(m.text, m.x, m.y + 60);
    });
    
    // Click handler
    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        document.getElementById('shayariPopup').style.display = 'flex';
    };
}

function closeShayari() {
    document.getElementById('shayariPopup').style.display = 'none';
    document.getElementById('loveMap').style.display = 'none';
}
// GLOBAL QUIZ VARIABLES
let currentQuestion = 0;
let score = 0;
let hearts = parseInt(localStorage.getItem('khushbuHearts')) || 0;
const questions = [
    { q: "Shashank's favorite way to call Khushbu?", options: ["Meri Jaan 💕", "Baby 😘", "Cutie 🥰", "All of above ❤️"], correct: 3 },
    { q: "What makes Shashank's heart freeze?", options: ["Khushbu's smile 😍", "First kiss memory 💋", "Thinking of Khushbu 💖", "All true ❤️"], correct: 3 },
    { q: "Khushbu's birthday with Shashank?", options: ["1st 🎂", "2nd 🎉", "3rd 💕", "Forever 🥰"], correct: 1 },
    { q: "Shashank's love language for Khushbu?", options: ["Hugs 🤗", "Kisses 😘", "Surprises 🎁", "All daily 💕"], correct: 3 },
    { q: "Where Shashank wants to take Khushbu?", options: ["Movie date 🎬", "Adventure trip 🏞️", "Life together 💍", "Everywhere with her ❤️"], correct: 3 },
    // Add 15 more personalized questions here - will customize next!
    { q: "Shashank's favorite Khushbu moment?", options: ["First meeting 💕", "Café date ☕", "All moments 🥰", "Future dreams 🌟"], correct: 2 },
    { q: "What does Shashank call Khushbu in Hindi?", options: ["Meri jaan 💝", "Baby doll 🎀", "Both true 😘", "Special name ❤️"], correct: 2 },
    { q: "Khushbu's effect on Shashank?", options: ["Heart races 💓", "Mind freezes 🧠", "Both happen 😍", "Magic ✨"], correct: 2 },
    { q: "Shashank's dream with Khushbu?", options: ["Travel world 🌍", "Build home 🏠", "Forever love 💍", "All dreams ❤️"], correct: 3 },
    { q: "Best gift Shashank gave Khushbu?", options: ["This website 🎁", "His heart 💖", "Both priceless 🥰", "Daily love 😘"], correct: 2 },
    { q: "Shashank's favorite Khushbu feature?", options: ["Smile 😊", "Eyes ✨", "Everything perfect 💕", "Her love ❤️"], correct: 2 },
    { q: "When does Shashank miss Khushbu most?", options: ["Every second ⏳", "Night time 🌙", "Always true 💖", "When apart 😢"], correct: 2 },
    { q: "Shashank's promise to Khushbu?", options: ["Forever love 💍", "Daily happiness 😊", "Both eternal ❤️", "Life together 🥰"], correct: 2 },
    { q: "Khushbu's special power over Shashank?", options: ["One smile wins 😍", "One word melts 💕", "Her existence 🥰", "All magic ✨"], correct: 3 },
    { q: "Shashank's ultimate dream date?", options: ["Candlelight dinner 🕯️", "Stargazing 🌌", "With Khushbu anywhere ❤️", "All perfect 💕"], correct: 2 },
    { q: "What Shashank loves most about mornings?", options: ["Khushbu texts 📱", "Good morning baby 😘", "Both daily 💖", "Her voice call 📞"], correct: 2 },
    { q: "Shashank's favorite memory location?", options: ["First meeting spot 💕", "Favorite café ☕", "Wherever with her ❤️", "All special 🥰"], correct: 2 },
    { q: "Khushbu's nickname in Shashank's phone?", options: ["Meri Jaan 💝", "My Love 😘", "Something cute 🥰", "Heart emoji ❤️"], correct: 0 },
    { q: "Shashank's reaction to Khushbu's laugh?", options: ["Melts instantly 💕", "Smiles bigger 😊", "Both true 🥰", "Heart races 💓"], correct: 2 },
    { q: "Final question: Will you spend life with Shashank?", options: ["Yes forever 💍", "Absolutely baby 😘", "My jaan only you ❤️", "All answers true 🥰"], correct: 3 }
];

function updateHearts() {
    document.getElementById('heartsCount').textContent = hearts;
    localStorage.setItem('khushbuHearts', hearts);
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('questionBox').style.display = 'none';
    document.getElementById('quizActive').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerHTML = `<h2>Q${currentQuestion + 1}/20: ${q.q}</h2>`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.innerHTML = option;
        btn.onclick = () => selectAnswer(index);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('progress').style.width = ((currentQuestion / 20) * 100) + '%';
}

function selectAnswer(selected) {
    const q = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        if (i === q.correct) opt.classList.add('correct');
        else if (i === selected && i !== q.correct) opt.classList.add('wrong');
    });
    
    if (selected === q.correct) {
        score++;
        hearts++;
        updateHearts();
        launchHearts(20); // Celebration hearts!
    }
    
    document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < 20) {
        showQuestion();
    } else {
        document.getElementById('quizActive').style.display = 'none';
        document.getElementById('quizComplete').style.display = 'block';
        document.getElementById('finalScore').textContent = hearts;
        launchHearts(50); // Victory celebration!
    }
}

// Load hearts on page load
document.addEventListener('DOMContentLoaded', updateHearts);
// SHOP SYSTEM
let hearts = parseInt(localStorage.getItem('khushbuHearts')) || 0;

const shopItems = [
    { id: 'kiss', name: '10 Kisses 😘', cost: 8, popup: 'kissPopup' },
    { id: 'hug', name: '5 Warm Hugs 🤗', cost: 5, popup: 'hugPopup' },
    { id: 'bang', name: 'Bang Bang 🔥', cost: 12, popup: 'bangPopup' },
    { id: 'ride', name: 'Cowgirl Ride 👑', cost: 15, popup: 'bangPopup' },
    { id: 'movie', name: 'Movie Night 🎬', cost: 10, popup: 'bangPopup' },
    { id: 'adventure', name: 'Adventure Date 🏞️', cost: 18, popup: 'bangPopup' },
    { id: 'life', name: 'Life with Shashank 💍', cost: 'ALL', popup: 'finale' }
];

function initShop() {
    updateHearts();
    const container = document.getElementById('shopItems');
    shopItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'shop-item';
        div.innerHTML = `
            <h3>${item.name}</h3>
            <div class="shop-cost">${item.cost === 'ALL' ? 'ALL HEARTS' : item.cost} 💖</div>
            <p>${item.cost === 'ALL' ? 'Final Reward!' : 'Click to Buy!'}</p>
        `;
        div.onclick = () => buyItem(item);
        container.appendChild(div);
    });
}

function buyItem(item) {
    if (item.cost === 'ALL' && hearts > 0) {
        hearts = 0;
        showPopup('finale');
    } else if (hearts >= item.cost) {
        hearts -= item.cost;
        updateHearts();
        showPopup(item.popup);
        launchHearts(30);
    } else {
        alert('Need more hearts! Take the quiz again 💖');
    }
}

function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
    initShop(); // Refresh shop
}

// Initialize shop on load
if (window.location.pathname.includes('shop.html')) {
    document.addEventListener('DOMContentLoaded', initShop);
}

// Update hearts display
function updateHearts() {
    document.getElementById('heartsCount').textContent = hearts;
    document.getElementById('currentHearts').textContent = hearts;
    localStorage.setItem('khushbuHearts', hearts);
}
// MEMORY MATCH GAME
let flippedCards = [];
let lockBoard = false;
let matchesFound = 0;
let moves = 0;
let time = 0;
let timerInterval;
let hearts = parseInt(localStorage.getItem('khushbuHearts')) || 0;

const memoryPhotos = [
    'assets/images/photo1.jpg', 'assets/images/photo2.jpg', 'assets/images/photo3.jpg',
    'assets/images/photo1.jpg', 'assets/images/photo2.jpg', 'assets/images/photo3.jpg',
    'assets/images/photo4.jpg', 'assets/images/photo5.jpg', 'assets/images/photo6.jpg',
    'assets/images/photo4.jpg', 'assets/images/photo5.jpg', 'assets/images/photo6.jpg'
];

function initMemoryGame() {
    updateHearts();
    newGame();
}

function newGame() {
    lockBoard = false;
    flippedCards = [];
    matchesFound = 0;
    moves = 0;
    time = 0;
    clearInterval(timerInterval);
    
    document.getElementById('timer').textContent = '0';
    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0/8';
    
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';
    
    // Shuffle photos
    const shuffled = memoryPhotos.sort(() => Math.random() - 0.5);
    
    shuffled.forEach((photo, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.photo = photo;
        card.innerHTML = '❓';
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
    
    timerInterval = setInterval(() => {
        time++;
        document.getElementById('timer').textContent = time;
    }, 1000);
}

function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    card.innerHTML = `<img src="${card.dataset.photo}" onerror="this.outerHTML='💕'">`;
    
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        lockBoard = true;
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.photo === card2.dataset.photo) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchesFound++;
        hearts++; // Earn 1 heart per match!
        updateHearts();
        document.getElementById('matches').textContent = `${matchesFound}/8`;
        document.getElementById('earnedHearts').textContent = hearts;
        
        launchHearts(10); // Celebration!
        
        if (matchesFound === 8) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`Perfect memory! 🎉 ${time}s, ${moves} moves, ${hearts} hearts earned!`), 500);
        }
        
        flippedCards = [];
        lockBoard = false;
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '❓';
            card2.innerHTML = '❓';
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

// Load game on memory page
if (window.location.pathname.includes('memory-game.html')) {
    document.addEventListener('DOMContentLoaded', initMemoryGame);
}
