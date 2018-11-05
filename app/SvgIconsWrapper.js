/* External dependencies */
import React from "react";
import styled from "styled-components";
import { transform } from "lodash-es";

/* Internal dependencies */
import colors from "../style-guide/colors.json";
import SvgIcon, { icons } from "../composites/Plugin/Shared/components/SvgIcon";

export const SvgIconsContainer = styled.div`
	max-width: 1024px;
	margin: 0 auto;
	padding: 16px;
	box-sizing: border-box;
	background-color: ${ colors.$color_white };

	svg {
		margin: 0 auto;
		background: ${ colors.$color_white };
	}
`;

const SingleSvgContainer = styled.span`
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	margin: 8px;
	padding: 8px;
	background: lightblue;
	text-align: center;
	background: ${ colors.$color_grey };

	span {
		white-space: nowrap;
		font-size: 12px;
	}
`;

/**
 * Returns the SvgIconsWrapper component.
 *
 * @returns {ReactElement} The HelpCenterWrapper component.
 */
export default function SvgIconsWrapper() {
	const getIcons = () => {
		return transform( icons, ( result, value, key ) => {
			let color = key === "seo-score-ok" ? colors.$color_ok : colors.$color_black;
			return result.push(
				<SingleSvgContainer key={ key }>
					<SvgIcon icon={ key } size="40px" color={ color } />
					<span title={ key }>{ key }</span>
				</SingleSvgContainer>
			);
		}, [] );
	};

	return (
		<SvgIconsContainer>
			{ getIcons() }
		</SvgIconsContainer>
	);
}
