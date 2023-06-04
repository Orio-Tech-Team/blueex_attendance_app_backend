// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require('https');
//
interface ReturnType {
  emp_id: number;
  emp_name: string;
  emp_cnic: string;
  emp_date_joining: string;
  emp_date_leaving: string;
  dempartment: string;
  email: string;
  contact: string;
  location: string;
  shift: number;
  desgno: string;
  status: 'YES' | 'NO';
}
//
const agent = new https.Agent({
  rejectUnauthorized: false,
});

//
export async function fetchUser(): Promise<ReturnType[]> {
  return axios
    .get(
      'https://benefitx.blue-ex.com/hrm/cronjob/getempdetail.php?key=blx25877453_2023**()',
      { httpsAgent: agent },
    )
    .then((response) => {
      return response.data.detail;
    })
    .catch((error) => {
      console.log(error);
    });
}
