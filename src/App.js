import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SteamIDForm from './components/SteamIDForm';
import HelpButton from './components/HelpButton'
import GamePanel from './components/GamePanel'

function gameFiler(item) {
	let itemScore = item.a_count - item.a_done;
	return itemScore != 0;
}

function App() {
	const [gameData, setGameData] = useState({});
	const [showFullDone, setShowFullDone] = useState(false);

	console.log(gameData);
	let has_data = Object.keys(gameData).length !== 0;
	console.log(has_data);

	if (has_data) {
		if (!showFullDone) {
			gameData.game_data = gameData.game_data.filter(gameFiler);
		}

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
						<ul>
							{gameData.game_data.slice(0, 20).map(game => (
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
