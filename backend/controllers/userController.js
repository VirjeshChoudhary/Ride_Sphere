const BlacklistToken = require('../models/blacklistTokenModel');
const userModel=require('../models/userModel');
const userService=require('../services/userService');
const {validationResult}=require('express-validator');
const nodemailer = require("nodemailer");
const  client=require('../redis');

const sendMail = async ({email}) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            secure: true, 
            port: 465,
            auth: {
                user:"vntc468@gmail.com", 
                pass: "oympdouvbzaubwxx"  
            }
        });
        const mailOptions = {
            from: "vntc468@gmail.com", 
            to: `${email}`,  
            subject: "Register in UBER",
            text: "Thanks for using our service",
        };
        const info = await transporter.sendMail(mailOptions);
        // console.log("Email sent successfully: ", info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }
    // const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password
    });
    sendMail({email});
    const token = user.generateAuthToken();
    res.status(201).cookie('token',token).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = user.generateAuthToken();
    // sendMail({email});
    res.status(200).cookie('token',token).json({ token, user });
}

// module.exports.getProfile = async (req, res, next) => {
//     try {
//         const userCache = await client.get('user');
//         console.log("🔍 Cached Data:", req.user);

//         if (userCache) {
//             console.log("✅ Fetched from Redis");
//             return res.status(200).json(JSON.parse(userCache));
//         }

//         // Set data to Redis with expiration in one command
//         const setResponse = await client.set('user', JSON.stringify(req.user), 'EX', 10);
//         console.log("📦 Redis SET response:", setResponse); // Should be 'OK'

//         if (setResponse === 'OK') {
//             console.log("✅ User data cached in Redis");
//         } else {
//             console.error("❌ Failed to set data in Redis");
//         }

//         res.status(200).json(req.user);
//     } catch (err) {
//         console.error("❌ Redis Error:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

module.exports.getProfile = async (req, res, next) => {
    const userCache = await client.get('user');
    if (userCache) {
        return res.status(200).json(JSON.parse(userCache));
    }   

    res.status(200).json(req.user);
    client.set('user', JSON.stringify(req.user));
    client.expire('user', 50);
}


module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistToken.create({token});  
    // token still present if they save it in loacal storage or some other user acces it
    res.status(200).json({ message: 'Logout successfully' });

}

