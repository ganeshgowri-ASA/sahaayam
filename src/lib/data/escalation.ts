export interface Contact {
  level: 1 | 2 | 3;
  name: string;
  landline: string;
  mobile: string;
  email: string;
}

export interface EscalationTeam {
  id: number;
  teamName: string;
  department: string;
  contacts: Contact[];
}

export const escalationTeams: EscalationTeam[] = [
  {
    id: 1,
    teamName: "Network Operations",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Arjun Sharma", landline: "044-2222-1001", mobile: "9840001001", email: "arjun.sharma@company.com" },
      { level: 2, name: "Priya Nair", landline: "044-2222-1002", mobile: "9840001002", email: "priya.nair@company.com" },
      { level: 3, name: "Karthik Rajan", landline: "044-2222-1003", mobile: "9840001003", email: "karthik.rajan@company.com" },
    ],
  },
  {
    id: 2,
    teamName: "Server Administration",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Meena Sundaram", landline: "044-2222-2001", mobile: "9840002001", email: "meena.sundaram@company.com" },
      { level: 2, name: "Ramesh Babu", landline: "044-2222-2002", mobile: "9840002002", email: "ramesh.babu@company.com" },
      { level: 3, name: "Deepa Krishnan", landline: "044-2222-2003", mobile: "9840002003", email: "deepa.krishnan@company.com" },
    ],
  },
  {
    id: 3,
    teamName: "Help Desk",
    department: "IT Support",
    contacts: [
      { level: 1, name: "Vijay Kumar", landline: "044-2222-3001", mobile: "9840003001", email: "vijay.kumar@company.com" },
      { level: 2, name: "Anitha Raj", landline: "044-2222-3002", mobile: "9840003002", email: "anitha.raj@company.com" },
      { level: 3, name: "Suresh Patel", landline: "044-2222-3003", mobile: "9840003003", email: "suresh.patel@company.com" },
    ],
  },
  {
    id: 4,
    teamName: "Cybersecurity",
    department: "IT Security",
    contacts: [
      { level: 1, name: "Lakshmi Iyer", landline: "044-2222-4001", mobile: "9840004001", email: "lakshmi.iyer@company.com" },
      { level: 2, name: "Ganesh Murthi", landline: "044-2222-4002", mobile: "9840004002", email: "ganesh.murthi@company.com" },
      { level: 3, name: "Rekha Menon", landline: "044-2222-4003", mobile: "9840004003", email: "rekha.menon@company.com" },
    ],
  },
  {
    id: 5,
    teamName: "Cloud Operations",
    department: "Cloud",
    contacts: [
      { level: 1, name: "Arun Venkat", landline: "044-2222-5001", mobile: "9840005001", email: "arun.venkat@company.com" },
      { level: 2, name: "Saritha Devi", landline: "044-2222-5002", mobile: "9840005002", email: "saritha.devi@company.com" },
      { level: 3, name: "Mukesh Gupta", landline: "044-2222-5003", mobile: "9840005003", email: "mukesh.gupta@company.com" },
    ],
  },
  {
    id: 6,
    teamName: "Database Administration",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Kavitha Subramanian", landline: "044-2222-6001", mobile: "9840006001", email: "kavitha.subramanian@company.com" },
      { level: 2, name: "Balachandran M", landline: "044-2222-6002", mobile: "9840006002", email: "balachandran.m@company.com" },
      { level: 3, name: "Nithya Chandrasekhar", landline: "044-2222-6003", mobile: "9840006003", email: "nithya.chandrasekhar@company.com" },
    ],
  },
  {
    id: 7,
    teamName: "Application Support",
    department: "IT Support",
    contacts: [
      { level: 1, name: "Senthil Nathan", landline: "044-2222-7001", mobile: "9840007001", email: "senthil.nathan@company.com" },
      { level: 2, name: "Padmavathi R", landline: "044-2222-7002", mobile: "9840007002", email: "padmavathi.r@company.com" },
      { level: 3, name: "Chandrasekar V", landline: "044-2222-7003", mobile: "9840007003", email: "chandrasekar.v@company.com" },
    ],
  },
  {
    id: 8,
    teamName: "Storage Management",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Vignesh Anand", landline: "044-2222-8001", mobile: "9840008001", email: "vignesh.anand@company.com" },
      { level: 2, name: "Malathi Srinivasan", landline: "044-2222-8002", mobile: "9840008002", email: "malathi.srinivasan@company.com" },
      { level: 3, name: "Thirumalai K", landline: "044-2222-8003", mobile: "9840008003", email: "thirumalai.k@company.com" },
    ],
  },
  {
    id: 9,
    teamName: "ERP Support",
    department: "Business Applications",
    contacts: [
      { level: 1, name: "Usha Mohan", landline: "044-2222-9001", mobile: "9840009001", email: "usha.mohan@company.com" },
      { level: 2, name: "Prakash Selvan", landline: "044-2222-9002", mobile: "9840009002", email: "prakash.selvan@company.com" },
      { level: 3, name: "Jayashree T", landline: "044-2222-9003", mobile: "9840009003", email: "jayashree.t@company.com" },
    ],
  },
  {
    id: 10,
    teamName: "Email & Messaging",
    department: "Communication",
    contacts: [
      { level: 1, name: "Saravanan P", landline: "044-2222-1101", mobile: "9840010001", email: "saravanan.p@company.com" },
      { level: 2, name: "Radha Krishnamurthy", landline: "044-2222-1102", mobile: "9840010002", email: "radha.krishnamurthy@company.com" },
      { level: 3, name: "Dinesh Babu", landline: "044-2222-1103", mobile: "9840010003", email: "dinesh.babu@company.com" },
    ],
  },
  {
    id: 11,
    teamName: "Identity & Access Management",
    department: "IT Security",
    contacts: [
      { level: 1, name: "Gayathri Natarajan", landline: "044-2222-1201", mobile: "9840011001", email: "gayathri.natarajan@company.com" },
      { level: 2, name: "Murugan S", landline: "044-2222-1202", mobile: "9840011002", email: "murugan.s@company.com" },
      { level: 3, name: "Shanthi Durai", landline: "044-2222-1203", mobile: "9840011003", email: "shanthi.durai@company.com" },
    ],
  },
  {
    id: 12,
    teamName: "End User Computing",
    department: "IT Support",
    contacts: [
      { level: 1, name: "Balaji Ramachandran", landline: "044-2222-1301", mobile: "9840012001", email: "balaji.ramachandran@company.com" },
      { level: 2, name: "Suganya Pillai", landline: "044-2222-1302", mobile: "9840012002", email: "suganya.pillai@company.com" },
      { level: 3, name: "Narayanan K", landline: "044-2222-1303", mobile: "9840012003", email: "narayanan.k@company.com" },
    ],
  },
  {
    id: 13,
    teamName: "Virtualization",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Santhosh Kumar G", landline: "044-2222-1401", mobile: "9840013001", email: "santhosh.g@company.com" },
      { level: 2, name: "Hemalatha R", landline: "044-2222-1402", mobile: "9840013002", email: "hemalatha.r@company.com" },
      { level: 3, name: "Ravichandran S", landline: "044-2222-1403", mobile: "9840013003", email: "ravichandran.s@company.com" },
    ],
  },
  {
    id: 14,
    teamName: "Data Center Operations",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Mahalakshmi D", landline: "044-2222-1501", mobile: "9840014001", email: "mahalakshmi.d@company.com" },
      { level: 2, name: "Pandian M", landline: "044-2222-1502", mobile: "9840014002", email: "pandian.m@company.com" },
      { level: 3, name: "Eswari B", landline: "044-2222-1503", mobile: "9840014003", email: "eswari.b@company.com" },
    ],
  },
  {
    id: 15,
    teamName: "Incident Management",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Hariharan V", landline: "044-2222-1601", mobile: "9840015001", email: "hariharan.v@company.com" },
      { level: 2, name: "Nirmala Gopal", landline: "044-2222-1602", mobile: "9840015002", email: "nirmala.gopal@company.com" },
      { level: 3, name: "Subramanian A", landline: "044-2222-1603", mobile: "9840015003", email: "subramanian.a@company.com" },
    ],
  },
  {
    id: 16,
    teamName: "Change Management",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Kamala Devi", landline: "044-2222-1701", mobile: "9840016001", email: "kamala.devi@company.com" },
      { level: 2, name: "Ravi Shankar", landline: "044-2222-1702", mobile: "9840016002", email: "ravi.shankar@company.com" },
      { level: 3, name: "Saranya C", landline: "044-2222-1703", mobile: "9840016003", email: "saranya.c@company.com" },
    ],
  },
  {
    id: 17,
    teamName: "IT Asset Management",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Velumurugan R", landline: "044-2222-1801", mobile: "9840017001", email: "velumurugan.r@company.com" },
      { level: 2, name: "Rani Suresh", landline: "044-2222-1802", mobile: "9840017002", email: "rani.suresh@company.com" },
      { level: 3, name: "Manikandan P", landline: "044-2222-1803", mobile: "9840017003", email: "manikandan.p@company.com" },
    ],
  },
  {
    id: 18,
    teamName: "DevOps",
    department: "Development",
    contacts: [
      { level: 1, name: "Pooja Raman", landline: "044-2222-1901", mobile: "9840018001", email: "pooja.raman@company.com" },
      { level: 2, name: "Aravind Kumar", landline: "044-2222-1902", mobile: "9840018002", email: "aravind.kumar@company.com" },
      { level: 3, name: "Bhavani S", landline: "044-2222-1903", mobile: "9840018003", email: "bhavani.s@company.com" },
    ],
  },
  {
    id: 19,
    teamName: "Software Development",
    department: "Development",
    contacts: [
      { level: 1, name: "Sathish Babu", landline: "044-2222-2001", mobile: "9840019001", email: "sathish.babu@company.com" },
      { level: 2, name: "Divya Priya", landline: "044-2222-2002", mobile: "9840019002", email: "divya.priya@company.com" },
      { level: 3, name: "Muralidharan K", landline: "044-2222-2003", mobile: "9840019003", email: "muralidharan.k@company.com" },
    ],
  },
  {
    id: 20,
    teamName: "QA & Testing",
    department: "Development",
    contacts: [
      { level: 1, name: "Indira Gandhi P", landline: "044-2222-2101", mobile: "9840020001", email: "indira.gandhi@company.com" },
      { level: 2, name: "Natarajan V", landline: "044-2222-2102", mobile: "9840020002", email: "natarajan.v@company.com" },
      { level: 3, name: "Sumathy R", landline: "044-2222-2103", mobile: "9840020003", email: "sumathy.r@company.com" },
    ],
  },
  {
    id: 21,
    teamName: "IT Procurement",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Alagammai T", landline: "044-2222-2201", mobile: "9840021001", email: "alagammai.t@company.com" },
      { level: 2, name: "Selvakumar D", landline: "044-2222-2202", mobile: "9840021002", email: "selvakumar.d@company.com" },
      { level: 3, name: "Thilagam P", landline: "044-2222-2203", mobile: "9840021003", email: "thilagam.p@company.com" },
    ],
  },
  {
    id: 22,
    teamName: "Business Intelligence",
    department: "Business Applications",
    contacts: [
      { level: 1, name: "Gopalakrishnan S", landline: "044-2222-2301", mobile: "9840022001", email: "gopalakrishnan.s@company.com" },
      { level: 2, name: "Chitra Subramaniam", landline: "044-2222-2302", mobile: "9840022002", email: "chitra.subramaniam@company.com" },
      { level: 3, name: "Ranjith K", landline: "044-2222-2303", mobile: "9840022003", email: "ranjith.k@company.com" },
    ],
  },
  {
    id: 23,
    teamName: "ITSM",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Kalpana Mohanraj", landline: "044-2222-2401", mobile: "9840023001", email: "kalpana.mohanraj@company.com" },
      { level: 2, name: "Soundarrajan P", landline: "044-2222-2402", mobile: "9840023002", email: "soundarrajan.p@company.com" },
      { level: 3, name: "Ezhilarasi M", landline: "044-2222-2403", mobile: "9840023003", email: "ezhilarasi.m@company.com" },
    ],
  },
  {
    id: 24,
    teamName: "Telecom",
    department: "Communication",
    contacts: [
      { level: 1, name: "Annamalai K", landline: "044-2222-2501", mobile: "9840024001", email: "annamalai.k@company.com" },
      { level: 2, name: "Vijayalakshmi N", landline: "044-2222-2502", mobile: "9840024002", email: "vijayalakshmi.n@company.com" },
      { level: 3, name: "Prashanth G", landline: "044-2222-2503", mobile: "9840024003", email: "prashanth.g@company.com" },
    ],
  },
  {
    id: 25,
    teamName: "IT Governance",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Manohari S", landline: "044-2222-2601", mobile: "9840025001", email: "manohari.s@company.com" },
      { level: 2, name: "Chandrakumar V", landline: "044-2222-2602", mobile: "9840025002", email: "chandrakumar.v@company.com" },
      { level: 3, name: "Lalitha P", landline: "044-2222-2603", mobile: "9840025003", email: "lalitha.p@company.com" },
    ],
  },
  {
    id: 26,
    teamName: "Disaster Recovery",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Paramasivam T", landline: "044-2222-2701", mobile: "9840026001", email: "paramasivam.t@company.com" },
      { level: 2, name: "Revathi K", landline: "044-2222-2702", mobile: "9840026002", email: "revathi.k@company.com" },
      { level: 3, name: "Dhanasekaran P", landline: "044-2222-2703", mobile: "9840026003", email: "dhanasekaran.p@company.com" },
    ],
  },
  {
    id: 27,
    teamName: "IT Training",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Gomathi Shankar", landline: "044-2222-2801", mobile: "9840027001", email: "gomathi.shankar@company.com" },
      { level: 2, name: "Viswanathan M", landline: "044-2222-2802", mobile: "9840027002", email: "viswanathan.m@company.com" },
      { level: 3, name: "Parimala R", landline: "044-2222-2803", mobile: "9840027003", email: "parimala.r@company.com" },
    ],
  },
  {
    id: 28,
    teamName: "IT Audit & Compliance",
    department: "IT Security",
    contacts: [
      { level: 1, name: "Sridhar N", landline: "044-2222-2901", mobile: "9840028001", email: "sridhar.n@company.com" },
      { level: 2, name: "Ambika Krishnaswamy", landline: "044-2222-2902", mobile: "9840028002", email: "ambika.krishnaswamy@company.com" },
      { level: 3, name: "Prabhu S", landline: "044-2222-2903", mobile: "9840028003", email: "prabhu.s@company.com" },
    ],
  },
  {
    id: 29,
    teamName: "Middleware & Integration",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Radhakrishnan T", landline: "044-2222-3001", mobile: "9840029001", email: "radhakrishnan.t@company.com" },
      { level: 2, name: "Valarmathi C", landline: "044-2222-3002", mobile: "9840029002", email: "valarmathi.c@company.com" },
      { level: 3, name: "Kumaresan G", landline: "044-2222-3003", mobile: "9840029003", email: "kumaresan.g@company.com" },
    ],
  },
  {
    id: 30,
    teamName: "Printing & Imaging",
    department: "IT Support",
    contacts: [
      { level: 1, name: "Periyasamy K", landline: "044-2222-3101", mobile: "9840030001", email: "periyasamy.k@company.com" },
      { level: 2, name: "Mythili Vasudevan", landline: "044-2222-3102", mobile: "9840030002", email: "mythili.vasudevan@company.com" },
      { level: 3, name: "Sugumar P", landline: "044-2222-3103", mobile: "9840030003", email: "sugumar.p@company.com" },
    ],
  },
  {
    id: 31,
    teamName: "Power & UPS Management",
    department: "Facilities",
    contacts: [
      { level: 1, name: "Thiruvenkatam S", landline: "044-2222-3201", mobile: "9840031001", email: "thiruvenkatam.s@company.com" },
      { level: 2, name: "Gowri Shankar", landline: "044-2222-3202", mobile: "9840031002", email: "gowri.shankar@company.com" },
      { level: 3, name: "Pazhanisamy K", landline: "044-2222-3203", mobile: "9840031003", email: "pazhanisamy.k@company.com" },
    ],
  },
  {
    id: 32,
    teamName: "Vendor Management",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Sivasubramanian R", landline: "044-2222-3301", mobile: "9840032001", email: "sivasubramanian.r@company.com" },
      { level: 2, name: "Nandhini Balachandran", landline: "044-2222-3302", mobile: "9840032002", email: "nandhini.balachandran@company.com" },
      { level: 3, name: "Venkatraman S", landline: "044-2222-3303", mobile: "9840032003", email: "venkatraman.s@company.com" },
    ],
  },
  {
    id: 33,
    teamName: "Digital Workplace",
    department: "IT Support",
    contacts: [
      { level: 1, name: "Ashwini Suresh", landline: "044-2222-3401", mobile: "9840033001", email: "ashwini.suresh@company.com" },
      { level: 2, name: "Sivakumar M", landline: "044-2222-3402", mobile: "9840033002", email: "sivakumar.m@company.com" },
      { level: 3, name: "Latha Govindasamy", landline: "044-2222-3403", mobile: "9840033003", email: "latha.govindasamy@company.com" },
    ],
  },
  {
    id: 34,
    teamName: "API Management",
    department: "Development",
    contacts: [
      { level: 1, name: "Karthikeyan V", landline: "044-2222-3501", mobile: "9840034001", email: "karthikeyan.v@company.com" },
      { level: 2, name: "Sangeetha N", landline: "044-2222-3502", mobile: "9840034002", email: "sangeetha.n@company.com" },
      { level: 3, name: "Maheshkumar P", landline: "044-2222-3503", mobile: "9840034003", email: "maheshkumar.p@company.com" },
    ],
  },
  {
    id: 35,
    teamName: "Data Management",
    department: "Business Applications",
    contacts: [
      { level: 1, name: "Sumithra D", landline: "044-2222-3601", mobile: "9840035001", email: "sumithra.d@company.com" },
      { level: 2, name: "Jeyakumar S", landline: "044-2222-3602", mobile: "9840035002", email: "jeyakumar.s@company.com" },
      { level: 3, name: "Rajeswari V", landline: "044-2222-3603", mobile: "9840035003", email: "rajeswari.v@company.com" },
    ],
  },
  {
    id: 36,
    teamName: "IoT Infrastructure",
    department: "IT Infrastructure",
    contacts: [
      { level: 1, name: "Mageshwaran A", landline: "044-2222-3701", mobile: "9840036001", email: "mageshwaran.a@company.com" },
      { level: 2, name: "Prema Krishnamoorthy", landline: "044-2222-3702", mobile: "9840036002", email: "prema.krishnamoorthy@company.com" },
      { level: 3, name: "Sundareswaran P", landline: "044-2222-3703", mobile: "9840036003", email: "sundareswaran.p@company.com" },
    ],
  },
  {
    id: 37,
    teamName: "IT Finance",
    department: "IT Operations",
    contacts: [
      { level: 1, name: "Vimala Devi S", landline: "044-2222-3801", mobile: "9840037001", email: "vimala.devi@company.com" },
      { level: 2, name: "Arumugam N", landline: "044-2222-3802", mobile: "9840037002", email: "arumugam.n@company.com" },
      { level: 3, name: "Kokilavani R", landline: "044-2222-3803", mobile: "9840037003", email: "kokilavani.r@company.com" },
    ],
  },
  {
    id: 38,
    teamName: "Site Reliability Engineering",
    department: "Development",
    contacts: [
      { level: 1, name: "Selvam T", landline: "044-2222-3901", mobile: "9840038001", email: "selvam.t@company.com" },
      { level: 2, name: "Durgadevi M", landline: "044-2222-3902", mobile: "9840038002", email: "durgadevi.m@company.com" },
      { level: 3, name: "Krishnamurthy B", landline: "044-2222-3903", mobile: "9840038003", email: "krishnamurthy.b@company.com" },
    ],
  },
  {
    id: 39,
    teamName: "Facilities & Physical Security",
    department: "Facilities",
    contacts: [
      { level: 1, name: "Rajasekaran M", landline: "044-2222-4001", mobile: "9840039001", email: "rajasekaran.m@company.com" },
      { level: 2, name: "Vasantha Kumari", landline: "044-2222-4002", mobile: "9840039002", email: "vasantha.kumari@company.com" },
      { level: 3, name: "Balasubramaniam G", landline: "044-2222-4003", mobile: "9840039003", email: "balasubramaniam.g@company.com" },
    ],
  },
  {
    id: 40,
    teamName: "CRM Support",
    department: "Business Applications",
    contacts: [
      { level: 1, name: "Geetha Ramakrishnan", landline: "044-2222-4101", mobile: "9840040001", email: "geetha.ramakrishnan@company.com" },
      { level: 2, name: "Sudhakaran P", landline: "044-2222-4102", mobile: "9840040002", email: "sudhakaran.p@company.com" },
      { level: 3, name: "Vijayarani S", landline: "044-2222-4103", mobile: "9840040003", email: "vijayarani.s@company.com" },
    ],
  },
];

export const departments = [...new Set(escalationTeams.map((t) => t.department))];
