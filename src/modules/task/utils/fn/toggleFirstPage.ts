interface toggleFirstPageI {
	handleFirstPage: () => void;
}

export const toggleFirstPage = ({ handleFirstPage }: toggleFirstPageI) => {
	handleFirstPage();
};
