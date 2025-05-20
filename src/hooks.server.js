import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('sessionid');
    const protectedRoutes = ['/inicio', '/info'];

    if (protectedRoutes.includes(event.url.pathname) && !session) {
        throw redirect(302, '/');
    }

    const response = await resolve(event);
    return response;
};