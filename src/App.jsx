import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import MultiStepForm from './components/MultiStepForm';
function App() {
	const [count, setCount] = useState(0)
	const handleClick = () => {
		alert("Button Clicked!");
	};

	

	return (
		<>
			<div className='flex flex-col min-h-screen w-[100%]'>
				<Header></Header>
				<MultiStepForm></MultiStepForm>
			</div>
		</>
	)
}

export default App
