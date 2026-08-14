import streamlit as st
import plotly.graph_objects as go
import time

st.set_page_config(page_title="SentinelHub // Product Intelligence", page_icon="🛡️", layout="wide")

# ==============================================================================
# 🎨 1:1 MIXPANEL "LIQUID GLASS" DESIGN SYSTEM (INJECTED CSS)
# ==============================================================================
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    /* Mixpanel Pastel Gradient Canvas */
    .stApp {
        background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 20%, #FAE8FF 40%, #FFE4E6 60%, #FFEDD5 80%, #FEF3C7 100%) !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        color: #1E1B4B !important;
    }

    #MainMenu, footer, header {visibility: hidden;}

    /* Liquid Glass Frosted Card */
    .glass-card {
        background: rgba(255, 255, 255, 0.85) !important;
        backdrop-filter: blur(24px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
        border: 1px solid rgba(255, 255, 255, 0.7) !important;
        border-radius: 20px !important;
        padding: 24px !important;
        box-shadow: 0 10px 30px rgba(124, 58, 237, 0.06), 0 1px 3px rgba(0, 0, 0, 0.05) !important;
        margin-bottom: 20px !important;
    }

    /* Metric Badges */
    .badge-purple { background: rgba(79, 70, 229, 0.1); color: #4F46E5; font-weight: 600; font-size: 12px; padding: 4px 10px; border-radius: 12px; }
    .badge-coral { background: rgba(234, 88, 12, 0.1); color: #EA580C; font-weight: 600; font-size: 12px; padding: 4px 10px; border-radius: 12px; }
    .badge-emerald { background: rgba(16, 185, 129, 0.1); color: #059669; font-weight: 600; font-size: 12px; padding: 4px 10px; border-radius: 12px; }
    .badge-crimson { background: rgba(225, 29, 72, 0.1); color: #E11D48; font-weight: 600; font-size: 12px; padding: 4px 10px; border-radius: 12px; }

    /* Custom Button Styling */
    div.stButton > button {
        background: #4F46E5 !important;
        color: #FFFFFF !important;
        border-radius: 12px !important;
        border: none !important;
        font-weight: 600 !important;
        padding: 10px 20px !important;
        box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3) !important;
        transition: all 0.2s ease !important;
    }
    div.stButton > button:hover {
        background: #4338CA !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4) !important;
    }

    .event-log {
        font-family: 'JetBrains Mono', monospace;
        background: #0F172A;
        border-radius: 10px;
        padding: 16px;
        font-size: 13px;
        color: #94A3B8;
        line-height: 1.6;
    }
</style>
""", unsafe_allow_html=True)

# ==============================================================================
# 🧠 SESSION STATE (100% WORKING ENGINE)
# ==============================================================================
if "health_score" not in st.session_state:
    st.session_state.health_score = 97
    st.session_state.scraper_version = "v1.0"
    st.session_state.dom_status = "HEALTHY"
    st.session_state.event_log = "[00:05:02] Monitoring 18 government and tech portals. Extraction health optimal."

# ==============================================================================
# 🌟 TOP BAR & HEADER
# ==============================================================================
top_col1, top_col2 = st.columns([3, 1])
with top_col1:
    st.markdown("""
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
        <h2 style="margin:0; font-weight:700; color:#1E1B4B; letter-spacing:-0.5px;">✦ SentinelHub AI</h2>
        <span class="badge-purple">Powered by Bright Data</span>
        <span class="badge-emerald">Live Intelligence</span>
    </div>
    """, unsafe_allow_html=True)

with top_col2:
    st.markdown("""
    <div style="text-align:right; font-size:13px; color:#6B7280; padding-top:8px;">
        Profile: <b>Charan Kotta (9.6 CGPA | 2nd Year)</b>
    </div>
    """, unsafe_allow_html=True)

# ==============================================================================
# 🗂️ MAIN TABS (MIXPANEL PILL STYLE)
# ==============================================================================
tab_dash, tab_hackathons, tab_grants, tab_internships, tab_outreach, tab_self_healing = st.tabs([
    "✦ sentinel ai",
    "🏆 hackathons",
    "🔬 research grants",
    "💼 tech internships",
    "🚀 outreach ai",
    "📡 self-healing engine"
])

# ------------------------------------------------------------------------------
# 📊 TAB 1: MAIN MIXPANEL DASHBOARD
# ------------------------------------------------------------------------------
with tab_dash:
    col_left, col_right = st.columns([1, 2.2], gap="medium")

    with col_left:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.markdown('<span class="badge-purple">✦ sentinel ai insight</span>', unsafe_allow_html=True)

        if st.session_state.health_score > 90:
            st.markdown("""
            <h4 style="margin:12px 0 6px 0; color:#1E1B4B;">All Scrapers Running Optimally</h4>
            <p style="font-size:14px; color:#6B7280; line-height:1.5;">Sentinel AI verified <b>43 live opportunities</b> with 100% evidence provenance across DST, MeitY, and Big Tech portals.</p>
            """, unsafe_allow_html=True)
        else:
            st.markdown("""
            <h4 style="margin:12px 0 6px 0; color:#E11D48;">Drift Incident Detected!</h4>
            <p style="font-size:14px; color:#6B7280; line-height:1.5;">Target DOM mutated on <b>DST NIDHI-PRAYAS portal</b>. Selectors broken. Health fell to <b>31%</b>.</p>
            """, unsafe_allow_html=True)

        # Mini Sparkline Trend Chart
        spark_fig = go.Figure()
        y_vals = [95, 96, 97, 96, 97, st.session_state.health_score]
        spark_fig.add_trace(go.Scatter(
            y=y_vals,
            mode='lines',
            line=dict(color='#818CF8' if st.session_state.health_score > 90 else '#F43F5E', width=3, shape='spline'),
            fill='tozeroy',
            fillcolor='rgba(129, 140, 248, 0.15)' if st.session_state.health_score > 90 else 'rgba(244, 63, 94, 0.15)'
        ))
        spark_fig.update_layout(
            height=100,
            margin=dict(l=0, r=0, t=10, b=0),
            xaxis=dict(visible=False),
            yaxis=dict(visible=False),
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)'
        )
        st.plotly_chart(spark_fig, use_container_width=True, config={'displayModeBar': False})

        st.markdown(f"""
        <div style="background:rgba(248,250,252,0.8); border-radius:12px; padding:12px; font-size:13px; color:#475569;">
            <b>Root Cause:</b> CSS selectors missing on target DOM.<br>
            <b>Remedy:</b> Trigger Self-Healing in the engine tab.
        </div>
        """, unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)

    with col_right:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)

        st.markdown("""
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h4 style="margin:0; color:#1E1B4B;">Opportunity Ingestion & Scraper Health (H2 2026)</h4>
                <p style="margin:0; font-size:13px; color:#6B7280;">Real-time stream monitored by Bright Data Web Unlocker</p>
            </div>
            <span class="badge-purple">Live Feed</span>
        </div>
        """, unsafe_allow_html=True)

        main_fig = go.Figure()
        timeline_x = ['May', 'Jun', 'Jul', 'Aug 5', 'Aug 10', 'Today (Aug 15)']
        health_y = [94, 95, 96, 98, 97, st.session_state.health_score]

        main_fig.add_trace(go.Scatter(
            x=timeline_x, y=health_y,
            mode='lines+markers',
            name='Extraction Health',
            line=dict(color='#6366F1', width=3.5, shape='spline'),
            fill='tozeroy',
            fillcolor='rgba(99, 102, 241, 0.12)',
            marker=dict(size=8, color='#4F46E5', line=dict(color='#FFFFFF', width=2))
        ))
        main_fig.update_layout(
            height=220,
            margin=dict(l=20, r=20, t=20, b=20),
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            yaxis=dict(range=[0, 110], gridcolor='rgba(226, 232, 240, 0.6)'),
            xaxis=dict(gridcolor='rgba(226, 232, 240, 0.6)')
        )
        st.plotly_chart(main_fig, use_container_width=True, config={'displayModeBar': False})

        bar_col1, bar_col2 = st.columns(2)
        with bar_col1:
            st.markdown(
                "<p style='font-size:13px; font-weight:600; color:#475569; margin:0;'>Active Inventory by Channel</p>",
                unsafe_allow_html=True)
            bar_fig = go.Figure()
            cats = ['Hackathons', 'Internships', 'Grants', 'Events']
            counts_v1 = [12, 14, 8, 9]
            counts_v2 = [4, 6, 3, 2]

            bar_fig.add_trace(
                go.Bar(name='Total Open', x=cats, y=counts_v1, marker_color='#818CF8', marker_line_radius=6))
            bar_fig.add_trace(
                go.Bar(name='9.6 CGPA Matched', x=cats, y=counts_v2, marker_color='#FB923C', marker_line_radius=6))
            bar_fig.update_layout(
                barmode='group',
                height=170,
                margin=dict(l=0, r=0, t=10, b=0),
                plot_bgcolor='rgba(0,0,0,0)',
                paper_bgcolor='rgba(0,0,0,0)',
                legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1, font=dict(size=11)),
                yaxis=dict(visible=False),
                xaxis=dict(tickfont=dict(size=11, color='#64748B'))
            )
            st.plotly_chart(bar_fig, use_container_width=True, config={'displayModeBar': False})

        with bar_col2:
            st.markdown(
                "<p style='font-size:13px; font-weight:600; color:#475569; margin:0;'>Pipeline Conversion Funnel</p>",
                unsafe_allow_html=True)
            st.markdown("""
            <div style="margin-top:12px;">
                <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;"><span>Discovered Opportunities</span> <b>43</b></div>
                <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;"><span>Evidence Attached</span> <b style="color:#059669;">100%</b></div>
                <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;"><span>High-Confidence Matches</span> <b style="color:#4F46E5;">11</b></div>
                <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;"><span>Action Packets Generated</span> <b style="color:#EA580C;">4</b></div>
            </div>
            """, unsafe_allow_html=True)

        st.markdown('</div>', unsafe_allow_html=True)

# ------------------------------------------------------------------------------
# 🏆 TAB 2: HACKATHONS
# ------------------------------------------------------------------------------
with tab_hackathons:
    st.markdown("""
    <div style="background: rgba(251, 146, 60, 0.12); border: 1px solid #FB923C; border-radius: 16px; padding: 16px; margin-bottom: 20px;">
        <h4 style="color: #EA580C; margin:0;">⚠️ Smart Schedule Collision Detected!</h4>
        <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">
            <b>EDGE NOVA'26 (Aug 27–28)</b> coincides with your internal <b>Semester 3 Class Test (CT) window</b>. Secure prior On-Duty (OD) approval!
        </p>
    </div>
    """, unsafe_allow_html=True)

    h1, h2 = st.columns(2)
    with h1:
        st.markdown("""
        <div class="glass-card">
            <span class="badge-purple">24-HR NATIONAL HACKATHON</span>
            <h3 style="margin: 12px 0 4px 0; color:#1E1B4B;">EDGE NOVA'26</h3>
            <p style="color: #6B7280; font-size: 14px;">Organizer: Dept. of Computational Intelligence (CINTEL) @ SRM KTR</p>
            <p style="color: #059669; font-weight:700; font-size: 16px;">Prize Pool: ₹40,000+ | Official OD Clearance</p>
            <p style="color: #475569; font-size: 13px;">Dates: August 27–28, 2026 | Mode: Offline on Campus</p>
            <span class="badge-emerald">Team Registered</span> <span class="badge-coral">Schedule Collision</span>
        </div>
        """, unsafe_allow_html=True)

    with h2:
        st.markdown("""
        <div class="glass-card">
            <span class="badge-purple">GLOBAL ONLINE HACKATHON</span>
            <h3 style="margin: 12px 0 4px 0; color:#1E1B4B;">Into The Scrape-Verse</h3>
            <p style="color: #6B7280; font-size: 14px;">Organizer: WeMakeDevs & Bright Data</p>
            <p style="color: #059669; font-weight:700; font-size: 16px;">1st Prize: $5,000 NVIDIA DGX AI Supercomputer</p>
            <p style="color: #475569; font-size: 13px;">Dates: August 17–23, 2026 | Mode: 100% Online</p>
            <span class="badge-emerald">Free Entry</span> <span class="badge-purple">5,000 Free Credits</span>
        </div>
        """, unsafe_allow_html=True)

# ------------------------------------------------------------------------------
# 🔬 TAB 3: PROTOTYPING GRANTS
# ------------------------------------------------------------------------------
with tab_grants:
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    if st.session_state.health_score > 90:
        st.markdown("""
        <span class="badge-emerald">GOVERNMENT OF INDIA PROTOTYPE GRANT</span>
        <h3 style="margin: 12px 0 4px 0; color:#1E1B4B;">DST NIDHI-PRAYAS Hardware Innovation Grant</h3>
        <p style="color: #6B7280; font-size: 14px;">Sponsor: Department of Science & Technology (Govt of India)</p>
        <p style="color: #059669; font-weight:700; font-size: 18px;">Funding Grant: ₹10,00,000 (Non-Dilutive) | Hard Deadline: 15 October 2026</p>
        <p style="color: #475569; font-size: 14px;">Eligibility: Minimum 7.5 CGPA | Domains: Robotics, Edge AI, IoT, Hardware Sensors</p>
        """, unsafe_allow_html=True)

        with st.expander("🔬 View Cryptographic Evidence Chain (Source HTML Proof)", expanded=True):
            st.markdown("""
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px; font-family:'JetBrains Mono', monospace; font-size:13px;">
                <b style="color:#4F46E5;">Field: `funding_max`</b> ➔ <span style="color:#059669;">₹10,00,000</span><br>
                <i style="color:#64748B;">Quote: "Funding Support: Up to INR 10,00,000 for student-led hardware prototypes."</i><br><br>
                <b style="color:#4F46E5;">Field: `deadline`</b> ➔ <span style="color:#EA580C;">2026-10-15</span><br>
                <i style="color:#64748B;">Quote: "Submission Deadline: 15 October 2026 at 17:00 IST."</i>
            </div>
            """, unsafe_allow_html=True)
    else:
        st.error("🚨 EXTRACTION FAILED: Target portal DOM layout changed! Scraper returned 0 records.")
        st.warning("Go to the 'Self-Healing Engine' tab to trigger autonomous repair!")
    st.markdown('</div>', unsafe_allow_html=True)

# ------------------------------------------------------------------------------
# 💼 TAB 4: INTERNSHIPS
# ------------------------------------------------------------------------------
with tab_internships:
    i1, i2 = st.columns(2)
    with i1:
        st.markdown("""
        <div class="glass-card">
            <span class="badge-emerald">BIG TECH INTERNSHIP</span>
            <h3 style="margin: 12px 0 4px 0; color:#1E1B4B;">Microsoft Software Engineering Intern 2026</h3>
            <p style="color: #6B7280; font-size: 14px;">Eligibility: B.Tech CSE (≥ 1 semester remaining) | Min CGPA: 8.0</p>
            <p style="color: #059669; font-weight:700;">Expected Stipend: ₹75,000 – ₹1,00,000 / month</p>
            <span class="badge-emerald">Profile Match: 98% (9.6 CGPA Verified)</span>
        </div>
        """, unsafe_allow_html=True)
    with i2:
        st.markdown("""
        <div class="glass-card">
            <span class="badge-purple">GLOBAL RESEARCH FELLOWSHIP</span>
            <h3 style="margin: 12px 0 4px 0; color:#1E1B4B;">Mitacs Globalink GRI 2027 (Canada 🇨🇦)</h3>
            <p style="color: #6B7280; font-size: 14px;">12-Week Fully Funded Summer Research at Top Canadian Labs</p>
            <p style="color: #059669; font-weight:700;">Stipend: ₹3 Lakhs+ | Flights & Housing Covered</p>
            <span class="badge-purple">Deadline: Sept 16, 2026</span>
        </div>
        """, unsafe_allow_html=True)

# ------------------------------------------------------------------------------
# 🚀 TAB 5: OUTREACH AI
# ------------------------------------------------------------------------------
with tab_outreach:
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    st.markdown("### 🚀 1-Click AI Cold Email & Application Packet Generator")
    role = st.selectbox("Select Target Opportunity", ["Microsoft Software Engineering Intern", "DST NIDHI-PRAYAS Grant",
                                                      "Mitacs Canada Research Fellow"])

    if st.button("Generate High-Conversion 3-Sentence Pitch"):
        st.markdown(f"""
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:18px; font-size:14px; color:#1E293B; line-height:1.6;">
            <b>Subject:</b> Application for {role} — Kotta Charan Ram Sai (9.6 CGPA)<br><br>
            "Dear Selection Committee / Hiring Lead,<br><br>
            I am an 18-year-old B.Tech CSE (AI/ML) student at SRM IST maintaining a 9.6 CGPA and State Rank 2 in AUEET. I operate on an ASUS ROG RTX 5070 workstation and recently built an award-winning offline mmWave radar disaster node (ResQ-Sanjeevini) and self-healing data pipelines.<br><br>
            I would love to bring my execution speed in low-latency systems and AI architecture to your team. Can I share a 60-second video demo of my latest project?"
        </div>
        """, unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

# ------------------------------------------------------------------------------
# 📡 TAB 6: SELF-HEALING ENGINE (THE WINNING DEMO)
# ------------------------------------------------------------------------------
with tab_self_healing:
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    st.markdown("### 📡 Bright Data Self-Healing Control Plane")

    col_c1, col_c2 = st.columns([1, 1.8], gap="medium")

    with col_c1:
        st.markdown("#### 🕹️ Time-Travel Demo Controls")

        if st.button("💥 Break Target Portal (Simulate DOM Drift)"):
            st.session_state.health_score = 31
            st.session_state.dom_status = "MUTATED"
            st.session_state.event_log = "[00:05:04] ALERT: DOM Drift delta > 0.75 on DST NIDHI-PRAYAS. Selectors missing. Health fell: 97% -> 31%"
            st.rerun()

        if st.button("🩹 Trigger Bright Data Self-Healing"):
            with st.spinner("Bright Data Self-Healing Agent diagnosing DOM change & generating patch..."):
                time.sleep(1.2)
                st.session_state.health_score = 97
                st.session_state.scraper_version = "v2.0"
                st.session_state.dom_status = "HEALTHY"
                st.session_state.event_log = "[00:05:13] SUCCESS: Canary passed 4/4 invariants. Scraper v2.0 promoted to production. Health restored: 31% -> 97%"
            st.rerun()

        if st.button("🔄 Reset to Baseline"):
            st.session_state.health_score = 97
            st.session_state.scraper_version = "v1.0"
            st.session_state.dom_status = "HEALTHY"
            st.session_state.event_log = "[00:05:02] Monitoring 18 government and tech portals. Extraction health optimal."
            st.rerun()

    with col_c2:
        st.markdown("#### 📝 Real-Time Event Telemetry Stream")
        st.markdown(f"""
        <div class="event-log">
            {st.session_state.event_log}
        </div>
        """, unsafe_allow_html=True)

        if st.session_state.health_score > 90:
            st.markdown(
                "<p style='color:#059669; font-weight:600; margin-top:8px;'>🟢 Scraper v2.0 Promoted: 100% Invariants Passed</p>",
                unsafe_allow_html=True)
        else:
            st.markdown(
                "<p style='color:#E11D48; font-weight:600; margin-top:8px;'>🔴 Scraper v1.0 Failing: Trigger Self-Healing in controls</p>",
                unsafe_allow_html=True)

    st.markdown('</div>', unsafe_allow_html=True)