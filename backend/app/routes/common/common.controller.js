require('dotenv').config();

/**
 * 이미지 임시 저장 서비스
 *
 * @author Dong-Min Seol
 * @since  2019.11.09
 * @url    POST /api/common/tempImgSave
 */
exports.tempImgSave = (req, res) => {
    res.json(req.files.map((item, idx) => item = { location : item.location, idx }));
};