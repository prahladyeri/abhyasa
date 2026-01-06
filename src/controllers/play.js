/**
* play.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import { App, QuizState } from '../state.js';

export async function index({ topicSlug, subtopicSlug, moduleSlug }) {
	//document.title = `${topicSlug} Quiz - Abhyasa`;
	
	$("#app").html('<div class="text-center mt-5"><div class="spinner-border text-primary"></div></div>');
	
	const subPath = subtopicSlug === 'main' ? '' : `${subtopicSlug}/`;
	const url = `${App.REMOTE_BASE}dataset/${topicSlug}/${subPath}${moduleSlug}.json`;
	let qadata;
	try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load quiz content");
        qadata = await res.json();
    } catch (err) {
        $("#app").html(`<div class="alert alert-danger">Error: ${err.message}</div>`);
        return;
    }	
	const key = `${topicSlug}.${subtopicSlug}.${moduleSlug}`;
	if (localStorage.getItem(`quiz_progress_${key}`)) {
		QuizState.load(key);
		renderQuiz(qadata);
		//TODO: In a later update, we can add a "Resume?" modal here
	} else {
		QuizState.init(topicSlug, subtopicSlug, moduleSlug);
        renderQuiz(qadata);		
	}
}


function renderQuiz(qadata) {
    const questions = qadata.data; // Corrected to .data
    const currentQ = questions[QuizState.currentIndex];
    
    // Calculate progress based on total questions in .data
    const progress = Math.round(((QuizState.currentIndex) / questions.length) * 100);

    let html = `
    <div class="container py-4">
        <div class="progress mb-4" style="height: 10px;">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${progress}%"></div>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="badge bg-light text-dark border">Question ${QuizState.currentIndex + 1} / ${questions.length}</span>
                </div>
                
                <h4 class="card-title mb-4 fw-bold">${currentQ.q}</h4>
                
                <div class="list-group gap-2">
                    ${currentQ.o.map((option, index) => {
                        // Check if this option was previously selected
                        const isSelected = QuizState.answers[QuizState.currentIndex] === index;
                        const label = String.fromCharCode(65 + index); // Converts 0 to 'A', 1 to 'B', etc.
                        
                        return `
                            <button class="list-group-item list-group-item-action rounded border answer-btn ${isSelected ? 'active' : ''}" 
                                    data-index="${index}">
                                <span class="me-3 fw-bold opacity-50">${label}.</span> 
                                ${option}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="card-footer bg-white border-top-0 p-4 pt-0 d-flex justify-content-between">
                <button class="btn btn-outline-secondary btn-lg px-4" id="prev-btn" 
                    ${QuizState.currentIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left me-2"></i> Back
                </button>
                
                <button class="btn btn-primary btn-lg px-4" id="next-btn">
                    ${QuizState.currentIndex === questions.length - 1 ? 'Finish' : 'Next'} 
                    <i class="fas fa-arrow-right ms-2"></i>
                </button>
            </div>
        </div>
    </div>`;

    $("#app").html(html);
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
            QuizState.currentIndex++;
            QuizState.save();
            renderQuiz(qadata);
        } else {
            // User reached the end
            processResults(questions);
        }
    });

    $("#prev-btn").click(() => {
        if (QuizState.currentIndex > 0) {
            QuizState.currentIndex--;
            renderQuiz(qadata); // No need to save on "back"
        }
    });
}

function processResults(questions) {
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
    const percentage = Math.round((correct / questions.length) * 100);
    let feedbackColor = percentage >= 70 ? 'text-success' : 'text-danger';
    
    let html = `
    <div class="container py-5 text-center">
        <div class="card shadow border-0 mx-auto" style="max-width: 500px;">
            <div class="card-body p-5">
                <i class="fas fa-poll-h fa-4x mb-4 text-primary opacity-25"></i>
                <h2 class="fw-bold mb-2">Quiz Complete!</h2>
                <p class="text-muted mb-4">Here is how you performed:</p>
                
                <div class="display-4 fw-bold ${feedbackColor} mb-2">${percentage}%</div>
                <h5 class="mb-4 text-muted">${correct} out of ${questions.length} Correct</h5>

                <div class="row g-2 mb-4">
                    <div class="col-6">
                        <div class="p-3 bg-light rounded border">
                            <small class="d-block text-uppercase text-muted small fw-bold">Time Taken</small>
                            <span>${calculateDuration()}</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-3 bg-light rounded border">
                            <small class="d-block text-uppercase text-muted small fw-bold">Status</small>
                            <span class="${feedbackColor} fw-bold">${percentage >= 70 ? 'Passed' : 'Keep Learning'}</span>
                        </div>
                    </div>
                </div>

                <div class="d-grid gap-2">
                    <button class="btn btn-primary btn-lg" id="restart-btn">
                        <i class="fas fa-redo me-2"></i> Retake Quiz
                    </button>
                    <a href="#/" class="btn btn-outline-secondary btn-lg" id="exit-btn">
                        <i class="fas fa-home me-2"></i> Exit to Home
                    </a>
                </div>
            </div>
        </div>
    </div>`;

    $("#app").html(html);
    setupResultEvents();
}

function calculateDuration() {
    const durationMs = QuizState.endTime - QuizState.startTime;
    const seconds = Math.floor((durationMs / 1000) % 60);
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
    return `${minutes}m ${seconds}s`;
}

function setupResultEvents() {
    $("#restart-btn").click(() => {
        const key = QuizState.quizKey; // Store it briefly
        QuizState.clear();             // Wipe storage
        location.reload();             // Simplest way to re-init the index() flow
    });

    $("#exit-btn").click(() => {
        QuizState.clear();             // Optional: Clear if you don't want them resuming a finished quiz
    });
}