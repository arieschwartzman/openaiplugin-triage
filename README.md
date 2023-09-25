# Medical Triage Plugin 

This plugin demonstrates the ability of **OpenAI GPT** plugin to serve as multi-turn session affiliated triage bot. It's triggered when medical condition is detected and it offers subsequent questions that are embellished by ChatGPT. 

Here are a list of suggested questions in sequence that are asked by the plugin after the initial intent is detected.

```javascript
let questions = [
  "how old are you?",
  "what's your gender?",
  "what is the pain level from 1-10",
  "was it an injury?",
  "what is the location of the pain?"
];
```

When all the questions are exhausted, a diagnosis is given to end the conversation with the plugin.

The session stickiness is achieved by using the header passed from ChatGPT *openai-conversation-id*. We keep the session in memory in this example, so we can advance the next question and at the end, give the diagnosis

Here is the openapi.yaml file

```yaml
openapi: 3.0.1
info:
  title: Medical Triage Bot
  description: medical triage bot. can get symptoms and ask questions to narrow the diagnosis. Can also accept answers such as 'yes' or 'no' to narrow the diagnosis..
  version: 'v1'
servers:
  - url: https://openaiplugin.ngrok.app
paths:
  /triage/:
    post:
      operationId: diagnose
      summary: Get the next question from the user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                inputString:
                  type: string                  

      responses:
        "200":
          description: "Success"
          content:
            application/json:
              schema:
                type: object
                properties:
                  nextQuestion:
                    type: string
                    example: "what ever the bot says"
                  diagnosis:
                    type: string
                    example: "what ever the bot says"
```


![](https://github.com/openaiplugin-triage/triageplugin.gif)
