import MistralClient from "@mistralai/mistralai";

const mistralClient = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);
document.getElementById("search-response").addEventListener('click', async () => {
    // 1. Getting the user input
    const input = document.getElementById('query').value.toString();

    // 2. Combining the input and the context in a prompt 
    // and using the chat API to generate a response 
    const response = await generateChatResponse(input);
    displayResponse(response);
});

async function generateChatResponse(query) {
    const response = await mistralClient.chat({
        model: 'mistral-large-latest',
        messages: [{
            role: 'user',
            content: `You are a summarization system that can provide summaries.
In clear and concise language, provide a detailed summary of the ${query} in max 300 words .For poetry or some stories give deeper interpretations or potential symbolism.`
        }]
    });
    return response.choices[0].message.content;
}

function displayResponse(response) {
    const responseContainer = document.getElementById('response-container');
    responseContainer.innerText = response;
}
