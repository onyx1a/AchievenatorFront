import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavbarPanel from './components/NavbarPanel'
import Achievenator from './pages/Achievenator';
import About from './pages/About';
import Error from './pages/Error';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';


function App() {
	
	return (
		<div className="App">
			<BrowserRouter>
				<NavbarPanel/>
				<Routes>
					<Route path="/" element={<Achievenator />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
