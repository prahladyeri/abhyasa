/**
* notFound.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/
import {setTitle} from '../helpers.js';

export function index() 
{
	setTitle("Not Found");
	$("#app").html("<h1>404</h1>");
}
