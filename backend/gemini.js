import axios from 'axios'
const geminiResponse = async (command, assistantName, userName) => {
    try{
        const apiUrl = process.env.GEMINI_API_URL
        // console.log("Gemini API URL:", apiUrl)
        const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
        You are not Google. You will now behave like a voice-enabled assistant.

        Your task is to understand the user's natural language input and respond with a JSON object like this:

        {
            "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather-show",
            
            "userInput": "< original user input>" {only remove your name from userInput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,

            "response": "<a short spoken response to read out loud to the users>" 
        }

        Instructions:
        - "type": determine the intent of the user.
        - "userInput": original sentence the user spoke.
        - "response": "A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

        Type meanings: 
        - "general": if it's factual or informational question. aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
        - "google_search": if user wants to search something on Google.
        - "youtube_search": if user wants to search something on Youtube.
        - "youtube_play": if user wants to directly play a video song.
        - "calculator_open": if user wants to open a calculator.
        - "instagram_open": if user wants to open instagram.
        - "facebook_open": if user wants to open facebook.
        - "weather_show": if user wants to know weather.



        Important:
        - Use "${userName}" agar koi puche tume kisne banaya
        - Only respond with the JSON object, nothing else.
        
        now your userInput- ${command}
        `



        const result = await axios.post(apiUrl, {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        })
        return result.data.candidates[0].content.parts[0].text
    }catch(error){
    console.log("GEMINI ERROR:", error.response?.data || error.message)
}
}

export default geminiResponse