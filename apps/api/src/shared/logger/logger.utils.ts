import { Format } from 'logform';
import * as bare from 'cli-color/bare';
import * as clc from 'cli-color';
import { format } from 'winston';
import { inspect } from 'util';
import safeStringify from 'fast-safe-stringify';

const colorScheme: Record<string, bare.Format> = {
    info: clc.greenBright,
    error: clc.redBright,
    warn: clc.yellowBright,
    debug: clc.magentaBright,
    verbose: clc.cyanBright,
};

export const consoleFormat = (appName = 'Application', options?: { prettyPrint: boolean }): Format =>
    format.printf(({ context, level, timestamp, message, ms, ...meta }) => {
        if ('undefined' !== typeof timestamp) {
            try {
                if (timestamp === new Date(timestamp).toISOString()) {
                    timestamp = new Date(timestamp).toLocaleString();
                }
            } catch (error) {
                // eslint-disable-next-line no-empty
            }
        }

        const color = colorScheme[level] || ((text: string): string => text);
        const appColor = colorScheme[level].underline;

        const stringifiedMeta = safeStringify(meta, (key, value) => value);

        const formattedMeta = options?.prettyPrint
            ? inspect(
                  JSON.parse(stringifiedMeta, (k, v) => v),
                  { colors: true, depth: null }
              )
            : stringifiedMeta;

        return (
            `${appColor(`[${appName}]`)} ` +
            `${clc.yellowBright(level.charAt(0).toUpperCase() + level.slice(1))}\t` +
            ('undefined' !== typeof timestamp ? `${clc.whiteBright(timestamp)} ` : '') +
            ('undefined' !== typeof context ? `${clc.yellowBright('[' + context + ']')} ` : '') +
            `${color(message)}\n` +
            `${formattedMeta}` +
            ('undefined' !== typeof ms ? ` ${clc.yellowBright(ms)}` : '')
        );
    });
