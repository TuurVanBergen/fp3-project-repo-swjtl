export default class formatDate {
	formatDate(inputDate) {
		const match = /^(\+\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}Z$/.exec(inputDate);
		//+1785-00-00T00:00:00Z
		//+1769-06-31T00:00:00Z
		if (!match) {
			// Handle invalid date format
			return "Invalid Date";
		}

		const dateString = match[1];
		const dateObject = new Date(dateString);
		const options = { day: "numeric", month: "long", year: "numeric" };

		return dateObject.toLocaleDateString("en-US", options);
	}

	formatTimelineDate(inputDate) {
		return inputDate.slice(0, 4);
	}
	formatYear(inputDate) {
		return inputDate.slice(1, 5);
	}
}
