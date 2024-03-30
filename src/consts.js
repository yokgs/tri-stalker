const MODES = ['aXNpYw==', 'Mml0ZQ=='].map(atob);

const $ORIGIN = 'aHR0cDovL2Vuc2FqLmZlcnRhdC5jb20vaW5zY3JpcHRpb24vcGZlLzIwMjMvY3ZzLw==';
const $TAIL = 'LWN2LnBkZg==';

const [ORIGIN, TAIL] = [$ORIGIN, $TAIL].map(atob);

const URL = (code, name, id) => `${ORIGIN}${code}2-${name}-${id}${TAIL}`;

module.exports = {
    URL, MODES
}

