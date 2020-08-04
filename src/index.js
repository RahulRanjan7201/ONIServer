const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser')
const db = require("./config/db");
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const path = require("path")
const userService = require('./service/user');
const postService = require('./service/post');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Password are not secure now but in enhancement we can do it 
// More Sepration of cencern will be there like controllers and routers can be moved to different folders
app.use(fileUpload({
  createParentPath: true
}));


app.get("/verifyuser/:email/:password", async  (req, res) => {
  try {
    const isUserValid = await userService.verifyUser(req.params.email, req.params.password);
    if(isUserValid) {
      return res.status(200).json({message:'User details verified '})
    } else {
      res.status(500).json({message:'User auth failed ! Contact Project Manager'})
    }
  } catch(err) {
    res.status(500).json({message:'User auth failed ! Contact Project Manager'})
  }
})

app.use('/mediafiles', express.static( 'uploads'))

app.get('/posts', async(req, res)=> {
  try {
    const posts = await postService.loadPosts();
    res.json(posts)
  } catch (err) {
    res.status(500).send(err);
}

})

app.post('/submit', async (req, res) => {
  try {
        let Files = req.files.Files;
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        Files.mv(`./uploads/${req.body.email}/` + Files.name);
        const mediaPath = `/uploads/${req.body.email}/` + Files.name;
        await postService.savePost(mediaPath,req.body.email, req.body.message)
        //send response
        res.send({
            status: true,
            message: 'Post Submitted Successfully.',
        });
    } catch (err) {
    res.status(500).send(err);
}
});

app.listen(port, function() {
  console.log(`API is running at ${port}`);
});