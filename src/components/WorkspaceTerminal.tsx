import { useEffect, useState } from "react";
import { Terminal, Shield, Play, RotateCcw, Cpu, Check, Users } from "lucide-react";

const CODE_TEMPLATES = {
  diabetes: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 1. Load Clinical Diagnostic Data
data = pd.read_csv("medical_records_diabetes.csv")
X = data.drop(columns=["Outcome"])
y = data["Outcome"]

# 2. Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Model Definition & Training
model = RandomForestClassifier(n_estimators=100, max_depth=6)
model.fit(X_train, y_train)

# 4. Predict & Evaluate
predictions = model.predict(X_test)
score = accuracy_score(y_test, predictions)
print(f"[*] Training Acc: {model.score(X_train, y_train) * 100:.2f}%")
print(f"[+] Validation Acc: {score * 100:.2f}%")`,

  banking: `class BankSystem:
    def __init__(self, owner, balance=1000):
        self.owner = owner
        self.balance = balance
        self.log_file = "transactions.log"
        
    def deposit(self, amount):
        self.balance += amount
        self._write_log(f"DEPOSIT: +{amount}. Current: {self.balance}")
        return self.balance
        
    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("[!] Insufficient balance.")
        self.balance -= amount
        self._write_log(f"WITHDRAW: -{amount}. Current: {self.balance}")
        return self.balance`,

  school: `CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

CREATE TABLE students (
    student_id VARCHAR(15) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    marks_math INT,
    marks_science INT,
    attendance_rate DECIMAL(5,2)
);

INSERT INTO students VALUES 
('MIT-01', 'G. Brunda', 99, 98, 98.50),
('MIT-02', 'A. Kumar', 88, 85, 92.10);`,

  expense: `expenses = { "Food": 150, "Rent": 500, "Books": 120 }
budget_limit = 900

total = sum(expenses.values())
if total > budget_limit:
    print("[!] BUDGET CAP VIOLATED BY", total - budget_limit)
else:
    print(f"[*] Budget Utilized: {total}/{budget_limit} ({ (total/budget_limit)*100 :.2f}%)")`,

  tambola: `import random

def generate_tambola_ticket():
    ticket = [[0]*9 for _ in range(3)]
    for col in range(9):
        # Tambola column number rules
        low = 1 if col == 0 else col * 10
        high = 90 if col == 8 else col * 10 + 9
        numbers = sorted(random.sample(range(low, high + 1), 3))
        for row in range(3):
            ticket[row][col] = numbers[row]
    return ticket`
};

export default function WorkspaceTerminal() {
  const [activeTab, setActiveTab] = useState<keyof typeof CODE_TEMPLATES>("diabetes");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "System Ready. Initialize cyber-compiler 2.0.6...",
    "Select an interactive core python project asset to build. Click 'COMPILE CORE PROJECT' above."
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number>(412);
  const [currTime, setCurrTime] = useState("");

  // Get dynamic visitor count from real Express API
  useEffect(() => {
    fetch("/api/visitor-count")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.count) {
          setVisitorCount(data.count);
        }
      })
      .catch(() => {
        // Fallback or ignore
      });

    const updateClock = () => {
      const now = new Date();
      setCurrTime(now.toLocaleString());
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput((prev) => [...prev, `[INIT] Executing compilers for project module [${activeTab}]...`]);
    
    let lineIndex = 0;
    let lines: string[] = [];

    if (activeTab === "diabetes") {
      lines = [
        "   - Fetching diabetic diagnostic dataset...",
        "   - Resolving clinical features (Glucose, Insulin, age, insulin, bmi)...",
        "   - Loading train_test_split indices...",
        "   - Instantiating RandomForestClassifier (estimators=100)...",
        "   - Hyperparameters: max_depth=6, criterion='gini'",
        "   - Fit process started... Epoch 1/1, weights calibrated.",
        "   - Computing diagnostic model metrics...",
        "   - [STRIKE] Accuracy test completed.",
        "[*] Training Acc: 96.80%",
        "[+] Validation Acc: 93.42% (M-L diagnostic model certified)",
        "[SUCCESS] Prediction model deployed on local secure memory cache."
      ];
    } else if (activeTab === "banking") {
      lines = [
        "   - Opening sandbox File System storage buffers...",
        "   - Creating connection schema 'transactions.log' (read/write)...",
        "   - Depositing mock funds of 2000 INR into safe account balance...",
        "   - Withdrawing check 450 INR with bounds boundaries check...",
        "   - [LOG] TRANSACTION REGISTERED SUCCESSFULLY.",
        "   - Querying Balance Inquiry state directly...",
        "[+] Transaction ID: MITX-884-1802",
        "[*] Balance state: 2550.00 INR verified.",
        "[SUCCESS] Code simulated with persistent binary files stream."
      ];
    } else if (activeTab === "school") {
      lines = [
        "   - Parsing SQL dialect connection...",
        "   - Establishing workspace user 'mit_admin' authenticated via MySQL root...",
        "   - Creating database schema school_db...",
        "   - Table CREATED: student_records (5 columns, PK student_id)...",
        "   - Seeding B.Tech developer records...",
        "   - Querying Student ID 'MIT-01': G. Brunda, CGPA 9.3, marks_math: 99",
        "   - Database connection CLOSED gracefully.",
        "[*] MySQL Schema migrations validated: (100% synchronized code).",
        "[SUCCESS] Database execution verified successfully."
      ];
    } else if (activeTab === "expense") {
      lines = [
        "   - Processing personal utility limits config...",
        "   - Summing expenses dictionary size (Food=150, Rent=500, Books=120)...",
        "   - Validation logic (sum <= budget_limit):",
        "[*] Budget Utilized: 770/900 (85.56%)",
        "   - ASCII Data Visualizer outputting logs:",
        "     Food   [▓▓▓▓▓▓▓▓▓▓▓▓░░] 19.5%",
        "     Rent   [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 64.9%",
        "     Books  [▓▓▓▓▓▓▓▓▓▓░░░░] 15.6%",
        "[SUCCESS] Personal Tracker memory allocation cleaned."
      ];
    } else if (activeTab === "tambola") {
      lines = [
        "   - Instantiating random matrix board generator seed...",
        "   - Initializing rows=3, cols=9 multidimensional matrix arrays...",
        "   - Drawing 3 random integers for column 1 (range 1-9): 2, 5, 8...",
        "   - Drawing 3 random integers for column 9 (range 80-90): 81, 84, 89...",
        "   - ticket array successfully generated and sorted.",
        "[+] Tambola ticket validated against duplicate columns.",
        "[*] Winner ticket validation scan: ACTIVE.",
        "[SUCCESS] Board initialized with uniform distribution random generators."
      ];
    }

    const interval = setInterval(() => {
      if (lineIndex < lines.length) {
        setConsoleOutput((prev) => [...prev, lines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 250);
  };

  return (
    <div className="w-full glass-effect rounded-2xl border border-neon-cyan/20 overflow-hidden text-sm shadow-xl shadow-electric-purple/5">
      {/* Top Header Bar */}
      <div className="bg-space-dark/95 border-b border-neon-cyan/10 p-4 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="text-neon-cyan w-5 h-5 animate-pulse" />
          <span className="font-tech text-neon-cyan tracking-wider font-semibold">INTERACTIVE CODE WORKSPACE</span>
          <span className="text-xs bg-electric-purple/25 text-neon-cyan px-2 py-0.5 rounded border border-electric-purple/30 font-mono">v2.0.6</span>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-gray-400 bg-white/2 px-2.5 py-1 rounded border border-white/5">
            <Users className="w-3.5 h-3.5 text-neon-green" />
            <span>VISIT COUNTER : <b className="text-neon-green tracking-wider">{visitorCount}</b></span>
          </div>
          <div className="text-gray-400 hidden sm:inline-block bg-white/2 px-2.5 py-1 rounded border border-white/5">
            NODE RUNTIME: <span className="text-neon-cyan">{currTime}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap bg-space-dark/60 border-b border-white/5 font-mono text-xs">
        {(Object.keys(CODE_TEMPLATES) as Array<keyof typeof CODE_TEMPLATES>).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              if (isRunning) return;
              setActiveTab(tab);
              setConsoleOutput([`Opened code module [${tab}.py]`, "Clock updated. Status: READY."]);
            }}
            disabled={isRunning}
            className={`px-4 py-3 border-r border-white/5 transition-colors font-medium tracking-wide uppercase ${
              activeTab === tab
                ? "bg-slate-950 text-neon-cyan border-b-2 border-b-neon-cyan"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab === "diabetes" && "📁 diabetes_predictor.py"}
            {tab === "banking" && "📁 safe_banking.py"}
            {tab === "school" && "📁 school_admin.sql"}
            {tab === "expense" && "📁 expense_tracker.py"}
            {tab === "tambola" && "📁 tambola_bingo.py"}
          </button>
        ))}
      </div>

      {/* Code Area & Console Dual Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-950 font-mono min-h-[380px]">
        {/* Source Code View (L: 7 Columns) */}
        <div className="col-span-1 lg:col-span-7 p-4 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-auto max-h-[360px]">
          <div className="absolute top-2 right-2 text-[10px] text-gray-500 bg-black px-1.5 py-0.5 rounded border border-white/5">
            READ-ONLY BUFFER
          </div>
          <pre className="text-xs text-gray-300 leading-relaxed overflow-x-auto whitespace-pre">
            <code>
              {CODE_TEMPLATES[activeTab].split("\n").map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-right text-gray-600 select-none pr-4 w-6 text-[10px]">{i + 1}</span>
                  <span className="table-cell">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Live Console Output View (R: 5 Columns) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-between bg-black/90 p-4 relative overflow-hidden">
          {/* Scanline CRT overlay effect */}
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-black/10 mix-blend-overlay opacity-30" />
          
          <div className="flex-1 overflow-y-auto max-h-[280px] scrollbar-thin text-xs space-y-1.5 font-mono">
            <span className="text-gray-500 block pb-1 border-b border-white/5 text-[10px] tracking-widest uppercase">
              // LOG STREAM TERMINAL
            </span>
            {consoleOutput.map((item, id) => {
              let style = "text-gray-300";
              if (item.startsWith("[SUCCESS]")) style = "text-neon-green font-semibold";
              if (item.startsWith("[*]")) style = "text-neon-cyan";
              if (item.startsWith("[+]")) style = "text-neon-green";
              if (item.startsWith("[!]")) style = "text-red-400";
              if (item.startsWith("[INIT]")) style = "text-electric-purple font-semibold";
              return (
                <div key={id} className={`break-words tracking-wide leading-tight ${style}`}>
                  {item}
                </div>
              );
            })}
            {isRunning && (
              <div className="flex items-center gap-2 text-neon-cyan animate-pulse py-1">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>compiling python code into neural vectors...</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex-1 bg-gradient-to-r from-neon-cyan to-electric-purple text-black font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all hover:brightness-110 active:scale-98 disabled:opacity-50 hover:shadow-cyan-glow"
            >
              {isRunning ? (
                <Cpu className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              {isRunning ? "BUILDING..." : "COMPILE CORE PROJECT"}
            </button>
            <button
              onClick={() => setConsoleOutput(["Terminal buffer cleared. Status: READY."])}
              disabled={isRunning}
              className="px-3 py-2 bg-white/5 text-gray-400 hover:text-white rounded-lg transition-colors border border-white/5"
              title="Clear Terminal logs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
