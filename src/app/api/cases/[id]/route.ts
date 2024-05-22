const apiKey = process.env.WV_PUBLIC_API_KEY;
const url = process.env.API_URL;

export const revalidate = 0;

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const response = await fetch(`${url}/cases/${params.id}`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});

		if (!response.ok) {
			return new Response(
				JSON.stringify({
					error: 'Failed fetching case',
					status: response.status,
				}),
				{ status: response.status }
			);
		}

		const json = await response.json();

		return Response.json({
			data: json.data,
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
