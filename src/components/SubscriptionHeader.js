import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";
import { BackButtonLink, makeButtonFullWidth } from "./Button";
import { defineMessages, injectIntl, FormattedMessage } from "react-intl";

const messages = defineMessages( {
	sitePageLoaded: {
		id: "menu.site.loaded",
		defaultMessage: "Manage site page loaded",
	},
	backButton: {
		id: "back-button",
		defaultMessage: "Back",
	},
} );

const SubscriptionHeaderContainer = styled.div`
	width: 100%;
	min-height: 180px;
	background-color: ${ colors.$palette_pink_dark }
	display: flex;
	margin-top: 8px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		min-height: 0;
		display: block;
	}
`;

// Places the description at the bottom of the container.
const HeaderContext = styled.div`
	padding: 2em 1.5em 2em 0;
	display: flex;
	justify-content: space-between;
	flex-direction: column;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
		padding: 1em;
	}
`;

const HeaderTitle = styled.h1`
	color: ${ colors.$color_white };
	font-size: 2em;
	line-height: 1.25;
	font-weight: 400;
	margin: 0;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		font-size: 1em;
	}
`;

const HeaderByline = styled.p`
	margin: 0;
	color: ${ colors.$color_white };
	font-style: italic;
	font-weight: 400;
	font-size: 1.1em;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		margin-top: 0.5em;
		font-size: 0.875em;
	}
`;

// Provides air around the image and provides background color.
const HeaderImageContainer = styled.div`
	padding: 24px 24px 16px 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	a {
		margin-top: 8px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: none;
	}
`;

const HeaderImage = styled.div`
	background: url( ${ props => props.src } ) no-repeat center center;
	background-size: contain;
	width: 96px;
	height: 96px;
`;

const HeaderDescription = styled.p`
	margin-top: 1em;
	margin-bottom: 0;
	font-size: 1em;
	font-weight: 200;
	letter-spacing: 0.05em;
	color: ${ colors.$color_white };
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: none;
	}
`;

// This button only appears when the window is smaller than the mobile breakpoint.
const ResponsiveBackButtonArea = styled.div`
	display: none;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
		padding: 16px 16px;
	}
`;

let ResponsiveBackButtonLink = makeButtonFullWidth( BackButtonLink );


/**
 * Creates the Subscription Header component
 *
 * @param {Object} props Passed properties.
 * @returns {ReactElement} The rendered component.
 * @constructor
 */
function SubscriptionHeader( props ) {
	let imageContainer = (
		<HeaderImageContainer>
			<HeaderImage src={ props.image }/>
			<BackButtonLink to={ "/account/subscriptions" } >
				<FormattedMessage id={ messages.backButton.id } defaultMessage={ messages.backButton.defaultMessage } />
			</BackButtonLink>
		</HeaderImageContainer>
	);

	let buttonContainer = (
		<HeaderImageContainer>
			<BackButtonLink to={ "/account/subscriptions" } >
				<FormattedMessage id={ messages.backButton.id } defaultMessage={ messages.backButton.defaultMessage } />
			</BackButtonLink>
		</HeaderImageContainer>
	);

	// Only add the image and container if provided.
	let headerLeftContainer = props.image ? imageContainer : buttonContainer;
	let byline = props.byline ? <HeaderByline>{ props.byline }</HeaderByline> : "";

	return (
		<SubscriptionHeaderContainer>
			{ headerLeftContainer }
			<HeaderContext>
				<HeaderTitle>{ props.name }</HeaderTitle>
				{ byline }
				<HeaderDescription>{ props.description }</HeaderDescription>
			</HeaderContext>
			<ResponsiveBackButtonArea>
				<ResponsiveBackButtonLink to={ "/account/subscriptions" } >
					<FormattedMessage id={ messages.backButton.id } defaultMessage={ messages.backButton.defaultMessage } />
				</ResponsiveBackButtonLink>
			</ResponsiveBackButtonArea>
		</SubscriptionHeaderContainer>
	);
}

export default injectIntl( SubscriptionHeader );

SubscriptionHeader.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string,
	byline: PropTypes.string,
	description: PropTypes.string,
};

SubscriptionHeader.defaultProps = {
	image: "",
	byline: "",
	description: "",
};
