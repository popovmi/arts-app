Remove-Item -Path ./dist/apps/api -Recurse;

npx nx build api --prod;
npx nx run api:engines;
npx nx run api:scripts;

Set-Location ./dist/apps/api;
npm i --package-lock-only;
