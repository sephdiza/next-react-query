'use server';

const url = process.env.API_URL;
const apiKey = process.env.WV_PUBLIC_API_KEY;

export async function updateStatus(statusId: number, postId: string) {
	const response = await fetch(`${url}/cases/${postId}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			statusId: statusId,
		}),
	});

	return response.json();
}
