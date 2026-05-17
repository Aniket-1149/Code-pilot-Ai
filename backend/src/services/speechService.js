const speech = require('@google-cloud/speech');

function createSpeechClient() {
  return new speech.SpeechClient({
    projectId: process.env.SPEECH_PROJECT_ID
  });
}

async function transcribeAudio(buffer, config) {
  const client = createSpeechClient();
  const audio = { content: buffer.toString('base64') };
  const request = { audio, config };
  const [response] = await client.recognize(request);
  return response.results?.map((r) => r.alternatives?.[0]?.transcript).join('\n');
}

module.exports = { transcribeAudio };
