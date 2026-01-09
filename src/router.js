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
import { App } from "./state.js";

const controllers = {home, about, quiz, play, notFound};

function parsePath(path) {
	const parts = path.split("/").filter(Boolean);
	const result = {'p1': parts[0]};

	const topic = App.data.find(tp => tp.slug == parts[1]);
	if (!topic) return result;

	result.tname = topic.name;
	result.tslug = topic.slug;

	let modules;
	if (parts[2] == 'main') { // core subtopic
		result.stname = topic.name;
		result.stslug = 'main';
		modules = topic.modules;
	} else {
		const st = topic.subtopics.find(st => st.slug == parts[2]);
		if (!st) return result;
		result.stname = st.name;
		result.stslug = st.slug;
		modules = st.modules;
	}
	if (parts[3]) {
		const md = modules.find(mm => mm.slug == parts[3]);
		if (!md) return result;
		result.mdname = md.name;
		result.mdslug = md.slug;
	}
	return result;
}

//TODO: improve structure to make it dynamic, remove parameter dependencies
export function route(path) {
	console.log("routing... path: ", path);
	const parsed = parsePath(path);
	//console.log("parsed.p1: ", parsed.p1);
	//const parts = path.split("/").filter(Boolean);
	//if (parts.length === 0) return controllers.home.index();
	switch(parsed.p1) {
		case "about":
			return controllers.about.index();
			break;
		case "quiz":
			return controllers.quiz.index(parsed);
			break;
		case "play":
			return controllers.play.index(parsed);
			break;
		default:
			return controllers.home.index();
			break;
	}
	controllers.notFound.index();
}

// export function redirect(path, { replace = false } = {}) {
// 	replace
// 	  ? history.replaceState({}, "", path)
// 	  : history.pushState({}, "", path);

export function redirect(path) {
	history.replaceState({}, "", path);
	route(path);
}

export function navigate(path) {
	history.pushState({}, "", path);
	route(path);
}