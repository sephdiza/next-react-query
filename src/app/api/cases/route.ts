const apiKey = process.env.WV_PUBLIC_API_KEY;
const url = process.env.API_URL;

export const revalidate = 0;

export async function GET(request: Request) {
	try {
		const response = await fetch(`${url}/cases?page[limit]=50`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'cache-control': 'no-cache',
			},
		});

		if (!response.ok) {
			return new Response(
				JSON.stringify({
					error: 'Failed fetching cases',
					status: response.status,
				}),
				{ status: response.status }
			);
		}

		const json = await response.json();

		return Response.json({
			cases: json.data.cases,
			status: response.status,
		});
	} catch (error: any) {
		return new Response(
			JSON.stringify({
				error: 'Internal Server Error',
				details: error.message,
			}),
			{ status: 500 }
		);
	}
}
