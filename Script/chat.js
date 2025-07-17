async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
        {
            headers: { 
                Authorization: "Bearer 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",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText}\n${errorText}`);
    }
    const result = await response.json();
    return result;
}

function addMessage(content, isUser) {
    const chatHistory = document.getElementById("chatHistory");
    const message = document.createElement("div");
    message.className = `chat ${isUser ? 'user' : 'response'}`;
    message.innerHTML = `
        <img src="${isUser ? '/Assets/chat/person-circle.svg' : '/Assets/chat/robot.svg'}" alt="${isUser ? 'User Avatar' : 'Chatbot Avatar'}">
        <span>${content.replace(/\n/g, '<br>')}</span>
    `;
    chatHistory.appendChild(message);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

document.getElementById("sendBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;
    
    addMessage(userInput, true);
    document.getElementById("userInput").value = "";  // Clear input field
    
    try {
        const response = await query({ "inputs": userInput });
        const generatedText = response[0]?.generated_text || "No generated text found.";
        addMessage(generatedText, false);
    } catch (error) {
        addMessage(`Error: ${error.message}`, false);
    }
});
