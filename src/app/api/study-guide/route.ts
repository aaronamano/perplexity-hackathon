import { NextResponse } from 'next/server';

export interface StudyGuideRequest {
  topics: string;
  constraints: string;
  strengths: string[];
  weaknesses: string[];
  mediaPreferences: {
    videos: boolean;
    flashcards: boolean;
    diagrams: boolean;
    readings: boolean;
    summaries: boolean;
    externalResources: boolean;
  };
  studyPlan: {
    duration: string;
    intensity: string;
    difficulty: number;
    learningStyle: string;
  };
  practiceOptions: {
    includePracticeProblems: boolean;
    includeMockExams: boolean;
    difficulty: string;
    quantity: number;
  };
}

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export async function POST(request: Request) {
  try {
    const body: StudyGuideRequest = await request.json();

    // Construct the prompt for Perplexity API
    const prompt = `Generate a detailed study guide for the following topics:
${body.topics}

Consider these parameters:
- Strengths: ${body.strengths.join(', ')}
- Areas for improvement: ${body.weaknesses.join(', ')}
- Learning style: ${body.studyPlan.learningStyle}
- Study duration: ${body.studyPlan.duration}
- Difficulty level: ${body.studyPlan.difficulty}

Format the response as a markdown document with sections for Overview, Key Concepts, Strengths, Areas for Improvement, and Study Plan.`;

    // Call Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "sonar-deep-research",
        messages: [
          {
            role: "system",
            content: "You are a professional study guide creator. Generate detailed, well-structured study guides in markdown format."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Perplexity API request failed');
    }

    const data = await response.json();
    const studyGuide = data.choices[0].message.content;

    return NextResponse.json({ studyGuide }, { status: 200 });
  } catch (error) {
    console.error('Error generating study guide:', error);
    return NextResponse.json(
      { error: 'Failed to generate study guide' },
      { status: 500 }
    );
  }
}