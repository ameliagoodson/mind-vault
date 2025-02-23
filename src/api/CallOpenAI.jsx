const apiKey = import.meta.env.VITE_OPENAI_SECRET_KEY;

export const callOpenAI = async (query) => {
  const apiBody = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content:
          "You are helpful assistant and you provide concise answers that are suitable for a flashcard.",
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
        "Content-type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
    });
    let data = await response.json();
    let jsondata = data.choices[0].message.content;
    return jsondata;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Error fetching response";
  }
};
