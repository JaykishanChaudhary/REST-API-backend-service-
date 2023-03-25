const jsonwt=require('jsonwebtoken');


const JwtAuth=(req,res,next)=>{
    // const jwt =req.cookies.jwt;
    const jwt=req.headers['token'];
    // console.log(jwt)
    // console.log(authHeader)
    // const jwt=authHeader && authHeader.split(' ')[1];
    // const jwt = req.headers.token.split(' ')[1];
    console.log(jwt);
    if(jwt)
    {
        jsonwt.verify(jwt,'secret-key',(err,decodedToken)=>{
            if(err)
            {
                console.log(err);
                console.log(decodedToken);
                res.json({
                    status:'jwt verification failed'
                })
            }
            else{
                next();
            }
        })
    }
}

module.exports=JwtAuth;