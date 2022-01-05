import supertest from 'supertest';
import { expect } from 'chai';
import fs from 'fs';
import { getSystemErrorMap } from 'util';
 

const request = supertest('https://sandbox-quickbooks.api.intuit.com/');

const accessToken = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..QGvNkjtPCMfKiVPTSmHW-g.2dAvNEE_euWal8_XGo27KwY107ke7-OGnePwQv9UT1P7q-s6B2PPQtHe3rM96xpRUU9a72dfu8jrpp8JFiSXYUmUzp-lcTmjd-EltU7b8rrFrqCx20EzvRHfErkpOQfzOwcW71eGBlhSLHhTzQmIY6VzO4n6-brP6ITuatQ4NcIZwSw58q__vXo34DvBfquvRgdoZhm5J03MyoHCicWHtm4kCfJ1G7rMMCZlnm8s7Iy_rC1EEpxclrBK5JOUuPW9gINEnT5xn_d8M9uxRW20NlyaDfl0CIpWDG62aTYHmafs8jI0KIuTk339d6KE8FmQVBGmY1zfOz_02gkYcybYdlJnaa31j_L8V81dFc3Oqm0FnuKoZi6BEUnE5FnvDxRcA2FDUebVn3v2kFdGE27k760docls3ujcz6E8B3ICuB5G2GD5DHtbiyx_fX93gMHdfSzeabouy_J6Cb_TujZJU49P9n44ljFrvZzuuyeUL1Pg4tqQv5IU8ToHLpwj_aSTWd3EqpsMRNTS0nm4G9K-SDZKn3kHHXnuvczKBJj_qExmTJqXhkC77ArsMCUEe2TIjmlGR8Y-hns4std_hjD9CfGkLSyfZYoAVHkt1a7J3u8A8rsm0xz0LwXq_GLFqx4ItntLxVfa7mKWFsHuYaVwI3DRbOTisUFAdOjOAU17Lta0rWBJUydQE-TMsRj1iQsbIIt7bhuLNiqfeLLiec3Iz7ymjEousC-p62m89OJoNOwyq5_a6IDazNxzkUgldmVt.FnzqymhjEMRvuBfB8UPsQA';

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

        //console.log(customersList);
        
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

        //const data = JSON.stringify(customersList);

        

        async function arrayToCSV (data) {
            const csv = await data.map(row => Object.values(row));
            csv.unshift(Object.keys(data[0]));
            return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
          }

        const csvReport = await arrayToCSV(customersList);

        console.log(csvReport);

        try {
            fs.writeFileSync('NetIncomeReport.csv', csvReport);
            console.log("SCV data is saved.");
        } catch (error) {
            console.error(err);
        };