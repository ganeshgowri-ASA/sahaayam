export interface EscalationContact {
  name: string;
  landline: string;
  mobile: string;
  email: string;
}

export interface OfficeLocation {
  locationName: string;
  adOuName: string;
  state: string;
  city: string;
  level1: EscalationContact;
  level2: EscalationContact;
  level3: EscalationContact;
}

export interface StateData {
  stateCode: string;
  stateName: string;
  locations: OfficeLocation[];
}

export const statesData: StateData[] = [
  {
    stateCode: "AP",
    stateName: "Andhra Pradesh",
    locations: [
      {
        locationName: "Vijayawada Branch",
        adOuName: "OU=Vijayawada,OU=AP,DC=corp,DC=local",
        state: "Andhra Pradesh",
        city: "Vijayawada",
        level1: {
          name: "Ravi Kumar",
          landline: "0866-2412345",
          mobile: "9876543210",
          email: "ravi.kumar@corp.local",
        },
        level2: {
          name: "Suresh Reddy",
          landline: "0866-2412346",
          mobile: "9876543211",
          email: "suresh.reddy@corp.local",
        },
        level3: {
          name: "Anand Rao",
          landline: "040-66123456",
          mobile: "9876543212",
          email: "anand.rao@corp.local",
        },
      },
      {
        locationName: "Visakhapatnam Office",
        adOuName: "OU=Vizag,OU=AP,DC=corp,DC=local",
        state: "Andhra Pradesh",
        city: "Visakhapatnam",
        level1: {
          name: "Prasad Naidu",
          landline: "0891-2512345",
          mobile: "9876543213",
          email: "prasad.naidu@corp.local",
        },
        level2: {
          name: "Ramesh Babu",
          landline: "0891-2512346",
          mobile: "9876543214",
          email: "ramesh.babu@corp.local",
        },
        level3: {
          name: "Anand Rao",
          landline: "040-66123456",
          mobile: "9876543212",
          email: "anand.rao@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "DN",
    stateName: "Dadra & Nagar Haveli",
    locations: [
      {
        locationName: "Silvassa Office",
        adOuName: "OU=Silvassa,OU=DN,DC=corp,DC=local",
        state: "Dadra & Nagar Haveli",
        city: "Silvassa",
        level1: {
          name: "Mohan Patel",
          landline: "0260-2642345",
          mobile: "9876543220",
          email: "mohan.patel@corp.local",
        },
        level2: {
          name: "Kiran Shah",
          landline: "0260-2642346",
          mobile: "9876543221",
          email: "kiran.shah@corp.local",
        },
        level3: {
          name: "Vijay Mehta",
          landline: "022-66123456",
          mobile: "9876543222",
          email: "vijay.mehta@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "DL",
    stateName: "Delhi",
    locations: [
      {
        locationName: "Connaught Place Office",
        adOuName: "OU=CP,OU=DL,DC=corp,DC=local",
        state: "Delhi",
        city: "New Delhi",
        level1: {
          name: "Amit Sharma",
          landline: "011-23412345",
          mobile: "9876543230",
          email: "amit.sharma@corp.local",
        },
        level2: {
          name: "Priya Singh",
          landline: "011-23412346",
          mobile: "9876543231",
          email: "priya.singh@corp.local",
        },
        level3: {
          name: "Deepak Gupta",
          landline: "011-66123456",
          mobile: "9876543232",
          email: "deepak.gupta@corp.local",
        },
      },
      {
        locationName: "Nehru Place Office",
        adOuName: "OU=NehruPlace,OU=DL,DC=corp,DC=local",
        state: "Delhi",
        city: "New Delhi",
        level1: {
          name: "Rohit Verma",
          landline: "011-26412345",
          mobile: "9876543233",
          email: "rohit.verma@corp.local",
        },
        level2: {
          name: "Priya Singh",
          landline: "011-23412346",
          mobile: "9876543231",
          email: "priya.singh@corp.local",
        },
        level3: {
          name: "Deepak Gupta",
          landline: "011-66123456",
          mobile: "9876543232",
          email: "deepak.gupta@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "GJ",
    stateName: "Gujarat",
    locations: [
      {
        locationName: "Ahmedabad HQ",
        adOuName: "OU=Ahmedabad,OU=GJ,DC=corp,DC=local",
        state: "Gujarat",
        city: "Ahmedabad",
        level1: {
          name: "Nirav Patel",
          landline: "079-26412345",
          mobile: "9876543240",
          email: "nirav.patel@corp.local",
        },
        level2: {
          name: "Hetal Shah",
          landline: "079-26412346",
          mobile: "9876543241",
          email: "hetal.shah@corp.local",
        },
        level3: {
          name: "Vijay Mehta",
          landline: "022-66123456",
          mobile: "9876543222",
          email: "vijay.mehta@corp.local",
        },
      },
      {
        locationName: "Surat Branch",
        adOuName: "OU=Surat,OU=GJ,DC=corp,DC=local",
        state: "Gujarat",
        city: "Surat",
        level1: {
          name: "Dhruv Desai",
          landline: "0261-2412345",
          mobile: "9876543242",
          email: "dhruv.desai@corp.local",
        },
        level2: {
          name: "Hetal Shah",
          landline: "079-26412346",
          mobile: "9876543241",
          email: "hetal.shah@corp.local",
        },
        level3: {
          name: "Vijay Mehta",
          landline: "022-66123456",
          mobile: "9876543222",
          email: "vijay.mehta@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "JH",
    stateName: "Jharkhand",
    locations: [
      {
        locationName: "Ranchi Office",
        adOuName: "OU=Ranchi,OU=JH,DC=corp,DC=local",
        state: "Jharkhand",
        city: "Ranchi",
        level1: {
          name: "Sanjay Mahato",
          landline: "0651-2412345",
          mobile: "9876543250",
          email: "sanjay.mahato@corp.local",
        },
        level2: {
          name: "Ritu Kumari",
          landline: "0651-2412346",
          mobile: "9876543251",
          email: "ritu.kumari@corp.local",
        },
        level3: {
          name: "Ashok Mishra",
          landline: "033-66123456",
          mobile: "9876543252",
          email: "ashok.mishra@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "KA",
    stateName: "Karnataka",
    locations: [
      {
        locationName: "Bangalore Tech Park",
        adOuName: "OU=Bangalore,OU=KA,DC=corp,DC=local",
        state: "Karnataka",
        city: "Bangalore",
        level1: {
          name: "Sunil Kumar",
          landline: "080-66412345",
          mobile: "9876543260",
          email: "sunil.kumar@corp.local",
        },
        level2: {
          name: "Kavitha Rao",
          landline: "080-66412346",
          mobile: "9876543261",
          email: "kavitha.rao@corp.local",
        },
        level3: {
          name: "Venkat Narayan",
          landline: "080-66123456",
          mobile: "9876543262",
          email: "venkat.narayan@corp.local",
        },
      },
      {
        locationName: "Mysuru Office",
        adOuName: "OU=Mysuru,OU=KA,DC=corp,DC=local",
        state: "Karnataka",
        city: "Mysuru",
        level1: {
          name: "Harish Gowda",
          landline: "0821-2412345",
          mobile: "9876543263",
          email: "harish.gowda@corp.local",
        },
        level2: {
          name: "Kavitha Rao",
          landline: "080-66412346",
          mobile: "9876543261",
          email: "kavitha.rao@corp.local",
        },
        level3: {
          name: "Venkat Narayan",
          landline: "080-66123456",
          mobile: "9876543262",
          email: "venkat.narayan@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "KL",
    stateName: "Kerala",
    locations: [
      {
        locationName: "Kochi Office",
        adOuName: "OU=Kochi,OU=KL,DC=corp,DC=local",
        state: "Kerala",
        city: "Kochi",
        level1: {
          name: "Rajesh Nair",
          landline: "0484-2412345",
          mobile: "9876543270",
          email: "rajesh.nair@corp.local",
        },
        level2: {
          name: "Meera Pillai",
          landline: "0484-2412346",
          mobile: "9876543271",
          email: "meera.pillai@corp.local",
        },
        level3: {
          name: "Suresh Menon",
          landline: "0471-66123456",
          mobile: "9876543272",
          email: "suresh.menon@corp.local",
        },
      },
      {
        locationName: "Thiruvananthapuram HQ",
        adOuName: "OU=TVM,OU=KL,DC=corp,DC=local",
        state: "Kerala",
        city: "Thiruvananthapuram",
        level1: {
          name: "Anil Kumar",
          landline: "0471-2412345",
          mobile: "9876543273",
          email: "anil.kumar@corp.local",
        },
        level2: {
          name: "Meera Pillai",
          landline: "0484-2412346",
          mobile: "9876543271",
          email: "meera.pillai@corp.local",
        },
        level3: {
          name: "Suresh Menon",
          landline: "0471-66123456",
          mobile: "9876543272",
          email: "suresh.menon@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "MP",
    stateName: "Madhya Pradesh",
    locations: [
      {
        locationName: "Bhopal Office",
        adOuName: "OU=Bhopal,OU=MP,DC=corp,DC=local",
        state: "Madhya Pradesh",
        city: "Bhopal",
        level1: {
          name: "Vikram Tiwari",
          landline: "0755-2412345",
          mobile: "9876543280",
          email: "vikram.tiwari@corp.local",
        },
        level2: {
          name: "Sunita Joshi",
          landline: "0755-2412346",
          mobile: "9876543281",
          email: "sunita.joshi@corp.local",
        },
        level3: {
          name: "Rajeev Shukla",
          landline: "0755-66123456",
          mobile: "9876543282",
          email: "rajeev.shukla@corp.local",
        },
      },
      {
        locationName: "Indore Branch",
        adOuName: "OU=Indore,OU=MP,DC=corp,DC=local",
        state: "Madhya Pradesh",
        city: "Indore",
        level1: {
          name: "Ajay Pandey",
          landline: "0731-2412345",
          mobile: "9876543283",
          email: "ajay.pandey@corp.local",
        },
        level2: {
          name: "Sunita Joshi",
          landline: "0755-2412346",
          mobile: "9876543281",
          email: "sunita.joshi@corp.local",
        },
        level3: {
          name: "Rajeev Shukla",
          landline: "0755-66123456",
          mobile: "9876543282",
          email: "rajeev.shukla@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "MH",
    stateName: "Maharashtra",
    locations: [
      {
        locationName: "Mumbai HQ",
        adOuName: "OU=Mumbai,OU=MH,DC=corp,DC=local",
        state: "Maharashtra",
        city: "Mumbai",
        level1: {
          name: "Rahul Deshmukh",
          landline: "022-66412345",
          mobile: "9876543290",
          email: "rahul.deshmukh@corp.local",
        },
        level2: {
          name: "Sneha Kulkarni",
          landline: "022-66412346",
          mobile: "9876543291",
          email: "sneha.kulkarni@corp.local",
        },
        level3: {
          name: "Vijay Mehta",
          landline: "022-66123456",
          mobile: "9876543222",
          email: "vijay.mehta@corp.local",
        },
      },
      {
        locationName: "Pune Office",
        adOuName: "OU=Pune,OU=MH,DC=corp,DC=local",
        state: "Maharashtra",
        city: "Pune",
        level1: {
          name: "Ganesh Patil",
          landline: "020-26412345",
          mobile: "9876543292",
          email: "ganesh.patil@corp.local",
        },
        level2: {
          name: "Sneha Kulkarni",
          landline: "022-66412346",
          mobile: "9876543291",
          email: "sneha.kulkarni@corp.local",
        },
        level3: {
          name: "Vijay Mehta",
          landline: "022-66123456",
          mobile: "9876543222",
          email: "vijay.mehta@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "OD",
    stateName: "Odisha",
    locations: [
      {
        locationName: "Bhubaneswar Office",
        adOuName: "OU=Bhubaneswar,OU=OD,DC=corp,DC=local",
        state: "Odisha",
        city: "Bhubaneswar",
        level1: {
          name: "Sushant Mohapatra",
          landline: "0674-2412345",
          mobile: "9876543300",
          email: "sushant.mohapatra@corp.local",
        },
        level2: {
          name: "Priti Panda",
          landline: "0674-2412346",
          mobile: "9876543301",
          email: "priti.panda@corp.local",
        },
        level3: {
          name: "Ashok Mishra",
          landline: "033-66123456",
          mobile: "9876543252",
          email: "ashok.mishra@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "PB",
    stateName: "Punjab",
    locations: [
      {
        locationName: "Chandigarh Office",
        adOuName: "OU=Chandigarh,OU=PB,DC=corp,DC=local",
        state: "Punjab",
        city: "Chandigarh",
        level1: {
          name: "Harpreet Singh",
          landline: "0172-2412345",
          mobile: "9876543310",
          email: "harpreet.singh@corp.local",
        },
        level2: {
          name: "Gurpreet Kaur",
          landline: "0172-2412346",
          mobile: "9876543311",
          email: "gurpreet.kaur@corp.local",
        },
        level3: {
          name: "Deepak Gupta",
          landline: "011-66123456",
          mobile: "9876543232",
          email: "deepak.gupta@corp.local",
        },
      },
      {
        locationName: "Ludhiana Branch",
        adOuName: "OU=Ludhiana,OU=PB,DC=corp,DC=local",
        state: "Punjab",
        city: "Ludhiana",
        level1: {
          name: "Manjit Bhatia",
          landline: "0161-2412345",
          mobile: "9876543312",
          email: "manjit.bhatia@corp.local",
        },
        level2: {
          name: "Gurpreet Kaur",
          landline: "0172-2412346",
          mobile: "9876543311",
          email: "gurpreet.kaur@corp.local",
        },
        level3: {
          name: "Deepak Gupta",
          landline: "011-66123456",
          mobile: "9876543232",
          email: "deepak.gupta@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "RJ",
    stateName: "Rajasthan",
    locations: [
      {
        locationName: "Jaipur Office",
        adOuName: "OU=Jaipur,OU=RJ,DC=corp,DC=local",
        state: "Rajasthan",
        city: "Jaipur",
        level1: {
          name: "Rajendra Sharma",
          landline: "0141-2412345",
          mobile: "9876543320",
          email: "rajendra.sharma@corp.local",
        },
        level2: {
          name: "Pooja Agarwal",
          landline: "0141-2412346",
          mobile: "9876543321",
          email: "pooja.agarwal@corp.local",
        },
        level3: {
          name: "Deepak Gupta",
          landline: "011-66123456",
          mobile: "9876543232",
          email: "deepak.gupta@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "TN",
    stateName: "Tamil Nadu",
    locations: [
      {
        locationName: "Chennai HQ",
        adOuName: "OU=Chennai,OU=TN,DC=corp,DC=local",
        state: "Tamil Nadu",
        city: "Chennai",
        level1: {
          name: "Murugan Raj",
          landline: "044-66412345",
          mobile: "9876543330",
          email: "murugan.raj@corp.local",
        },
        level2: {
          name: "Lakshmi Subramaniam",
          landline: "044-66412346",
          mobile: "9876543331",
          email: "lakshmi.subramaniam@corp.local",
        },
        level3: {
          name: "Venkat Narayan",
          landline: "080-66123456",
          mobile: "9876543262",
          email: "venkat.narayan@corp.local",
        },
      },
      {
        locationName: "Coimbatore Branch",
        adOuName: "OU=Coimbatore,OU=TN,DC=corp,DC=local",
        state: "Tamil Nadu",
        city: "Coimbatore",
        level1: {
          name: "Senthil Kumar",
          landline: "0422-2412345",
          mobile: "9876543332",
          email: "senthil.kumar@corp.local",
        },
        level2: {
          name: "Lakshmi Subramaniam",
          landline: "044-66412346",
          mobile: "9876543331",
          email: "lakshmi.subramaniam@corp.local",
        },
        level3: {
          name: "Venkat Narayan",
          landline: "080-66123456",
          mobile: "9876543262",
          email: "venkat.narayan@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "TS",
    stateName: "Telangana",
    locations: [
      {
        locationName: "Hyderabad Tech Hub",
        adOuName: "OU=Hyderabad,OU=TS,DC=corp,DC=local",
        state: "Telangana",
        city: "Hyderabad",
        level1: {
          name: "Srikanth Reddy",
          landline: "040-66412345",
          mobile: "9876543340",
          email: "srikanth.reddy@corp.local",
        },
        level2: {
          name: "Padma Latha",
          landline: "040-66412346",
          mobile: "9876543341",
          email: "padma.latha@corp.local",
        },
        level3: {
          name: "Anand Rao",
          landline: "040-66123456",
          mobile: "9876543212",
          email: "anand.rao@corp.local",
        },
      },
      {
        locationName: "Secunderabad Office",
        adOuName: "OU=Secunderabad,OU=TS,DC=corp,DC=local",
        state: "Telangana",
        city: "Secunderabad",
        level1: {
          name: "Naresh Babu",
          landline: "040-27412345",
          mobile: "9876543342",
          email: "naresh.babu@corp.local",
        },
        level2: {
          name: "Padma Latha",
          landline: "040-66412346",
          mobile: "9876543341",
          email: "padma.latha@corp.local",
        },
        level3: {
          name: "Anand Rao",
          landline: "040-66123456",
          mobile: "9876543212",
          email: "anand.rao@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "UP",
    stateName: "Uttar Pradesh",
    locations: [
      {
        locationName: "Lucknow Office",
        adOuName: "OU=Lucknow,OU=UP,DC=corp,DC=local",
        state: "Uttar Pradesh",
        city: "Lucknow",
        level1: {
          name: "Rajesh Tripathi",
          landline: "0522-2412345",
          mobile: "9876543350",
          email: "rajesh.tripathi@corp.local",
        },
        level2: {
          name: "Neha Saxena",
          landline: "0522-2412346",
          mobile: "9876543351",
          email: "neha.saxena@corp.local",
        },
        level3: {
          name: "Deepak Gupta",
          landline: "011-66123456",
          mobile: "9876543232",
          email: "deepak.gupta@corp.local",
        },
      },
      {
        locationName: "Noida Branch",
        adOuName: "OU=Noida,OU=UP,DC=corp,DC=local",
        state: "Uttar Pradesh",
        city: "Noida",
        level1: {
          name: "Ankur Saxena",
          landline: "0120-4412345",
          mobile: "9876543352",
          email: "ankur.saxena@corp.local",
        },
        level2: {
          name: "Neha Saxena",
          landline: "0522-2412346",
          mobile: "9876543351",
          email: "neha.saxena@corp.local",
        },
        level3: {
          name: "Deepak Gupta",
          landline: "011-66123456",
          mobile: "9876543232",
          email: "deepak.gupta@corp.local",
        },
      },
    ],
  },
  {
    stateCode: "WB",
    stateName: "West Bengal",
    locations: [
      {
        locationName: "Kolkata HQ",
        adOuName: "OU=Kolkata,OU=WB,DC=corp,DC=local",
        state: "West Bengal",
        city: "Kolkata",
        level1: {
          name: "Subhash Chatterjee",
          landline: "033-22412345",
          mobile: "9876543360",
          email: "subhash.chatterjee@corp.local",
        },
        level2: {
          name: "Mita Banerjee",
          landline: "033-22412346",
          mobile: "9876543361",
          email: "mita.banerjee@corp.local",
        },
        level3: {
          name: "Ashok Mishra",
          landline: "033-66123456",
          mobile: "9876543252",
          email: "ashok.mishra@corp.local",
        },
      },
    ],
  },
];
