const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Logger = require('../models/Logger');
const User = require('../models/User');
const adminLayout = '../views/layouts/admin';


//routes to Admin home page
router.get('/dashboard', async (req, res) => {
  try {
  const locals = {
      title: "Home",
      description: "NB-IoT Data Portal"
      }
  
      let perPage = 6;
      let page = req.query.page || 1;
  
      const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
  
      const count = await Post.countDocuments({});
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
  
      res.render('admin/dashboard', { 
      locals,
      layout: adminLayout,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
      });
  } catch (error) {
    console.log(error);
  }
});

//routes when admin logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
});

//routes for GET logger data
router.get('/loggers/:collectionName', async (req, res) => {
  try {
    const locals = {
      title: "Logger",
      description: "NB-IoT Data Portal",
    }

    let slug = req.params.collectionName;
    const data = await Logger.find({});
    const breadcrumbs = [
      { label: 'Home', url: '/dashboard' },
      { label: 'Loggers', url: '/loggers' },
      { label: slug, url: `/loggers/${slug}` }
    ];
    const graphdata = data;
    res.render('logger', { 
      locals,
      breadcrumbs,
      layout: adminLayout,
      data,
      graphdata: JSON.stringify(graphdata), // Stringify the data array
      currentRoute: `/loggers/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});



  /*/routes to admin page
  router.get('./admin/index', authMiddleware, async (req, res) => {
    try {
      const locals = {
        title: 'Dashboard',
        description: 'NB-IoT Data Portal'
      }
  
      const data = await Post.find();
      res.render('admin/dashboard', {
        locals,
        data,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });



  
//routes for GET POST IDs
router.get('/post/:id', async (req, res) => {
    try {
    const locals = {
        title: "Blog Post",
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    res.render('post', { 
        locals,
        data,
        currentRoute: `/post/${slug}`
    });
    } catch (error) {
    console.log(error);
    }

});*/

module.exports = router;