const apiKey = import.meta.env.VITE_OPENAI_SECRET_KEY;
let dataTotal = 0;

export const callOpenAI = async (question, conversation) => {
  // Step 1: Create a variable to store the mapped array
  let conversationMessages = []; // This ensures we always have an array

  // Step 2: If conversation exists and is an array, transform its values
  if (Array.isArray(conversation)) {
    // ✅ Checks if conversation is actually an array
    conversationMessages = conversation.map((msg) => {
      // ✅ Loops through the array
      return {
        role: msg.type === "user" ? "user" : "assistant", // ✅ Sets "role" based on msg.type
        content: msg.content, // ✅ Copies the message content
      };
    });
  }

  const apiBody = {
    model: "gpt-4o-mini",
    response_format: { type: "json_object" }, // Forces JSON mode, but still returns a string
    // max_tokens: 1500, // Increase to allow longer responses
    // temperature: 0.7, // Adjust to control randomness
    messages: [
      {
        role: "system",
        content: `You are a helpful AI coding assistant and tutor that provides well-structured explanations in Markdown format. If a coding question is asked, provide a code example. When providing code examples, please use proper indentation and line breaks for readability. Write enough code that it is clearly understandable. 
        Always respond in valid JSON with the exact structure:
        {
          "answer": "<answer>",
          "categories": ["<First Category>", "<Second Category>"],
          "example": "<Only include the raw code. Do not add explanations, but you may include inline comments where necessary (// or /* */).>",
        }
        Ensure all properties are always included. Never return any additional text outside the JSON object.`,
      },
      ...conversationMessages,
      {
        role: "user",
        content: question,
      },
    ],
  };

  try {
    console.log(
      "Messages being sent to OpenAI:",
      JSON.stringify(apiBody.messages, null, 2),
    );
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

    // Log token usage

    // Get tokens used in this response

    const tokensUsed = data.usage.total_tokens;
    dataTotal += tokensUsed;

    console.log("Tokens used in this call:", tokensUsed);

    console.log("API response total tokens: ", dataTotal);

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
