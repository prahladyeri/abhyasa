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
            <img src="./logo-sm.png" class="img-fluid mb-4" style="max-width: 190px; border-radius: 133px;" alt="Logo">
            <h1>Modular Quiz &<br>Assessment Engine</h1>
            <p class='text-muted text-bold'>Select a topic to get started.</p>
            </div>
	`);
}
