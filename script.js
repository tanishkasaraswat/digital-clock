function updateClock() {
    const now = new Date();
    
    // Date components
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const month = months[now.getMonth()];
    const dayNum = now.getDate();
    const year = now.getFullYear();
    
    // Time components
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    // Update DOM elements
    document.getElementById('dayname').textContent = dayName;
    document.getElementById('month').textContent = month;
    document.getElementById('daynum').textContent = dayNum;
    document.getElementById('year').textContent = year;
    document.getElementById('hour').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('period').textContent = period;
}

// Node.js Network Animation
function createNodeNetwork() {
    const network = document.getElementById('nodeNetwork');
    const nodeCount = 50;
    const connectionCount = 30;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 6 + 's';
        network.appendChild(node);
    }
    
    // Create connections
    for (let i = 0; i < connectionCount; i++) {
        const connection = document.createElement('div');
        connection.className = 'connection';
        connection.style.left = Math.random() * 100 + '%';
        connection.style.top = Math.random() * 100 + '%';
        connection.style.width = Math.random() * 200 + 50 + 'px';
        connection.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        connection.style.animationDelay = Math.random() * 3 + 's';
        network.appendChild(connection);
    }
}

// Initialize
updateClock();
createNodeNetwork();

// Update clock every second
setInterval(updateClock, 1000);

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const nodes = document.querySelectorAll('.node');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    nodes.forEach((node, index) => {
        const nodeX = parseFloat(node.style.left) / 100;
        const nodeY = parseFloat(node.style.top) / 100;
        const distance = Math.sqrt(Math.pow(mouseX - nodeX, 2) + Math.pow(mouseY - nodeY, 2));
        
        if (distance < 0.2) {
            node.style.transform = `scale(${1.5 - distance * 2})`;
            node.style.boxShadow = `0 0 ${20 - distance * 50}px #68d391`;
        } else {
            node.style.transform = 'scale(1)';
            node.style.boxShadow = '0 0 10px #68d391';
        }
    });
});