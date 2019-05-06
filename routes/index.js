const Router = require('koa-router');
const router = new Router();
const user = require('../database/model/user')
const jwt = require("jwt-simple");

// const CreateUser = require('../database/command/user/create')
const {CreateUser} = require('../src/controlers/user/create')

const secret = "mysecretKey"

router.post('/insert', async(ctx, next) => {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    // const id = ctx.request.body.id

    // let data = await user.create({username,password})
    let data = await CreateUser(username,password)
    ctx.body = data  
    data = await user.findAll()
    ctx.body = data
    console.log(data)
    console.log(ctx.status)
    });

router.get('/', middleware,  async(ctx, next) => {
    let data = await user.findAll()
    ctx.body = data
    // console.log(data)
    console.log(ctx.request.header)   
});

// router.put('/update', async(ctx, next) => {
//     const username = ctx.request.body.username
//     const password = ctx.request.body.password
//     const id = ctx.request.body.id
//     let data = await user.update({ username: username, password: password}, {where: {id: id}})
//     ctx.body = data
//     data = await user.findAll()
//     ctx.body = data
//     console.log(data)
//     console.log(ctx.status)
// });

router.delete('/delete', middleware, async(ctx, next) => {
    const id = ctx.request.body.id
    let data = await user.destroy({where: {id: id}})
    ctx.body = data
    data = await user.findAll()
    ctx.body = data
    console.log(data)
    console.log(ctx.status)
});

router.post('/gettoken', async(ctx, next) => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    let login = await user.findOne({where: {username: username}})
    console.log("yoyo")
    if(login){
        const payload = {
            sub: username,
            iat: new Date().getTime()
        }  
        // ctx.body = payload
        const token = jwt.encode(payload,secret)
        console.log(token)
        if(password === login.password){
            ctx.body = {token}
            console.log(ctx.status)
        }
        else{
            console.log("error : " + ctx.status)
        }
    }
    else{
        ctx.body = "Invald Username or Password, Please try again !"
    }
});

async function middleware (ctx, next)  {
    // let authorization = ctx.request.header.authorization
    // ctx.body = authorization
    // try{
    //     const username = jwt.decode(authorization,secret,true)
    //     var check = await user.findOne({where:{username:username.sub}})
    //     if(check){
    //         await next()
    //     }
    // }
    // catch(error){
    //     ctx.body = "Invalid"
    // }

    let username = ctx.request.header.username
    // console.log("username : " + username)
    ctx.body = username
    try{
        const checkusername = jwt.decode(username,secret)
        const check = await user.findOne({where: {username: checkusername.sub}})
        if(check){
            await next()
        }
    }
    catch(error){
        console.log("Middleware error : " + ctx.status)
    }
}


// async function loginMiddleware  (ctx, next) {
//     if(ctx.request.body.username === "hello" && ctx.request.body.password === "world"){
//         ctx.body = "yoyo"
//         console.log("yoyo")
//         await next() 
//     } else{
//         console.log(ctx.username)
//         ctx.body = "Invalid"
//     } 
//  }
//  router.post('/login', loginMiddleware, async(ctx, next) => {
//     const payload = {
//         sub: ctx.request.body.username,
//         iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
//      };
//      const SECRET = "MY_SECRET_KEY"
//     ctx.body = jwt.encode(payload, SECRET)
// });


// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//     secretOrKey: "MY_SECRET_KEY",//SECRETเดียวกับตอนencodeในกรณีนี้คือ MY_SECRET_KEY
//  }

//  const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
//     if(payload.sub === "hello") done(null, true);  //done(errorOrNot, passOrNot)
//     else done(null, false);
//  });
//  passport.use(jwtAuth);
//  const requireJWTAuth = passport.authenticate("jwt",{session:false});

//  router.get("/infotest", requireJWTAuth, (ctx, next) => {
//     ctx.body = "eiei"
//  });

module.exports = router;




