export const profileData = {
  name: "T Mohammed Jazeel",
  shortName: "Jazeel",
  title: "GRC Analyst",
  subtitle: "AI Governance · Risk Assessment · Compliance · ISO 27001 · NIST AI RMF",
  bio: "I'm a Computer Science Engineering student with hands-on experience in AI Governance, GRC, SOC operations, and penetration testing fundamentals. I have worked on AI governance, risk assessments, compliance documentation, and mapping security recommendations to ISO 27001:2022 Annex A controls. I am looking to build a career in Governance, Risk, and Compliance (GRC) with a focus on AI governance, risk management, and compliance.",
  email: "mohammedjazeel73@gmail.com",
  github: "https://github.com/jazeeljr",
  linkedin: "https://www.linkedin.com/in/mjazeel",
  profileImage: "/images/profile-pic.png"
};

export const skillIcons = [
  { name: "ISO 27001", icon: "Shield" },
  { name: "NIST RMF", icon: "Cpu" },
  { name: "Risk Mgmt", icon: "Eye" },
  { name: "EU AI Act", icon: "Search" },
  { name: "Compliance", icon: "Code" },
  { name: "Splunk", icon: "Terminal" },
  { name: "Gap Analysis", icon: "Network" },
  { name: "Governance", icon: "Wifi" }
];

export const skills = [
  { name: "GRC & Risk Management", level: 90 },
  { name: "ISO/IEC 27001:2022", level: 88 },
  { name: "NIST Cybersecurity Framework", level: 86 },
  { name: "AI Governance (EU AI Act)", level: 85 },
  { name: "Compliance Documentation", level: 89 },
  { name: "Security Operations (SIEM)", level: 82 }
];

