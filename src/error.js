const exitWithError = (message) => {
    console.error(message);
    process.exit(1);
}

export default exitWithError;