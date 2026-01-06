/**
* home.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
export async function index() 
{
	$("#app").html(`
<div class="d-flex flex-column align-items-center text-center">
            <img src="./logo-sm.png" class="img-fluid mb-4" style="max-width: 200px;" alt="Logo">
            <h1>Welcome to the Quiz</h1>
            <p>Select a topic to get started.</p>
            </div>
	`);
}
