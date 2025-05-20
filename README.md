## How to get started

make sure to `git clone <URL>` this repository first then follow the steps below:

1. create a `.env.local` file under `studysynth\`
2. in the `.env.local` file add `PERPLEXITY_API_KEY=<your api key>` and make sure your api key is in quotation ("") marks
3. in the terminal under `studysynth\`, run `npm install`
4. if needed, run `npx shadcn@<desired-version> init` or `npx shadcn@latest init` in the terminal under `studysynth\` then run `npx shadcn@latest add --all` in the terminal under `studysynth\` <a href="https://ui.shadcn.com/docs/installation/next">refer to documentation</a>
5. then in the terminal under `studysynth\` run `npm run dev`

## Problem
Many people struggle with studying and as a result feel overwhelmed. There are two extremes, one or the other, that people face when it comes to studying:

🥵 <b>“Paradox of Choice”</b>: <b>61% of students</b> felt overwhelmed by the number of available study materials and were unsure which ones to prioritize
<br>
🥶 <b>Limited Access to Resources</b>:  <b>43% of students</b> reported not having access to all the resources they needed for their courses

The problem is that people either have too much or too little resources to study with.

## Solution
To tackle these two dillemas, I came up with a solution to help people study efficiently where StudySynth:
<br>
✅ Gives users a variety of preferences needed to help get their personalized study guide <br>
✅ Allows users the freedom to download and edit their study guide <br>
✅ Shares open and accessible resources to users <br>


## What it does
StudySynth offers various preferences that users can select from to help create their study guide. Users can paste topics and concepts, list strengths and weaknesses, input constraints, select media preferences, and choose to get practice problems that simulate something from a quiz, test, or exam. Once users are able to select their preferences, they create their study guide with just a click of a button and receive a personalized study guide created by Perplexity's API and Sonar Deep Research Model. Once users get their AI generated study guide, they have the ability to download or edit it. The study guide is theirs to keep 🙂

## How I built it
**Frontend:** Next.js, Shadcn, and Tailwind to build the user interface
<br>
**Backend:** Next.js as a built-in backend. I created a file-based API route, integrating Perplexity Sonar API. 

## Challenges I ran into
Although I was able to get the response back from Perplexity's API, the response time was slow. Also, another challenge I ran into was getting all of the information in the user query to be passed to the API and return an accurate, consistent response. Additionally, another challenge was being able to gather the appropriate sources (links) with respect to the user's query and making them interactable so that the user can easily click on it. 

## Accomplishments that I'm proud of
I'm proud of being able to create a fullstack app by myself and implementing Perplexity's Sonar API for good use.

## What I learned
I learned how to use Next.js and Shadcn while integrating LLM APIs into my project by using Next.js's file-based API routing system, which is the backend. Also I learned how to leverage TypeScript. Additionally, I was able to enhance my prompt engineering skills and use it to my advantage. 

## What's next for StudySynth

👨‍👩‍👧‍👦 Users can have their own accounts <br>
🏫 Implement this as a startup for schools and institutions of all grades <br>
📚 Users can create multiple study guides and have them historically saved in their account <br>
📤 Ability to share personalized study guides to other students and peers <br>

