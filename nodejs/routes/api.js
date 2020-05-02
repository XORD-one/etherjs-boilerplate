let express = require('express')
    router = express.Router(),
    require('ethers'),
    methods = require('../utils/functions');

router.get('/balanceOf/:address', async function (req, res) {
    // let result = await methods.getBalanceOf(req.params.address);
    let result = await methods.getNonceByEthAddress(req.params.address);
    res.send(result.toString());
});


router.get('/sign/:message', async function (req, res) {
    // let result = await methods.getBalanceOf(req.params.address);
    let result = await methods.signMessage(req.params.message);
    res.send(result);
});

router.get('/gen/', async function (req, res) {
    // let result = await methods.getBalanceOf(req.params.address);
    let result = await methods.createWallet();
    res.send(result);
});


router.get('/arrayify/:sign', async function (req, res) {
    // let result = await methods.getBalanceOf(req.params.address);
    let result = await methods.arrayify(req.params.sign);
    res.send(result);
});

router.post('/transfer',async function (req, res) {
    let _to = req.body.to;
    let _amount = req.body.amount;
    let result = await methods.transfer(_to, _amount);
    if (Number(result) != -1){
        res.send(result);
    } else{
        res.send('error');
    }
});


router.post('/approve',async function (req, res) {
    let _spender = req.body.spender;
    let _amount = req.body.amount;
    let result = await methods.approve(_spender, _amount);
    res.send(result);

});

router.get('/allowance/:address',async function (req, res) {
    let _spenderAddress = req.params.address 
    let result = await methods.allowance(_spenderAddress);
    res.send(result);
});

router.post('/transferFrom',async function (req, res) {
    let fpk = req.body.fpk; 
    let _add = req.body.address; 
    let f_add = req.body.f_address;
    let _amount = req.body.amount;
    let result = await methods.transferFrom(f_add,_add,_amount, fpk);
    res.send(result);
});



module.exports = router;
