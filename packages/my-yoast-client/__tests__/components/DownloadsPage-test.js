import React from 'react';
import DownloadsPage from '../../src/components/DownloadsPage';
import { createComponentWithIntl } from "../../utils";
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";

test( 'the downloads page component matches the snapshot', () => {
	let plugins = [
		{
			glNumber: "111",
			ids: [ "1" ],
			category: "plugins",
			name: "Yoast SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					file: "http://example.org/plugin.zip" },
				{ label: "for Drupal",
					file: "http://example.org/plugin.zip" },
				{ label: "for Typo3",
					file: "http://example.org/plugin.zip" },
			],
		}, {
			glNumber: "222",
			ids: [ "2" ],
			category: "plugins",
			name: "Local SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					file: "http://example.org/plugin.zip" },
			],
		}, {
			glNumber: "333",
			ids: [ "3" ],
			category: "plugins",
			name: "Video SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					file: "http://example.org/plugin.zip" },
				{ label: "for Drupal",
					file: "http://example.org/plugin.zip" },
				{ label: "for Typo3",
					file: "http://example.org/plugin.zip" },
			],
		}, {
			glNumber: "444",
			ids: [ "4" ],
			category: "plugins",
			name: "News SEO",
			currentVersion: "4.7",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					file: "http://example.org/plugin.zip" },
				{ label: "for Drupal",
					file: "http://example.org/plugin.zip" },
				{ label: "for Typo3",
					file: "http://example.org/plugin.zip" },
			],
		},
	];

	let eBooks = [
		{
			glNumber: "555",
			ids: [ "5" ],
			category: "eBooks",
			name: "Yoast SEO for WooCommerce",
			currentVersion: "",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					file: "http://example.org/ebook.pdf" },
			],
		}, {
			glNumber: "666",
			ids: [ "6" ],
			category: "eBooks",
			name: "Yoast SEO for WooCommerce",
			currentVersion: "",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					file: "http://example.org/ebook.pdf" },
			],
		}, {
			glNumber: "777",
			ids: [ "7" ],
			category: "eBooks",
			name: "Yoast SEO for WooCommerce",
			currentVersion: "",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					file: "http://example.org/ebook.pdf" },
			],
		}, {
			glNumber: "888",
			ids: [ "8" ],
			category: "eBooks",
			name: "Yoast SEO for WooCommerce",
			currentVersion: "",
			icon: SeoIcon,
			buttons: [
				{ label: "for Wordpress",
					file: "http://example.org/ebook.pdf" },
			],
		},
	];

	const component = createComponentWithIntl(
		<DownloadsPage
			eBooks={ eBooks }
			plugins={ plugins }
			onSearchChange={ () => {} }
			onComposerHelpModalOpen={ () => {} }
			onComposerHelpModalClose={ () => {} }
			composerHelpCreateComposerToken={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'the downloads page component matches the snapshot when there are no downloads', () => {
	let plugins = [];

	let eBooks = [];

	const component = createComponentWithIntl(
		<DownloadsPage
			eBooks={ eBooks }
			plugins={ plugins }
			onSearchChange={ () => {} }
			onComposerHelpModalOpen={ () => {} }
			onComposerHelpModalClose={ () => {} }
			composerHelpCreateComposerToken={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );