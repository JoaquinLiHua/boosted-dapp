import React from 'react';

// External link that opens in a new tab/window, ensuring that the
// opened page doesn't have access to the current page.
//
// See: https://mathiasbynens.github.io/rel-noopener/
export const ExternalLink = (props: any) => {
	const { children, ...rest } = props;
	return (
		<a {...rest} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
			{children}
		</a>
	);
};
