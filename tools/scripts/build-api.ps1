# Remove-Item -Path ./dist -Recurse;

nx build api --prod;
nx run api:update-pj;

Set-Location ./dist;
npm i --package-lock-only;
