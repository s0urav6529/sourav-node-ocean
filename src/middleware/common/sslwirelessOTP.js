//@external module
const axios = require('axios');
const randomize = require('randomatic');

//@ssl wireless url
const url = `${process.env.DOMAIN}/api/v3/send-sms`;

const OTP = async(req, res, next) => {

    try {

        let { phone } = req.body;

        //phone = phone.startsWith('+') ? phone : `+${phone}`;
    
        const otp = randomize('0','6');
        const message = `Your OTP code is ${otp}`;
        
        const payload = {
            api_token: process.env.API_TOKEN,
            sid: process.env.SID,
            msisdn: phone,
            sms: message,
            csms_id: randomize('0','6')
        };

        const response = await axios.post(url, payload);

        if (response.data.status === "SUCCESS") {
            
            console.log(response.data);

            req.body.phone = phone;
            req.body.otp = otp;
            req.body.response = response.data;
            next();

        } else {

            throw new Error('Failed to send OTP');
        }
    } catch (error) {
        res.status(400).json({ errors : error.message });
    }
}

module.exports = { OTP };