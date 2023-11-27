const express = require('express')
const router = express.Router()

const listenNavOptions  = {
    route: 'Listener',
    routes: [
        'Listener',
        'DJ',
        'Producer'
    ]
}

const accountNavOptions  = {
    route: 'Login',
    routes: [
        'Listener',
        'DJ',
        'Producer'
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

module.exports = router