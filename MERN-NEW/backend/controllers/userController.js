import handleAsyncError from '../middleware/handleAsyncError.js';

export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  res.json({ name, email, password, avatar });
});

 
