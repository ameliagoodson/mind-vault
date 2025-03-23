const apiKey = import.meta.env.VITE_OPENAI_SECRET_KEY;

// Store token count in sessionStorage instead of a module variable
// This allows it to be reset when needed
const getTokenTotal = () => {
  const stored = sessionStorage.getItem("openai_token_total");
  return stored ? parseInt(stored, 10) : 0;
};

const updateTokenTotal = (newTotal) => {
  sessionStorage.setItem("openai_token_total", newTotal.toString());
  return newTotal;
};

// Function to reset the token counter
export const resetTokenCounter = () => {
  sessionStorage.removeItem("openai_token_total");
  console.log("✅ Token counter reset to 0");
  return 0;
};

export const callOpenAI = async (question, conversation = []) => {
  // Convert conversation to the format expected by OpenAI API
  const conversationMessages = conversation.map((msg) => ({
    role: msg.type === "user" ? "user" : "assistant",
    content: msg.content,
  }));

  const apiBody = {
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a helpful AI coding assistant and tutor that provides clear, well-structured explanations. Your responses should be **natural, conversational, and adaptable**—not just technical answers.
        - When a coding question is asked, provide a **detailed explanation and a relevant code example**.
        - If the user provides feedback, **acknowledge it and clarify misunderstandings instead of ignoring it**.
        - If a question is ambiguous, **ask for clarification instead of assuming**.
        - Respond in a way that mimics a **helpful mentor, not just an API response**. 
        Always respond in valid JSON with the exact structure:
        {
          "answer": "<answer>",
          "categories": ["<First Category>", "<Second Category>"],
          "example": "<Only include the raw code. Do not add explanations, but you may include inline comments where necessary (// or /* */). Do not give code or return anything if it is not a coding question.>",
        }
        Ensure all properties are always included. Never return any additional text outside the JSON object.`,
      },
      ...conversationMessages.slice(-10), // Only use the last 10 messages to prevent token limit issues
      {
        role: "user",
        content: question,
      },
    ],
  };

  try {
    console.log("🚀 Sending request to OpenAI:", {
      model: apiBody.model,
      messageCount: apiBody.messages.length,
    });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(apiBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ API Response received");

    // Track token usage
    if (data.usage) {
      const tokensUsed = data.usage.total_tokens;
      const currentTotal = getTokenTotal();
      const newTotal = currentTotal + tokensUsed;
      updateTokenTotal(newTotal);
      console.log(
        `Tokens used in this call: ${tokensUsed}, Total: ${newTotal}`,
      );
    }

    // Extract and parse the JSON string from the response
    const jsonString = data.choices[0].message.content;

    try {
      const structuredData = JSON.parse(jsonString);
      return structuredData;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      return {
        answer: "There was an error processing the AI response.",
        categories: ["Error"],
        example: "",
      };
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error; // Rethrow to be handled by the caller
  }
};
