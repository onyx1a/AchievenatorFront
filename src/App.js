import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SteamIDForm from './components/SteamIDForm';
import HelpButton from './components/HelpButton'
import GamePanel from './components/GamePanel'
import FilterPanel from './components/FilterPanel'

function App() {
	const [gameData, setGameData] = useState({});
	const [filteredData, setFilteredData] = useState([]);
	const [filterList, setFilterList] = useState(new Map());


	const getActualContainer = () => {
		if (filterList.size !== 0) {
			return filteredData;
		}
		return gameData.game_data;
	}

	const updateFilterList = () => {
		console.log(filterList);
		let data;
		if (filterList.size === 0) {
			setFilteredData([]);
			return;
		} else if (filterList.size === 1){
			data = gameData.game_data;
		} else {
			data = filteredData;
		}

		data = data.filter((item) => {
			return Array.from(filterList.values()).every((filter) => {
				return filter.callback(item);
			});
		});
		
		setFilteredData(data);
	};

	const addToFilterList = (filter) => {
		filterList.set(filter.key, filter);
		updateFilterList();
	};

	const removeFromFilterList = (filter) => {
		filterList.delete(filter.key);
		updateFilterList();
	};

	let has_data = Object.keys(gameData).length !== 0;
	
	if (has_data) {
		gameData.game_data.sort((a, b) => {
			var scoreA = a.a_count - a.a_done;
			var scoreB = b.a_count - b.a_done;
			if (scoreA < scoreB) {
				return -1;
			}
			if (scoreA > scoreB) {
				return 1;
			}
			return 0;
		});

		var game_count = gameData.game_data.length;
		var doneAchievements = gameData.overall_done_ach_count;
		var totalAchievements = gameData.overall_ach_count;
		var total_score = totalAchievements - doneAchievements;
	}

	return (
		<div className="App">
			<header className="App-header">

			</header>
			<body className="App-body">
				<SteamIDForm onDataReceived={setGameData}/>
				{has_data && (
					<>
						<hr/>
						<div className='user-stats stats-row'>
							<div className='stats-block'>Games<br/>{game_count}</div>
							<div className='stats-block'>Achievements<br/>{gameData.overall_done_ach_count}/{gameData.overall_ach_count}</div>
							<div className='stats-block'>Total score<br/>{total_score} <HelpButton text="Score — идентификация того, сколько у вас неполученных достижений."/></div>
						</div>
						<hr/>
						<FilterPanel addToFilterList={addToFilterList} removeFromFilterList={removeFromFilterList}/>
						<ul>
							{getActualContainer().slice(0, 20).map(game => (
								<li key={game.app_id}>
									<GamePanel game_info={game}/>
								</li>
							))}
						</ul>
					</>
				)}
			</body>
		</div>
	);
}

export default App;
