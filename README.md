## How to get started

make sure to `git clone <URL>` this repository first then follow the steps below:

1. create a `.env.local` file under `studysynth\`
2. in the `.env.local` file add `PERPLEXITY_API_KEY=<your api key>` and `OPENAI_API_KEY=<your_api_key>`
3. run `npm install` under `studysynth\`
4. run `npm run dev` under `studysynth\` and click on `http://localhost:3000/`

## Problem
Many students struggle with finding ways to study and having difficulty seeking resources they need in order to succeed. As a result, majority of students feel overwhelmed. There are two extremes, one or the other, that people face when it comes to studying:

🥵 <b>“Paradox of Choice”</b>: <b>61% of students</b> felt overwhelmed by the number of available study materials and were unsure which ones to prioritize
<br>
🥶 <b>Limited Access to Resources</b>:  <b>43% of students</b> reported not having access to all the resources they needed for their courses

Ultimately people either have too much or too little resources to study with.

## Solution
To tackle these two dillemas, I came up with a solution to help people study efficiently where StudySynth:
<br>
✅ Gives users a variety of preferences needed to help get their personalized study guide <br>
✅ Allows users the freedom to download and edit their study guide <br>
✅ Shares open and accessible resources to users <br>


## What it does
StudySynth offers various preferences that users can select from to help create their study guide. Users can paste topics + concepts, list strengths + weaknesses, input constraints, select media preferences, and choose to get practice problems and/or mock exams. With a click of a button, their study guide is created from Perplexity's API along with generated practice questions and/or mock exams from OpenAI's API (if they choose to). After users get their personalized study guide, they have the ability to download or edit it as a markdown file. The study guide is theirs to keep 🙂

## How I built it
**Frontend:** I used Next.js, Shadcn, and Tailwind to build the user interface
<br>
**Backend:** I used Next.js as a built-in backend. I created two file-based API route's, integrating Perplexity Sonar API and OpenAI API. 
<ol>
<li><b>(api/study-guide/)</b> calls Perplexity Sonar's API based on the user's query and integrated prompt. With the Sonar Deep Research model, it performs an extensive web search to gather accessible sources and creates an organized study guide</li>
<li><b>(api/practice-material/)</b> calls OpenAI's API and uses the GPT-4 model to generate practice questions and/or mock exams if the user chooses to</li>
</ol>

## Challenges I ran into
<ol>
<li>Although I was able to get the response back from Perplexity's API, the response time was slow so I had to perform minimal calls to the API in order to save time while making sure the response displayed the appropriate content</li>
<li>Another challenge was being able to gather the appropriate sources (links) with respect to the user's query and making them interactable so that the user can click on it, giving them access. At times, the responses were inconsistent and there was no links being displayed so by prompting, I reminded the LLM API to display links consistently</li>
<li>Additionally, a challenge was integrating OpenAI API in order to generate practice questions and/or mock exams and rendering them properly in the UI. By creating another API route, I had to handle how I would render and display both responses from two APIs while maintaining the structure of the user query</li>
</ol>

## Accomplishments that I'm proud of
I'm proud of being able to create a fullstack app by myself and implementing Perplexity's Sonar API for good use. Even though there were lots of hardships while I was coding, I was able to overcome them and be persistent. Knowing I created an impact-driven project, it motivated me to develop more in the future.

## What I learned
I learned how to use Next.js and Shadcn while integrating multiple LLM APIs into my project by using Next.js's file-based API routing system. Also I learned how to leverage TypeScript. Additionally, I was able to enhance my prompt engineering skills and use it to my advantage. 

## What's next for StudySynth

👨‍👩‍👧‍👦 Users can have their own accounts <br>
📚 Users can create multiple study guides to have them historically saved in their account <br>
📤 Ability to share personalized study guides to other students and peers <br>
🛠 Develop and integrate more features in StudySynth <br>
🏫 Make StudySynth a startup (maybe, just maybe) and pitch it for schools and institutions of all grades <br>
