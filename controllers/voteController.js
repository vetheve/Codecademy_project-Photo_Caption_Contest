const {
    User,
    Photo,
    Vote
} = require('../models/index.js');

exports.createVote = async (req, res) => {

    const {
        photoId,
        userId,
        value
    } = req.body;


    try {

        // Check if photo exists
        const photo = await Photo.findByPk(photoId);
        if (!photo) {
            return res.status(404).json({
                message: 'Photo not found'
            });
        }

        // Check if photo exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: 'Photo not found'
            });
        }

        // Create vote
        const vote = await Vote.create({
            value,
            photo_id: photoId,
            user_id: userId
        });

        return res.status(201).json(vote);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
