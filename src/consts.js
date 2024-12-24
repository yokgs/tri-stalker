const MODES = ['aXNpYw==', 'Mml0ZQ=='].map(atob);

const $ORIGIN = 'aHR0cDovL2Vuc2FqLmZlcnRhdC5jb20vaW5zY3JpcHRpb24vcGZlLw==';
const $DIR = 'L2N2cy8=';
const $TAIL = 'LWN2LnBkZg==';

const [ORIGIN, DIR, TAIL] = [$ORIGIN, $DIR, $TAIL].map(atob);
const YEAR = 2024;
const URL = (code, name, id) => `${ORIGIN}${YEAR}${DIR}${code}2-${name}-${id}${TAIL}`;

module.exports = {
    URL, MODES
}

