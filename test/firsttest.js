import supertest from 'supertest';
import fs from 'fs';
import { getSystemErrorMap } from 'util';
 

const request = supertest('https://quickbooks.api.intuit.com/');

const accessToken = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..25FA2uCZwwfjqYZUJDJC8A.p1UQGUP_dc-RPppDk3Va8_fYtaDX1vOKK4L2RFIXXWQiKpok8TqFSMtss7nlAvf48-mi7a4nsCqiYkqbHBFaWPtsWI0PjH3_M7ob8x_FfgJHtSYD5H9Ur8iEl9XxPwVUZ44nKCfURY8D_kmpY8rluj7BD0B6cu5Bw7rPE97HYo7rQq6MoroB-lcEEj4X6l_g8TJ4iF_Gmglf-PgDh2qcRy-WC7DzDQ0NkDl-LcCBda-B9p_EwW-LZx-Emnbr5XuO73seXHGiAyA8yadWfK2OObjfJA30-6km6rCWwNX0M7ICeC3_-YTWCW6Y-EZAOVc7GPbAef_GUFaZg_AY8CK-hSj9P3ri5U1xEuxGrZPI_05e6qVOikY3vDtkxhkydsxjaJt3SDnS81egqs7-ZJaH7bT027NSkhcm6SpXXWD3H1WcPTkFCIOEP58kf17v1dweWFFEWlnOCruOQJCxNtIPaG_JTCqfP-Q_dZeoPbxA8NvYUxHEpFsvJhJq7Db38gt4wQo-OjC0U-Fja-Wio8o65LiD_zypAJRElbjdneWrGM5YpWkE_659zkUAS-O-XrDdaUmPW5_zmcB4Ety0CqAyTTBCSku0da9tqZzmNp9lQGWCyDB_O-eLdtb7vLNuGf-b2lCUWe49oDYMPOkSuAWsBlUd5-FFmHT3FQVpONrp3qGT5TZQZXxHPR77zIHYndCUs_8Ky5DzOC-mJlngn52LI-OT9YRi32cx96XHLHBPmC4cj0XwnKEWZWJMxSwx4_ij.UR_pLI-qOb_gHG_zRZrbcw';

// Creating customerlist

        let customersList = [{Id : null, FullyQualifiedName : null, NetIncome : null}];


        const customers1 = await request.get('v3/company/9130350746253306/query?query=SELECT%20*%20FROM%20customer%20maxresults%201000%20startposition%201')// + startPosition)
        .set('Authorization', 'Bearer ' + accessToken)
        .set('Accept', 'application/json');

        const customers2 = await request.get('v3/company/9130350746253306/query?query=SELECT%20*%20FROM%20customer%20maxresults%201000%20startposition%201000')// + startPosition)
        .set('Authorization', 'Bearer ' + accessToken)
        .set('Accept', 'application/json');

        // const customers3 = await request.get('v3/company/9130350746253306/query?query=SELECT%20*%20FROM%20customer%20maxresults%201000%20startposition%202000')// + startPosition)
        // .set('Authorization', 'Bearer ' + accessToken)
        // .set('Accept', 'application/json');

        // const customers4 = await request.get('v3/company/9130350746253306/query?query=SELECT%20*%20FROM%20customer%20maxresults%201000%20startposition%203000')// + startPosition)
        // .set('Authorization', 'Bearer ' + accessToken)
        // .set('Accept', 'application/json');

        // const customers5 = await request.get('v3/company/9130350746253306/query?query=SELECT%20*%20FROM%20customer%20maxresults%201000%20startposition%204000')// + startPosition)
        // .set('Authorization', 'Bearer ' + accessToken)
        // .set('Accept', 'application/json');

        const customers = customers1;
        console.log(customers.body);

/*
        let i = 0;
        customers.body.QueryResponse.Customer.forEach(element => {
            customersList[i += 1] = {Id : element.Id, FullyQualifiedName : element.FullyQualifiedName};
        });

// Adding net income to the customerList

        let q = 1;
        while (q < customersList.length) 
        {
        const res = await request.get('v3/company/9130350746253306/reports/ProfitAndLoss?start_date=2015-06-01&end_date=2022-01-01&customer=' + customersList[q].Id)
        .set('Authorization', 'Bearer ' + accessToken)
        .set('Accept', 'application/json');
        
        customersList[q += 0].NetIncome = res.body.Rows.Row.at(-1).Summary.ColData.at(-1).value;

        q++;
        }

// Converting customerList array to SCV

        async function arrayToCSV (data) {
            const csv = await data.map(row => Object.values(row));
            csv.unshift(Object.keys(data[0]));
            return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
          }

        const csvReport = await arrayToCSV(customersList);

        console.log(csvReport);

// Saving SCV to the file

        try {
            fs.writeFileSync('NetIncomeReport.csv', csvReport);
            console.log("SCV data is saved.");
        } catch (error) {
            console.error(err);
        };
*/