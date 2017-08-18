const {execSync} = require('child_process');

const tag = (version, message) => {
    const command = `git tag v${version} -m "${message}"`;
    execSync(command);
}

const commit = message => {
    const command = `git commit -am "${message}"`;
    execSync(command);
}

const pushWithTags = (remote = 'origin', branch = 'master') => {
    const command = `git push ${remote} ${branch} --follow-tags`;
    execSync(command);
}

module.exports = {
    tag,
    commit,
    pushWithTags
}