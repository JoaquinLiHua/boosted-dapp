import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

export const ProgressIndicator = (props: any) => {
	return (
		<ProgressBar
			completed={props.progress}
			bgColor={props.barColor || '#b3b3b3'}
			baseBgColor={props.bgColor || '#262F40'}
			labelSize="0"
			height="8px"
		/>
	);
};
