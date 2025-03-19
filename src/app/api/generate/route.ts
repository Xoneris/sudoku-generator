import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST() {

    // const sudoku = [
    //     [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //     [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //     [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //     [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //     [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //     [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //     [0, 6, 0, 0, 0, 0, 2, 8, 0],
    //     [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //     [0, 0, 0, 0, 8, 0, 0, 7, 9]
    // ]

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


        
        const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

        try {
            
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                store: true,
                messages: [
                    {"role": "user", "content": "Generate a completely unique, valid, and solvable Sudoku puzzle. Ensure that each puzzle is different from previous ones. Return only a JSON object with a 9x9 matrix containing numbers 1-9 and some empty spaces (0s).Ensure the puzzle follows standard Sudoku rules."},
                ],
            });
            
            
            return NextResponse.json({sudoku: completion.choices[0].message.content})

        } catch (error) {
            
            return NextResponse.json({error: "Failed to generate a Sudoku"},{status: 500})
        }
        




    
}