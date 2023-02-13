interface ToggleMoreTasksI {
	tasksPage: number;
	totalPages: number;
	handleTasksPageStateChange: () => void;
}

export const toggleMoreTasks = ({
	tasksPage,
	totalPages,
	handleTasksPageStateChange,
}: ToggleMoreTasksI) => {
	if (tasksPage + 1 >= totalPages) {
		return;
	} else {
		handleTasksPageStateChange();
	}
};
