module.exports = (req,res, next) => {
  
    if(req.method === 'POST' && req.path === '/login'){
        if(req.body.username==='jira' && req.body.password==='123456'){
            return res.status(200).json({
                user:{
                    id:'1',
                    name:'jira',
                    organization:'jira',
                    token:'jira123456'
                }
            })
        }else {
            return res.status(500).json({
                message:'用户名或密码错误'
            })
        }
    }
    next();
}
