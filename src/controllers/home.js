/**
* home.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import { setTitle} from '../helpers.js';

export async function index() 
{
	setTitle(["Home", "Modular Quiz & Assessment Engine"]);
	$("#app").html(`
<div class="d-flex flex-column align-items-center text-center">
            <img src="/img/home.png" class="img-fluid mb-4" style="max-width: 250px; border-radius: 14px;" alt="Logo">
            <h3 class='display-4'>Modular Quiz &<br>Assessment Engine</h3>
            <h5 class='text-muted fw-bold fst-italic'>Select a topic to get started</h5>
            </div>
	`);
}
