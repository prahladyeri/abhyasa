async function saveTopic(topic, subtopic, data) {}

async function getTopic(topic, subtopic) {}

async function fetchQuizData(topic, subtopic) {
  return { topic, subtopic, questions: [] };
}

function renderQuiz(data) {
  $("#app").html(`<h2>${data.topic} ${data.subtopic || ""}</h2>`);
}

export async function index({ topic, subtopic }) {
    $("#app").html("<p>Loading quiz…</p>");

    let data = await getTopic(topic, subtopic);

    if (!data) {
      data = await fetchQuizData(topic, subtopic);
      saveTopic(topic, subtopic, data);
    }

    renderQuiz(data);
  }