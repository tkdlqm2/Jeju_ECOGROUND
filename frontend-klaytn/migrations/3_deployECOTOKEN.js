const EcoToken = artifacts.require('./EcoToken.sol')
const fs = require('fs')

module.exports = function (deployer) {

    var decimals = "10000000000000000000";

    deployer.deploy(EcoToken, decimals)
        .then(() => {
            if (EcoToken._json) {
                fs.writeFile(
                    'deployedABI2',
                    JSON.stringify(EcoToken._json.abi),
                    (err) => {
                        if (err) throw err
                        console.log("파일에 ABI 입력 성공");
                    })
            }

            fs.writeFile(
                'deployedAddress2',
                EcoToken.address,
                (err) => {
                    if (err) throw err
                    console.log("파일에 주소 입력 성공");
                })
        });
}