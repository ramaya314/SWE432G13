const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const ShowRepository = require('../database/repositories/showRepository')

const listenNavOptions  = {
    route: 'Listener',
    routes: [
        'Listener',
        'Producer',
        'DJ'
    ]
}

const accountNavOptions  = {
    route: 'Login',
    routes: [
        'Listener',
        'Producer',
        'DJ'
    ]
}

const producerNavOptions  = {
    route: 'Producer',
    routes: [
        'Listener',
        'Producer',
        'DJ'
    ]
}

// middleware to test if authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userid){
        next()
    } else {
        res.redirect('/pages/login')
    }
}

router.get('/', (req, res) => {
    if (req.session.userid) {
        res.redirect('/pages/listener')
        return
    }

    res.redirect('/pages/login')
})

router.get('/login', (req, res) => {
    if (req.session.userid) {
        res.redirect('/pages/account')
        return
    }

    res.render('pages/login', { currPage: 'login'})
})

router.get('/account', isAuthenticated, (req, res) => {
    res.render('pages/account', { user: req.session.username, navOptions: accountNavOptions })
})

router.get('/listener', isAuthenticated, (req, res) => {
    res.render('pages/listener/home', { currPage: 'home', navOptions: listenNavOptions})
})

router.get('/listener/search', isAuthenticated, (req, res) => {
    res.render('pages/listener/search', { currPage: 'search', navOptions: listenNavOptions})
})

router.get('/listener/preferences', isAuthenticated, (req, res) => {
    res.render('pages/listener/preferences', { currPage: 'preferences', navOptions: listenNavOptions})
})

router.get('/listener/followers', isAuthenticated, (req, res) => {
    res.render('pages/listener/followers', { currPage: 'followers', navOptions: listenNavOptions})
})

router.get('/producer', function (req, res) {
    console.log('session date', req.session.filterShowDate);
    res.render('pages/producer/producer', { filterDate: req.session.filterShowDate, navOptions: producerNavOptions });
});

router.get('/show/edit', function (req, res) {
    res.render('pages/show/edit', { show: null, sessionDate: req.session.filterShowDate, navOptions: producerNavOptions });
});

router.route('/show/edit/:id')
    .get(asyncHandler(async (req, res) => {
        let show = await (new ShowRepository()).get(req.params.id);
        console.log('got show', show);
        res.render('pages/show/edit', { show, navOptions: producerNavOptions });
    }));


module.exports = router