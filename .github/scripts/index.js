const fs = require('fs');
const semanticRelease = require('semantic-release');

const packageJson = JSON.parse(fs.readFileSync('../../package.json', 'utf8'));
const git_url = packageJson.repository.url;

(async () => {
const result = await semanticRelease({
    dryRun: true,
    ci: false,
    branches: ['main'],
    repositoryUrl: git_url,
    plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ],
});
console.log('Result:', result);
if (result && result.nextRelease) {
    console.log('Next version:', result.nextRelease.version);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'new_version=' + result.nextRelease.version + '\n');
    const changelogNotes = JSON.stringify(result.nextRelease.notes);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'changelog=' + changelogNotes + '\n');
} else {
    console.log('No release necessary.');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'new_version=\n');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'changelog=\n');
}
})();