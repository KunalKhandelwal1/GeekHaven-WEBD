import jwt from "jsonwebtoken";

function createToken(user){
    const token = jwt.sign({ name: user.name ,id:user._id,email:user.email}, process.env.JWT_SECRET);
    return token;
}

function validateToken(token){
    const payload=jwt.verify(token, process.env.JWT_SECRET);
    return payload;
}
export {validateToken,createToken}; 