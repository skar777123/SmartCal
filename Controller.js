
import axios from 'axios';
import Calories from './Calmodel'; 
import User from './User Model'; 

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 


export const analyzeCalories = async (req, res) => {
    const { userId, calorieData } = req.body;

    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        // Save calorie data to the database
        const calories = new Calories({ userId, data: calorieData });
        await calories.save();

        // Prepare the prompt for OpenAI
        const prompt = `Analyze the following calorie data: ${JSON.stringify(calorieData)}`;

        // Make a request to OpenAI
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003', // or any other model you prefer
            prompt: prompt,
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Send the analysis result back to the client
        res.status(200).json({
            analysis: response.data.choices[0].text,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while analyzing calories' });
    }
};