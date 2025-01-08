import { createCircuitBreaker } from './circuit-breaker';
    import axios from 'axios';

    const cloverBreaker = createCircuitBreaker(async (url, config) => {
      const response = await axios(url, config);
      return response.data;
    }, {
      name: 'clover-api'
    });

    export async function callCloverAPI(endpoint, accessToken, data) {
      return cloverBreaker.fire(`https://api.clover.com/v3/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data
      });
    }
