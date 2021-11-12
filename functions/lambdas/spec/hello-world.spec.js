import { handler } from '../hello-world';

const event = {
	httpMethod: 'GET',
	/*
	path: 'Path parameter',
	headers: {},
	queryStringParameters: {},
	body: 'A JSON string of the request payload.',
	isBase64Encoded:
		'A boolean flag to indicate if the applicable request payload is Base64-encode',
	*/
};

describe('hello-world', () => {
	it('should return a 200 status code', async () => {
		const result = await handler(event);
		expect(result.statusCode).toEqual(200);
	});
});