const MALWARE_REPORT = `analyst@jazeel:~/case-files $ cat vbscript-malware-report.txt

╔══════════════════════════════════════════════════════════╗
║         OFFICIAL INCIDENT REPORT — EVENT ID: 139        ║
║      SOC189 - VBScript Suspicious Behavior Detected      ║
╚══════════════════════════════════════════════════════════╝

Analyst    : T Mohammed Jazeel
Platform   : LetsDefend SOC Simulation
Case ID    : SOC-189 | Event ID: 139
Severity   : MEDIUM → escalated to HIGH
Status     : RESOLVED ✓
Date       : Apr 20, 2023, 09:42 AM
════════════════════════════════════════════════════════════

[01] ALERT SUMMARY
> Malicious VBScript executed on host "David" (IP: 172.16.17.31)
> Rule triggered: SOC189 – VBScript Suspicious Behavior Detected
> File: Purchase_Order.xls.vbs
> Path: C:\\Users\\LetsDefend\\Downloads\\Purchase_Order\\Purchase_Order.xls.vbs
> Binary MD5: 8FAF36EDFAE1EC0E8ECCD3C562C03903
> Device Action: Allowed (no automatic block)
> L1 Note: Hash matches WSHRAT variant — flagged for further investigation

════════════════════════════════════════════════════════════

[02] DETECTION & VERIFICATION
> Searched hash on VirusTotal
> Result: 30/58 antivirus engines flagged as MALICIOUS
> Labels: RAT – TROJAN | Malware | Persistence
> Threat Intel tab: Hash tagged as VBS.WSHRAT with score 5 (Virustotal)
> Confirmed: TRUE POSITIVE (TP)

> WSHRAT (Windows Script Host Remote Administration Tool):
  — Variant of the Houdini worm
  — Enables remote access via malicious VBScript
  — Has both .vbs and .js variants

> Process List confirmed wscript.exe executed the file:
  — PID: 6640
  — Command: "C:\\Windows\\System32\\WScript.exe"
              "C:\\Users\\LetsDefend\\Downloads\\Purchase_Order\\Purchase_Order.xls.vbs"
  — Parent: explorer.exe (executed by user "LetsDefend")

════════════════════════════════════════════════════════════

[03] INITIAL ACCESS ANALYSIS
> File downloaded via Chrome browser
> Browser History: Purchase_Order.zip downloaded from
  hxxps[:]//files-ld[.]s3[.]us-east-2[.]amazonaws[.]com/Purchase_Order[.]zip
  Timestamp: 2023-04-20 09:40

> Phishing Email Identified:
  — From: support@gododdy.com (impersonating godaddy.com)
  — To: david@letsdefend.io
  — Subject: "Your domain registration has confirmed"
  — Date: Apr 20, 2023, 08:55 AM

> Email Header Analysis (mxtoolbox):
  — DMARC: Non-Compliant (No DMARC Record Found)
  — SPF Alignment: FAILED
  — DKIM Alignment: FAILED
  — Confirmed: PHISHING EMAIL

> Masquerading Technique Detected:
  — File appeared as Purchase_Order.xls (Excel)
  — True file: Purchase_Order.xls.vbs (VBScript)
  — Double extension used to hide true file type

> MITRE Technique: T1566 — Phishing

════════════════════════════════════════════════════════════

[04] PERSISTENCE MECHANISMS
> Sysmon Event ID 13 — Registry value set:
  — RuleName: T1060 RunKey
  — TargetObject: HKU\\S-1-5-21-3163960855-2866672989-1813526453-1008\\
    Software\\Microsoft\\Windows\\CurrentVersion\\Run\\Purchase_Order.xls.vbs
  — Details: wscript.exe //B
    "C:\\Users\\LETSDE~1\\AppData\\Local\\Temp\\1\\Purchase_Order.xls.vbs"

> Sysmon Event ID 11 — File Created in Startup Folder:
  — TargetFilename: C:\\Users\\LetsDefend\\AppData\\Roaming\\Microsoft\\
    Windows\\Start Menu\\Programs\\Startup\\Purchase_Order.xls.vbs
  — Dual persistence: Registry Run Key + Startup Folder

> MITRE Technique: T1547 — Boot or Logon Autostart Execution

════════════════════════════════════════════════════════════

[05] NETWORK / C2 COMMUNICATION
> Suspicious outbound connections from host "David":
  — 103.47.144.80 (flagged malicious on VirusTotal — 7/97 vendors)
  — Vendors: AlphaSOC, BitDefender, Cluster25, CRDF, CyRadar, Fortinet, G-Data

> Sysmon Event ID 22 — DNS Query:
  — QueryName: chongmei33.publicvm.com
  — QueryResults: 103.47.144.80
  — C2 URL: http://chongmei33[.]publicvm[.]com:7045/is-ready

════════════════════════════════════════════════════════════

[06] CONTAINMENT ACTIONS
> Host isolated from network via Endpoint Security tab
  — Hostname: David | IP: 172.16.17.31 | Status: CONTAINED ✓

> Phishing email deleted from user mailbox
  — From: support@gododdy.com

════════════════════════════════════════════════════════════

[07] MITRE ATT&CK MAPPING
> Initial Access   — T1566   Phishing
> Execution        — T1059   Command and Scripting Interpreter
> Persistence      — T1547   Boot or Logon Autostart Execution
> Defense Evasion  — T1036   Masquerading
> Discovery        — T1082   System Information Discovery

════════════════════════════════════════════════════════════

[08] ARTIFACTS / IOCs
> Filename : Purchase_Order.xls.vbs
> SHA256   : 1c546a6548beda639640ebfbb52abd5f6013c33500172cfccf0e8716c96bb196
> Domain   : chongmei33.publicvm.com
> IPv4     : 103.47.144.80
> URL      : http://chongmei33.publicvm.com:7045/is-ready

════════════════════════════════════════════════════════════
END OF REPORT █`;

