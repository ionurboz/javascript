// External dependencies.
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { NavLink } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";

const activeStyle = "active-class-name";

const Menu = styled.nav`
	clear: both;

	& ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	& li {
		display: inline;
	}

	@media screen and ( max-width: 1024px ) {
		margin: 0 4%;
		text-align: center;

		& ul {
			display: flex;
		}

		& li {
			flex: 1 1 0%; /* Has unit measure to ensure IE compatibility */
			min-width: 40px; /* Like the icons width. */
		}
	}
`;

const MenuItem = styled( NavLink )`
	display: block;
	line-height: 1.4;
	font-size: 22px;
	font-weight: 300;
	padding: 24px;
	margin-left: 24px;
	color: ${ colors.$color_background_light };
	text-decoration: none;

	transition: color 0.1s ease-out, background-color 0.1s ease-out, padding 50ms ease-out, transform 100ms ease-out;

	&:hover,
	&:focus {
		padding-left: 1.25rem;
		color: ${ colors.$color_background_light };
		transition: padding 100ms ease-out;
	}

	svg {
		height: 20px;
		width: 20px;
		margin: 0 25px -2px 0;
		fill: ${ colors.$color_white };
	}

	#courses-menu-item {
		width: 28px;
		height: 28px;
		margin: 0 21px -10px -4px;
	}

	&.${ activeStyle } {
		color: ${ colors.$color_border };
		background-color: ${ colors.$color_grey_light };
		box-shadow: inset 12px 0 6px -10px rgba(0, 0, 0, 0.3);
		font-weight: 400;
		color: ${ colors.$color_pink_dark };
		position: relative;
		overflow-y: hidden;

		&:hover,
		&:focus {
			padding-left: 1rem;
		}

		&:before,
		&:after {
			content: "";
			display: block;
			width: 100%;
			height: 0.25rem;
			position: absolute;
			left: 0;
			background: transparent;
		}

		&:before {
			border-bottom-right-radius: 20px 10px;
			top: -0.25rem;
			box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
		}

		&:after {
			border-top-right-radius: 20px 10px;
			bottom: -0.25rem;
			box-shadow: 0 -1px 8px 0 rgba(0, 0, 0, 0.3);
		}

		svg {
			fill: ${ colors.$color_pink_dark };
		}
	}

	@media screen and ( max-width: 1024px ) {
		display: inline-block;
		width: 100%; /* necessary for the text ellipsis */
		height: 71px;
		margin: 0;
		padding: 0.5rem 0 0;
		border-bottom: 0.25rem solid transparent;
		box-shadow: none;
		color: ${ colors.$color_white };
		font-size: 12px;
		font-weight: 400;
		line-height: inherit;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		&:hover,
		&:focus {
			padding-left: 0;
			transform: scale( 1.08 );
		}

		svg {
			display: block;
			margin: 3px auto;
			height: 30px;
			width: 30px;
		}

		&.${ activeStyle } {
			border-bottom: 3px solid ${ colors.$color_white };
			color: ${ colors.$color_white };
			background-color: transparent;
			transform: scale( 1.08 );
			box-shadow: none;

			&:hover,
			&:focus {
				padding-left: 0;
				transform: scale( 1.08 );
			}

			&:before,
			&:after {
				content: none;
			}

			svg  {
				fill: ${ colors.$color_white };
			}
		}
		#courses-menu-item {
			margin: 0 auto;
			display: block;
			height: 35px;
			width: 35px;
		}
	}
`;

/**
 * The main menu.
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered component.
 */
function MainMenu( props ) {
	return (
		<Menu>
			{ // eslint-disable-next-line jsx-a11y/no-redundant-roles
			}<ul role="list">
				{ props.menuRoutes.filter( ( menuItem ) => {
					// Don't show items that are only defined as route.
					return menuItem.showInMenu;
				} )
					.map( function( page ) {
						const isActive = page.isActive || (
							( match ) => {
								return match;
							}
						);

						const menuItemIcon = page.iconSource;

						const title = props.intl.formatMessage( page.title );

						return <li key={ page.titleKey }>
							<MenuItem
								activeClassName={ activeStyle }
								to={ page.path }
								isActive={ isActive }
								ariaCurrent="page"
							>
								{ menuItemIcon }
								{ title }
							</MenuItem>
						</li>;
					} )
				}
			</ul>
		</Menu>
	);
}

export default injectIntl( MainMenu );

MainMenu.propTypes = {
	menuRoutes: PropTypes.array.isRequired,
	intl: intlShape.isRequired,
};