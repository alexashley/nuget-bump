const increments = ['major', 'minor', 'patch'];

const validateArgs = (bump = '', pkgSrc = '') => {
    const cleanedBump = bump.trim();
    const cleanedSrc = pkgSrc.trim();
    let error = undefined;

    const invalidBump = increments.indexOf(cleanedBump) == -1;
    if (invalidBump) {
        error = `Must specify one of ${increments.join(', ')} as the bump level.`;
    }

    if (cleanedSrc.length == 0) {
        error = 'Invalid NuGet package source specified';
    }

    return [cleanedBump, cleanedSrc, error];
}

module.exports = {
    validateArgs
};