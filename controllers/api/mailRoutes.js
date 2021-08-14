// BRING IN EXPRESS ROUTER, NODEMAILER AND USER & TOOL MODELS
const router = require('express').Router();
const nodemailer = require('nodemailer');
const { User, Tool } = require('../../models');

// Route to send out email after "Request to Borrow is clicked"
// This is the functionality for nodemailer
router.post('/:id', async (req, res) => {

    // Find tool by pk and include the tool's user name and email
    const dbToolData = await Tool.findByPk(req.params.id, {
        include: [
            {
            model: User,
            attributes: ['name', 'email'],
            },
        ],
    });

    const tool = dbToolData.get({ plain: true });

    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // Points to secure Toolin' Around email address and password
            user: process.env.EMAIL,
            pass: process.env.PASSWORD 
        }
    });

    // Step 2
    let mailOptions = {
        from: 'toolin.around21@gmail.com', 
        to: `${tool.user.email}`, 
        subject: `Tool Requested: ${tool.name}`,
        text: 'A neighbor has requested one of your tools.',
        html: `
            <p>Hey, ${tool.user.name}!</p>
            <p>The user below has requested to borrow one of your tools. Please contact them directly to arrange for pick up.</p>
            <ul>
                <li>Name: <a href="https://toolin-around.herokuapp.com/user/${req.session.user_id}">${req.session.user_name}</a></li>
                <li>Email: <a href="mailto:${req.session.user_email}">${req.session.user_email}</a></li>
                <li>Tool Requested: <a href="https://toolin-around.herokuapp.com/tools/${tool.id}">${tool.name}</a></li>
            </ul>
            <p>~The Toolin' Around Team</p>
            <p><a href="mailto:toolin.around21@gmail.com">Email us</a> with any questions!<p>
        `
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs', err);
        }
        return console.log('Email sent!!!');
    });
    res.status(200).json({
        
    });
})

// EXPORT ROUTER
module.exports = router;

