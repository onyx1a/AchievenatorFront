import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

const AchievementDescTooltip = ({ iconUrl, tooltipTitle, tooltipDesc }) => {
	const redterTooltip = (props) => (
		<Tooltip {...props}>
			<strong>{ tooltipTitle }</strong>
			<br/>
			{ tooltipDesc }
		</Tooltip>
	);

	return (
		<OverlayTrigger placement="top" overlay={redterTooltip}>
			<div>
				<ImageWithPlaceholder imageUrl={iconUrl} placeholder="/img_ph.jpg" className="game-icon"/>
			</div>
		</OverlayTrigger>
	);
};

export default AchievementDescTooltip;