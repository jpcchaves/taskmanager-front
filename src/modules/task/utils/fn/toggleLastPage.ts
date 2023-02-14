interface ToggleLastPageI {
	handleLastPage: () => void;
}

export const toggleLastPage = ({ handleLastPage }: ToggleLastPageI) => {
	handleLastPage();
};
