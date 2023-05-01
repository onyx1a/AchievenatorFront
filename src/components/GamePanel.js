import React, { useState } from "react";
import ImageWithPlaceholder from './ImageWithPlaceholder'
import AchievementDescTooltip from './AchievementDescTooltip'
import { OverlayTrigger, Tooltip } from "react-bootstrap";


const GamePanel = (props) => {
	const { game_info } = props;
	const title = game_info.title;
	const appId = game_info.app_id;
	const achievementsDone = game_info.achievements_done;
	const achievementsCount = game_info.achievements_count;
	const score = achievementsCount - achievementsDone;
	const achievementsInfo = game_info.achievements_info;
	const [showAchievements, setShowAchievements] = useState(5);
	const moreAchiementsTooltip = "Click for show more achievements";
	const showMoreAchiements = () => {
		setShowAchievements(achievementsInfo.length);
	}
	const showMoreAchiementsTooltip = (props) => (
		<Tooltip {...props}>
			{ moreAchiementsTooltip }
		</Tooltip>
	);

	return(
		<div className="game-item">
			<ImageWithPlaceholder className="game-logo" alt={title} key={appId} imageUrl={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`} placeholder="/game_logo_ph.jpg"/>
			<div className="game-info">
				<div className='game-title'><a href={`https://store.steampowered.com/app/${appId}`} target="_blank">{title}</a></div>
				<div className='game-desc'>Achievements: {achievementsDone}/{achievementsCount}. Score: {score}</div>
				<div className="game-icons">
					{achievementsInfo.slice(0, showAchievements).map(info => (
						<AchievementDescTooltip iconUrl={info.icongray} tooltipDesc={info.description} tooltipTitle={info.displayName}/>
					))}
						{achievementsInfo.length > showAchievements && (
							<OverlayTrigger placement="top" overlay={showMoreAchiementsTooltip}>
								<div className='game-icon game-icon-fake' onClick={showMoreAchiements}>
									+{achievementsInfo.length - showAchievements}
								</div>
							</OverlayTrigger>
						)}
					</div>
			</div>
		</div>
	);
};

export default GamePanel;