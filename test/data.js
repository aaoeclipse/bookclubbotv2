const db = require('../db/db')


const runTest = async () => {
    // await db.initDb(false)
    // const test =  await db.getUser('aaoeclipse');
    // console.log(test[0]['dataValues'])
    const change = await db.changeState('aaoeclipse', { state: 'gogo'})
    console.log(change['dataValues'])
    console.log('====')
    const test =  await db.getUser('aaoeclipse');
    console.log(test[0]['dataValues'])
    
}

runTest();