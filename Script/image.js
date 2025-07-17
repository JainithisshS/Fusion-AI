const token = "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";
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatHistory = document.getElementById("chatHistory");

async function query(prompt) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
                body: JSON.stringify({ "inputs": prompt }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error('Error during image generation:', error);
        throw error;
    }
}

sendBtn.addEventListener('click', async function () {
    const prompt = userInput.value;
    if (!prompt) return;
    
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat', 'user');
    userMessage.innerHTML = `<img src="/Assets/image/person-circle.svg" style alt="User Avatar"><span>${prompt}</span>`;
    chatHistory.appendChild(userMessage);
    userInput.value = '';

    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('chat', 'response');
    loadingMessage.innerHTML = `<img src="/Assets/image/robot.svg" alt="Chatbot Avatar"><span>Generating image...</span>`;
    chatHistory.appendChild(loadingMessage);

    try {
        const response = await query(prompt);
        const objectURL = URL.createObjectURL(response);
        chatHistory.removeChild(loadingMessage);
        const imageMessage = document.createElement('div');
        imageMessage.classList.add('chat', 'response');
        imageMessage.innerHTML = `
            <img src="/Assets/image/robot.svg" alt="Chatbot Avatar">
            <div class="generated-image-container">
                <img src="${objectURL}" alt="Generated Image" class="generated-image">
            </div>`;
        chatHistory.appendChild(imageMessage);
        
    } catch (error) {
        chatHistory.removeChild(loadingMessage);
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('chat', 'response');
        errorMessage.innerHTML = `<img src="/Assets/image/robot.svg"><span>Failed to generate image. Please try again later.</span>`;
        chatHistory.appendChild(errorMessage);
    }
});
