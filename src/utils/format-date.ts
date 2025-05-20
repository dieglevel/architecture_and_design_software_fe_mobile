export const formatDateFromTimestamp = (timestamp: number): string => {
	const date = new Date(timestamp);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
};

export const formatDateToDDMMYYYY = (date: Date | null) => {



	if (!date) {
		return "";
	}
	const dateDate = new Date(date);
	const day = String(dateDate.getDate()).padStart(2, "0");
	const month = String(dateDate.getMonth() + 1).padStart(2, "0");
	const year = dateDate.getFullYear();
	return `${day}/${month}/${year}`;
};