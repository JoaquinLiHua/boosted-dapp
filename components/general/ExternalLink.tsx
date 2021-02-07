import React from 'react';

// External link that opens in a new tab/window, ensuring that the
// opened page doesn't have access to the current page.
//
// See: https://mathiasbynens.github.io/rel-noopener/
export const ExternalLink = (props) => {
	const { children, ...rest } = props;
	return (
		<a {...rest} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	);
};
