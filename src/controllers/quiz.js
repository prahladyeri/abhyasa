/**
* quiz.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import { App } from './state.js';

export async function index({ topic, subtopic }) {
    $("#app").html("<p>Loading quiz…</p>");
	let modules;
	// fetch quiz data
	App.topics.forEach(tt => {
		if (tt.slug == topic) 
		{
			if (!subtopic) {
				modules = tt.modules;
			} else {
				tt.subtopics.forEach(st => {
					if (st.slug == subtopic) {
						modules = st.modules;
					}
				});
			}
		}
	});
	let part = topic + "/" + (subtopic ? subtopic + "/" : "" );
	let url = App.INDEX_BASE + "";
    let data = await getTopic(topic, subtopic);

    if (!data) {
      data = await fetchQuizData(topic, subtopic);
      saveTopic(topic, subtopic, data);
    }

	//render quiz
    $("#app").html(`<h2>${data.topic} ${data.subtopic || ""}</h2>`);
  }