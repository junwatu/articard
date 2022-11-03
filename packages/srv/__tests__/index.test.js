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
});
