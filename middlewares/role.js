
const checkRole=(role) =>(req, res, next)=>{
    if (req.user.role != role){
        return res.status(403).json({message:"role not match"})
    }
    next()
}
export default checkRole