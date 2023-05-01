import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SteamIDForm from './SteamIDForm';
import AchievementDescTooltip from './AchievementDescTooltip'
import ImageWithPlaceholder from './ImageWithPlaceholder'
import HelpButton from './HelpButton'
import GamePanel from './GamePanel'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
            <div className='user-stats stats-row'>
              <div className='stats-block'>Games: {game_count}</div>
              <div className='stats-block'>Achievements: {gameData.overall_done_ach_count}/{gameData.overall_ach_count}</div>
              <div className='stats-block'>Total score: {total_score} <HelpButton text="Score — идентификация того, сколько у вас неполученных достижений."/></div>
            </div>
            <ul>
              {gameData.game_data.map(game => (
                <li key={game.app_id}>
                  <div className='game-item'>
                    <ImageWithPlaceholder className="game-logo" alt={game.title} key={game.app_id} imageUrl={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.app_id}/header.jpg`} placeholder="/game_logo_ph.jpg" />
                    <div className='game-info'>
                      <div className='game-title'><a href={`https://store.steampowered.com/app/${game.app_id}`} target="_blank">{game.title}</a></div>
                      <div className='game-desc'>Achievements: {game.achievements_done}/{game.achievements_count}. Score: {game.achievements_count-game.achievements_done}</div>
                      <div className='game-icons'>
                        {game.achievements_info.slice(0, 5).map(info => (
                          <AchievementDescTooltip iconUrl={info.icongray} tooltipDesc={info.description} tooltipTitle={info.displayName}/>
                        ))}
                        {game.achievements_info.length > 5 && (
                          <div className='game-icon game-icon-fake'>
                            +{game.achievements_info.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
