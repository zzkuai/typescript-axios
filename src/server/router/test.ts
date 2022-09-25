const testRouter = require('express').Router();

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type,X-Requested-With,X-XSRF-TOKEN-D',
  'Content-Type': 'application/json; charset=utf-8',
};

testRouter.all('*', (req, res, next) => {
  res.cookie('username', 'zzkuai');
  res.set(cors);
  next();
});

testRouter.get('/test', (req, res) => {
  res.json({
    message: 'test get',
  });
});

testRouter.post('/demo', (req, res) => {
  res.json({
    message: 'test post',
  });
  // res.json(req.cookies);
});

testRouter.get('/xsrf', (req, res) => {
  res.json({
    message: 'xsrf get',
  });
  // res.json(req.cookies);
});

testRouter.post('/xsrf', (req, res) => {
  res.cookie('XSRF-TOKEN-D', '123456abc');
  res.json({
    message: 'xsrf post',
  });
  // res.json(req.cookies);
});

module.exports = testRouter;
