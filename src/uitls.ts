import { onValue, ref, set } from "firebase/database";
import { db } from "./firebaseConfig";

export const getConversationId = (): string => {
  let conversationId = localStorage.getItem("conversationId");

  if (!conversationId) {
    // Generate a random alphanumeric string (max 5 characters)
    const randomPart = Math.random().toString(36).substr(2, 4);
    conversationId = `Conv_${randomPart}`;

    localStorage.setItem("conversationId", conversationId);
  }

  return conversationId;
};

let typingTimeout: NodeJS.Timeout | null = null;

export const updateTypingState = (userType: string, event: string) => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  const conversationId = localStorage.getItem("conversationId");
  const typingStateRef =
    userType === "admin"
      ? ref(db, `state`)
      : ref(db, `conversations/${conversationId}/state`);
  if (event === "onchange") {
    set(typingStateRef, { typing: true });

    typingTimeout = setTimeout(() => {
      set(typingStateRef, { typing: false });
    }, 1500);
  } else if (event === "onblur") {
    set(typingStateRef, { typing: false });
  }
};

export const getTypingState = (
  userType: string,
  conversationId: string,
  callback: (typing: boolean) => void
) => {
  // const conversationId = localStorage.getItem("conversationId");
  const typingStateRef =
    userType === "admin"
      ? ref(db, `state`)
      : ref(db, `conversations/${conversationId}/state`);

  onValue(typingStateRef, (snapshot) => {
    if (snapshot.exists()) {
      const typingState = snapshot.val();
      callback(typingState?.typing || false);
    } else {
      callback(false);
    }
  });
};

// Array Items
export const navItems = [
  { id: 1, label: "Home", href: "#home" },
  { id: 2, label: "Products", href: "#products" },
  { id: 3, label: "About", href: "#about" },
  { id: 4, label: "Why us", href: "#why-us" },
  { id: 5, label: "Contact", href: "#contact" },
  { id: 6, label: "Blogs", href: "#blogs" },
  { id: 7, label: "Faqs", href: "#faqs" },
];
export const splashScreenWordings = [
  {
    title: "Empowering You, Every Step of the Way!",
    explanation:
      "Our loaning process is designed to support you at every stage, making your financial journey smoother and more accessible.",
  },
  {
    title: "Fast, Flexible Finacial solutions When You Need Them Most!",
    explanation:
      "We offer fast approval and flexible repayment options, ensuring you get the help you need quickly and on your terms.",
  },
  {
    title: "Your Trusted Partner in Financial Freedom!",
    explanation:
      "With our expertise and commitment, we’re here to help you gain control over your financial future, providing the resources you need to thrive.",
  },
  {
    title: "Quick, Easy, and Secure Loan Solutions!",
    explanation:
      "Get approved for a loan quickly with our easy application process, all while ensuring your information is secure and protected.",
  },
];

