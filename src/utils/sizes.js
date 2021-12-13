const convertSize = (size) => {
    if (size < 1024) {
        return `${size} B`;
    } else if (size < 1048576) {
        return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1073741824) {
        return `${(size / 1048576).toFixed(2)} MB`;
    } else if (size < 1099511627776) {
        return `${(size / 1073741824).toFixed(2)} GB`;
    } else {
        return `${(size / 1099511627776).toFixed(2)} TB`;
    }
}

export { convertSize }