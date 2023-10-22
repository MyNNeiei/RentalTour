var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
// const bcrypt = require('bcrypt')
// const saltRounds = 10
// var jwt = require('jsonwebtoken')
// const secret = 'secrettoken'
// const { v4: uuidv4 } = require('uuid')
// const stripe = require('stripe')('sk_test_51O0jcLDsQIrsTUCOQFK3iIECI42gfTYs5rebbtLJmKzWEdaNJVsOpAcnxJYAQSUDlpKDiNHifQlEBbVuoPdwYqQo000naBIorQ')
// const endpointSecret = 'whsec_0ef7b8c280ccd9e237551ef29b86c256acc1a56ae71e2755bb32b909d0ccb7a1'


app.use(cors())

const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'rentaltour2'
  });

app.get('/getPromotion', jsonParser,function(req,res,next){
  connection.query('select * from promotions', (err, results) => {
    if (err){
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
      return;
    }
    res.json(results);
  })
})

app.get('/getCarInfo', jsonParser,function(req,res,next){
  connection.query('select * from cars', (err, results) => {
    if (err){
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
      return;
    }
    res.json(results);
  })
})

app.get('/getItemInfo', jsonParser,function(req,res,next){
  connection.query('select * from items', (err, results) => {
    if (err){
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
      return;
    }
    res.json(results);
  })
})

app.get('/getInsurance', jsonParser,function(req,res,next){
  connection.query('select * from insurance', (err, results) => {
    if (err){
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
      return;
    }
    res.json(results);
  })
})

app.get('/getUserInfo', jsonParser,function(req,res,next){
  connection.query('select concat(cust_name," ",cust_surname) as "Full_name" from customers where cust_id = 1', (err, results) => {
    if (err){
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
      return;
    }
    res.json(results);
  })
})

app.get('/getHistory', jsonParser,function(req,res,next){
  connection.query('SELECT end_point,start_date,all_price,req_car_type from schedule join reservation USING(schedule_id)', (err, results) => {
    if (err){
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
      return;
    }
    res.json(results);
  })
})

app.get('/getItemPrice', jsonParser,function(req,res,next){
  connection.query('select item_id,item_price from items', (err, results) => {
    if (err){
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
      return;
    }
    res.json(results);
  })
})

app.post('/selectpoint', jsonParser,function(req,res,next){
  connection.execute('insert into schedule( start_date, end_date, req_car_type, req_car_seat,  start_point, end_point) values (?,?,?,?,?,?)',
  [req.body.startdate, req.body.enddate, req.body.reqtype, req.body.reqseat, req.body.startpoint, req.body.endpoint],
              function(err, results, fields) {
                if (err){
                  res.json({status: 'error', message: err})
                  return
                }
                res.json({status : 'ok'})          
              }
            );
      });


app.post('/insertReserve', jsonParser,function(req,res,next){
    connection.execute('insert into reservation(cust_id,car_id,emp_id,schedule_id,insurance_id,item_id,all_price) values (?,?,?,?,?,?,?)',
    [req.body.cust_id, req.body.car_id, req.body.emp_id, req.body.schedule_id, req.body.insurance_id, req.body.item_id, req.body.all_price],
                function(err, results, fields) {
                      if (err){
                        res.json({status: 'error', message: err})
                        return
                   }
                      res.json({status : 'ok'})          
                    }
                  );
            });

app.get('/getReserveId', jsonParser,function(req,res,next){
  connection.query('select schedule_id from schedule where schedule_id = all (select count(schedule_id) from schedule)', (err, results) => {
    if (err){
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
        return;
        }
          res.json(results);
        })
      })     











































































// app.post('/register', jsonParser,function (req, res, next) {
//     bcrypt.hash(req.body.cust_password, saltRounds, function(err, hash) {
//         connection.execute(
//             'INSERT INTO customers (cust_email, cust_password, cust_name, cust_surname, cust_tel) VALUES (?, ?, ?, ?, ?)',
//             [req.body.cust_email, hash, req.body.cust_name, req.body.cust_surname, req.body.cust_tel],
//             function(err, results, fields) {
//               if (err){
//                 res.json({status: 'error', message: err})
//                 return
//               }
//               res.json({status : 'ok'})
        
