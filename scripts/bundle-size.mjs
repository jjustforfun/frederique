#!/usr/bin/env node
/**
 * bundle-size.mjs — budgets de poids du build (cf. brief.yaml > cibles_de_mesure.budgets).
 * Usage : (depuis site/) node ../scripts/bundle-size.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { extname, join } from 'node:path';

const dir = process.argv[2] ?? 'dist';
let js = 0, css = 0, html = 0;
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else {
      const buf = readFileSync(p);
      const gz = gzipSync(buf).length;
      if (extname(f) === '.js') js += gz;
      if (extname(f) === '.css') css += gz;
      if (extname(f) === '.html') html += buf.length;
    }
  }
};
walk(dir);
const ko = (n) => (n / 1024).toFixed(1);
const budgetJs = 8, budgetCss = 25, budgetHtml = 80; // HTML inclut le CSS critique inliné (voir brief : brotli ÷5)
console.log(`JS   gz : ${ko(js)} Ko (budget < ${budgetJs})  ${js / 1024 < budgetJs ? '✔' : '✘'}`);
console.log(`CSS  gz : ${ko(css)} Ko (budget < ${budgetCss}) ${css / 1024 < budgetCss ? '✔' : '✘'}`);
console.log(`HTML    : ${ko(html)} Ko (budget < ${budgetHtml}) ${html / 1024 < budgetHtml ? '✔' : '✘'}`);
process.exit(js / 1024 < budgetJs && css / 1024 < budgetCss && html / 1024 < budgetHtml ? 0 : 1);
