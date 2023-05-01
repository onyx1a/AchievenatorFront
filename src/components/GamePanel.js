import React, { useState } from "react";
import ImageWithPlaceholder from './ImageWithPlaceholder'
import AchievementDescTooltip from './AchievementDescTooltip'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from 'react-bootstrap/Button'


const GamePanel = (props) => {
	const [showAchievements, setShowAchievements] = useState(5);
	const [heightPanel, setHeightPanel] = useState(140);
	const [iconOverflow, setIconOverflow] = useState(false);
	const [shownHideButton, setShownHideButton] = useState(false);

	const { game_info } = props;
	const title = game_info.title;
	const appId = game_info.app_id;
	const achievementsDone = game_info.achievements_done;
	const achievementsCount = game_info.achievements_count;
	const score = achievementsCount - achievementsDone;
	const achievementsInfo = game_info.achievements_info;
	const moreAchiementsTooltip = "Click for show more achievements";

	const showMoreAchiements = () => {
		setShowAchievements(achievementsInfo.length);
		setHeightPanel(220);
		setIconOverflow(true);
		setShownHideButton(true);
	}

	const hideMoreAchievements = () => {
		setShowAchievements(5);
		setHeightPanel(140);
		setIconOverflow(false);
		setShownHideButton(false);
	}

	const showMoreAchiementsTooltip = (props) => (
		<Tooltip {...props}>
			{ moreAchiementsTooltip }
		</Tooltip>
	);

	return(
		<div className="game-item">
			<ImageWithPlaceholder className="game-logo" alt={title} key={appId} imageUrl={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`} placeholder="/game_logo_ph.jpg"/>
			<div className="game-info" style={{ height: `${heightPanel}px` }}>
				<div className='game-title'><a href={`https://store.steampowered.com/app/${appId}`} target="_blank">{title}</a></div>
				<div className='game-desc'>Achievements: {achievementsDone}/{achievementsCount}. Score: {score}</div>
				<div className="game-icons" style={{ overflow: `${iconOverflow ? 'auto': 'hidden'}` }}>
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
				{shownHideButton && (
						// <span className="hide-button" onClick={hideMoreAchievements}>Hide</span>
						<Button className="hide-button" variant="primary" onClick={hideMoreAchievements} size="sm">
							Hide
						</Button>
					)}
			</div>
		</div>
	);
};

export default GamePanel;