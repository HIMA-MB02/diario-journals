export const formatAMPM = string => {
	let date = new Date(string);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	let strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
  }
const parse = require('html-react-parser');
export const getLinesFromBlock = data => {
	let blocks = JSON.parse(data).blocks;
	let result = "";
	let count = 0;
	for(var block of blocks) {
		if(count === 3) {
			break;
		}
		if(block.text !== "") {
			result += block.text + '<br />';
			count++;
		}
	}
	return parse(result);
}