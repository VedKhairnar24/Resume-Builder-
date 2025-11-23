import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateEmail = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        // 🔥 Use new GenAI format
        const response = await client.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
Write a polished, professional email based on the context below.
Include a Subject line.

CONTEXT:
${prompt}
              `,
                        },
                    ],
                },
            ],
        });

        // Get final text output
        const output = response.text;

        // Extract subject
        const match = output.match(/Subject:\s*(.*)/i);
        const subject = match ? match[1].trim() : "Generated Email";

        return res.status(200).json({
            success: true,
            subject,
            email: output,
        });

    } catch (error) {
        console.error("Gemini Email Generation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate email. Try again later.",
        });
    }
};
