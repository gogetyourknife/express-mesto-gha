const router = require('express').Router();
const { userIdSchemaValidate, profileSchemaValidate, avatarSchemaValidate } = require('../utils/validation');

const {
  getUsers,
  getUser,
  getUserLoggedIn,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserLoggedIn);
router.get('/:userId', getUser, userIdSchemaValidate);
router.post('/', createUser);
router.patch('/me', updateProfile, profileSchemaValidate);
router.patch('/me/avatar', updateAvatar, avatarSchemaValidate);

module.exports = router;