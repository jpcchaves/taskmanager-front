import { Route, Routes } from 'react-router-dom';
import Navbar from './common/navbar';
import TasksForm from './modules/task/pages/tasksForm';
import TaskList from './modules/task/pages/tasksList';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navbar />}>
				<Route path='/' index element={<TaskList />} />
				<Route path='/task/new' element={<TasksForm />} />
				<Route path='/task/edit/:id' element={<TasksForm />} />
			</Route>
		</Routes>
	);
};

export default App;
