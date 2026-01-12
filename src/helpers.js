/**
* helpers.js
* 
* @author Prahlad Yeri <prahladyeri@yahoo.com>
* @license MIT
*/

//export function setTitle(parts = []) {
  //const suffix = "Abhyasa";
  //document.title = [...parts, suffix].join(" — ");
//}

export function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Defined once at the top (better performance)
const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});


export function toLocalTime(dt = new Date()) {
  const parts = formatter.formatToParts(dt);
  const dateMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return dateMap;
  //const datePart = `${dateMap.year}${dateMap.month}${dateMap.day}`;
}

/**
template string extrapolation helper:
*/
export function template(tstr, tvars){
    return new Function("return `"+ tstr +"`;").call(tvars);
    //return tstr.replace(/\${(\w+)}/g, (_, key) => tvars[key] ?? ""); // safer, regex based
}


