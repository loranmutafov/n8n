import {
	IExecuteFunctions,
	IHookFunctions,
} from 'n8n-core';

import {
	OptionsWithUri,
} from 'request';

import {
	IDataObject,
} from 'n8n-workflow';

/**
 * Make an API request to Dropbox
 *
 * @param {IHookFunctions} this
 * @param {string} method
 * @param {string} url
 * @param {object} body
 * @returns {Promise<any>}
 */
export async function dropboxApiRequest(this: IHookFunctions | IExecuteFunctions, method: string, endpoint: string, body: object, query: IDataObject = {}, headers: object = {}, option: IDataObject = {}): Promise<any> {// tslint:disable-line:no-any

	const options: OptionsWithUri = {
		headers,
		method,
		qs: query,
		body,
		uri: endpoint,
		json: true,
	};

	if (!Object.keys(body).length) {
		delete options.body;
	}

	Object.assign(options, option);

	const authenticationMethod = this.getNodeParameter('authentication', 0) as string;

	try {
		if (authenticationMethod === 'accessToken') {

			const credentials = this.getCredentials('dropboxApi') as IDataObject;

			options.headers!['Authorization'] = `Bearer ${credentials.accessToken}`;

			return await this.helpers.request(options);
		} else {
			return await this.helpers.requestOAuth2.call(this, 'dropboxOAuth2Api', options);
		}
	} catch (error) {
		if (error.statusCode === 401) {
			// Return a clear error
			throw new Error('The Dropbox credentials are not valid!');
		}

		if (error.error && error.error.error_summary) {
			// Try to return the error prettier
			throw new Error(
				`Dropbox error response [${error.statusCode}]: ${error.error.error_summary}`,
			);
		}

		// If that data does not exist for some reason return the actual error
		throw error;
	}
}

export async function dropboxpiRequestAllItems(this: IExecuteFunctions | IHookFunctions, propertyName: string, method: string, endpoint: string, body: any = {}, query: IDataObject = {}, headers: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any

	const resource = this.getNodeParameter('resource', 0) as string;

	const returnData: IDataObject[] = [];

	const paginationEndpoint: IDataObject = {
		'folder': 'https://api.dropboxapi.com/2/files/list_folder/continue',
		'search': 'https://api.dropboxapi.com/2/files/search/continue_v2',
	};

	let responseData;
	do {
		responseData = await dropboxApiRequest.call(this, method, endpoint, body, query, headers);
		const cursor = responseData.cursor;
		if (cursor !== undefined) {
			endpoint = paginationEndpoint[resource] as string;
			body = { cursor };
		}
		returnData.push.apply(returnData, responseData[propertyName]);
	} while (
		responseData.has_more !== false
	);

	return returnData;
}

export function getRootDirectory(this: IHookFunctions | IExecuteFunctions) {
	return dropboxApiRequest.call(this, 'POST', 'https://api.dropboxapi.com/2/users/get_current_account', {});
}

export function simplify(data: IDataObject[]) {
	const results = [];
	for (const element of data) {
		const { '.tag': key } = element?.metadata as IDataObject;
		const metadata = (element?.metadata as IDataObject)[key as string] as IDataObject;
		delete element.metadata;
		Object.assign(element, metadata);
		if ((element?.match_type as IDataObject)['.tag']) {
			element.match_type = (element?.match_type as IDataObject)['.tag'] as string;
		}
		results.push(element);
	}
	return results;
}


