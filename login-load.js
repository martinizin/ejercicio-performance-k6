import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = new SharedArray('Users', function () {
  return papaparse.parse(open('./data/users.csv'), { header: true }).data;
});

export const options = {
  scenarios: {
    constant_load: {
      executor: 'constant-arrival-rate',
      rate: 20,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<=1500'],
    checks: ['rate>0.97'],
  },
};

export default function () {
  const userIndex = Math.floor(Math.random() * csvData.length);
  const userData = csvData[userIndex];

  const url = 'https://fakestoreapi.com/auth/login';
  const payload = JSON.stringify({
    username: userData.user,
    password: userData.passwd,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    // Aceptamos 200 (OK) o 201 (Created) como válidos
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    'token received': (r) => r.json('token') !== undefined,
  });
}