const MEMORY_REPORT = `analyst@jazeel:~/case-files $ cat memory-forensics-report.txt

╔══════════════════════════════════════════════════════════╗
║       INVESTIGATION NOTES — MEMORY FORENSICS            ║
║            & INCIDENT RESPONSE                          ║
╚══════════════════════════════════════════════════════════╝

Analyst    : T Mohammed Jazeel
Case ID    : IR-002
Severity   : CRITICAL
Status     : RESOLVED ✓
════════════════════════════════════════════════════════════

[01] MEMORY ACQUISITION
> Target System: Windows 10 (x64)
> Memory Image: memdump.mem (8GB)
> Tool Used: Volatility3 Framework
> Profile Detected: Win10x64_19041

════════════════════════════════════════════════════════════

[02] PROCESS ANALYSIS
> Command: vol.py -f memdump.mem windows.pslist

> Suspicious Processes Identified:
  — svchost.exe (PID: 4512) — Parent: explorer.exe [ANOMALOUS]
    Normal parent should be services.exe
  — cmd.exe (PID: 7823) — spawned by unusual parent
  — powershell.exe (PID: 9102) — encoded command detected

> Command: vol.py -f memdump.mem windows.cmdline
  — PID 9102 cmdline:
    powershell.exe -enc JABjAGwAaQBlAG4AdAAgAD0...
    [Base64 encoded payload detected]

════════════════════════════════════════════════════════════

[03] NETWORK CONNECTIONS
> Command: vol.py -f memdump.mem windows.netstat

> Active Connections at Time of Dump:
  — PID 4512 → 185.220.101.45:443 (ESTABLISHED)
    External IP flagged on ThreatFox as C2 server
  — PID 9102 → 192.168.1.1:80 (lateral movement attempt)

> DNS Cache Analysis:
  — malicious-update[.]xyz resolved (IOC confirmed)

════════════════════════════════════════════════════════════

[04] REGISTRY ARTIFACTS
> Command: vol.py -f memdump.mem windows.registry.hivelist

> Persistence Found:
  — HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run
    Key: "WindowsUpdate"
    Value: C:\\Users\\victim\\AppData\\Roaming\\updater.exe

════════════════════════════════════════════════════════════

[05] CREDENTIAL HARVESTING
> Command: vol.py -f memdump.mem windows.hashdump
> NT Hashes extracted from SAM hive (REDACTED)
> Pass-the-Hash attack risk: HIGH
> Recommend: Immediate password reset for all accounts

════════════════════════════════════════════════════════════

[06] MALWARE ARTIFACT
> Suspicious DLL injection detected in explorer.exe
> Hollowed process: svchost.exe (PID: 4512)
> Injected code: shellcode stub downloads secondary payload

> File Extraction:
  vol.py -f memdump.mem windows.dumpfiles --pid 4512
  — updater.exe extracted → VirusTotal: 41/72 MALICIOUS
  — Family: Cobalt Strike Beacon

════════════════════════════════════════════════════════════

[07] TIMELINE RECONSTRUCTION
> T+0    : Phishing email received
> T+12m  : Malicious attachment opened
> T+13m  : PowerShell payload executed (encoded)
> T+14m  : C2 beacon established → 185.220.101.45
> T+25m  : Registry persistence written
> T+31m  : Lateral movement attempted
> T+45m  : Memory dump acquired by analyst

════════════════════════════════════════════════════════════

[08] IOC SUMMARY
> File    : updater.exe
> Domain  : malicious-update[.]xyz
> IPv4    : 185.220.101.45
> RegKey  : HKCU\\..\\Run\\WindowsUpdate

════════════════════════════════════════════════════════════

[09] MITRE ATT&CK MAPPING
> Initial Access   — T1566   Phishing
> Execution        — T1059.001  PowerShell
> Persistence      — T1547.001  Registry Run Keys
> Privilege Escal. — T1055   Process Injection
> C2               — T1071   Application Layer Protocol
> Credential Acc.  — T1003   OS Credential Dumping

════════════════════════════════════════════════════════════
END OF REPORT █`;

