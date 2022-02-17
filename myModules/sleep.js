async function sleep(seg) {
    return await new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, seg * 1000)
    })
}

module.exports = { sleep }