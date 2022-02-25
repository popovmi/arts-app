# Remove-Item -Path ./dist -Recurse;

npx nx build api --prod;
npx nx run api:update-pj;

Set-Location ./dist;
npm i --package-lock-only;