export const projects = [
  {
    id: 1,
    title: "AI Governance Assessment – EU AI Act & NIST AI RMF",
    description: "Practical AI Governance assessment for a fictional financial services organization (NorthStar Financial Services) using EU AI Act and NIST AI RMF frameworks. Assessed 7 enterprise AI systems, classified risk levels, evaluated governance maturity, and prepared compliance recommendations.",
    image: "/images/projects/ai-governance.png",
    tech: ["EU AI Act", "NIST AI RMF", "AI Governance", "Risk Assessment", "Compliance"],
    caseFile: false,
    caseColor: null,
    terminalContent: null,
    githubUrl: "https://github.com/jazeeljr/NorthStar-AI-Governance"
  },
  {
    id: 2,
    title: "Academic Portal Security Risk Assessment",
    description: "GRC-based security risk assessment for an academic portal system. Focused on access control risks, MFA recommendations, and academic data protection. Mapped findings to ISO 27001:2022 Annex A controls and delivered a structured risk register with mitigation strategies.",
    image: "/images/projects/academic-portal.png",
    tech: ["GRC", "ISO 27001:2022", "Risk Register", "Access Control", "MFA"],
    caseFile: false,
    caseColor: null,
    terminalContent: null,
    githubUrl: "https://github.com/jazeeljr/DHI-GRC-Risk-Assessment"
  },
  {
    id: 3,
    title: "RetailNova Risk Assessment",
    description: "Cybersecurity risk assessment for RetailNova Pty Ltd (fictional retail organization). Identified and rated risks including database attacks, employee phishing, and AWS misconfiguration using a 5×5 risk matrix, with documented mitigation recommendations.",
    image: "/images/projects/retailnova.png",
    tech: ["Risk Assessment", "Risk Matrix", "AWS Security", "Phishing", "Data Protection"],
    caseFile: false,
    caseColor: null,
    terminalContent: null,
    githubUrl: "https://github.com/jazeeljr/RetailNova"
  },
  {
    id: 4,
    title: "Malware Incident Analysis – VBScript Investigation",
    description: "Investigated a WSHRAT malware delivered via phishing email on a simulated SOC environment, traced persistence mechanisms, identified C2 communication, and contained the compromised host.",
    image: "https://customer-assets.emergentagent.com/job_24811744-8efc-4dee-a616-c1e2c117e96a/artifacts/x5hey6ja_project2.png",
    tech: ["WSHRAT", "VBScript", "VirusTotal", "Sysmon", "SIEM", "Phishing"],
    caseFile: true,
    caseColor: "red",
    imageContain: true,
    terminalContent: MALWARE_REPORT,
    githubUrl: null
  },
  {
    id: 5,
    title: "Memory Forensics & Incident Investigation",
    description: "Analyzed Windows memory dumps to detect suspicious processes, identify malicious artifacts, and confirm compromised accounts during a simulated IR scenario.",
    image: "https://customer-assets.emergentagent.com/job_24811744-8efc-4dee-a616-c1e2c117e96a/artifacts/555ofxs1_project3.png",
    tech: ["Volatility", "Windows Memory Forensics", "Incident Response", "IOC Analysis"],
    caseFile: true,
    caseColor: "cyan",
    terminalContent: MEMORY_REPORT,
    githubUrl: null
  },
  {
    id: 6,
    title: "SZMAFI Martial Arts Website",
    description: "Designed and developed a professional website for SZMAFI Martial Arts, featuring a modern layout, class schedules, instructor profiles, and a contact system — built to represent the club's identity online.",
    image: "/images/projects/szmafi.png",
    tech: ["HTML", "CSS", "JavaScript", "Web Design", "Responsive"],
    caseFile: false,
    caseColor: null,
    terminalContent: null,
    githubUrl: "https://github.com/jazeeljr/SZMAFI-Martial-Arts",
    liveUrl: "https://szmafi-martial-arts.vercel.app/"
  },
  {
    id: 7,
    title: "Cryptocurrency Analytics Dashboard",
    description: "Built an interactive cryptocurrency analytics dashboard using SQL for data querying and Power BI for visualization. Tracks market trends, volume changes, and historical price patterns across major coins.",
    image: "/images/projects/crypto-dashboard.png",
    tech: ["SQL", "Power BI", "Data Analytics", "Visualization", "Crypto"],
    caseFile: false,
    caseColor: null,
    terminalContent: null,
    githubUrl: "https://github.com/jazeeljr/Crypto-Dashboard"
  },
  {
    id: 8,
    title: "Coffee Production Analysis",
    description: "Data analysis project using Python to explore global coffee production trends. Applied pandas and matplotlib to process agricultural datasets, identify top-producing countries, and visualize production patterns over decades.",
    image: "/images/projects/coffee-analysis.png",
    tech: ["Python", "Pandas", "Matplotlib", "Data Analysis", "Visualization"],
    caseFile: false,
    caseColor: null,
    terminalContent: null,
    githubUrl: "https://github.com/jazeeljr/Coffee-Production-Analysis-using-python"
  }
];

