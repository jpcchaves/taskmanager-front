interface ToggleLessTasksI {
	tasksPage: number;
	handleDecreaseTaskPage: () => void;
}

export const toggleLessTasks = ({
	tasksPage,
	handleDecreaseTaskPage,
}: ToggleLessTasksI) => {
	if (tasksPage - 1 < 0) {
		return;
	} else {
		handleDecreaseTaskPage();
	}
};
