# Clinical Disclaimer

HealthLens is a research prototype demonstrating a human-on-loop clinical reasoning agent.
The agent is explicitly designed to operate at the augmented autonomy tier — it perceives
patient state, reasons over trajectory, and generates interpreted recommendations. It never
acts unilaterally on clinical decisions. All clinical authority is retained by the physician
and care team.

Agent scope is strictly limited to: medication schedule information, recovery score
interpretation, activity guidance per recovery protocol, and trend explanation in plain
language. The agent does not diagnose, does not assess symptoms, does not recommend
medication changes, and does not replace care team communication.

A production deployment of HealthLens handling real patient data would require: HIPAA
compliance infrastructure, IRB approval for data collection, EU AI Act high-risk AI system
classification review, and formal clinical validation against readmission outcomes.

This prototype uses fully synthetic patient data. No real patient data is collected, stored,
or transmitted beyond the Anthropic API call for conversational responses.
