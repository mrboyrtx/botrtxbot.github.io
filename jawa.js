// You can add JavaScript functionality here if needed.

// Add this code to your script.js file

// Chatbot functionality
const chatContainer = document.getElementById('chat-container');
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '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';

userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && userInput.value.trim() !== '') {
        const userMessage = userInput.value;
        userInput.value = '';
        addMessage('user', userMessage);

        // Send the user's message to the chatbot
        fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: `Game-related question: ${userMessage}`,
                max_tokens: 150,
            }),
        })
            .then(response => response.json())
            .then(data => {
                const botMessage = data.choices[0].text;
                addMessage('bot', botMessage);
            })
            .catch(error => {
                console.error(error);
            });
    }
});

function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatLog.appendChild(messageDiv);

    // Scroll to the bottom of the chat log
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
