import { TaskI } from './taskI';

export interface UpdateTaskPayloadI {
	id: string | undefined;
	formPayload: {
		task: string;
		concluded: boolean;
		deadline: string;
	};
}
