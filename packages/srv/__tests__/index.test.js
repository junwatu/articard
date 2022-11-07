import request from 'supertest';
import { telpServer } from '../index.js';

describe('routes', () => {
    test('/', async () => {
        try {
            const response = await request(telpServer).get('/');
            expect(JSON.parse(response.text)).toHaveProperty('image');
        } catch (error) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error).toMatch('error');
        }
    });

    test('/admin/api/data', async () => {
        try {
            const response = await request(telpServer).get('/admin/api/data');
            expect(JSON.parse(response.text)?.userSet?.count).toEqual(197);
        } catch (error) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error).toMatch('error');
        }
    });

    test('/api/data/:id', async () => {
        try {
            const response = await request(telpServer).get(
                '/api/data/AK-MAK-247'
            );

            expect(JSON.parse(response.text)[0]?.links?.artobject).toEqual(
                'https://www.rijksmuseum.nl/api/en/collection/AK-MAK-247'
            );
        } catch (error) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error).toMatch('error');
        }
    });

    test('/api/data/image/:id', async () => {
        try {
            const response = await request(telpServer).get(
                '/api/data/image/AK-MAK-247'
            );
            expect(response.text).toEqual(
                `<img src="https://lh4.ggpht.com/mUVNuSSFYLvaO4kjMUuQ11ICGhj3N7o0gA2ZkxSm6GdEq94T2nxXd4wE8h9umTvW0CMsmFZ6t1TPnrdIWeuEfFEIZg=s0" width="50%"/>`
            );
        } catch (error) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error).toMatch('error');
        }
    });
});
