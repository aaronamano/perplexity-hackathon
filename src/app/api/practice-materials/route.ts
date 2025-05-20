import { NextResponse } from 'next/server';

export interface StudyGuideRequest {
  topics: string;
  strengths: string[];
  weaknesses: string[];
  practiceOptions: {
    includePracticeProblems: boolean;
    includeMockExams: boolean;
    difficulty: string;
    quantity: number;
  };
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topics, strengths = [], weaknesses = [], practiceOptions } = body;

    const prompt = `Generate targeted ${practiceOptions.includePracticeProblems ? 'practice problems' : ''} 
${practiceOptions.includeMockExams ? 'and a mock exam' : ''} for the following topics:
${topics}

Student Profile:
- Strengths: ${strengths.join(', ')}
- Areas needing improvement: ${weaknesses.join(', ')}

Instructions:
- Focus more practice on the areas needing improvement
- Include some questions leveraging the student's strengths
- Adapt difficulty based on the student's profile

Requirements:
${practiceOptions.includePracticeProblems ? 
`- Generate ${practiceOptions.quantity} practice problems
- Difficulty level: ${practiceOptions.difficulty}
- Each problem should have a clear solution
- Format as Q1. [Question] followed by A1. [Answer]
- Include more questions on weak areas: ${weaknesses.join(', ')}` : ''}

${practiceOptions.includeMockExams ? 
`- Generate a comprehensive mock exam
- Difficulty level: ${practiceOptions.difficulty}
- Include a mix of question types
- Ensure 60% of questions focus on weak areas
- Provide detailed solutions
- Format with clear sections for questions and answers` : ''}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert at creating educational practice materials and mock exams. Generate clear, well-structured content with detailed solutions."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const practiceMaterials = data.choices[0].message.content;

    return NextResponse.json({ practiceMaterials }, { status: 200 });
  } catch (error) {
    console.error('Error generating practice materials:', error);
    return NextResponse.json(
      { error: 'Failed to generate practice materials' },
      { status: 500 }
    );
  }
}
