import { Route, Routes } from 'react-router-dom';
import Navbar from './common/navbar';
import TaskList from './modules/task/pages/tasksList';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navbar />}>
				<Route path='/' index element={<TaskList />} />
			</Route>
		</Routes>
	);
};

export default App;
