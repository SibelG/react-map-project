'use strict';
var express = require('express');
var cors = require('cors');
var router = express.Router();
const parseJson=require('parse-json');
const app = express();
app.use(cors());
const path=require('path');
require('dotenv').config();
const { BigQuery } = require('@google-cloud/bigquery');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios=require('axios');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/polyline/public')));


var query1="";
var query2="";
var query3="";
var obj="";
var obj2="";
var selectList="";
var dateList=[];
var selectDate="";
app.get('/api/getlist3/:tpep_pickup_datetime',function(req,res){
    res.send(req.params.tpep_pickup_datetime)
})
  
function main() {
    async function queryS() {
        
   
   
    
        const bigqueryClient=new BigQuery()
        var sqlQuery,sqlQ,sqlQuery2,sqlQuery3,sqlQuery4,sqlQueryOrigin,sqlQueryDest,sqlQueryDate,q1,q2,sqlQuery32;

               
     
                // The SQL query to run
                //en fazla yolcu tasınan 5 gun
                sqlQuery = `SELECT tpep_pickup_datetime,passenger_count,PULocationID,DOLocationID
                            FROM \`mapapproject.yellowTripdata.TripData\`
                            ORDER BY passenger_count DESC
                            LIMIT 5 `;
                const options = {
                    query: sqlQuery,
                    location: 'US',

                };


                const [rows] = await bigqueryClient.query(options);
                console.log('En fazla yolcu taşınan 5 gün:');
                rows.forEach(rows => console.log(rows));
                query1=rows;
             
                q1=`SELECT EXTRACT(DATE FROM tpep_pickup_datetime) AS  tpep_pickup_datetime, Count(*)as ToplamGezi,AVG(total_amount)AS amount 
                FROM \`mapapproject.yellowTripdata.TripData\`
                WHERE EXTRACT(YEAR FROM tpep_pickup_datetime)=2020
                GROUP BY tpep_pickup_datetime
                ORDER BY AVG(total_amount) ASC
                LIMIT 2`;
               

                const options7 = {
                    query: q1,
                    location: 'US',
                    

                };
                const [r2] = await bigqueryClient.query(options7);
                //console.log('Rows:');
                r2.forEach(r2=>console.log(r2));
             
            
              
                sqlQuery2=`SELECT avg(total_amount) as averageAmount,EXTRACT(DATE FROM tpep_pickup_datetime)as date
                FROM \`mapapproject.yellowTripdata.TripData\`
                WHERE EXTRACT(DATE FROM tpep_pickup_datetime)  BETWEEN '2020-12-05'  AND '2020-12-12'
                GROUP BY  EXTRACT(DATE FROM tpep_pickup_datetime)`;
                const options8 = {
                    query: sqlQuery2,
                    location: 'US',
                    

                };
                const [rows2] = await bigqueryClient.query(options8);
                console.log('Günlük seyehat başına düşen ortalama ücretlere göre en az kazanılan 2 tarih arası ortalama ücretler:');
                rows2.forEach(rows2=> console.log(rows2));
                query2=rows2


                sqlQuery3 = `SELECT EXTRACT(DATE FROM tpep_pickup_datetime) as dateValue,trip_distance ,PULocationID,DOLocationID
                              FROM \`mapapproject.yellowTripdata.TripData\`  
                              WHERE EXTRACT(YEAR FROM tpep_pickup_datetime)=2020 
                              ORDER BY tpep_pickup_datetime DESC 
                              LIMIT 1`;
        
        
                const options3 = {
                    query: sqlQuery3,
                    location: 'US',
                    params:{dateValue:'2020-12-01'},
                   

                };

                
                const [rows3] = await bigqueryClient.query(options3);
                console.log('Belirli bir günde harita üzerindeki en uzun yol:');
                rows3.forEach(rows3=> console.log(rows3));
                const objPULId=Object.values(rows3)[0]['PULocationID'];
                const objDOLId=Object.values(rows3)[0]['DOLocationID'];

                //console.log(objPULId);
                dateList.push(rows3.forEach(rows3=> (rows3.dateValue.value)));

                query3=rows3;
 

                sqlQueryOrigin=`SELECT LocationId,latitude ,longitude,Borough
                                FROM \`mapapproject.yellowTripdata.TaxiZoneData\`
                                WHERE LocationId= @Location`;
                const options5 = {
                     query: sqlQueryOrigin,
                     location: 'US',
                     params:{Location:objPULId},
                 };
                sqlQueryDest=`SELECT LocationId,latitude,longitude,Borough
                              FROM \`mapapproject.yellowTripdata.TaxiZoneData\`
                              WHERE LocationId= @Location`;
                
                const options6 = {
                    query: sqlQueryDest,
                    location: 'US',
                    params:{Location:objDOLId},

                };


                const [rows5] = await bigqueryClient.query(options5);
                console.log('Orijin koordinat bilgileri:');
                rows5.forEach(rows5=> console.log(rows5));
                
                var [rows6] = await bigqueryClient.query(options6);
                console.log('Hedef koordinat bilgileri:');
                rows6.forEach(rows6=> console.log(rows6));
                obj=rows5;
                obj2=rows6;
              
             

    }
    queryS()
}
main()


app.get('/api/getList1',(req,res) => {
    res.json(query1);
    console.log("list send");
});

app.get('/api/getList6',(req,res)=>{


    res.json(obj);
    console.log("list send");


});
app.get('/api/getList7',(req,res)=>{


    res.json(obj2);
    console.log("list send");


});
app.get('/api/getList2',(req,res) => {
    
    res.json(query2);
    console.log("list send");
});
app.get('/api/getList3',(req,res) => {


    res.json(query3);
    console.log("list send");
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/polyline/public/index.html'));
});



const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);


//module.exports=obj;
//module.exports = index;