export const certifications = [
  {
    id: 1,
    title: "Google Cybersecurity Certificate",
    issuer: "Google",
    badge: "Google",
    badgeColor: "#4285F4",
    description: "Hands-on training covering Linux, MySQL, Python, and cybersecurity fundamentals including SIEM tools, network security, and vulnerability management across 9 courses.",
    date: "Dec 5, 2025",
    image: "https://customer-assets.emergentagent.com/job_future-dev-showcase-2/artifacts/nuvaknzo_image.png",
    verifyUrl: "https://coursera.org/verify/professional-cert/DGF1MSA7IMGS"
  },
  {
    id: 2,
    title: "SOC Analyst Learning Path",
    issuer: "LetsDefend",
    badge: "LetsDefend",
    badgeColor: "#00d4aa",
    description: "Training covering phishing analysis, web attack detection, malware investigation, and MITRE ATT&CK techniques in a real-world SOC simulation environment.",
    date: "Jan 10, 2026",
    image: "https://customer-assets.emergentagent.com/job_future-dev-showcase-2/artifacts/8ukyfyuo_image.png",
    verifyUrl: null
  },
  {
    id: 3,
    title: "Incident Responder Learning Path",
    issuer: "LetsDefend",
    badge: "LetsDefend",
    badgeColor: "#00d4aa",
    description: "Hands-on training in incident detection, IOC analysis, containment procedures, and digital forensics for effective incident response operations.",
    date: "Jan 23, 2026",
    image: "https://customer-assets.emergentagent.com/job_future-dev-showcase-2/artifacts/xsb5ymk2_image.png",
    verifyUrl: null
  },
  {
    id: 4,
    title: "Policy as Code",
    issuer: "GRC Playground",
    badge: "GRC Playground",
    badgeColor: "#00ff88",
    description: "Turn governance rules into automated policy checks using a policy engine. Built, tested, debugged, and enforced policy logic inside a deployment workflow.",
    date: "Jun 17, 2026",
    image: "/images/certifications/policy-as-code.png",
    verifyUrl: "https://grcplayground.com"
  },
  {
    id: 5,
    title: "Python Data Analysis: NumPy & Pandas Masterclass",
    issuer: "Udemy",
    badge: "Udemy",
    badgeColor: "#a435f0",
    description: "Comprehensive masterclass covering Python data analysis techniques using NumPy and Pandas.",
    date: "Jul 26, 2025",
    image: "/images/certifications/python-data-analysis.png",
    verifyUrl: "https://ude.my/UC-c9ed31ba-3530-494d-a487-46fb76799f71"
  }
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" }
];
