import React from "react";
import { BsQuestionCircle } from 'react-icons/bs'
import { OverlayTrigger, Tooltip } from "react-bootstrap";


const HelpButton = (props) => {
	const { text } = props;

	const renderTooltip = (props) => (
		<Tooltip {...props}>
			{ text }
		</Tooltip>
	);

	return(
		<OverlayTrigger placement="right" overlay={renderTooltip}>
			<span>
				<BsQuestionCircle className="question-icon"/>
			</span>
		</OverlayTrigger>
	);
};

export default HelpButton;