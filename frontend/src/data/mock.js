export const profileData = {
  name: "T Mohammed Jazeel",
  shortName: "Jazeel",
  title: "Security Analyst",
  subtitle: "Cybersecurity · SOC Analysis · Malware Investigation · Digital Forensics",
  bio: "I'm a Computer Science Engineering student with strong interests in cybersecurity, ethical hacking, and system security. I also work on data analytics and IoT-based systems. I continuously improve my skills through hands-on labs in SOC monitoring, phishing investigation, malware analysis, and incident response.",
  email: "mohammedjazeel73@gmail.com",
  github: "https://github.com/jazeeljr",
  linkedin: "https://www.linkedin.com/in/mjazeel",
  profileImage: "https://customer-assets.emergentagent.com/job_24811744-8efc-4dee-a616-c1e2c117e96a/artifacts/fcx2c3ut_portfolio.jpg"
};

export const skillIcons = [
  { name: "Python", icon: "Code" },
  { name: "Wireshark", icon: "Wifi", image: "/wireshark.png" },
  { name: "Volatility", icon: "Cpu" },
  { name: "SIEM", icon: "Shield" },
  { name: "Linux", icon: "Terminal" },
  { name: "Network", icon: "Network" },
  { name: "Forensics", icon: "Search" },
  { name: "Threat Intel", icon: "Eye" }
];

export const skills = [
  { name: "Python", level: 88 },
  { name: "SIEM / SOC", level: 90 },
  { name: "Malware Analysis", level: 85 },
  { name: "Digital Forensics", level: 87 },
  { name: "Incident Response", level: 89 },
  { name: "Penetration Testing", level: 82 }
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
    title: "Smart Locker System using Object Detection",
    description: "Developed a smart locker system using ESP32-CAM, where when the ID card of a student is shown, the locker will open automatically. It does not open for unauthorized students whose ID cards are not registered in the system.",
    image: "https://customer-assets.emergentagent.com/job_24811744-8efc-4dee-a616-c1e2c117e96a/artifacts/y8wxbvl5_project1.png",
    tech: ["ESP32-CAM", "Edge Impulse", "Computer Vision", "IoT", "Object Detection"],
    caseFile: false,
    caseColor: null,
    terminalContent: null
  },
  {
    id: 2,
    title: "Cryptocurrency Analytics Dashboard",
    description: "Built an interactive cryptocurrency analytics dashboard using SQL for data querying and Power BI for visualization. Tracks market trends, volume changes, and historical price patterns across major coins.",
    image: "https://customer-assets.emergentagent.com/job_24811744-8efc-4dee-a616-c1e2c117e96a/artifacts/qekmdhjb_project4.png",
    tech: ["SQL", "Power BI", "Data Analytics", "Visualization"],
    caseFile: false,
    caseColor: null,
    terminalContent: null
  },
  {
    id: 3,
    title: "Malware Incident Analysis – VBScript Investigation",
    description: "Investigated a WSHRAT malware delivered via phishing email on a simulated SOC environment, traced persistence mechanisms, identified C2 communication, and contained the compromised host.",
    image: "https://customer-assets.emergentagent.com/job_24811744-8efc-4dee-a616-c1e2c117e96a/artifacts/x5hey6ja_project2.png",
    tech: ["WSHRAT", "VBScript", "VirusTotal", "Sysmon", "SIEM", "Phishing"],
    caseFile: true,
    caseColor: "red",
    imageContain: true,
    terminalContent: MALWARE_REPORT
  },
  {
    id: 4,
    title: "Memory Forensics & Incident Investigation",
    description: "Analyzed Windows memory dumps to detect suspicious processes, identify malicious artifacts, and confirm compromised accounts during a simulated IR scenario.",
    image: "https://customer-assets.emergentagent.com/job_24811744-8efc-4dee-a616-c1e2c117e96a/artifacts/555ofxs1_project3.png",
    tech: ["Volatility", "Windows Memory Forensics", "Incident Response", "IOC Analysis"],
    caseFile: true,
    caseColor: "cyan",
    terminalContent: MEMORY_REPORT
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
  }
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" }
];
