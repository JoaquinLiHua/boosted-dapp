import React from 'react';
import styled from 'styled-components';
import ProgressBar from "@ramonak/react-progress-bar";

export const ProgressIndicator = ( props ) => {
	return (
		<ProgressBar
			completed={props.progress}
			bgcolor={props.barColor || '#b3b3b3'}
			baseBgColor={props.bgColor || '#262F40'}
			labelSize="0"
			height="8px"
		/>
	);
};