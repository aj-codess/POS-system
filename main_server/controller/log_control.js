import log_service from "./../services/log_service.js";

const cookieOptions = {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
};


const newAdmin=async (req,res)=>{

    const {name,email,password} = req.body;

    const log_mail_checks=log_service.mail_checks(email);

    const log_pass_checks=log_service.pass_checks(password);

    if (log_mail_checks.isValid !== false && log_pass_checks.isValid !== false) {
        try {
            const token_id = log_service.gen_id();
    
            const cookie_token = await log_service.sign_token(token_id);
    
            res.cookie('auth_token', cookie_token, cookieOptions);

            return res.json({
                token_id: token_id,
                message: 'Authentication successful',
            });

            //create a db table with the token id
    
        } catch (error) {

            console.error('Error during token creation:', error);

            return res.status(500).json({ error: 'Internal Server Error' });
        };

    };

        return res.status(500).json({email : log_mail_checks, password : log_pass_checks});
};




const oldAdmin=async (req,res)=>{

    const {email,password}=req.body;

    let mail_check=log_service.mail_isExist(email);

    let pass_check=log_service.pass_isValid(password);
    
    if(mail_check == true && pass_check == true){

        const token_id=log_service.get_id_from_db(email);

        const cookie_token = await log_service.sign_token(user_id);

        res.cookie('auth_token', cookie_token, cookieOptions);

        return res.json({isLoggedIn:true,token_id});

    } else{

        return res.json({isLoggedIn:false});

    };

};

export default {
    newAdmin,
    oldAdmin
}