export const productDescriptions = [
  {
    category: "Business Loans",
    name: "LPO Financing",
    image: "/images/lpFinancing.jpg",
    description:
      "A short-term loan for suppliers with tenders from reputable organizations. Covers up to 100% of expected costs to complete the job. Loan approval within 24 hours if terms and conditions are met.",
  },
  {
    category: "Business Loans",
    name: "Business Loans",
    image: "/images/bsLoans.jpg",
    description:
      "Tailored loans for businesses needing trade finance, stock purchase, business improvement, or other business-related needs.",
  },
  {
    category: "Business Loans",
    name: "Invoice Discounting",
    image: "/images/IDiscounting.jpg",
    description:
      "Loans for individuals who have delivered orders, issued invoices, and are awaiting payments, usually within 14-30 days.",
  },
  {
    category: "Business Loans",
    name: "Cheque Discounting",
    image: "/images/chequeDiscounting.jpg",
    description:
      "Loans based on post-dated cheques from reputable organizations. Loan term ranges from 1 week to 1 month.",
  },
  {
    category: "Personal Loans",
    name: "Salary Advance",
    image: "/images/sAdvance.jpg",
    description:
      "Loans for salaried employees from the 15th of the month, repaid upon receiving their salary. Available for private organizations with an MOU with Red Kapital.",
  },
  {
    category: "Business Loans",
    name: "Trade Finance",
    image: "/images/tFinance.jpg",
    description:
      "Includes Bid Bonds,Performance bond, Contractors All Risk  and Advanced Payment Guarantees. Facilitating transactions by mitigating risks invoice financing, guarantees, and supply chain finance solutions.",
  },
];
export const features = [
  {
    title: "Quick Approvals",
    description:
      "Loan approvals in under an 24 hours, with disbursements processed within 1 hour.",
  },
  {
    title: "Hassle-Free Process",
    description:
      "Simple, straightforward application process with minimal requirements.",
  },
  {
    title: "Flexible Terms",
    description:
      "Customizable repayment plans to suit your cash flow and needs.",
  },
  {
    title: "Tailored Products",
    description:
      "Financing solutions customized to meet both personal and business needs.",
  },
  {
    title: "Dedicated Support",
    description:
      "A partner you can rely on to grow and succeed, with support at every step.",
  },
  {
    title: "Transparent Policies",
    description:
      "Clear and fair policies to ensure trust and confidence in every transaction.",
  },
];
export const aboutUs = [
  {
    title: "Mission",
    content:
      "To empower individuals and businesses by providing fast, flexible, and reliable financial solutions tailored to their unique needs.",
  },
  {
    title: "Vision",
    content:
      "To be the leading financial partner recognized for innovation, trust, and exceptional customer service, inspiring success for generations.",
  },
  {
    title: "Values",
    content:
      "Our company is built on a foundation of integrity, innovation, and customer-centricity. We foster collaboration, accountability, sustainability and diversity.",
  },
];
export const FAQs = [
  {
    question: "Who is eligible to apply for a loan?",
    answer:
      "We offer financial solutions to clients who meet our minimum credit score, income, and employment requirements. Applicants must be at least 18 years old, provide valid identification, and demonstrate a stable financial history. For business loans, we may require proof of revenue and operational history.",
  },
  {
    question: "How long does it take to process a loan application?",
    answer:
      "Our loan approval process typically takes between 24 to 48 hours, depending on the type of loan and required documentation. However, if additional verification is needed, such as income validation or collateral assessment, processing may take longer. We aim to keep you informed throughout the process to ensure transparency.",
  },
  {
    question: "What interest rates do you offer?",
    answer:
      "Our interest rates vary based on the loan type, applicant’s credit score, repayment period, and market conditions. We offer both fixed and variable interest rates. Fixed rates remain constant throughout the loan term, while variable rates may change based on financial index fluctuations. Contact us for a personalized rate quote.",
  },
  {
    question: "Do you provide loans to individuals with bad credit?",
    answer:
      "Yes, we offer specialized loan options for individuals with low credit scores. However, terms may differ based on risk assessment. In some cases, applicants with poor credit may need to provide a guarantor or collateral to secure a loan. We also offer credit-building loan products to help improve financial standing.",
  },
  {
    question: "What happens if I miss a repayment?",
    answer:
      "Missing a loan repayment may result in late fees, interest rate adjustments, and a negative impact on your credit score. If you're experiencing financial difficulties, we encourage you to contact us as soon as possible. We may offer flexible solutions, such as payment extensions or restructuring options, to help you manage your loan obligations.",
  },
  {
    question: "Can I repay my loan early without penalties?",
    answer:
      "Yes, we allow early loan repayment with no extra charges, helping you save on interest costs. Making extra payments or settling your loan ahead of schedule can reduce your overall financial burden. However, for specific loan types, it’s advisable to check your agreement for any prepayment conditions.",
  },
  {
    question: "What types of finacial solutions do you offer?",
    answer:
      "We offer a range of loan products, including personal loans, business loans, mortgage loans, auto loans. Each loan type is designed to meet different financial needs, whether you're purchasing a home, expanding your business, or covering unexpected expenses. Contact us to find the best loan option for you.",
  },
];
export const loanBlogs = [
  {
    title: "Instant Loans Now Available!",
    message:
      "We’re excited to introduce instant loan approvals for our customers! Get up to KES 500,000 within minutes, no paperwork needed. Apply online, get verified, and receive your funds instantly. Financial freedom is now faster and easier than ever!",
    hashtags: [
      "#InstantLoans",
      "#QuickCash",
      "#FinancialFreedom",
      "#LoansKenya",
    ],
    date: "2025-02-08",
  },
  {
    title: "SME Loans to Boost Your Business",
    message:
      "Are you a small business owner looking for capital? Our SME loans offer flexible repayment options and low-interest rates. Grow your business without financial stress. Apply today and take your venture to the next level!",
    hashtags: ["#SMELoans", "#BusinessGrowth", "#Entrepreneur", "#KenyaLoans"],
    date: "2025-02-07",
  },
  {
    title: "No Collateral? No Problem!",
    message:
      "Access loans without collateral and meet your urgent financial needs. Our unsecured loans provide a hassle-free experience with fast approval. Apply online, get verified, and receive funds directly into your account!",
    hashtags: [
      "#UnsecuredLoans",
      "#NoCollateral",
      "#EasyLoans",
      "#FinancialHelp",
    ],
    date: "2025-02-06",
  },
  {
    title: "Education Loans Made Easy",
    message:
      "Education is an investment in the future! Our affordable education loans help you cover tuition and other expenses. With flexible repayment options, you can focus on your studies without financial worries. Apply now!",
    hashtags: [
      "#EducationLoans",
      "#SchoolFees",
      "#StudentSupport",
      "#LoansForStudents",
    ],
    date: "2025-02-05",
  },
  {
    title: "Women’s Empowerment Loans",
    message:
      "We support women entrepreneurs with tailored loans to grow their businesses. Our women’s empowerment loans come with low-interest rates and flexible repayment plans. Apply today and take charge of your financial journey!",
    hashtags: [
      "#WomenLoans",
      "#Empowerment",
      "#FinancialIndependence",
      "#WomenInBusiness",
    ],
    date: "2025-02-04",
  },
  {
    title: "Emergency Loans for Urgent Needs",
    message:
      "Unexpected expenses? Get an emergency loan within minutes! Whether it’s medical bills, home repairs, or urgent travel, we’ve got you covered. Apply now and secure fast financial relief when you need it most!",
    hashtags: [
      "#EmergencyLoans",
      "#QuickApproval",
      "#FastCash",
      "#KenyaFinance",
    ],
    date: "2025-02-03",
  },
];
