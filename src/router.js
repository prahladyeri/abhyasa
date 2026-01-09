/**
* router.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import * as home from "./controllers/home.js";
import * as about from "./controllers/about.js";
import * as quiz from "./controllers/quiz.js";
import * as play from "./controllers/play.js";
import * as notFound from "./controllers/notFound.js";
const controllers = {home, about, quiz, play, notFound};
const title = "Abhyasa";

export function route(path) {
	console.log("routing... path: ", path);
	const parts = path.split("/").filter(Boolean);

	if (parts.length === 0) return controllers.home.index();
	switch(parts[0]) {
		case "about":
			return controllers.about.index();
			break;
		case "quiz":
			return controllers.quiz.index({topic: parts[1], subtopic: parts[2]});
			break;
		case "play":
			return controllers.play.index({topicSlug: parts[1], subtopicSlug: parts[2], moduleSlug: parts[3]});
			break;
	}
	controllers.notFound.index();
}

export function redirect(path, { replace = false } = {}) {
  replace
    ? history.replaceState({}, "", path)
    : history.pushState({}, "", path);

  route(path);
}