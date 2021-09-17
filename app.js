const https = require('https');
var cron = require('node-cron');
var mongoose = require('mongoose');
const fetch = require('node-fetch');
var TickerSchema = require('./TickerSchema')
const express = require('express');
const cors = require('cors');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', //add email from where you want to send the email
    pass: '' //add pass for that email
  }
});
mongoose.connect('mongoose connection string here', { useNewUrlParser: true });

app.use(cors())
app.get('/', (req, res) => {
  if (!req.query.date) {
    req.query.date = new Date();
    req.query.date = new Date(req.query.date.getFullYear(), req.query.date.getMonth(), req.query.date.getDate());
  } else {
    req.query.date = new Date(req.query.date);
  }
  req.query.start_date = new Date(req.query.date);
  req.query.end_date = new Date(req.query.date.setDate(req.query.date.getDate() + 1));
  TickerSchema.find({ date: { $gte: req.query.start_date, $lt: req.query.end_date } }, (err, db) => {
    if (!err) {
      console.log("retrieval successful")
      res.send(db);
      //  res.status(200).send("creation successful")
    }
    else {
      console.log("retrieval unsuccessful")
      console.log(err)
      //  res.status(500).send("creation unsuccessful")
    }
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//run a job every middnight
cron.schedule('0 16 * * *', () => {
  console.log('running a task every midnight');
  func();
});

console.log('upside func')
// setIntervalAsync(
//   () => {console.log('Hello')
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const asyncIntervals = [];
const runAsyncInterval = async (cb, interval, intervalIndex) => {
  await cb();
  if (asyncIntervals[intervalIndex]) {
    setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval);
  }
};
const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === "function") {
    const intervalIndex = asyncIntervals.length;
    asyncIntervals.push(true);
    runAsyncInterval(cb, interval, intervalIndex);
    return intervalIndex;
  } else {
    throw new Error('Callback must be a function');
  }
};

const clearAsyncInterval = (intervalIndex) => {
  if (asyncIntervals[intervalIndex]) {
    asyncIntervals[intervalIndex] = false;
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
let func = async () => {
  console.log('inside func')
  var iterator = 0;
  // here we need to remove the extra tickers  okay..let me make the list on excel yes you can give me an excel file same as you gave me before
  let data = ["GHSI", "GSV", "SYN", "TRX", "ACST", "ITP", "PTN", "NAK", "ADXS", "GTE", "ASRT", "NSPR", "TLGT", "BIOL", "CSCW", "GPL", "XPL", "CTRM", "CFMS", "OGEN", "KIQ", "NAKD", "DNN", "INUV", "NAOV", "MUX", "ADMP", "NBY", "TBLT", "URG", "HSTO", "SHIP", "DFFN", "UXIN", "AEZS", "TNXP", "AIKI", "MTNB", "BORR", "RGLS", "ONTX", "INPX", "ZSAN", "PTE", "SNDL", "MKD", "BXRX", "CHEK", "CIDM", "ISR", "ASM", "NOVN", "NVCN", "UAMY", "CEI", "MOTS", "HDSN", "ATIF", "POAI", "DYNT", "TXMD", "PULM", "LKCO", "NEPT", "BRQS", "LPCN", "AVGR", "NGD", "ITRM", "NXTD", "TGB", "NMTR", "GNUS", "CCO", "XSPA", "IBIO", "GSAT", "USWS", "VEON", "CLBS", "GERN", "TMBR", "PHUN", "ESGC", "ZOM", "HEPA", "GTT", "ACRX", "DGLY", "TYME", "JFU", "CTXR", "ATHX", "SINT", "CLSN", "JAGX", "CIG", "UEC", "QD", "LYG", "STRM", "TRVN", "CRBP", "BEST", "REI", "TTOO", "HOFV", "HOTH", "TOPS", "DHY", "METX", "NGL", "ABEO", "VTGN", "TGC", "TRCH", "TTI", "ABEV", "MICT", "NBEV", "LAIX", "VTVT", "EXPR", "CHS", "ATOS", "SESN", "BOXL", "LQDA", "IAG", "NAT", "MARK", "OGI", "INFI", "DHF", "KOS", "TELL", "GNW", "LGHL", "WTRH", "IDEX", "VISL", "LLNW", "WTI", "COMS", "CIK", "XXII", "VBIV", "KXIN", "RRD", "SENS", "AHT", "REPH", "SPPI", "QEP", "AKBA", "RIG", "AUUD", "QTT", "UGP", "NXE", "SAN", "TOUR", "MBIO", "DSS", "CPG", "OPTT", "TRXC", "ABUS", "HMY", "ENLC", "EVFM", "IVR", "MREO", "BRFS", "OBSV", "NOK", "JE", "CDEV", "AUY", "MFA", "SWN", "DPW", "BBD", "RIGL", "NYMT", "PAVM", "BTU", "XTNT", "TRVG", "TEF", "WATT", "BTG", "CRNT", "ETM", "BGCP", "OPK", "ITUB", "SRTS", "GGB", "FLDM", "AQMS", "AIV", "SOS", "ERF", "HLX", "ASMB", "TCDA", "AFI", "EFOI", "UUUU", "AREC", "ZIOP", "JG", "CNDT", "AMRX", "BBVA", "LIXT", "DHT", "LTRPA", "AFMD", "MNKD", "BKD", "SVM", "SIRI", "SID", "GLOG", "EXK", "CLNY", "CBAT", "CLVS", "SAND", "HMHC", "WIT", "WWR", "CERS", "SOLO", "KGC", "VET", "ALTO", "HL", "SBS", "CX", "ENBL", "MGI", "AMRN", "FRSX", "EBON", "HEXO", "KNDI", "AQB", "AGI", "VXRT", "AYRO", "CXW", "GEO", "TWO", "ETRN", "PSEC", "ZIXI", "PTEN", "CVE", "TV", "KALA", "GPRO", "FSM", "UWMC", "ASX", "ADT", "ET", "COTY", "MOGO", "GEL", "PBR", "ENDP", "AMC", "UAVS", "GFI", "FTI", "MBT", "EQX", "WIMI", "SILV", "NLY", "NG", "KOPN", "PAA", "PBI", "PAGP", "KODK", "DVAX", "ERJ", "AM", "BCS", "LOTZ", "AR", "CDE", "IRWD", "PGRE", "CGEN", "WPRT", "CLOV", "KMPH", "NPTN", "RRC", "SRNE", "GEVO", "PVG", "BNGO", "UMC", "INFN", "NNDM", "TWLVU", "CFII", "OR", "MACQU", "BB", "SBEAU", "DRH", "NRZ", "CRDF", "RUBY", "SLAMU", "CRON", "EGO", "PCG", "ACB", "AUVI", "HEC", "TEVA", "BCRX", "SRNGU", "ING", "AACQ", "AMCR", "OCGN", "SHLX", "ALUS", "MRO", "INO", "ZNGA", "SGMO", "NGAC", "CIM", "SDC", "AJAX", "SFTW", "F", "RTP", "EAF", "FNB", "ACIC", "UNIT", "RAAC", "GSAH", "ATNX", "MTG", "NYCB", "BDN", "DB", "FOLD", "LUMN", "RMO", "QRTEA", "GLUU", "ERIC", "GE", "CNX", "FRX", "AMX", "GOEV", "MAC", "CLNE", "SUNW", "SHO", "VG", "CLF", "ISBC", "HIMX", "ROOT", "BTWN", "IPOF", "AMRS", "KPTI", "NPA", "SM", "KAR", "CDXC", "HOL", "AUPH", "NBLX", "XL", "SSRM", "PBF", "APLE", "PRMW", "DOYU", "TWNK", "CS", "HPE", "COMM", "INSG", "VLDR", "SABR", "KMI", "VTRS", "MVIS", "CBD", "GTES", "MIK", "LU", "SY", "RLGY", "NOV", "HYLN", "CAN", "M", "BFT", "HBAN", "MDRX", "UBS", "CCJ", "SKT", "SLM", "MOMO", "GPK", "AGNC", "CLDR", "WKHS", "ACI", "VIAV", "FHN", "MUR", "STLA", "GMBL", "HST", "X", "IBN", "WES", "ABR", "KOSS", "TAK", "GT", "VALE", "FCEL", "DOC", "BPY", "INFY", "FLR", "VOD", "VST", "RLX", "YSG", "HBI", "GHVI", "EQT", "APHA", "PBCT", "AG", "ESI", "NKLA", "FLEX", "UA", "TGNA", "IGT", "KIM", "TROX", "SBSW", "BOX", "IPOE", "JBLU", "COG", "LTHM", "SVMK", "GOLD", "LAC", "CYTK", "VUZI", "EQNR", "BFLY", "HRB", "FEYE", "ORI", "RIDE", "CNP", "NLOK", "WISH", "BRX", "APA", "SU", "EB", "MFC", "AU", "DM", "KEY", "MAT", "OUT", "RDN", "WEN", "PS"];
// let data = ["GHSI", "GSV", "SYN", "TRX", "ACST", "ITP", "PTN", "NAK", "ADXS", "GTE", "ASRT", "NSPR", "TLGT", "BIOL", "CSCW", "GPL", "XPL", "CTRM", "CFMS", "OGEN", "KIQ", "NAKD", "DNN", "INUV"];

  let d = new Date();
  let todayDate = formatDate(d);
  let oldDate = formatDate(d.setDate(d.getDate() - 3500));
  // const size = 101
  // console.log(oldDate.length-size);
  console.log(oldDate + 'oldDate,')
  console.log(todayDate + 'todayDate')
  let increased_tickers = [];
  // for (const iterator of data) {
  var interval = setAsyncInterval(async func2 => {
    console.log('inside set interval')
    var ticker = {};
    try {
      let response1 = await fetch(
        //${data[iterator]}
        `https://api.tiingo.com/tiingo/daily///${data[iterator]}/prices?token=//`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      let json1 = await response1.json();
      // ticker = { date: json1[0].date, ticker: data[iterator], closed_price: json1[0].close, Volume:json1[0].volume }
      console.log(json1)
      if (json1.length > 0) {
        console.log('inside fetch if')
        //second one
        let response2 = await fetch(
          `https://api.tiingo.com/tiingo/daily///${data[iterator]}/prices?startDate=${oldDate}&endDate=${json1[0].date}&token=//`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        let json2 = await response2.json();
        if (json2.length == 0) {
          console.log('json2 have zero length')
        }
        else {
          var sum1 = 0;
          console.log('json2.length', json2.length)
          for (i = json2.length - 100; i < json2.length; i++) {
            sum1 = sum1 + json2[i].close
          }

          let price = sum1 / 100;
          if (json2.length == 0) {
            price = 0;
          }
          console.log('Todays average is ' + price);
          console.log('Todays close is ' + json1[0].close);
          var yesterdayclose = 0;
          for (i = json2.length - 2; i < json2.length - 1; i++) {
            console.log(json2[i].date)
            console.log('json 2 ')
            yesterdayclose = json2[i].close
            console.log('inside for yester close')
            console.log(yesterdayclose + 'is yesterdays close')
          }
          var sum2 = 0;
          var yesterdayaverage = 0;
          for (i = json2.length - 101; i < json2.length - 1; i++) {
            sum2 = sum2 + json2[i].close
          }
          yesterdayaverage = sum2 / 100;
          console.log(yesterdayaverage + 'is yestedays average')
          if (price > json1[0].close) {
            console.log('Todays average is greater than close today')
            if (yesterdayaverage < yesterdayclose) {
              console.log('its a crossover cz today avg>close yesterday close>avg')
              const ticker = { date: json1[0].date, ticker: data[iterator], average: price, closed_price: json1[0].close }
              console.log(ticker);
              increased_tickers.push(ticker);
              const db = await TickerSchema.create(ticker);
            }
            else {
              // console.log(json1[0].close+'h'+json1[0].date)
              console.log('its not a crossover1')
              
            }
          }
          else {
            if (price < json1[0].close) {
              if (yesterdayaverage > yesterdayclose) {
                console.log('its a crossover cz today avg<close yesterday close<avg')
                ticker = { date: json1[0].date, ticker: data[iterator], average: price, closed_price: json1[0].close }
                console.log(ticker);
                increased_tickers.push(ticker);
                const db = await TickerSchema.create(ticker);
              }
              else {
                // console.log(json1[0].close+'j'+json1[0].date)
                console.log('its not a crossover2')
           
              }
            }
          }
         
        }
      } else {
        console.log('No Data in first api');
      }
    } catch (error) {
      console.error(error);
    }
    console.log('at the end of set interval')
    iterator = iterator + 1;
    if (iterator == data.length) {
      clearAsyncInterval(interval);
      console.log('iterator cleared')
      let email_html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Ticker</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://www.w3schools.com/lib/w3.js"></script>
       
      </head>
      <body  onload="get_fn()">
      
      <div class="container">
        
          <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Ticker</th>
                  <th scope="col">Average</th>
                  <th scope="col">Closed Price</th>
                  
      
                </tr>
              </thead>
              <tbody>`;
    for (const ticker of increased_tickers) {
      email_html += `<tr>
                <th scope="row">${ticker.date}</th>
                <td>${ticker.ticker}</td>
                <td>${ticker.average}</td>
                <td>${ticker.closed_price}</td>
              </tr>`
    }
  
    email_html += `</tbody>
            </table>
            </div>  
      </body>
      </html>`
    //Send email here
    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: '"Tickers ?" <no-reply@tickers.com>', // sender address
      to: '', // list of receivers( , separated here)
      subject: 'Here is the daily report of tickers increased', // Subject line
      html: email_html // html body
  
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      console.log('inside transporter')
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
    }
  }, 23000);
  // };
  console.log('after interval')
 
}
func();
// }, 10000

// )
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}
