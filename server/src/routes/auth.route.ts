import express from "express";
import passport from "passport";

const router = express.Router();
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {failureRedirect:"/login"}),
    (req, res) => {
        res.redirect('/');
    }
)
router.get('/getUser', (req, res) => {
    res.send(req.user);
})
router.post('/getUser', (req, res) => {
    req.logout((err) => {if(err)res.status(500);})
})
export default router;