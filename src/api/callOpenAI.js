const apiKey = import.meta.env.VITE_OPENAI_SECRET_KEY;

export const callOpenAI = async (query) => {
  const apiBody = {
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" }, // Forces JSON mode, but still returns a string
    messages: [
      {
        role: "system",
        content: `You are an AI assistant that generates concise coding flashcards. When providing code examples, please use proper indentation and line breaks for readability. Write enough code that it is clearly understandable.
        Always respond in valid JSON with the exact structure:
        {
          "response": "<concise answer>",
          "categories": ["<First Category>", "<Second Category>"],
          "example": "<Relevant code example>" or "" if not applicable,
        }
        Ensure all properties are always included. Never return any additional text outside the JSON object.`,
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
      body: JSON.stringify(apiBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    let data = await response.json();
    console.log("API Response:", data);

    // Extract the JSON string from the response
    let jsonString = data.choices[0].message.content;

    // Manually parse it into an object
    let structuredData = JSON.parse(jsonString);

    return structuredData;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return { response: "Error fetching response", categories: [] };
  }
};
