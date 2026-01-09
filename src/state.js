/**
* state.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import { redirect } from "./router.js";

export const App = {
	title: "Abhyasa",
	db: null, 
	data: [], // index data
	current: null, // current page data (topic/sub/module)
	REMOTE_BASE: "https://prahladyeri.github.io/open-quiz-commons/",
	helpers: {
		redirect,
		notFound() {
		  redirect("/404");
		}
	}
};

export const QuizState = {
	// Identifiers (The "Key" for persistence)
	quizKey: "",      // "python-flask-basics"
	currentIndex: 0, // Progress tracking
	answers: {},      // { 0: 1, 1: 2 } - index keyed to choice
	score: 0, // can be computed on the fly from answers
	// Metadata
	status: "idle",   // idle, playing, completed
	startTime: null, // 1736151000000
	endTime: null,
	timeSpent: 0, // <--- ADD THIS
	
	reset() {
        this.quizKey = "";
        this.currentIndex = 0;
        this.answers = {};
        this.score = 0;
        this.status = "idle";
        this.startTime = null;
        this.endTime = null;
    },	
	
	// Call this specifically when starting a NEW module
    init(topic, subtopic, module) {
        this.reset(); // Clear old data first
        this.quizKey = `${topic}.${subtopic}.${module}`;
        this.status = "playing";
        this.startTime = Date.now();
    },
  
	save() {
		// If a quiz is active, update timeSpent before saving
        if (this.startTime && this.status === 'playing') {
            this.timeSpent = Date.now() - this.startTime;
        }
		
		const data = JSON.stringify(this);
		localStorage.setItem(`quiz_progress_${this.quizKey}`, data);
	},

	load(key) {
		const saved = localStorage.getItem(`quiz_progress_${key}`);
		if (saved) {
		  Object.assign(this, JSON.parse(saved));
		  return true;
		}
		return false;
	},

	clear() {
		localStorage.removeItem(`quiz_progress_${this.quizKey}`);
	}
};