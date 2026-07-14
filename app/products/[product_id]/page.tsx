import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/animations/Animations";
import { RecruitmentSimulator } from "@/components/sections/RecruitmentSimulator";
import { 
  Package, ShoppingCart, MapPin, Sparkles, FolderKanban, 
  Zap, Warehouse, Cpu, ArrowLeft, ArrowRight, Mail, LayoutGrid, Box, Clock
} from "lucide-react";

interface ProductInfo {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  icon: any;
  color: string;
  capabilities: string[];
  features?: { title: string; desc: string }[];
  whyChoose?: { title: string; desc: string }[];
  workflow?: {
    headline: string;
    description: string;
    phases: {
      name: string;
      stages: {
        number: number;
        name: string;
        action: string;
        details: string;
      }[];
    }[];
  };
}

const productsData: Record<string, ProductInfo> = {
  calrims: {
    id: "calrims",
    name: "CALRIMS",
    category: "Recruitment Management",
    tagline: "Automate hiring from application to onboarding.",
    description: "CALRIMS automates the end-to-end recruitment process by combining intelligent resume screening with interactive, adaptive AI interviews. It is built for HR managers and corporate recruitment teams. It slashes time-to-hire by eliminating manual screening and administrative tasks.",
    icon: Package,
    color: "#8B5CF6",
    capabilities: [
      "Screen Resumes Instantly",
      "Conduct AI Interviews",
      "Ingest Resumes Automatically",
      "Generate Digital Offers",
      "Streamline Employee Onboarding",
      "Track Pipeline Performance"
    ],
    features: [
      {
        title: "Screen Resumes Instantly",
        desc: "Ranks applications automatically by extracting candidate skills and scoring job compatibility."
      },
      {
        title: "Conduct AI Interviews",
        desc: "Evaluates candidate skills in real time using adaptive, voice-enabled online assessments."
      },
      {
        title: "Ingest Resumes Automatically",
        desc: "Converts incoming email attachments into structured candidate profiles without manual data entry."
      },
      {
        title: "Generate Digital Offers",
        desc: "Secures hiring commitments with template-based offer letters and automated PDF creation."
      },
      {
        title: "Streamline Employee Onboarding",
        desc: "Completes pre-employment workflows by collecting documents and printing staff ID cards."
      },
      {
        title: "Track Pipeline Performance",
        desc: "Identifies recruitment bottlenecks using live visual dashboards and custom exportable reports."
      }
    ],
    whyChoose: [
      {
        title: "Shorter Time-to-Hire",
        desc: "Automated screening and AI interviewing shrink the hiring cycle from weeks to days."
      },
      {
        title: "Zero Manual Data Entry",
        desc: "Automated email resume parsing eliminates administrative candidate setup tasks entirely."
      },
      {
        title: "Fair Candidate Evaluation",
        desc: "Standardized AI interviews ensure every applicant receives an objective, unbiased screening."
      },
      {
        title: "Flawless Compliance Audits",
        desc: "Immutable digital audit trails log every pipeline transition and offer decision automatically."
      }
    ]
  },
  calbuy: {
    id: "calbuy",
    name: "CalBuy Steel",
    category: "Procurement Automation",
    tagline: "The AI-native procurement operating system.",
    description: "CalBuy Steel automates the entire industrial procurement lifecycle from engineering drawing intake to final purchase order execution. Built for procurement officers and sourcing specialists in manufacturing, fabrication, and EPC sectors. Cuts procurement cycle times and reduces material acquisition cost using real-time market intelligence.",
    icon: ShoppingCart,
    color: "#10B981",
    capabilities: [
      "Extract BOMs Instantly",
      "Price Materials Accurately",
      "Automate Vendor Negotiations",
      "Rank Supplier Quotes",
      "Simplify Bid Collection",
      "Analyze Spending Trends"
    ],
    features: [
      {
        title: "Extract BOMs Instantly",
        desc: "Converts engineering drawings into structured digital material lists."
      },
      {
        title: "Price Materials Accurately",
        desc: "Predicts target should-costs using real-time global commodity rates."
      },
      {
        title: "Automate Vendor Negotiations",
        desc: "Generates optimized negotiation strategies and professional email templates."
      },
      {
        title: "Rank Supplier Quotes",
        desc: "Compares multi-vendor bids instantly on a unified commercial matrix."
      },
      {
        title: "Simplify Bid Collection",
        desc: "Gathers quote details directly via secure, password-free vendor portals."
      },
      {
        title: "Analyze Spending Trends",
        desc: "Delivers automated cost-savings reports and procurement audit trails."
      }
    ],
    whyChoose: [
      {
        title: "70% Faster Cycle Times",
        desc: "Ingests complex drawings and releases RFQs in minutes instead of weeks."
      },
      {
        title: "15% Lower Material Costs",
        desc: "Real-time commodity should-costing prevents overpaying during supplier bidding."
      },
      {
        title: "Zero Manual Data Entry",
        desc: "Intelligent extraction reads line items directly from supplier PDF invoices and quotes."
      },
      {
        title: "Complete Audit Transparency",
        desc: "Logs every step from drawing upload to final PO signature for compliance."
      }
    ],
    workflow: {
      headline: "Drawing to Purchase Order",
      description: "CalBuy Steel automates the entire industrial procurement lifecycle from engineering drawing intake to final purchase order execution.",
      phases: [
        {
          name: "Phase 1: Demand & Sourcing",
          stages: [
            {
              number: 1,
              name: "Upload Drawing",
              action: "BOM PDF Extraction",
              details: "AI extracts parts and materials from engineering drawings automatically."
            },
            {
              number: 2,
              name: "Launch RFQ",
              action: "Automated Vendor Invitation",
              details: "System groups items into RFQs and invites qualifying suppliers."
            }
          ]
        },
        {
          name: "Phase 2: Bid Collection",
          stages: [
            {
              number: 3,
              name: "Gather Quotes",
              action: "Public Vendor Portal",
              details: "Suppliers submit quote line-items directly via secure web links."
            },
            {
              number: 4,
              name: "Price Materials",
              action: "Live Should-Cost Calculation",
              details: "System computes target material costs using current global market rates."
            }
          ]
        },
        {
          name: "Phase 3: Award & Buy",
          stages: [
            {
              number: 5,
              name: "Negotiate Bids",
              action: "AI Strategy Generator",
              details: "AI drafts targeted vendor negotiation emails based on pricing data."
            },
            {
              number: 6,
              name: "Issue Order",
              action: "Automatic PO Release",
              details: "System drafts the purchase order and triggers transactional workflows."
            }
          ]
        }
      ]
    }
  },
  caltrack: {
    id: "caltrack",
    name: "CALTRACK",
    category: "Field Service Management",
    tagline: "Master Your Field Service and Payroll Compliance.",
    description: "CALTRACK is an end-to-end platform for managing field operations, automated timesheets, and payroll compliance. Built for service-based businesses and mobile workforces, it bridges the gap between customer bookings and field technician dispatching — eliminating labor compliance risks while streamlining your entire mobile workforce.",
    icon: MapPin,
    color: "#F59E0B",
    capabilities: [
      "Smart Service Dispatch",
      "Automated Payroll Engine",
      "GPS Time Tracking",
      "Mileage Route Logging",
      "Customer Booking Portal",
      "Labor Compliance Engine"
    ],
    features: [
      {
        title: "Smart Service Dispatch",
        desc: "Assigns technicians to service requests instantly based on real-time availability — the right person, at the right place, every time."
      },
      {
        title: "Automated Payroll Engine",
        desc: "Calculates gross pay, overtime, and mileage reimbursements instantly for both US and UK compliance rules."
      },
      {
        title: "GPS Time Tracking",
        desc: "Verifies employee locations upon clock-in to ensure field accountability — no more buddy punching or unverified hours."
      },
      {
        title: "Mileage Route Logging",
        desc: "Tracks field travel automatically using compliant IRS and HMRC mileage rates — zero manual entry required."
      },
      {
        title: "Customer Booking Portal",
        desc: "Allows clients to schedule services and track technician arrivals in real time — from booking to doorstep."
      },
      {
        title: "Labor Compliance Engine",
        desc: "Proactively monitors breaks and overtime thresholds to prevent costly labor law violations before they happen."
      }
    ],
    whyChoose: [
      {
        title: "Zero Payroll Errors",
        desc: "Automated timesheet calculations eliminate manual data entry mistakes — payroll that runs itself."
      },
      {
        title: "Real-Time Field Visibility",
        desc: "Track your entire mobile workforce live on a centralized dashboard map, anytime."
      },
      {
        title: "Seamless Customer Experience",
        desc: "Clients stay informed with transparent booking details and live ETA tracking from dispatch to arrival."
      },
      {
        title: "Guaranteed Labor Compliance",
        desc: "Built-in rules engine protects your business from costly overtime and break violations automatically."
      }
    ]
  },
  "ai-beauty": {
    id: "ai-beauty",
    name: "AI_Beauty_Consultant",
    category: "Salon & Spa Management",
    tagline: "AI-powered growth for salons and personalized client beauty.",
    description: "AI_Beauty_Consultant automates salon operations while delivering real-time biometric skin and face-shape analysis. Built for modern salon owners and their clients. It seamlessly connects smart online bookings with predictive customer analytics and tailored service recommendations.",
    icon: Sparkles,
    color: "#EC4899",
    capabilities: [
      "Biometric Beauty Analysis",
      "AI Business Insights",
      "No-Show Predictor",
      "Beauty Reels Marketing",
      "Client Intelligence",
      "Smart Slot Management"
    ],
    features: [
      {
        title: "Biometric Beauty Analysis",
        desc: "Analyzes client facial features in real time to recommend scientifically tailored salon services."
      },
      {
        title: "AI Business Insights",
        desc: "Uses Gemini AI to process your daily booking data and instantly forecast revenue trends."
      },
      {
        title: "No-Show Predictor",
        desc: "Evaluates bookings to flag high-risk appointments so you never face empty chairs."
      },
      {
        title: "Beauty Reels Marketing",
        desc: "Upload engaging video reels directly to the platform to attract and convert local clients."
      },
      {
        title: "Client Intelligence",
        desc: "Tracks individual customer preferences, invoices, and comprehensive booking history in one place."
      },
      {
        title: "Smart Slot Management",
        desc: "Lets clients secure bookings while automatically handling staff allocation and schedule overlaps."
      }
    ],
    whyChoose: [
      {
        title: "Hyper-Personalized Beauty",
        desc: "Advanced CNN models ensure every client receives accurate, data-backed service recommendations."
      },
      {
        title: "Stop Missing Revenue",
        desc: "The predictive No-Show AI prevents last-minute cancellations from hurting your daily income."
      },
      {
        title: "Real-Time Analytics",
        desc: "Get instant, AI-generated reports on your daily performance, confirmed slots, and total revenue."
      },
      {
        title: "All-in-One Operations",
        desc: "Manage staff, inventory, discount coupons, and invoices from a single Shop Owner portal."
      }
    ],
    workflow: {
      headline: "AI_Beauty_Consultant — Biometric Discovery to Business Analytics",
      description: "AI_Beauty_Consultant automates salon operations while delivering real-time biometric skin and face-shape analysis.",
      phases: [
        {
          name: "Phase 1: Discovery & Analysis",
          stages: [
            {
              number: 1,
              name: "Facial Analysis",
              action: "Live Scan",
              details: "Clients upload a photo for real-time skin and face-shape AI analysis."
            },
            {
              number: 2,
              name: "Services Matched",
              action: "AI Recommendation",
              details: "The system recommends specific salon services based on the biometric results."
            }
          ]
        },
        {
          name: "Phase 2: Booking & Management",
          stages: [
            {
              number: 3,
              name: "Slot Secured",
              action: "Smart Booking",
              details: "The client reserves an available time slot with instant confirmation."
            },
            {
              number: 4,
              name: "Risk Evaluated",
              action: "No-Show Predictor",
              details: "The AI evaluates the new appointment to flag any potential cancellation risk to the owner."
            }
          ]
        },
        {
          name: "Phase 3: Service & Insights",
          stages: [
            {
              number: 5,
              name: "Service Completed",
              action: "Status Update",
              details: "The shop owner marks the appointment complete and generates a digital invoice."
            },
            {
              number: 6,
              name: "Profit Analyzed",
              action: "AI Insights",
              details: "Gemini AI processes the completed data to generate actionable business performance strategies."
            }
          ]
        }
      ]
    }
  },
  "project-management": {
    id: "project-management",
    name: "Project Management",
    category: "Engineering Project Management",
    tagline: "End-to-End Project Control. Zero Chaos.",
    description: "CALDIM PMS manages the full lifecycle of engineering projects — from bid estimation to final payment. Built for project managers, finance teams, and vendors in engineering and construction firms, it eliminates manual tracking, reduces billing errors, and gives leadership real-time project visibility.",
    icon: FolderKanban,
    color: "#6366F1",
    capabilities: [
      "Bid to Project Pipeline",
      "Live Project Dashboard",
      "Invoice & Payment Control",
      "Change Order Management",
      "Vendor Allocation Engine",
      "Role-Based Access Control"
    ],
    features: [
      {
        title: "Bid to Project Pipeline",
        desc: "Converts approved bid enquiries into live projects instantly — zero re-entry, zero duplication, full continuity."
      },
      {
        title: "Live Project Dashboard",
        desc: "Gives management a real-time view of project status, milestones, hours, and financials — all in one place, always current."
      },
      {
        title: "Invoice & Payment Control",
        desc: "Generates and tracks customer invoices and vendor payments — no more chasing spreadsheets."
      },
      {
        title: "Change Order Management",
        desc: "Captures, prices, and approves change order requests with a full audit trail and hourly rate control — every change documented."
      },
      {
        title: "Vendor Allocation Engine",
        desc: "Assigns vendors to project phases and tracks their deliverables, payments, and change orders centrally across every project."
      },
      {
        title: "Role-Based Access Control",
        desc: "Restricts module access by user role so every team member sees only what they need — secure, clean, and auditable."
      }
    ],
    whyChoose: [
      {
        title: "One System, Full Visibility",
        desc: "From bid to billing, every project action is tracked in a single platform — no more disconnected spreadsheets."
      },
      {
        title: "Faster Invoice Cycles",
        desc: "Milestone-linked billing and automation cut payment delays significantly — cash flow stays healthy."
      },
      {
        title: "Vendor Cost Under Control",
        desc: "Centralised vendor payment and change order tracking prevents cost overruns before they happen."
      },
      {
        title: "Built for Engineering Firms",
        desc: "Designed around real engineering workflows — not generic templates needing months of setup and customisation."
      }
    ],
    workflow: {
      headline: "CALDIM PMS — Bid to Final Payment",
      description: "CALDIM PMS controls every step of the engineering project lifecycle — from the first client enquiry to the final reconciled payment, with zero manual handoffs.",
      phases: [
        {
          name: "Phase 1: Estimation",
          stages: [
            {
              number: 1,
              name: "Log Bid Enquiry",
              action: "Bid Entry",
              details: "Sales team captures client enquiry with full scope and pricing details into the estimation module."
            },
            {
              number: 2,
              name: "Review Estimation Model",
              action: "Management Review",
              details: "Management reviews the estimation model summary and approves the bid before it advances to project activation."
            }
          ]
        },
        {
          name: "Phase 2: Project Execution",
          stages: [
            {
              number: 3,
              name: "Activate Live Project",
              action: "Project Master",
              details: "Approved bid converts instantly into a live project with PO phases, milestones, and vendor assignments."
            },
            {
              number: 4,
              name: "Track Hours & Change Orders",
              action: "Hours & CORs",
              details: "Team logs hours and raises change order requests against the active project — all captured with full audit trail."
            }
          ]
        },
        {
          name: "Phase 3: Billing & Payments",
          stages: [
            {
              number: 5,
              name: "Generate Invoice",
              action: "Invoice Management",
              details: "Milestone-linked invoices are created and sent to the customer for approval — no manual drafting required."
            },
            {
              number: 6,
              name: "Settle Payments",
              action: "Payment Master",
              details: "Customer and vendor payments are recorded, reconciled, and closed — the project lifecycle is complete."
            }
          ]
        }
      ]
    }
  },
  "warehouse-management": {
    id: "warehouse-management",
    name: "Warehouse Management",
    category: "Warehouse Execution & Logistics",
    tagline: "Smart Warehouse Execution. Zero Packing Errors.",
    description: "This product automates engine-to-accessory matching, packing, and dispatch workflows. Built for floor managers and dispatch operators in industrial manufacturing. Eliminates manual tracking errors and ensures strict dispatch discipline.",
    icon: Warehouse,
    color: "#14B8A6",
    capabilities: [
      "Live Engine Tracking",
      "Intelligent Pallet Packing",
      "Automated ZPL Labeling",
      "Strict Shipment Validation",
      "Quick Exception Logging",
      "ERP Data Synchronization"
    ],
    features: [
      {
        title: "Live Engine Tracking",
        desc: "Tracks individual engines and accessories from the production line to final dispatch."
      },
      {
        title: "Intelligent Pallet Packing",
        desc: "Associates engines with specific pallets and racks for optimal space utilization."
      },
      {
        title: "Automated ZPL Labeling",
        desc: "Generates and prints barcode labels instantly directly at the packing workstation."
      },
      {
        title: "Strict Shipment Validation",
        desc: "Validates loaded items against digital manifests to prevent incorrect shipments."
      },
      {
        title: "Quick Exception Logging",
        desc: "Captures damaged goods reports and logs operational exceptions before dispatch."
      },
      {
        title: "ERP Data Synchronization",
        desc: "Syncs all warehouse operations in real time with enterprise MSSQL databases."
      }
    ],
    whyChoose: [
      {
        title: "Zero Dispatch Errors",
        desc: "Automated barcode validation ensures the right engine always goes to the right customer."
      },
      {
        title: "Real-Time Traceability",
        desc: "Every engine movement is logged and visible on a live, centralized dashboard."
      },
      {
        title: "Cross-Platform Access",
        desc: "Run the system effortlessly on mobile devices, tablets, or industrial workstations."
      },
      {
        title: "Unalterable Audit Trails",
        desc: "Complete system event logs maintain total compliance and operational accountability."
      }
    ]
  },
  "asset-management": {
    id: "asset-management",
    name: "Asset Management",
    category: "Engineering Workflow Automation",
    tagline: "Streamline asset requests from concept to production.",
    description: "This platform automates the 7-stage engineering asset lifecycle, from initial request to final production. Built for manufacturing engineering teams and designers. Eliminates approval bottlenecks and secures proprietary CAD files.",
    icon: Cpu,
    color: "#64748B",
    capabilities: [
      "7-Stage Smart Routing",
      "Secure File Quarantine",
      "Dynamic SLA Tracking",
      "Role-Based Work Queues",
      "Centralized Design Library",
      "Automated Escalation Alerts"
    ],
    features: [
      {
        title: "7-Stage Smart Routing",
        desc: "Automatically moves requests through L1, design, checking, and final approvals."
      },
      {
        title: "Secure File Quarantine",
        desc: "Scans all CAD and PDF uploads for viruses before storage."
      },
      {
        title: "Dynamic SLA Tracking",
        desc: "Calculates lead times based on design complexity and alerts on delays."
      },
      {
        title: "Role-Based Work Queues",
        desc: "Shows engineers only the specific tasks assigned to their role."
      },
      {
        title: "Centralized Design Library",
        desc: "Keeps all approved assets and revisions in one searchable location."
      },
      {
        title: "Automated Escalation Alerts",
        desc: "Triggers email notifications instantly when a workflow stage misses its deadline."
      }
    ],
    whyChoose: [
      {
        title: "Zero Approval Bottlenecks",
        desc: "Automated routing guarantees requests never get lost in email threads."
      },
      {
        title: "Guaranteed Asset Security",
        desc: "Strict ClamAV scanning and magic number checks protect your intellectual property."
      },
      {
        title: "Unmissable Deadlines",
        desc: "Real-time SLA tracking keeps every engineer and approver strictly on schedule."
      },
      {
        title: "Absolute Traceability",
        desc: "Every action, rejection, and file upload is permanently logged and audited."
      }
    ],
    workflow: {
      headline: "End-to-End Asset Request Lifecycle",
      description: "Asset Management automates the 7-stage engineering asset lifecycle.",
      phases: [
        {
          name: "Phase 1: Request & L1 Approval",
          stages: [
            {
              number: 1,
              name: "Submit Request",
              action: "Create Asset",
              details: "Engineer submits a new tool or asset requirement with specifications."
            },
            {
              number: 2,
              name: "L1 Validation",
              action: "Approve Request",
              details: "Manager reviews the request and assigns a target completion timeline."
            }
          ]
        },
        {
          name: "Phase 2: Design & Verification",
          stages: [
            {
              number: 3,
              name: "Drafting",
              action: "Submit Design",
              details: "Assigned designer uploads CAD files through the secure quarantine pipeline."
            },
            {
              number: 4,
              name: "Checking",
              action: "Verify Design",
              details: "Checker reviews the documents and approves them for final review."
            }
          ]
        },
        {
          name: "Phase 3: Final Approval & Production",
          stages: [
            {
              number: 5,
              name: "Sign-Off",
              action: "Final Approve",
              details: "Head of engineering gives the ultimate sign-off on the design."
            },
            {
              number: 6,
              name: "Implementation",
              action: "Advance Production",
              details: "Approved design is moved into physical production and marked complete."
            }
          ]
        }
      ]
    }
  },
  calmisc: {
    id: "calmisc",
    name: "CAL MISC",
    category: "Steel Estimation",
    tagline: "Generate accurate steel bids in minutes.",
    description: "CAL MISC generates precise stair, railing, and guard-rail bids with real-time cost breakdowns. Built specifically for structural steel fabricators and estimators. Slashes bid turnaround times by 90% while eliminating manual pricing errors.",
    icon: Box,
    color: "#F43F5E",
    capabilities: [
      "Configure Stair Geometry",
      "Attach Rails & Landings",
      "Calculate Live Costs",
      "Verify Code Compliance",
      "Generate Instant Proposals",
      "Override Pricing Dynamically"
    ],
    features: [
      {
        title: "Configure Stair Geometry",
        desc: "Instantly calculates rise, run, slope, and stringer length to prevent alignment errors."
      },
      {
        title: "Attach Rails & Landings",
        desc: "Adjusts hardware and mounting costs automatically as you add handrails, guardrails, or landings."
      },
      {
        title: "Calculate Live Costs",
        desc: "Tracks raw material weight, scrap factors, finish treatments, and labor rates in real time."
      },
      {
        title: "Verify Code Compliance",
        desc: "Flags IBC and OSHA rise/run violations automatically before fabrication begins."
      },
      {
        title: "Generate Instant Proposals",
        desc: "Exports print-ready PDF bids and detailed BOM spreadsheets in one click."
      },
      {
        title: "Override Pricing Dynamically",
        desc: "Adjusts material costs and markups per project for flexible margins."
      }
    ],
    whyChoose: [
      {
        title: "90% Faster Estimations",
        desc: "Generate comprehensive bids in minutes instead of spending hours manually compiling spreadsheets."
      },
      {
        title: "Zero Calculation Mistakes",
        desc: "Automated weight, scrap, and finish formulas prevent underbidding and protect your profit margins."
      },
      {
        title: "Guaranteed Code Compliance",
        desc: "Built-in IBC and OSHA validation rules warn you of design violations before they hit the shop floor."
      },
      {
        title: "Instant Client Trust",
        desc: "Deliver professional, granular PDF proposals and Bill of Materials spreadsheets to clients instantly."
      }
    ],
    workflow: {
      headline: "CAL MISC — From Stairs to Print-Ready Bids",
      description: "CAL MISC generates precise stair, railing, and guard-rail bids with real-time cost breakdowns.",
      phases: [
        {
          name: "Phase 1: Configure Stair Geometry",
          stages: [
            {
              number: 1,
              name: "Input Stair Dimensions",
              action: "Define rise and run",
              details: "Set the floor-to-floor height, riser limit, and tread width to generate stair slope and stringer length."
            },
            {
              number: 2,
              name: "Select Stringer Style",
              action: "Choose profile type",
              details: "Pick Channel (MC) or Plate stringers to automatically determine structural weight per foot."
            }
          ]
        },
        {
          name: "Phase 2: Customize Components",
          stages: [
            {
              number: 3,
              name: "Add Handrails",
              action: "Select rail type",
              details: "Attach guard rails, grab rails, or kick plates to either side of the stair flights."
            },
            {
              number: 4,
              name: "Define Mounting Base",
              action: "Set mounting type",
              details: "Select Anchored, Embedded, or Welded connections to automatically price required hardware and grout."
            }
          ]
        },
        {
          name: "Phase 3: Finalize & Bid",
          stages: [
            {
              number: 5,
              name: "Apply Surface Finishes",
              action: "Select finish treatment",
              details: "Choose Primer, Galvanizing, or Powder Coating to instantly calculate surface area pricing."
            },
            {
              number: 6,
              name: "Export Detailed Bid",
              action: "Generate PDF/BOM",
              details: "Review the live cost summary and download print-ready customer proposals and Excel spreadsheets."
            }
          ]
        }
      ]
    }
  },
  calems: {
    id: "calems",
    name: "CALEMS Employee",
    category: "HR",
    tagline: "Streamline employee operations from onboarding to exit.",
    description: "CALEMS automates onboarding, attendance tracking, and payroll on a secure multi-tenant platform. Built for modern HR teams and scaling organizations. Cuts administrative workload by 90% through self-service workflows.",
    icon: Package,
    color: "#3B82F6",
    capabilities: [
      "Manage Candidate Onboarding",
      "Monitor Attendance Logs",
      "Streamline Leave Requests",
      "Process Automated Payroll",
      "Approve Project Timesheets",
      "Store Company Policies"
    ],
    features: [
      {
        title: "Manage Candidate Onboarding",
        desc: "Onboards new hires with paperless digital document collection and verification."
      },
      {
        title: "Monitor Attendance Logs",
        desc: "Tracks clock-in times and anomalies in real-time."
      },
      {
        title: "Streamline Leave Requests",
        desc: "Requests and approves leaves in seconds with automated balance adjustments."
      },
      {
        title: "Process Automated Payroll",
        desc: "Computes complex salary structures and issues secure, encrypted payslips instantly."
      },
      {
        title: "Approve Project Timesheets",
        desc: "Tracks working hours and allocates team resources to active deliverables."
      },
      {
        title: "Store Company Policies",
        desc: "Files critical organizational documents securely with granular role-based permissions."
      }
    ],
    whyChoose: [
      {
        title: "90% Faster Onboarding",
        desc: "Eliminates manual data entry and physical paper chasing entirely."
      },
      {
        title: "Isolated Tenant Data",
        desc: "Secures sensitive employee records at the database level for compliance."
      },
      {
        title: "Effortless Payroll Cycles",
        desc: "Calculates payments and deductions automatically without complex spreadsheets."
      },
      {
        title: "Clear Team Visibility",
        desc: "Monitors leaves, attendance, and project timesheets on a live dashboard."
      }
    ],
    workflow: {
      headline: "CALEMS — Hire to Payroll",
      description: "CALEMS automates onboarding, attendance tracking, and payroll on a secure multi-tenant platform. Built for modern HR teams and scaling organizations. Cuts administrative workload by 90% through self-service workflows.",
      phases: [
        {
          name: "Phase 1: Setup & Onboarding",
          stages: [
            {
              number: 1,
              name: "Register Your Tenant",
              action: "Tenant Account Setup",
              details: "Administrator creates the organization account and spins up an isolated database."
            },
            {
              number: 2,
              name: "Complete Document Upload",
              action: "Verify Candidate Credentials",
              details: "Candidate uploads required identity documents and signs company policies."
            }
          ]
        },
        {
          name: "Phase 2: Tracking & Absences",
          stages: [
            {
              number: 3,
              name: "Attendance Check-In",
              action: "Log Working Hours",
              details: "Employee clocks in through the self-service portal to record daily logs."
            },
            {
              number: 4,
              name: "Request Time Off",
              action: "Apply For Leave",
              details: "Employee submits leave requests for instant manager review and approval."
            }
          ]
        },
        {
          name: "Phase 3: Performance & Compensation",
          stages: [
            {
              number: 5,
              name: "Approve Timesheets",
              action: "Allocate Project Resources",
              details: "Managers track hours allocated to client deliverables and approve weekly timesheets."
            },
            {
              number: 6,
              name: "Distribute Payslips",
              action: "Compensation Processing",
              details: "HR calculates monthly payments and releases secure, encrypted digital payslips."
            }
          ]
        }
      ]
    }
  },
  caltims: {
    id: "caltims",
    name: "CalTIMS",
    category: "Timesheet, HR, & Payroll",
    tagline: "Effortless Time Tracking & Payroll for Modern Teams.",
    description: "CalTIMS bridges the gap between daily work logs and month-end payroll. Track hours, manage leaves, allocate project tasks, and generate compliance-ready payslips in a single, secure platform.",
    icon: Clock,
    color: "#4F46E5",
    capabilities: [
      "Spreadsheet-like Weekly Timesheets",
      "Project & Task Allocation",
      "Timesheet-to-Payroll Integration",
      "Granular Role-Based Access Control",
      "Instant 1-Click Payroll Runs",
      "Real-Time Cost Insights"
    ],
    features: [
      {
        title: "Spreadsheet-like Weekly Timesheets",
        desc: "Log hours across assigned projects with a familiar grid layout. Daily totals auto-calculate dynamically."
      },
      {
        title: "Project Allocation & Manager Assignment",
        desc: "Organize projects with custom codes and restrict timesheet logging so employees only see assigned projects."
      },
      {
        title: "Timesheet-to-Payroll Integration",
        desc: "Calculates payouts based on approved hours and auto-deducts for Loss-of-Pay (LOP)."
      },
      {
        title: "Advanced Compliance Templates",
        desc: "Built-in calculation templates for PF, ESI, and Tax withholding under multiple tax regimes."
      },
      {
        title: "Granular Role-Based Access",
        desc: "Create custom roles with strict access validation mapped at the Module, Submodule, and Action levels."
      },
      {
        title: "One-Click Payslip Generation",
        desc: "Generate and distribute professional PDF payslips directly to employee portals instantly."
      }
    ],
    whyChoose: [
      {
        title: "100% Accurate Time Tracking",
        desc: "Auto-lock approved leave days and configure custom validation rules to prevent input errors."
      },
      {
        title: "Instant 1-Click Payroll Runs",
        desc: "Ditch the spreadsheets. Built-in compliance templates automatically compute tax and PF deductions."
      },
      {
        title: "Enterprise-Grade Data Security",
        desc: "Encrypted databases, isolated data schemas, and immutable audit logs ensure complete data privacy."
      },
      {
        title: "Granular Role-Based Access Control",
        desc: "Strict access validation at the API level ensures users only see what their role permits."
      }
    ],
    workflow: {
      headline: "How CalTIMS Works",
      description: "From daily work logs to month-end payroll processing, everything flows seamlessly in three steps.",
      phases: [
        {
          name: "Phase 1: Time Logging",
          stages: [
            {
              number: 1,
              name: "Log Hours",
              action: "Timesheet Grid",
              details: "Employees enter hours against their assigned projects on their weekly grid and submit them in one click."
            }
          ]
        },
        {
          name: "Phase 2: Approval",
          stages: [
            {
              number: 2,
              name: "Review & Approve",
              action: "Manager Dashboard",
              details: "Managers review submissions on the compliance dashboard and approve hours with optional review notes."
            }
          ]
        },
        {
          name: "Phase 3: Payroll",
          stages: [
            {
              number: 3,
              name: "Process & Pay",
              action: "Payroll Engine",
              details: "The system auto-calculates LOP, tax deductions, and PF contributions, generating payroll reports and PDF payslips."
            }
          ]
        }
      ]
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ product_id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productsData[resolvedParams.product_id];
  if (!product) return {};

  return {
    title: `${product.name} | CALDIM Software Division`,
    description: product.description,
    alternates: { canonical: `/products/${product.id}` }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ product_id: string }> }) {
  const resolvedParams = await params;
  const product = productsData[resolvedParams.product_id];

  if (!product) {
    notFound();
  }

  const Icon = product.icon;

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section className="py-32 pt-40 relative overflow-hidden bg-[#F8FAFC]">
          <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${product.color}30, transparent)` }} />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
          <div className="container-wide text-center">
            <FadeUp>
              <div 
                className="badge mb-6 mx-auto inline-flex" 
                style={{ 
                  background: `${product.color}25`, 
                  border: `1px solid ${product.color}35`, 
                  color: product.color, fontWeight: 700 
                }}
              >
                {product.category}
              </div>
              <h1 className="text-hero text-slate-900 tracking-tight mb-6 drop-shadow-sm">
                {product.name}
              </h1>
              <p className="text-slate-600 text-lg md:text-xl font-500 max-w-3xl mx-auto leading-relaxed">
                {product.tagline}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding bg-[var(--background)]">
          <div className="container-wide">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Description & Reusable stub UI */}
              <div className="lg:col-span-7">
                <FadeUp>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${product.color}15` }}
                    >
                      <Icon size={24} style={{ color: product.color }} />
                    </div>
                    <h2 className="text-3xl font-900 text-slate-900 tracking-tight">
                      System Overview
                    </h2>
                  </div>

                  <p className="text-slate-600 text-base font-500 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-8">
                    <h3 className="text-xs font-700 uppercase tracking-widest text-[var(--text-muted)] mb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-pulse" />
                      Status: Phase 1 Specifications Complete
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Our engineering division has finalized the data models, system interfaces, and database schemas. The frontend user portal is scheduled to rollout shortly. Let us know if you require preview access.
                    </p>
                  </div> */}

                  <div className="flex gap-4">
                    <Link href="/contact" className="btn text-white btn-sm shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 transform hover:-translate-y-0.5" style={{ background: product.color }}>
                      Request Preview Access
                      <ArrowRight size={14} />
                    </Link>
                    <Link href="/products" className="btn btn-secondary btn-sm flex items-center gap-1.5 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                      <LayoutGrid size={14} />
                      All Products
                    </Link>
                  </div>
                </FadeUp>
              </div>

              {/* Right Column: Key Planned Features list */}
              <div className="lg:col-span-5">
                <FadeUp delay={0.1}>
                  <div className="card bg-white/80 backdrop-blur-xl border border-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]">
                    <h3 className="text-sm font-800 text-slate-900 mb-6 uppercase tracking-wider">
                      Planned Capabilities
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {product.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-sm text-slate-600 font-500">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: `${product.color}15`, color: product.color }}>
                            {idx + 1}
                          </div>
                          <span className="leading-relaxed">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              </div>

            </div>
          </div>
        </section>

        {/* Features Section */}
        {product.features && product.features.length > 0 && (
          <section className="py-24 bg-slate-50 relative border-t border-slate-200/60">
            <div className="container-wide">
              <FadeUp className="mb-12">
                <h2 className="text-4xl font-900 text-slate-900 tracking-tight mb-3">Key System Features</h2>
                <p className="text-base text-slate-600 font-500 max-w-2xl leading-relaxed">
                  Deep-dive into the automated mechanics and capabilities built directly into the core engine.
                </p>
              </FadeUp>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-400 group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 font-900 text-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `${product.color}15`, color: product.color }}>
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-800 text-slate-900 mb-3 tracking-tight group-hover:text-slate-800 transition-colors">{feat.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-500">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Section */}
        {product.whyChoose && product.whyChoose.length > 0 && (
          <section className="py-24 bg-white relative">
            <div className="container-wide">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-4">
                  <FadeUp>
                    <div className="badge mb-6 border-slate-200 bg-slate-50 text-slate-700 font-800 uppercase tracking-widest text-[10px]">
                      Business Impact
                    </div>
                    <h2 className="text-4xl font-900 text-slate-900 tracking-tight mb-6">Why {product.name}?</h2>
                    <p className="text-base text-slate-600 font-500 leading-relaxed">
                      {product.tagline}
                    </p>
                  </FadeUp>
                </div>
                <div className="lg:col-span-8 grid md:grid-cols-3 gap-6">
                  {product.whyChoose.map((why, idx) => (
                    <div key={idx} className="p-8 rounded-[2rem] bg-[#F8FAFC] border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-400 flex flex-col justify-between group">
                      <div>
                        <h3 className="text-lg font-800 text-slate-900 mb-3 tracking-tight">{why.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-500">{why.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
          </section>
        )}

        {/* Reusable Coming Soon Info Section */}
        <section className="py-24 bg-[#F8FAFC] border-t border-slate-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,1)_0%,_transparent_100%)] pointer-events-none" />
          <div className="container-narrow text-center relative z-10">
            <FadeUp>
              <div className="w-16 h-16 rounded-full bg-white shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-slate-100 flex items-center justify-center mx-auto mb-6 text-slate-900 animate-bounce">
                <Mail size={20} />
              </div>
              <h2 className="text-3xl font-900 text-slate-900 tracking-tight mb-4">
                Want to customize {product.name} for your organization?
              </h2>
              <p className="text-base text-slate-600 font-500 leading-relaxed max-w-md mx-auto mb-8">
                Our custom software division can prioritize the integration and rollout of this module based on your business requirements.
              </p>
              <Link href="/contact" className="btn btn-primary btn-sm">
                Get in Touch with our Engineers
              </Link>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