//             }
//           );
//     });
// })

// app.post('/routepage', jsonParser,function (req, res, next){
//   connection.execute(
//     'INSERT INTO schedule (start_point, destination, travel_date) VALUES (?, ?, ?)',
//     [req.body.start_point, req.body.destination,  req.body.travel_date],
//     function(err, results, fields) {
//       if (err){
//         res.json({status: 'error', message: err})
//         return
//       }
      

//       res.json({status : 'ok'})

//     }
//   );


// })

// app.get('/history', jsonParser,function(req,res,next){
//   connection.query('select history_id,start_point,destination,travel_date,rating,payment_date,rent_price,concat(car_brand," ",car_model) as "car",cust_id from reservation join payment using(reserve_id) join history using(payment_id) join schedule on(reserve_schedule_id = schedule_id)  join car on(car_id = reserve_car_id)  join customers on(cust_id = reserve_cust_id) left outer join reviews on(review_id = reserve_id) where payment.status like "complete"', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })

  

// app.post('/login', jsonParser,function (req, res, next){
//   connection.execute(
//       'SELECT * FROM customers WHERE cust_email = ?',
//       [req.body.cust_email],
//       function(err, customers, fields) {
//           if (err){ res.json({status: 'error', message: err}); return }
//           if (customers.length == 0) {res.json({status : 'error', message :  'no user found' }); return }
//           bcrypt.compare(req.body.cust_password, customers[0].cust_password, function(err, isLogin) {
//               if (isLogin){
//                 var token = jwt.sign({ cust_email: customers[0].cust_email }, secret, {expiresIn: '1h'});
//                 var username = customers[0].cust_name
//                 var surname = customers[0].cust_surname
//                 var email = customers[0].cust_email
//                 var tel = customers[0].cust_tel
//                 var id = customers[0].cust_id
//                   res.json({status : 'ok', message: 'login success', token, username, surname, email, tel, id})
//               }else{
//                   res.json({status: 'error', message: 'login failed'})
//               }
//           });
//       }
//   );
// })

// app.post('/authen', jsonParser,function (req, res, next){
//   try{
//     const token = req.headers.authorization.split(' ')[1]
//     var decoded = jwt.verify(token, secret);
//     res.json({status : 'ok', decoded})

//   } catch(err){
//     res.json({status : 'error', message : err.message})

//   }
  
// })

// app.get('/getcheckoutinfo', jsonParser,function(req,res,next){
//   connection.query('SELECT concat(car_brand," ",car_model) as "car_name",rent_price,car_id from car', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })



// app.post('/checkout', express.json(), async(req, res) =>{
//   try {
//     const {user, product} = req.body
//     const orderId = uuidv4()

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['promptpay'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'thb',
//             product_data: {
//               name: product.name,
//             },
//             unit_amount: product.price * 100,
//           },
//           quantity: product.quantity,
//         },
//       ],
//       mode: 'payment',
//       success_url: `http://localhost:3000/review`,
//       cancel_url: `http://localhost:3333/home`,
//     })

//     const orderdata = {
//       startpoint: user.startpoint,
//       endpoint: user.endpoint,
//       status: session.payment_status,
//       payment_date: user.tdate,
//       session_id: session.id,
//       order_id: orderId,
//       reserve_id: user.reserve
//     }    

//     app.get('/checkout2', jsonParser,function(req,res,next){
//       connection.query('select reserve_id from reservation where reserve_id = all (SELECT count(reserve_id) from reservation)', (err, results) => {
//         if (err){
//           console.error('Error executing MySQL query:', err);
//           res.status(500).json({ error: 'An error occurred while fetching data.' });
//           return;
//         }
//         res.json(results);
//       })
//     })    

//     const [result] = await connection.promise().query('INSERT INTO payment SET ?', orderdata);
//     res.json({
//       user,
//       product,
//       session_id: session.id
//     })
//   } catch (error) {
//     console.log('error', error)
//     res.status(400).json({status : 'error', message : error.message})

//   }
// })

// app.post('/checkout3', jsonParser,function (req, res, next){
//   connection.execute(
//     'INSERT INTO reservation (reserve_schedule_id, reserve_cust_id, reserve_car_id) VALUES (?, ?, ?)',
//     [req.body.scheduleid, req.body.custid,  req.body.carid],
//     function(err, results, fields) {
//       if (err){
//         res.json({status: 'error', message: err})
//         return
//       }
//       res.json({status : 'ok'})
//     }
//   );
// })

// app.get('/payment/:id', async(req, res) => {
//   const orderId = req.params.id
  
//   try {
//     const [result] = await connection.promise().query('SELECT * from payment where order_id = ?', orderId)
//     const orderResult = result[0]
//     res.json({
//       order : orderResult
//     })
//   } catch (error) {
//     console.log('error', error)
//     res.status(404).json({ error: error.errorMessage || 'System error' })
//   }
// })

// app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
//   const sig = req.headers['stripe-signature']

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     res.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const paymentData = event.data.object
//       console.log('paymentData', paymentData)
//       const session_id = paymentData.id
//       const data = {
//         status: paymentData.status
//       }

//       const [result] = await connection.promise().query(
//         'UPDATE payment SET ? WHERE session_id = ?',
//         [data, session_id]
//       )
      
//       console.log('=== update result', result)
      
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   res.send();
// });

// app.get('/home', jsonParser,function(req,res,next){
//   connection.query('select car_id,travel_date from car left outer join reservation on (car_id = reserve_car_id) join schedule on(reserve_schedule_id = schedule_id) join payment using(reserve_id) where payment.status like "complete"', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })

// app.get('/home2', jsonParser,function(req,res,next){
//   connection.query('select car_id,owner_id,concat(owner_name," ",owner_surname) as "owner_fullname",owner_tel,car_brand,car_model,car_color,car_seat,car_fuel,car_transmission,rent_price,owner_rating from carowner join car on(owner_id = car_owner_id)', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })

// app.get('/home3', jsonParser,function(req,res,next){
//   connection.query('select start_point,destination,travel_date,schedule_id from schedule where schedule_id = all (SELECT count(schedule_id) from schedule)', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })

// app.get('/home4', jsonParser,function(req,res,next){
//   connection.query('select owner_id,owner_rating from carowner', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })

// app.get('/getpaymentid', jsonParser,function(req,res,next){
//   connection.query('select payment_id from payment where payment_id = all (SELECT count(payment_id) from payment)', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })

// app.post('/addtohistory', jsonParser,function (req, res, next){
//   connection.execute(
//     'INSERT INTO history (payment_id) VALUES (?)',
//     [req.body.paymentid],
//     function(err, results, fields) {
//       if (err){
//         res.json({status: 'error', message: err})
//         return
//       }
//       res.json({status : 'ok'})
//     }
//   );
// })

// app.post('/review', jsonParser,function(req,res,next){
//   connection.execute(
//     'INSERT INTO reviews (review_id,rating, review_date, review_owner_id) VALUES (?, ?, ?, ?)',
//     [req.body.review_id, req.body.rating, req.body.review_date, req.body.review_owner_id],
//     function(err, results,fields){
//       if (err){
//         res.json({status: 'error', message: err})
//         return
//       }
      
//     }
//   )
//   connection.execute(
//     'update carowner set owner_rating = ? where owner_id = ?',
//     [req.body.owner_rating, req.body.owner_id],
//     function(err, results,fields){
//       if (err){
//         res.json({status: 'error', message: err})
//         return
//       }
//       res.json({status: 'ok'})
//     }
//   )
// })

// app.get('/review2', jsonParser,function(req,res,next){
//   connection.query('select owner_id,travel_date,owner_rating from carowner co join car c on (co.owner_id = c.car_owner_id) join reservation r on (r.reserve_car_id = c.car_id) join schedule s on (s.schedule_id = r.reserve_schedule_id) where reserve_id = (select count(reserve_id) from reservation)', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })

// app.get('/review3', jsonParser,function(req,res,next){
//   connection.query('select count(payment_id)"id" from payment where payment.status like "complete" having count(payment_id) > 0  ', (err, results) => {
//     if (err){
//       console.error('Error executing MySQL query:', err);
//       res.status(500).json({ error: 'An error occurred while fetching data.' });
//       return;
//     }
//     res.json(results);
//   })
// })


app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})


