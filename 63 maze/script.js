let playCount = 0;
let timerInterval;
let time = 0;
let playerPos = { x: 0, y: 0 };
const mazeSize = 10;
let maze = [];

// Start the game
function startGame() {
    const userName = document.getElementById('userNameInput').value;
    if (userName) {
        document.getElementById('userNameDisplay').textContent = userName;
    }

    // Reset the timer and start it
    time = 0;
    document.getElementById('timer').textContent = time;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    // Increment play count
    playCount++;
    document.getElementById('playCount').textContent = playCount;

    // Generate and display the maze
    generateMaze();
    displayMaze();

    // Set initial player position
    playerPos = { x: 0, y: 0 };
    updatePlayerPosition();
}

// Timer logic
function updateTimer() {
    time++;
    document.getElementById('timer').textContent = time;
}

// Generate a simple maze structure
function generateMaze() {
    maze = [];
    for (let i = 0; i < mazeSize; i++) {
        const row = [];
        for (let j = 0; j < mazeSize; j++) {
            if ((i === 0 && j === 0) || (i === mazeSize - 1 && j === mazeSize - 1)) {
                row.push(0); // Start and end points
            } else {
                row.push(Math.random() > 0.2 ? 0 : 1); // Random walls
            }
        }
        maze.push(row);
    }
}

// Display the maze on the page
function displayMaze() {
    const mazeContainer = document.getElementById('mazeContainer');
    mazeContainer.innerHTML = ''; // Clear the maze

    maze.forEach((row, i) => {
        row.forEach((cell, j) => {
            const div = document.createElement('div');
            div.classList.add('cell');
            if (cell === 1) div.classList.add('wall');
            if (i === 0 && j === 0) div.classList.add('start'); // Start point
            if (i === mazeSize - 1 && j === mazeSize - 1) div.classList.add('end'); // End point
            mazeContainer.appendChild(div);
        });
    });
}

// Update player position visually
function updatePlayerPosition() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('player'));

    const index = playerPos.y * mazeSize + playerPos.x;
    cells[index].classList.add('player');
}

// Handle player movement
document.addEventListener('keydown', function(event) {
    let { x, y } = playerPos;

    if (event.key === 'ArrowUp' && y > 0 && maze[y - 1][x] === 0) y--;
    if (event.key === 'ArrowDown' && y < mazeSize - 1 && maze[y + 1][x] === 0) y++;
    if (event.key === 'ArrowLeft' && x > 0 && maze[y][x - 1] === 0) x--;
    if (event.key === 'ArrowRight' && x < mazeSize - 1 && maze[y][x + 1] === 0) x++;

    playerPos = { x, y };
    updatePlayerPosition();

    // Check if the player reached the end
    if (x === mazeSize - 1 && y === mazeSize - 1) {
        showResult(`Congratulations! You completed the maze in ${time} seconds.`);
    }
});

// Set light or dark mode
function setMode(mode) {
    const body = document.body;
    if (mode === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
}

// Show result modal
function showResult(resultMessage) {
    document.getElementById('resultMessage').textContent = resultMessage;
    document.getElementById('resultModal').style.display = 'flex';
    clearInterval(timerInterval);
}

// Close the modal
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}
