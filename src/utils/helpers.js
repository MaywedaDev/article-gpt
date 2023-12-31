export const generatePrompt = (keyword, density, tone) => {
    return `Generate an article with a title to based on the keyword below:\n ${keyword}\nLet the keyword density not be more than ${density}%.\nThe writing tone of the article's author must be ${tone}\n`
}

export const generateContent = async (prompt) => {
    const api_key = import.meta.env.VITE_GEMINI_API_KEY

    const requestData = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        stopSequences: []
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }

      console.log(requestData)


    const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    }).then(async(response) => {
        if(response.ok){
            return response.json()
        }
        throw await response.json()
    }).then(data => {
        console.log(data)
        return {success: true, error: null, output: data.candidates[0].content.parts[0].text}
    }).catch(error => {
        console.log(error)
        console.log(error.message, error.error)
        return {success: false, error: error.message, output: null}
    })

    return result

}