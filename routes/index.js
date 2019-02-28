var express      = require('express');
var router       = express.Router();
const nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res.params);
  res.render('index', { title: 'Express' });
});

router.post('/', ( req,res,next ) => {
  let { email, password, asunto, destinatarios, template } = req.body;
  console.log( email, password, asunto, destinatarios, template );

  if(email != ''){
    const transporter = nodemailer.createTransport({
      service :'gmail',
      auth    : {
        user : email,
        pass : password
      }
    });


  const mailOptions = {
    from   : email,
    to     : destinatarios,
    subject: asunto,
    html   : template
  }

  transporter.sendMail( mailOptions, ( err,info ) => {
    if( err ){
      console.log(err);
    }else{
      console.log('Mensaje enviado a :',info.response);
    }
  });
  }
  res.render('index', { email,password, asunto, destinatarios, template });


});

router.get('/hola', ( req,res,next ) => {
  res.send('<h1>Hola</h1>')
})

module.exports = router;
