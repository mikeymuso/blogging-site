import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  const token = req.headers.cookie.split('=')[1];

  if (typeof token !== 'undefined') {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route', error);
        res.sendStatus(403);
      } else {
        //If token is successfully verified, we can send the autorized data
        res.json({
          message: 'Successful log in',
          authorizedData,
        });
        console.log('SUCCESS: Connected to protected route');
      }
    });
  } else {
    res.sendStatus(403);
  }
};

export default validateToken;
