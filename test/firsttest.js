import supertest from 'supertest';
import { expect } from 'chai';
import fs from 'fs';
 

const request = supertest('https://sandbox-quickbooks.api.intuit.com/');

const accessToken = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..gpDO5AJwPTPE0bRbwx3sig.0iU9IHv43BSDUIedChhAjCo-3za5Tb-6M5jcVE_1dA1qeB8eytClqJtwQIGIGOPmTaB6zDMzJxeWULKsNnBEM4FC-MKc2CKIsp3uZXDDNpsBJOjRsefQBIgtPH32haG9ypMyzxBPfB3e4HTpedofXdTcdTiyq8aAVWGgcqeRINFWWXBTZbuyjday80UNY2baPxG37UoWm0AIoi4sKD5gDf7ao2ys2kquM5DeoOKz9FaKSsRBCNQFDOctCMorhnT4RbpU8x800h0c9ISBSiTPpV-Zxz38m7EYEY1mvqmJh6PHifaTksP9NwOgMy6jrBUrPhheJIkGkyc5dLA3PduRMJkqnHLAWruCa29U_Oww9dBjSz5xVDFRSbKMuJ9EHMJVt8rJhdQ434nPmR7qNDbsBCCj7RUaOg8zMfzi6_t-uCm9LYe3N3j7-M0dI4NAT3MIX44I3CWy--1Um90tFRJkYjWdUB8Rpmk9oTw76z-DeX1n9xGw1JHhtEemcxr_QZATFP9QZuR6BkXg8plsVymbi3HsOWR4j5wXpUk1XCRe8KhqtqvYbEOViguYwrvfChPcTCOxrV5Z2wFPmpe5CDvLauR1B8jGLFRy0EVxpvzvIET6sBrEQUDo2ujgZ_ieZ1sooijyof2nuWI4vnrd_1iVdV8LF50lhH-ae1f9mnowYSwB276J3RvcsyAKF97qDdQhYK8CJPQdZR7rYoCdLS391etX7jZeWBoEOsiMAiYOH0d-3pH7J4d2et0bX2St-JQi.OrJUawfWDJQbstCMu7l_iA';

// Creating customer list
        let customersList = [{Id : null, FullyQualifiedName : null, NetIncome : null}];

        const customers = await request.get('v3/company/4620816365171332690/query?query=SELECT%20*%20FROM%20customer')
        .set('Authorization', 'Bearer ' + accessToken)
        .set('Accept', 'application/json');
        // console.log(res.body.QueryResponse.Customer[0].Id);
        let i = 0;
        // customers.body.QueryResponse.Customer.forEach(element => {
        //     customersList[i += 1] = {Id : element.Id, FullyQualifiedName : element.FullyQualifiedName};
        //     //customersList.push(element.Id);
        //     //customersList[-1].FullyQualifiedName.push(element.FullyQualifiedName);
        //     console.log(element.FullyQualifiedName);
        //     console.log(element.Id);

        //console.log(res.body.QueryResponse.Customer[0].Id);
        customers.body.QueryResponse.Customer.forEach(element => {
            customersList[i += 1] = {Id : element.Id, FullyQualifiedName : element.FullyQualifiedName};
            //customersList.push(element.Id);
            //customersList[-1].FullyQualifiedName.push(element.FullyQualifiedName);
            //console.log(element.FullyQualifiedName);
            //console.log(element.Id);

        });

        console.log(customersList);

        
        
        let q = 1;
        while (q < customersList.length) 
        {
        const res = await request.get('v3/company/4620816365171332690/reports/ProfitAndLoss?start_date=2015-06-01&end_date=2022-01-01&customer=' + customersList[q].Id)
        .set('Authorization', 'Bearer ' + accessToken)
        .set('Accept', 'application/json');
        
        customersList[q += 0].NetIncome = res.body.Rows.Row.at(-1).Summary.ColData.at(-1).value;


        //console.log(res.body.Rows.Row.at(-1).Summary.ColData.at(-1).value);
        
        // let customerId = await res.body.Header.Customer;
        // const customerName = await request.get('v3/company/4620816365171332690/customer/' + customerId)
        // .set('Authorization', 'Bearer ' + accessToken)
        // .set('Accept', 'application/json');
        // console.log(customerName.body.Customer.FullyQualifiedName);

        q++;
        
        }

        console.log(customersList);

        const data = JSON.stringify(customersList);

        try {
            fs.writeFileSync('NetIncomeReport.json', data);
            console.log("JSON data is saved.");
        } catch (error) {
            console.error(err);
        };

        
