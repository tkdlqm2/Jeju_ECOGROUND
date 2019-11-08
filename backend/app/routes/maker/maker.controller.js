require('dotenv').config();
const models = require('../../../db/models');
const { Maker, MakerImg } = models.default;

/**
 * 상품 maker 등록 로직
 *
 * @author Dong-Min Seol
 * @since  2019.11.08
 * @url    POST /maker/register
 */
exports.register = (req, res) => {
    const { _id } = req.decoded;
    const { title, description, price, targetKlay, DDay, imgArr} = req.body;

    const param = {
        userId : _id,
        title,
        description,
        price,
        targetKlay,
        DDay
    };

    // [1] 상품 등록
    const create = param => {
       return Maker.create(param)
    };

    // [2] 상품 이미지 등록
    const createMakerImg = Maker => {

        let i = 0;
        imgArr.forEach( imgURL => {
            MakerImg.create({
                markerId : Maker._id,

            })
        });
        return i;
    };

    // [3] 성공 응답
    const response = (MakerImgCnt) => {
        res.json({
            message: '상품 등록 성공',
            imgCnt : MakerImgCnt
        })
    };

    // [exit] 실패응답
    const onError = (error) => {
        res.status(500).json({
            message: error.message
        })
    };
};

/**
 * 상품 단일 조회
 *
 * @author Dong-Min Seol
 * @since  2019.11.08
 * @url    GET /maker/view/:id
 */
exports.getMaker = (req, res) => {

};


/**
 * 상품 목록 페이징 조회
 *
 * @author Dong-Min Seol
 * @since  2019.11.08
 * @param
 */
exports.getMakerList = (req, res) => {
};