const apiKey = import.meta.env.VITE_OPENAI_SECRET_KEY;

export const callOpenAI = async (query) => {
  const apiBody = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content: `You are helpful assistant and you provide concise answers that are suitable for a flashcard. Most of the questions will be with regards to coding so you if you receive a question like 'What is a component', you should assume that I am asking about a component in a coding language or framework e.g. React. If the user writes the words "extended" at the end, you may provide a longer answer.
          
          Respond in **valid** JSON format with the following structure:
            {
            "response": "<your answer here>", 
            "categories": ["<First Category>", "<Second Category>"]
            },
            
            Do not include anything outside this JSON structure.`,
      },
      {
        role: "user",
        content: query,
      },
    ],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(apiBody), // turn JS object into JSON text for sending
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
    });

    let data = await response.json(); // turn JSON text from response stream into JS object
    let message = data.choices[0].message.content; // extract JSON-formatted message string from the object
    return JSON.parse(message); // converts JSON-formatted string into object
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Error fetching response";
  }
};
