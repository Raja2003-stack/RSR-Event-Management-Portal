export const categories = [
  'Technology','Business','Marketing','Finance','Healthcare',
  'Education','Music','Sports','Food & Beverage','Art & Culture'
];
export const cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Chennai','Pune','Kolkata','Ahmedabad'];
export const stats = { totalEvents:2400, totalAttendees:180000, totalLeads:92000, citiesCovered:48 };
export const events = [
  {
    id:'1', title:'AI & Business Growth Summit 2026', category:'Technology',
    date:'2026-10-04', time:'09:00', endTime:'18:00', city:'Bangalore',
    venue:'Taj Yeshwantpur, Bangalore',
    image:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    organizer:'RSR Events', organizerLogo:'https://ui-avatars.com/api/?name=RSR+Events&background=1B4FD8&color=fff',
    description:'The most impactful AI and business summit of the year. Learn from top industry leaders, discover cutting-edge AI tools, and build your network.',
    tags:['AI','Business','Networking','Growth'], isFeatured:true, isFree:false,
    registrations:1284, attendees:1047, leads:684,
    tickets:[
      {type:'Free',price:0,available:200,description:'General entry, limited seats'},
      {type:'Premium',price:1499,available:100,description:'Front seats + lunch + kit'},
      {type:'VIP',price:4999,available:30,description:'VIP lounge + dinner + 1:1 with speakers'}
    ],
    speakers:[
      {name:'Dr. Priya Sharma',role:'CTO, TechVentures',avatar:'https://ui-avatars.com/api/?name=Priya+Sharma&background=6366f1&color=fff'},
      {name:'Rahul Mehta',role:'CEO, GrowthAI',avatar:'https://ui-avatars.com/api/?name=Rahul+Mehta&background=f59e0b&color=fff'},
      {name:'Anita Desai',role:'VP Marketing, Zeta Corp',avatar:'https://ui-avatars.com/api/?name=Anita+Desai&background=10b981&color=fff'}
    ],
    agenda:[
      {time:'09:00',title:'Registration & Networking Breakfast'},
      {time:'10:00',title:'Keynote: AI in the Age of Business Growth'},
      {time:'11:30',title:'Panel: Future of B2B Marketing with AI'},
      {time:'13:00',title:'Lunch & Networking'},
      {time:'14:00',title:'Workshop: Building AI-Powered Lead Funnels'},
      {time:'16:00',title:'Fireside Chat: Startup to Scale'},
      {time:'17:30',title:'Closing & Award Ceremony'}
    ],
    sponsors:['TechVentures','GrowthAI','Zeta Corp','FutureTech']
  },
  {
    id:'2', title:'Startup Ecosystem Conference 2026', category:'Business',
    date:'2026-10-15', time:'10:00', endTime:'17:00', city:'Mumbai',
    venue:'NSCI Dome, Worli, Mumbai',
    image:'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
    organizer:'StartupHub India', organizerLogo:'https://ui-avatars.com/api/?name=StartupHub&background=f59e0b&color=fff',
    description:'Connect with 500+ founders, investors, and mentors. Pitch your startup, find co-founders, and get funded.',
    tags:['Startup','Funding','Pitch','Investors'], isFeatured:true, isFree:false,
    registrations:890, attendees:750, leads:420,
    tickets:[
      {type:'Free',price:0,available:150,description:'General entry'},
      {type:'Premium',price:1999,available:80,description:'Pitch opportunity + networking dinner'},
      {type:'VIP',price:6999,available:20,description:'Investor meet + private pitch + VIP dinner'}
    ],
    speakers:[
      {name:'Vikram Nair',role:'Managing Partner, Sequoia India',avatar:'https://ui-avatars.com/api/?name=Vikram+Nair&background=1B4FD8&color=fff'},
      {name:'Sneha Patel',role:'Founder, HealthBridge',avatar:'https://ui-avatars.com/api/?name=Sneha+Patel&background=ec4899&color=fff'}
    ],
    agenda:[
      {time:'10:00',title:'Welcome Address'},
      {time:'10:30',title:'Startup Pitching Round 1'},
      {time:'12:00',title:'Investor Panel Discussion'},
      {time:'13:30',title:'Networking Lunch'},
      {time:'15:00',title:'Startup Pitching Round 2'},
      {time:'16:30',title:'Awards & Closing'}
    ],
    sponsors:['Sequoia India','Accel','Blume Ventures']
  },
  {
    id:'3', title:'Digital Marketing Masterclass', category:'Marketing',
    date:'2026-10-20', time:'09:30', endTime:'16:00', city:'Delhi',
    venue:'The Leela Palace, New Delhi',
    image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    organizer:'MarketPro India', organizerLogo:'https://ui-avatars.com/api/?name=MarketPro&background=10b981&color=fff',
    description:'Master the art of digital marketing with hands-on workshops on SEO, Social Media, Paid Ads, and Email Marketing.',
    tags:['Marketing','SEO','Social Media','Ads'], isFeatured:false, isFree:false,
    registrations:450, attendees:380, leads:210,
    tickets:[
      {type:'Free',price:0,available:50,description:'Online streaming only'},
      {type:'Premium',price:2499,available:60,description:'In-person + workshop kit'}
    ],
    speakers:[{name:'Karan Khanna',role:'Head of Growth, Swiggy',avatar:'https://ui-avatars.com/api/?name=Karan+Khanna&background=ef4444&color=fff'}],
    agenda:[
      {time:'09:30',title:'SEO & Content Marketing'},
      {time:'11:00',title:'Paid Advertising Workshop'},
      {time:'13:00',title:'Lunch Break'},
      {time:'14:00',title:'Social Media Growth Strategies'},
      {time:'15:30',title:'Q&A & Wrap Up'}
    ],
    sponsors:['Google India','Meta','HubSpot']
  },
  {
    id:'4', title:'FinTech Innovation Forum', category:'Finance',
    date:'2026-11-05', time:'10:00', endTime:'18:00', city:'Hyderabad',
    venue:'HICC, Hyderabad',
    image:'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=800&q=80',
    organizer:'FinTech India', organizerLogo:'https://ui-avatars.com/api/?name=FinTech+India&background=7c3aed&color=fff',
    description:'Explore the future of financial technology including blockchain, UPI innovations, neobanking, and AI in finance.',
    tags:['FinTech','Blockchain','UPI','Banking'], isFeatured:true, isFree:false,
    registrations:620, attendees:510, leads:340,
    tickets:[
      {type:'Free',price:0,available:100,description:'General access'},
      {type:'Premium',price:3499,available:75,description:'All sessions + networking'},
      {type:'VIP',price:8999,available:15,description:'Full access + investor dinner'}
    ],
    speakers:[
      {name:'Amit Roy',role:'CTO, Razorpay',avatar:'https://ui-avatars.com/api/?name=Amit+Roy&background=7c3aed&color=fff'},
      {name:'Pooja Singh',role:'Head of Digital Banking, HDFC',avatar:'https://ui-avatars.com/api/?name=Pooja+Singh&background=06b6d4&color=fff'}
    ],
    agenda:[
      {time:'10:00',title:'Opening Keynote: FinTech 2030'},
      {time:'11:30',title:'Blockchain & Web3 Panel'},
      {time:'13:00',title:'Networking Lunch'},
      {time:'14:30',title:'Neobanking Workshop'},
      {time:'16:00',title:'AI in Finance Demo Day'},
      {time:'17:30',title:'Awards Ceremony'}
    ],
    sponsors:['Razorpay','Paytm','PhonePe','NPCI']
  },
  {
    id:'5', title:'Women in Tech Summit', category:'Technology',
    date:'2026-11-12', time:'09:00', endTime:'17:00', city:'Pune',
    venue:'JW Marriott, Pune',
    image:'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    organizer:'SheTech India', organizerLogo:'https://ui-avatars.com/api/?name=SheTech&background=ec4899&color=fff',
    description:'Celebrating and empowering women in technology. Inspiring talks, mentorship sessions, and career-building workshops.',
    tags:['WomenInTech','Diversity','Tech','Leadership'], isFeatured:false, isFree:true,
    registrations:720, attendees:680, leads:290,
    tickets:[{type:'Free',price:0,available:500,description:'Open to all women in tech'}],
    speakers:[
      {name:'Nandini Verma',role:'Engineering Director, Google',avatar:'https://ui-avatars.com/api/?name=Nandini+Verma&background=ec4899&color=fff'},
      {name:'Riya Kapoor',role:'Co-Founder, EdTechX',avatar:'https://ui-avatars.com/api/?name=Riya+Kapoor&background=f59e0b&color=fff'}
    ],
    agenda:[
      {time:'09:00',title:'Registration & Breakfast'},
      {time:'10:00',title:'Keynote: Breaking the Glass Ceiling'},
      {time:'11:30',title:'Panel: Women Leading Tech Innovation'},
      {time:'13:00',title:'Lunch & Mentorship Roundtables'},
      {time:'15:00',title:'Career Workshop: Negotiate & Grow'},
      {time:'17:00',title:'Closing Celebration'}
    ],
    sponsors:['Google','Microsoft','Infosys','TCS']
  },
  {
    id:'6', title:'E-Commerce Growth Conclave', category:'Business',
    date:'2026-11-20', time:'10:00', endTime:'17:30', city:'Chennai',
    venue:'Chennai Trade Centre',
    image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    organizer:'CommercePro', organizerLogo:'https://ui-avatars.com/api/?name=CommercePro&background=f97316&color=fff',
    description:'Scale your e-commerce business with proven strategies in D2C, marketplace selling, logistics, and customer retention.',
    tags:['Ecommerce','D2C','Growth','Marketplace'], isFeatured:false, isFree:false,
    registrations:330, attendees:280, leads:155,
    tickets:[
      {type:'Free',price:0,available:80,description:'General entry'},
      {type:'Premium',price:1999,available:50,description:'Full access + toolkit'}
    ],
    speakers:[{name:'Suresh Kumar',role:'VP Growth, Meesho',avatar:'https://ui-avatars.com/api/?name=Suresh+Kumar&background=f97316&color=fff'}],
    agenda:[
      {time:'10:00',title:'State of E-Commerce India 2026'},
      {time:'11:30',title:'D2C Brand Building Workshop'},
      {time:'13:00',title:'Lunch'},
      {time:'14:00',title:'Logistics & Supply Chain Panel'},
      {time:'16:00',title:'Customer Retention Strategies'}
    ],
    sponsors:['Amazon','Flipkart','Meesho','Shiprocket']
  }
];