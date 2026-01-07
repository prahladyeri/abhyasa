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
            <img src="./logo-sm.png" class="img-fluid mb-4" style="max-width: 190px; border-radius: 133px;" alt="Logo">
            <h1>Modular Quiz &<br>Assessment Engine</h1>
            <p class='text-muted text-bold'>Select a topic to get started.</p>
            </div>
	`);
}
