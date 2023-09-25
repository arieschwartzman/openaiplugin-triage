import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
// parse body into json
import bodyParser from 'body-parser';


interface Session {
  seq: number;
}
interface Sessions {
  [id: string]: Session;
}
let sessions: Sessions = {};

let questions = [
  "how old are you?",
  "what's your gender?",
  "what is the pain level from 1-10",
  "was it an injury?",
  "what is the location of the pain?"
];

let diagnosis = [
  "you have a broken leg",
]


dotenv.config();

// Create a client to call Azure Text Analytics for Health

const app: Express = express();
// parse query string parameters
app.use(bodyParser.json());

const port = process.env.PORT || 5003;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

/**
 * Serve local file .well-known/ai-plugin.json as application/json
 */
app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile('./.well-known/ai-plugin.json', { root: __dirname });
});


/**
 * Serve local file openapi.yaml as text/yaml
 */
app.get('/openapi.yaml', (req, res) => {
  res.setHeader('Content-Type', 'text/yaml');
  res.sendFile('openapi.yaml', { root: __dirname });
});

/**
 * Serve local file logo.png as image/png
 */
app.get('/logo.png', (req, res) => {
  res.setHeader('Content-Type', 'image/png');
  res.sendFile('logo.png', { root: __dirname });
});


/**
 * This endpoint is called by the Open AI plugin to get the clinical trials for a patient
 */
app.post('/triage', async (req: Request, res: Response) => {
  const body = req.body;
  const sessionId= req.headers['openai-conversation-id'] as string;

  let session = sessions[sessionId];
  if (!session) {
    session = { seq: 0 };
  }
  const seq = session.seq;
  sessions[sessionId] = { seq: seq + 1 };
  let nextQuestion = questions[seq];
  res.send({nextQuestion: nextQuestion, diagnosis:  nextQuestion ? undefined: diagnosis[0]});
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;