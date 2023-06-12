import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    vus: 10000,
    duration: '10m',
};
export default function () {
    http.get('https://joshua.mdjansen.nl');
    sleep(1);
}
