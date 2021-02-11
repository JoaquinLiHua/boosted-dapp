import colors from './colors';
import fonts from './fonts';
import fontSize from './fontSize';
import global from './global';

export const theme = {
	colors,
	fonts,
	fontSize,
	global,
};

export type ThemeInterface = typeof theme;

export default theme;
