exports.registerController = (req,res) => {
    const {email,password} = req.body
    console.log(email, password)
    res.send('recieved: Success')
}