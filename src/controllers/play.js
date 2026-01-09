/**
* play.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import playHtml from '../views/play.html';
import resultHtml from '../views/playResult.html';
import expModal from '../views/modals/explanation.html';
import { App, QuizState } from '../state.js';
import {escapeHTML, setTitle} from '../helpers.js';
//import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';


export async function index(parsed) {
	setTitle([parsed.tslug, parsed.stslug, parsed.mdslug]);
	$("#app").html('<div class="text-center mt-5"><div class="spinner-border text-primary"></div></div>');
	
	const subPath = parsed.stslug === 'main' ? '' : `${parsed.stslug}/`;
	const url = `${App.REMOTE_BASE}dataset/${parsed.tslug}/${subPath}${parsed.mdslug}.json`;
	let qadata;
	try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load quiz content");
        qadata = await res.json();
    } catch (err) {
        $("#app").html(`<div class="alert alert-danger">Error: ${err.message}</div>`);
        return;
    }	
	const key = `${parsed.tslug}.${parsed.stslug}.${parsed.mdslug}`;
	if (localStorage.getItem(`quiz_progress_${key}`)) {
		QuizState.load(key);
		renderQuiz(qadata);
		//TODO: In a later update, we can add a "Resume?" modal here
	} else {
		QuizState.init(parsed.tslug, parsed.stslug, parsed.mdslug);
        renderQuiz(qadata);		
	}
}


function renderQuiz(qadata) {
    const questions = qadata.data; // Corrected to .data
    const currentQ = questions[QuizState.currentIndex];
    
    // Calculate progress based on total questions in .data
    const progress = Math.round(((QuizState.currentIndex ) / questions.length) * 100);

    let html = playHtml
		.replace('{{questionText}}', marked.parse(currentQ.q))
		.replace('{{questionIdx}}', `${QuizState.currentIndex + 1} / ${questions.length}`)
		.replace('{{progressPer}}', progress)
		.replace('{{nextLabel}}', `${QuizState.currentIndex === questions.length - 1 ? 'Finish' : 'Next'}`)
	;
    $("#app").html(html);
	
	$(".play-container").find('.list-group').empty();
	const $list = $(".play-container").find('.list-group');
	currentQ.o.forEach((option, index) => {
		// Check if this option was previously selected
		const isSelected = QuizState.answers[QuizState.currentIndex] === index;
		const label = String.fromCharCode(65 + index); // Converts 0 to 'A', 1 to 'B', etc.
		
		$list.append(`<button class="list-group-item list-group-item-action rounded border answer-btn ${isSelected ? 'active' : ''}"  data-index="${index}"> <span class="me-3 fw-bold opacity-50">${label}.</span> ${escapeHTML(option)}</button>`);
	});
	
    setupEvents(qadata);
}

function setupEvents(qadata) {
    const questions = qadata.data;

    $(".answer-btn").click(function() {
        // Convert string data attribute to number for easier scoring later
        const selectedIndex = parseInt($(this).data("index"));
        QuizState.answers[QuizState.currentIndex] = selectedIndex;
        
        // UI feedback
        $(".answer-btn").removeClass("active");
        $(this).addClass("active");
        
        QuizState.save();
    });

    $("#next-btn").click(() => {
        if (QuizState.currentIndex < questions.length - 1) {
			if ($(".answer-btn.active").length == 0) // don't proceed unless answer selected
			{
				alert("Please select an answer before continuing.");
				return;
			}
            QuizState.currentIndex++;
            QuizState.save();
            renderQuiz(qadata);
        } else {
            processResults(questions, qadata); // User reached the end
        }
    });

    $("#prev-btn").click(() => {
        if (QuizState.currentIndex > 0) {
            QuizState.currentIndex--;
            renderQuiz(qadata); // No need to save on "back"
        }
    });
}

function processResults(questions, qadata) {
    // 1. Calculate Score
    let correct = 0;
    questions.forEach((q, index) => {
        if (QuizState.answers[index] === q.a) {
            correct++;
        }
    });

    // 2. Update Final State
    QuizState.score = correct;
    QuizState.status = "completed";
    QuizState.endTime = Date.now();
    QuizState.save();

    // 3. Render Results View
	let keyParts = QuizState.quizKey.split('.');
    const percentage = Math.round((correct / questions.length) * 100);
    let feedbackColor = percentage >= 70 ? 'text-success' : 'text-danger';
    
    let html = resultHtml
	.replace("{{percentage}}", percentage)
	.replace("{{resultSlug}}", (percentage >= 70 ? 'Passed' : 'Keep Learning'))
	.replace("{{durationText}}", calculateDuration())
	.replace("{{homeLink}}", `/quiz/${keyParts[0]}/${keyParts[1]}`)
	.replace("{{feedbackColor}}", feedbackColor)
	.replace("{{correctCnt}}", correct)
	.replace("{{questionsCnt}}", questions.length)
	;

    $("#app").html(html);
    setupResultEvents(qadata);
}

function calculateDuration() {
    const durationMs = QuizState.endTime - QuizState.startTime;
    const seconds = Math.floor((durationMs / 1000) % 60);
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
    return `${minutes}m ${seconds}s`;
}

function setupResultEvents(qadata) {
    $("#restart-btn").click(() => {
        const key = QuizState.quizKey; // Store it briefly
        QuizState.clear();             // Wipe storage
        location.reload();             // Simplest way to re-init the index() flow
    });
	
    $("#explanation-btn").click(() => {
		const questions = qadata.data;
		let $modal = $("#explanationModal");
		
		if ($modal.length === 0) { 
			$modal = $(expModal);
			$("body").append($modal); 
			$modal = $("#explanationModal");
		}	  
	  
		const container = $modal.find("#explanation-body")[0];
		container.innerHTML = ""; // clear old content

		questions.forEach((q, idx) => {
			console.log("quizstate.answers[idx]: ", QuizState.answers[idx]);
			const userAnswerIndex = QuizState.answers[idx]; // e.g. "a"
			//console.log("user answer is: ", userAnswerLetter);
			//const userAnswerIndex = userAnswerLetter ? userAnswerLetter.charCodeAt(0) - 65 : null;
			const correctIndex = q.a;

			const userAnswerText = userAnswerIndex !== null ? q.o[userAnswerIndex] : "(no answer)";
			const correctAnswerText = q.o[correctIndex];

			const block = document.createElement("div");
			block.classList.add("mb-4");
			const correctnessClass = userAnswerIndex === correctIndex ? "text-success" : "text-danger";

			block.innerHTML = `
			  <h6>Q${idx + 1}. ${q.q}</h6>
			  <p><strong>Your answer:</strong>
			  <span class="${correctnessClass}">${userAnswerText}</span></p>
			  <p><strong>Correct answer:</strong> ${correctAnswerText}</p>
			  <p class="text-muted"><em>${q.explanation || ""}</em></p>
			  <hr>
			`;

			container.appendChild(block);
		});
		// Show the modal 
		const modal = new bootstrap.Modal($modal[0]);
		modal.show();	  
    });	

    $("#exit-btn").click(() => {
        QuizState.clear();             // Optional: Clear if you don't want them resuming a finished quiz
    });
}