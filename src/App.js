import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SteamIDForm from './SteamIDForm';

function App() {
  const [gameData, setGameData] = useState({});
  const [showFullDone, setShowFullDone] = useState(false);

  console.log(gameData);
  let has_data = Object.keys(gameData).length !== 0;
  console.log(has_data);

  if (has_data) {
    if (!showFullDone) {
      gameData.game_data = gameData.game_data.filter(item => item.achievements_count - item.achievements_done != 0);
    }

    gameData.game_data.sort((a, b) => {
      var scoreA = a.achievements_count - a.achievements_done;
      var scoreB = b.achievements_count - b.achievements_done;
      if (scoreA < scoreB) {
        return -1;
      }
      if (scoreA > scoreB) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <body className="App-body">
        <SteamIDForm onDataReceived={setGameData}/>
        {has_data && (
          <div>
            <div>
              Games: {gameData.game_data.length}<br/>
              Achievements: {gameData.overall_done_ach_count}/{gameData.overall_ach_count}<br/>
              Total score: {gameData.overall_ach_count-gameData.overall_done_ach_count} (?)<br/>
            </div>
            <ul>
              {gameData.game_data.map(game => (
                <li key={game.app_id}>
                  <div className='game-item'>
                    <img className='game-logo' key={game.app_id} src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.app_id}/header.jpg`} alt={game.title}/>
                    <div className='game-info'>
                      <div className='game-title'><a href={`https://store.steampowered.com/app/${game.app_id}`} target="_blank">{game.title}</a></div>
                      <div className='game-desc'>Achievements: {game.achievements_done}/{game.achievements_count}. Score: {game.achievements_count-game.achievements_done}</div>
                      <div className='game-icons'>
                        <img className="game-icon" src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.app_id}/${game.img_icon_url_hash}.jpg`}/>
                        <img className="game-icon" src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.app_id}/${game.img_icon_url_hash}.jpg`}/>
                        <img className="game-icon" src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.app_id}/${game.img_icon_url_hash}.jpg`}/>
                        <img className="game-icon" src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.app_id}/${game.img_icon_url_hash}.jpg`}/>
                        <img className="game-icon" src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.app_id}/${game.img_icon_url_hash}.jpg`}/>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul> 
          </div>
        )}
      </body>
    </div>
  );
}

export default App;
