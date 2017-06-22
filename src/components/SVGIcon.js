import PropTypes from "prop-types";
import React from "react";
import colors from "yoast-components/style-guide/colors.json";

export const SVGIcon = ( props ) => (
	<svg width={ props.width } height={ props.height } viewBox="0 0 24 24" fill={ props.fill }>
		{ props.children }
	</svg>
);

SVGIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
	viewBox: PropTypes.string,
	children: PropTypes.any,
};

SVGIcon.defaultProps = {
	width: 40,
	height: 40,
	fill: colors.$color_grey_dark,
	viewBox: "0 0 24 24",
};
