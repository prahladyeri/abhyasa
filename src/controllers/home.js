/**
* home.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import {App} from '../state.js';

export async function index() 
{
	App.setTitle(["Home"]);
	$("#app").html(`
<div class="d-flex flex-column align-items-center text-center">
            <img src="/img/home.png" class="img-fluid mb-4" style="max-width: 250px; border-radius: 14px;" alt="Logo">
            <h3 class='display-4'>Modular Quiz &<br>Assessment Engine</h3>
            <h5 class='text-muted fw-bold fst-italic'>Select a topic to get started</h5>
            </div>
	`);
}
