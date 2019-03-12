import React from 'react';
import { mapStateToProps } from '../../src/containers/connect/Connect'

test('the mapStateToProps function', () => {
	let state = {};

	let ownProps = {
		location: {
			search: "?client_id=1" +
				"&url=https%3A%2F%2Fwww.test.abcdefg%2F%3FnestedQuery%3Dtrue%26otherNestedQuery%3DalsoTrue" +
				"&redirect_url=https%3A%2F%2Fwww.redirect.abcdefg%2F%3FnestedQuery%3Dtrue%26otherNestedQuery%3DalsoTrue" +
				"&credentials_url=https%3A%2F%2Fwww.credentials.abcdefg%2F%3FnestedQuery%3Dtrue%26otherNestedQuery%3DalsoTrue" +
				"&extensions[0]=1&extensions[1]=2&extensions[2]=a&type=wordpress"
		},
	};

	let expected = {
		dataMissing: false,
		clientId: "1",
		url: "https://www.test.abcdefg/?nestedQuery=true&otherNestedQuery=alsoTrue",
		redirectUrl: "https://www.redirect.abcdefg/?nestedQuery=true&otherNestedQuery=alsoTrue",
		credentialsUrl: "https://www.credentials.abcdefg/?nestedQuery=true&otherNestedQuery=alsoTrue",
		extensions: [ "1","2","a" ],
		type: "wordpress",
	};

	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );
} );

test('the mapStateToProps function with missing data', () => {
	let state = {};

	let ownProps = {
		location: {
			search: ""
		},
	};

	let expected = {
		dataMissing: true,
		clientId: false,
		url: false,
		redirectUrl: false,
		credentialsUrl: false,
		extensions: false,
		type: false,
	};

	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );
} );