require('dotenv').config();
const models = require('../../../db/models');
const { Deal } = models.default;

/**
 * 거래 저장 서비스
 *
 * @author Dong-Min Seol
 * @since  2019.11.09

 */
exports.register = (req, res) => {


    /**
     * 거래 저장
     *
     * @author Dong-Min Seol
     * @since  2019.11.08
     * @url    POST /api/deal/register
     */
    exports.register = (req, res) => {
        const {_id} = req.decoded;
        const { hash } = req.body;

        const param = {
            userId: _id,
            hash,
        };

        // [1] 성공 응답
        const response = () => {
            res.json({
                message: '거래 등록 성공',
            })
        };

        // [exit] 실패응답
        const onError = (error) => {
            res.status(500).json({
                message: error.message
            })
        };

        Deal.create(param)
            .then(response)
            .catch(onError)
    };
};