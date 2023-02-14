interface ToggleMoreTasksI {
	tasksPage: number;
	totalPages: number;
	handleIncreaseTaskPage: () => void;
}

export const toggleMoreTasks = ({
	tasksPage,
	totalPages,
	handleIncreaseTaskPage,
}: ToggleMoreTasksI) => {
	if (tasksPage + 1 >= totalPages) {
		return;
	} else {
		handleIncreaseTaskPage();
	}
};
