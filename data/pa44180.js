/* ============================================================
   PA-44-180 SEMINOLE
   Bu dosya sadece VERİ içerir. Uygulamanın kodu app.js'te.
   Kart formatı:
     - "Metin"                       → numaralı adım (numara otomatik)
     - { label: "Vx:", val: "82 kt" } → etiket + gizlenen değer
     - header / mask                 → grup başlığı / gizliyken görünen hali
     - restart: true                 → numara bu grupta 1'den yeniden başlar
   Kaynak: "PA44 Genel ve Check Hazırlık" notları + Vizyon Havacılık
   PA-44-180 Piper Seminole checklist (Deveci Procedures)
   ============================================================ */

registerAircraft({
  id: "pa44180",
  name: "PA-44-180 SEMINOLE",
  icon: "✈️",
  footer: "PA-44-180 Seminole • Operations & Memory Suite",

  decks: [
    /* ======================= CHECKLIST ======================= */
    {
      key: "pa44180.checklist",
      name: "PA-44 Checklist",
      menuTitle: "Checklist",
      icon: "📋",
      unit: "Konu",
      filters: [{ id: "EMERGENCY", label: "Acil" }, { id: "NORMAL", label: "Normal" }],
      cards: [
        {
          title: "ENGINE FAILURE DURING TAKE OFF (BELOW 75 KIAS)",
          category: "EMERGENCY",
          groups: [
            { header: "SPEED BELOW 75 KIAS OR GEAR DOWN:", mask: "SPEED…:", items: [
              "Throttles IMMEDIATELY CLOSE",
              "Brakes (or land and brake) AS REQUIRED",
              "Directional Control MAINTAIN"
            ] },
            { header: "IF INSUFFICIENT RUNWAY REMAINS FOR A COMPLETE STOP:", mask: "IF…:", items: [
              "Brakes APPLY MAX. BRAKING",
              "Mixtures CUT-OFF",
              "Fuel Selectors OFF",
              "Mag Left / Right Sw. OFF",
              "Batt Master Sw. OFF",
              "Directional Control MAINTAIN AND AVOID OBSTACLES"
            ] }
          ]
        },
        {
          title: "ENGINE FAILURE DURING TAKE OFF (ABOVE 75 KIAS)",
          category: "EMERGENCY",
          groups: [
            { header: "IF SUFFICIENT RUNWAY REMAINS FOR A COMPLETE STOP:", mask: "IF…:", items: [
              "Gear VERIFY DOWN",
              "Land STRAIGHT AHEAD",
              "Directional Control MAINTAIN",
              "Throttles CLOSE",
              "Brakes AS REQUIRED"
            ] },
            { header: "IF GEAR IS IN TRANSIT OR UP AND DECISION IS MADE TO CONTINUE:", mask: "IF…:", restart: true, items: [
              "Mixtures FULL RICH",
              "Propellers FULL INCREASE",
              "Throttles FULL OPEN",
              "Flaps FULL UP",
              "Gear VERIFY UP",
              "Inoperative Engine IDENTIFY AND VERIFY",
              "Throttle (Inop. Eng.) CLOSE",
              "Propeller (Inop. Eng.) FEATHER",
              "Mixture (Inop. Eng.) CUT-OFF",
              "Establish Bank 2 OR 3° INTO OPERATING ENGINE",
              "Climb Speed 88 KIAS",
              "Trim 2 OR 3° TO OPERATING ENGINE",
              "Cowl Flap (Operating Eng.) AS REQUIRED",
              "Cowl Flap (Inop. Eng.) CLOSED",
              "Mag L/R Sw. (Inop. Eng.) OFF",
              "Fuel Pump (Inop. Eng.) OFF",
              "ALTR Sw. (Inop. Eng.) OFF",
              "Fuel Sel. (Inop. Eng.) OFF"
            ] }
          ],
          notes: [
            "NOT: LAND AS SOON AS PRACTICAL"
          ]
        },
        {
          title: "ONE ENGINE INOPERATIVE LANDING",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Inoperative Engine ENG. SEC. PROCEDURE"
            ] },
            { items: [
              "Seat Belts / Harnesses SECURE",
              "Fuel Selector (Op. Engine) ON",
              "Mixture (Op. Engine) FULL RICH",
              "Propeller (Op. Engine) FULL INCREASE",
              "Fuel Pump (Op. Engine) ON",
              "Cowl Flap (Op. Engine) AS REQUIRED",
              "Altitude / Airspeed NORMAL APPROACH"
            ] },
            { header: "WHEN LANDING IS ASSURED:", mask: "WHEN…:", items: [
              "Gear DOWN",
              "Flaps 25° (2ND NOTCH)",
              "Final Approach Speed 90 KIAS",
              "Power RETARD / FLARE",
              "Trim AS POWER IS REDUCED"
            ] }
          ]
        },
        {
          title: "ONE ENGINE INOPERATIVE GO-AROUND",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Mixture (Op. Engine) FULL RICH",
              "Propeller (Op. Engine) FULL INCREASE",
              "Throttle TAKE OFF POWER",
              "Flaps RETRACT INCREMENTALLY",
              "Gear UP",
              "Airspeed 88 KIAS",
              "Trim 2 OR 3° INTO OPERATING ENG.",
              "Cowl Flap (Op. Engine) AS REQUIRED"
            ] }
          ]
        },
        {
          title: "ENGINE ROUGHNESS",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Carb Heat ON"
            ] },
            { header: "IF ROUGHNESS CONTINUES AFTER ONE MINUTE:", mask: "IF…:", items: [
              "Carb Heat OFF",
              "Mixture ADJUST FOR MAX SMOOTHNESS",
              "Engine Gauges CHECK",
              "Mag L/R Sw. CHECK (ONE AT A TIME)"
            ] }
          ]
        },
        {
          title: "ENGINE FIRE DURING START",
          category: "EMERGENCY",
          groups: [
            { header: "IF ENGINE HAS NOT STARTED:", mask: "IF…:", items: [
              "Mixture CUT-OFF",
              "Throttle FULL OPEN",
              "Eng Start CONTINUE TO CRANK ENGINE"
            ] },
            { header: "IF FIRE CONTINUES:", mask: "IF…:", items: [
              "Fuel Selectors OFF",
              "Fuel Pumps OFF",
              "Mixtures CUT-OFF",
              "Throttles FULL OPEN",
              "External Fire Extinguisher USE",
              "Airplane EVACUATE"
            ] }
          ],
          notes: [
            "NOT: If engine has already started and is running, continue operating to try pulling the fire into the engine."
          ]
        },
        {
          title: "ENGINE FIRE IN FLIGHT",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Fuel Selector (Aff. Eng.) OFF",
              "Throttle (Aff. Eng.) CLOSE",
              "Propeller (Aff. Eng.) FEATHER",
              "Mixture (Aff. Eng.) CUT-OFF",
              "Cowl Flap (Aff. Eng.) OPEN",
              "Affected Engine COMPLETE SECURING PROCEDURE"
            ] },
            { header: "IF FIRE PERSISTS:", mask: "IF…:", restart: true, items: [
              "Airspeed INCREASE IN ATTEMPT TO BLOW OUT THE FIRE"
            ] }
          ]
        },
        {
          title: "ELECTRICAL FIRE",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Emerg. Batt VERIFY ARM",
              "Batt Mastr OFF",
              "ALTR L/R Sw. OFF",
              "Vents CLOSED (to avoid drafts)",
              "Cabin Heat OFF"
            ] },
            { header: "PRIOR TO LANDING:", mask: "PRIOR…:", restart: true, items: [
              "Gear USE MANUAL EXTENSION OF LANDING GEAR PROCEDURE"
            ] }
          ],
          notes: [
            "NOT 1: If fire persists, locate and if practical extinguish with portable fire extinguisher located on the console just aft of the 2 front seats.",
            "NOT 2: LAND AS SOON AS POSSIBLE"
          ]
        },
        {
          title: "AUTOPILOT MALFUNCTION",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Control Wheel GRASP FIRMLY",
              "Attitude Indicators CROSSCHECK",
              "A/P DISC Sw. DEPRESS AND HOLD",
              "Pitch Trim RETRIM AS NECESSARY",
              "Autopilot Circuit Br. PULL",
              "Autopilot DO NOT RE-ENGAGE"
            ] }
          ]
        },
        {
          title: "EMERGENCY DESCENT",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Carb Heat ON",
              "Throttles CLOSE",
              "Propellers FULL INCREASE",
              "Mixtures AS REQUIRED",
              "Gear (below 140 KIAS) DOWN",
              "Airspeed 140 KIAS"
            ] }
          ]
        },
        {
          title: "EMERGENCY EXIT",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Thermoplastic Cover REMOVE",
              "Emergency Exit Handle FULL FORWARD",
              "Window PUSH OUT"
            ] }
          ]
        },
        {
          title: "ELECTRIC PITCH TRIM RUNAWAY",
          category: "EMERGENCY",
          groups: [
            { header: "AN UNEXPECTED PITCH DEVIATION FROM THE DESIRED FLIGHT PATH AND RED PTRM ANNUNCIATION:", mask: "BELİRTİ…:", items: [
              "Control Wheel GRASP FIRMLY",
              "Attitude Indicators CROSSCHECK",
              "A/P DISC Sw. DEPRESS AND HOLD",
              "Pitch Trim Circ. Br. PULL",
              "Pitch Trim RETRIM MANUALLY"
            ] }
          ]
        },
        {
          title: "LANDING GEAR MALFUNCTION",
          category: "EMERGENCY",
          groups: [
            { header: "CHECK FOLLOWING BEFORE EXTENDING GEAR MANUALLY:", mask: "CHECK…:", items: [
              "Circuit Breakers CHECK",
              "Batt Mastr Sw. ON",
              "ALTR L/R CHECK"
            ] },
            { header: "MANUAL EXTENSION OF LANDING GEAR:", mask: "MANUAL…:", restart: true, items: [
              "Airspeed REDUCE (100 KIAS MAX)",
              "Gear DOWN",
              "Emerg. Gear Ext. Knob MOVE WIRE GUARD AND PULL",
              "Gear Position Indications 3 GREEN"
            ] }
          ]
        },
        {
          title: "HIGH OIL / CYLINDER HEAD TEMPERATURE",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Cowl Flaps OPEN",
              "Mixture ENRICHEN",
              "Power REDUCE",
              "Airspeed INCREASE (if altitude permits)"
            ] }
          ]
        },
        {
          title: "LOSS OF FUEL FLOW",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Fuel Pump (Affected Eng.) ON"
            ] }
          ]
        },
        {
          title: "FUEL QUANTITY",
          category: "EMERGENCY",
          groups: [
            { header: "IF ONE TANK HAS LOW FUEL QUANTITY:", mask: "IF…:", items: [
              "Fuel Selector (Engine with low fuel quantity) XFEED",
              "LAND AS SOON AS PRACTICAL"
            ] },
            { header: "IF BOTH TANKS HAVE LOW FUEL QUANTITY:", mask: "IF…:", restart: true, items: [
              "Fuel Selectors ON",
              "LAND AS SOON AS POSSIBLE"
            ] }
          ],
          notes: [
            "NOT: Master Warning — bir tank 5 gal veya altı / toplam 10 gal veya altı. Master Caution — bir tank 10 gal veya altı / toplam 20 gal veya altı. (POH 3-22)"
          ]
        },
        {
          title: "COMPLETE ELECTRICAL FAILURE",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Emerg Batt Sw. VERIFY ARM",
              "Stndby Flight Instruments VERIFY OPERATIONAL",
              "Aircraft Control USE PFD AND STNDBY INS.",
              "Batt Mastr Sw. OFF",
              "ALTR L/R Sw. OFF"
            ] },
            { header: "PRIOR TO LANDING:", mask: "PRIOR…:", items: [
              "Landing Light INOPERATIVE",
              "Gear USE MANUAL EXTENSION OF LG"
            ] },
            { header: "EMERGENCY BUS'TA ÇALIŞANLAR:", mask: "EMERGENCY BUS…:", items: [
              { label: "+", val: "PFD (Reversionary Mode)" },
              { label: "+", val: "Engine Instruments" },
              { label: "+", val: "COM 1" },
              { label: "+", val: "NAV 1" },
              { label: "+", val: "Stand By Instruments" },
              { label: "+", val: "Audio Panel" },
              { label: "+", val: "Avionics Lighting / Dimming" }
            ] }
          ],
          notes: [
            "NOT 1: APPROXIMATELY 30 MINUTES OF ELECTRICAL POWER IS AVAILABLE",
            "NOT 2: LAND AS SOON AS POSSIBLE"
          ]
        },
        {
          title: "AIR DATA COMPUTER (ADC) TOTAL FAILURE",
          category: "EMERGENCY",
          groups: [
            { header: "ON GROUND:", items: [
              "PFD Message Advisories CONSIDER",
              "ADC Circuit Breaker RESET"
            ] },
            { header: "IN FLIGHT:", restart: true, items: [
              "Stand By Instruments VERIFY AIR DATA INDICATIONS",
              "Airspeed, Altitude and Vertical Speed USE STAND BY INSTRUMENTS",
              "PFD Message Advisories CONSIDER",
              "ADC Circuit Breaker RESET"
            ] }
          ],
          notes: [
            "NOT 1: Yerde — IF ADC DATA STILL INVALID: IFR OPERATIONS NOT AUTHORIZED",
            "NOT 2: Havada — IF ADC DATA STILL INVALID: EXIT AND AVOID FLIGHT IN IMC"
          ]
        },
        {
          title: "LOST COMMUNICATION",
          category: "EMERGENCY",
          groups: [
            { items: [
              "AVIATE / NAVIGATE / COMMUNICATE"
            ] },
            { items: [
              "Uçağı kontrolde TUT",
              "Kulaklık Jak CHECK",
              "Audio Panel CHECK"
            ] },
            { items: [
              "XPNDR 7600",
              "Blind yayın YAP (İstasyon + 121.5)"
            ] },
            { items: [
              "Meydana DIVERT",
              "VMC şartlarını KORU",
              "Meydanı telefon ile ARA"
            ] },
            { items: [
              "Meydanda tur AT",
              "ALDIS BEKLE",
              "İnince rapor VER"
            ] }
          ]
        },
        {
          title: "LOST PROCEDURE",
          category: "EMERGENCY",
          groups: [
            { items: [
              "AVIATE / NAVIGATE / COMMUNICATE"
            ] },
            { items: [
              "Geri DÖN",
              "TIRMAN",
              "Bildiğin nirengiye UÇ",
              "Orbit AT"
            ] },
            { items: [
              "Aviyoniklerle TESPİT ET"
            ] },
            { items: [
              "ATC ile İLETİŞİM KUR",
              "Gerekirse 121.5 MHz"
            ] }
          ]
        },
        {
          title: "BULUT İÇİ",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Geri DÖN",
              "Pitot Heat ON",
              "CLIMB"
            ] },
            { items: [
              "Cabin Heat ON",
              "Defroster ON",
              "Alt Static ON"
            ] }
          ]
        },
        {
          title: "BUZLANMA",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Geri DÖN",
              "Pitot Heat ON",
              "CHANGE ALTITUDE"
            ] },
            { items: [
              "Cabin Heat ON",
              "Defroster ON",
              "Alt Static ON"
            ] }
          ]
        },

        /* ---------- NORMAL ---------- */
        {
          title: "BEFORE STARTING ENGINE",
          category: "NORMAL",
          groups: [
            { items: [
              "Preflight Check COMPLETED (Pitot cover)",
              "Flight Planning COMPLETED",
              "Cabin Door CLOSE & LATCH",
              "Seats ADJUSTED & LOCKED",
              "Seatbelts and Harness FASTEN / ADJUST, CHECK INERTIA REEL"
            ] },
            { items: [
              "Park Brake SET",
              "Gear DOWN",
              "Throttles IDLE",
              "Propellers FULL INCREASE",
              "Mixtures CUT-OFF",
              "Friction Handle AS DESIRED",
              "Carb Heat OFF",
              "Cowl Flaps OPEN",
              "Stabilator & Rudder Trim SET (Neutral)",
              "Fuel Selectors ON",
              "L/R ALTR Sw. ON",
              "Emer Batt ARM — E VOLTS OVER 23.3 (Max 32 V)"
            ] },
            { items: [
              "Avion Master Sw. OFF",
              "Day / Night Sw. AS REQUIRED (Day)",
              "Strobe Lights FIN STROBE",
              "All Elec. Sw. OFF",
              "Cabin Heat Sw. OFF",
              "Circuit Breakers CHECK"
            ] }
          ]
        },
        {
          title: "NORMAL START - COLD ENGINE",
          category: "NORMAL",
          groups: [
            { items: [
              "Batt Master Sw. ON (ATC motor)",
              "Gear Position Ind. 3 GREEN",
              "Throttles 1/4 INCH OPEN",
              "Propellers FULL INCREASE",
              "Mixtures FULL RICH",
              "Fuel Pump ON (Recog L. ON)",
              "Mag L/R Sw. ON",
              "Eng Primer AS REQUIRED (Soğuksa)",
              "Propeller Area CLEAR",
              "Eng Start ENGAGE (Başlamazsa gaz ileri-geri)",
              "Throttle ADJUST WHEN ENGINE STARTS TO 1000 RPM",
              "Oil PSI CHECK (55-95 PSI Green / Min 25 - Max 110 PSI / Teknisyen)"
            ] },
            { header: "REPEAT ABOVE PROCEDURE FOR SECOND ENGINE START:", mask: "REPEAT…:", items: [
              "Volts CHECK (25 V üstü / Min 25 V - Max 32 V)",
              "ALTR Amps CHECK (Pozitif / Yerde max 60 A - Havada 80 A)",
              "Fuel Pumps OFF"
            ] }
          ],
          notes: [
            "NOT 1: Oil Temp = 75° - 245° F",
            "NOT 2: PRIMER NOT NECESSARY FOR HOT ENGINE START"
          ]
        },
        {
          title: "BEFORE TAXI",
          category: "NORMAL",
          groups: [
            { items: [
              "External Power Source VERIFY REMOVED",
              "Batt Master Sw. VERIFY ON",
              "Fuel Selectors ON, BOTH XFEED, ON"
            ] },
            { items: [
              "Avion Master Sw. ON (MFD press)",
              "MFD Splash Screen VERIFY DATA CURRENCY (Büyük FMS knob / EIS)",
              "Fuel Totalizer FOB SYNC OR MANUAL (RST Fuel)",
              "Flaps AUX > TEST (EIS ekranında check / Flap 10° T/O)",
              "GPS AUX > MIN 4 SAT. (Büyük FMS knob → GPS)",
              "Traffic MFD > TRAF. MAP TEST THEN OPERATE (Büyük FMS knob / 2-6 NM test)",
              "System Messages - CAS Ann. CONSIDER ANY ILLUM (Pitot on/off)",
              "Master Warn / Master Caution TEST (PFD üstüne bas)",
              "Stand By Flight Ins. VERIFY ON, NO RED X (Solda)"
            ] },
            { items: [
              "ATIS RECEIVE (QNH)",
              "Altimeters / Altitude / Minimums SET",
              "Lights AS REQUIRED (Strobe ON)",
              "Cabin Heat AS DESIRED",
              "Radios CHECK & SET (Kontrol yüzeyleri check)",
              "Autopilot / Alet Kontrol VERIFY PREFLIGHT SELF TEST AND DISCONNECT"
            ] },
            { header: "CHART BRIEFING / UÇUŞ BİLGİLERİ:", items: [
              "Fuel Selectors VERIFY ON",
              "Passenger Briefing COMPLETE",
              "Park Brake RELEASE (Brake check)"
            ] }
          ]
        },
        {
          title: "TAXIING",
          category: "NORMAL",
          groups: [
            { items: [
              "Taxi Area CLEAR",
              "Throttles APPLY SLOWLY",
              "Brakes CHECK",
              "Steering CHECK",
              "Instruments CHECK"
            ] }
          ]
        },
        {
          title: "GROUND CHECK",
          category: "NORMAL",
          groups: [
            { items: [
              "Park Brake SET",
              "Mixtures FULL RICH",
              "Propellers FULL INCREASE",
              "Engine Instruments CHECK (ALL GREEN, NO RED X)"
            ] },
            { header: "MEKANİK KONTROL BAŞLIYORUM:", items: [
              "Throttles 1500 RPM",
              "Propellers MAX DROP 500 RPM (En alta çek / it)"
            ] },
            { header: "MANYETO KONTROL BAŞLIYORUM:", items: [
              "Throttles 2000 RPM",
              "L/R Mag MAX DROP 175 / DIFF 50 RPM"
            ] },
            { header: "PROPELLER TEST BAŞLIYORUM:", items: [
              "Propellers (Yarım alta çek / it) MAP MAX INC 2 INHG / PROP MAX DROP 300 RPM / OIL PRES MAX DROP 15 PSI"
            ] },
            { items: [
              "Carb Heat CHECK (On / Off — düşüş / yükseliş)",
              "Throttles IDLE 550-650 RPM CHECK (Sarsıntı)",
              "Fuel Pumps ON",
              "Throttles 1000 RPM"
            ] }
          ]
        },
        {
          title: "BEFORE TAKE OFF",
          category: "NORMAL",
          groups: [
            { items: [
              "Flight Controls FREE AND CORRECT",
              "Flight Instruments CHECK",
              "Engine Instruments ★ CHECK (ALL GREEN, NO RED X)",
              "Fuel Quantity SUFFICIENT",
              "Propellers ★ FULL INCREASE",
              "Mixtures ★ FULL RICH",
              "Carb Heat ★ OFF",
              "Cowl Flaps OPEN",
              "Flaps ★ CHECK / SET",
              "Stab / Rudder Trims SET"
            ] },
            { items: [
              "Fuel Selectors ON",
              "CAS Messages CONSIDER ANY ILLUM",
              "PFD Annunciations CONSIDER ANY ILLUM",
              "System Messages CONSIDER",
              "Transponder AS REQUIRED",
              "Fuel Pumps ★ ON",
              "Pitot Heat AS REQUIRED",
              "Strobe Lights ★ ON",
              "Door LATCHED",
              "Park Brake RELEASE"
            ] }
          ]
        },
        {
          title: "NORMAL TAKE OFF",
          category: "NORMAL",
          groups: [
            { items: [
              "Flaps 0° - 10°",
              "Stab / Rudder Trim CHECK SET",
              "Power 2700 RPM - FULL THROTTLE",
              "Rotate Speed 75 KIAS",
              "Climb Speed 88 KIAS",
              "Gear (After positive rate) UP",
              "Flaps UP"
            ] }
          ]
        },
        {
          title: "CLIMB",
          category: "NORMAL",
          groups: [
            { items: [
              "Mixture FULL RICH",
              "Power 24 MAP 2400 RPM",
              "Climb Speed 88 KIAS",
              "Cowl Flaps AS REQUIRED",
              "Fuel Pumps ON"
            ] }
          ]
        },
        {
          title: "CRUISING",
          category: "NORMAL",
          groups: [
            { items: [
              "Power 20 MAP 2300 RPM",
              "Fuel Pumps OFF",
              "Mixtures FULL RICH",
              "Cowl Flaps AS REQUIRED",
              "Trim AS REQUIRED"
            ] }
          ]
        }
      ]
    },

    /* ======================= CAS MESAJLARI ======================= */
    {
      key: "pa44180.cas",
      name: "PA-44 CAS Mesajları",
      menuTitle: "CAS Uyarı Mesajları",
      icon: "🚨",
      unit: "Mesaj",
      filters: [{ id: "WARNING", label: "Warning" }, { id: "CAUTION", label: "Caution" }, { id: "ADVISORY", label: "Advisory" }],
      cards: [
        {
          title: "CAS RENKLERİ",
          groups: [
            { header: "KIRMIZI (WARNING):", items: [
              { label: "Alarm:", val: "Master Warning" },
              { label: "Ses:", val: "Üçlü çan (triple chime)" },
              { label: "Anlam:", val: "Hemen müdahale gerekir" }
            ] },
            { header: "SARI (CAUTION):", items: [
              { label: "Alarm:", val: "Master Caution" },
              { label: "Ses:", val: "Çift çan (double chime)" },
              { label: "Anlam:", val: "Dikkat, önlem al" }
            ] },
            { header: "BEYAZ (ADVISORY):", items: [
              { label: "Alarm:", val: "Yok" },
              { label: "Ses:", val: "Tek çan (single chime)" },
              { label: "Anlam:", val: "Bilgi; bir sistem devrede veya arızalı" }
            ] }
          ]
        },

        /* ---------- KIRMIZI WARNING ---------- */
        { title: "L/R ENG CHT", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "CHT > 500°F" },
          { label: "Ne yapılır:", val: "Cowl flap OPEN, mixture rich, güç azalt, hız artır" }
        ] }] },
        { title: "L/R FUEL QTY", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "Tank ≤ 5 gal" },
          { label: "Ne yapılır:", val: "Bir tank: XFEED, land ASAP practical. İki tank: selector ON, land ASAP possible" }
        ] }] },
        { title: "L/R ALTR FAIL", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "Alternatör arızalı" },
          { label: "Ne yapılır:", val: "Yük < 75 A, switch OFF, field CB RESET, ON; olmazsa OFF" }
        ] }] },
        { title: "L+R ALTR FAIL", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "İkisi de arızalı" },
          { label: "Ne yapılır:", val: "Reset dene; olmazsa 3 dk içinde load shedding" }
        ] }] },
        { title: "L/R START ENGD", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "Marş > 30 sn" },
          { label: "Ne yapılır:", val: "Throttle azalt, ENG START CB PULL; yerde motoru kapat" }
        ] }] },
        { title: "GEAR SYS", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "Yerde gear arızası" },
          { label: "Ne yapılır:", val: "CB, BATT, ALTR kontrol; manuel indirme" }
        ] }] },
        { title: "CHECK GEAR", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "< ~400 ft, gear inik değil" },
          { label: "Ne yapılır:", val: "GEAR DOWN, 3 yeşil" }
        ] }] },
        { title: "HTR OVRHEAT", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "Heater aşırı ısındı" },
          { label: "Ne yapılır:", val: "CABIN HEAT OFF" }
        ] }] },
        { title: "USP ACTIVE", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "Otopilot açık, sürat çok düştü" },
          { label: "Ne yapılır:", val: "Gücü artır, flap / gear'a bak" }
        ] }] },
        { title: "(EIS) PROP OVERSPEED", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "> 2720 RPM, 5 sn" },
          { label: "Ne yapılır:", val: "Throttle geri, prop DECREASE (feather yok)" }
        ] }] },
        { title: "(EIS) OIL TEMP", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "> 245°F" },
          { label: "Ne yapılır:", val: "Cowl flap OPEN, mixture rich, güç azalt, hız artır" }
        ] }] },
        { title: "(EIS) OIL PRESSURE", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "< 25 veya > 115 PSI" },
          { label: "Ne yapılır:", val: "Throttle min, prop DECREASE; sıcaklık da yüksekse motoru durdur, land ASAP possible" }
        ] }] },
        { title: "(EIS) TOTAL FUEL", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "< 10 gal" },
          { label: "Ne yapılır:", val: "FUEL QTY prosedürü" }
        ] }] },
        { title: "(EIS) BATTERY V", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "< 24/25 V veya > 32 V" },
          { label: "Ne yapılır:", val: "Checklist yok" }
        ] }] },
        { title: "(EIS) ALT AMPS", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "> 75 A" },
          { label: "Ne yapılır:", val: "Elektrik yükünü azalt" }
        ] }] },
        { title: "(EIS) E VOLTS", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "< 20 V veya > 32 V" },
          { label: "Ne yapılır:", val: "Elektrik kaybı yakın, land ASAP possible" }
        ] }] },
        { title: "(EIS) GEAR FAILURE", category: "WARNING", groups: [{ items: [
          { label: "Ne zaman:", val: "Gear göstergesinde dolu kırmızı daire (konum bilinmiyor)" },
          { label: "Ne yapılır:", val: "Manuel indirme" }
        ] }] },

        /* ---------- SARI CAUTION ---------- */
        { title: "L/R FUEL QTY", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "Bir tank 10 gal veya altı" },
          { label: "Ne yapılır:", val: "Bir tank: selector XFEED, land as soon as practical. İki tank: selector ON, land as soon as possible" }
        ] }] },
        { title: "GEAR SYS", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "Uçuşta gear sistemi arızası" },
          { label: "Ne yapılır:", val: "CB'ler, BATT MASTR ON, ALTR kontrol; sonra manuel indirme" }
        ] }] },
        { title: "CHECK GEAR", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "~400 ft AGL üzerinde gear inik değil (MP 14 inHg altı veya flap 2. kademe üzeri)" },
          { label: "Ne yapılır:", val: "GEAR DOWN (istersen), üç yeşil" }
        ] }] },
        { title: "HYDR PUMP ON", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "Hidrolik pompa 16 sn'den uzun çalışıyor" },
          { label: "Ne yapılır:", val: "GEAR PUMP CB PULL, inmeden önce PUSH. CB tekrar açılırsa manuel indirme" }
        ] }] },
        { title: "PITOT HEAT FAIL", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "Pitot heat ON ama çalışmıyor" },
          { label: "Ne yapılır:", val: "Switch OFF, CB RESET, ON. Olmazsa IMC'den kaçın" }
        ] }] },
        { title: "PITOT HEAT OFF", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "Pitot heat kapalı" },
          { label: "Ne yapılır:", val: "İstersen ON. Yerde en fazla 3 dk" }
        ] }] },
        { title: "(EIS) OIL PRESSURE", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "26-55 PSI (1100 RPM üzeri) veya 96-115 PSI — CAS mesajı yok" },
          { label: "Ne yapılır:", val: "Throttle minimum, propeller DECREASE" }
        ] }] },
        { title: "(EIS) TOTAL FUEL", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "Toplam 20 gal altı — CAS mesajı yok" },
          { label: "Ne yapılır:", val: "L/R FUEL QTY prosedürü" }
        ] }] },
        { title: "(EIS) ACİL BATARYA", category: "CAUTION", groups: [{ items: [
          { label: "Ne zaman:", val: "23.3 V altı — CAS mesajı yok" },
          { label: "Ne yapılır:", val: "POH'ta checklist yok" }
        ] }] },

        /* ---------- BEYAZ ADVISORY ---------- */
        { title: "EMERG BATT ON", category: "ADVISORY", groups: [{ items: [
          { label: "Ne zaman:", val: "Acil batarya devrede — ana elektrik kaybı, voltaj ~20 V" },
          { label: "Ne yapılır:", val: "EMERG BATT ARM teyit, BATT MASTR ve ALTR'ler OFF, standby instrument teyit. Gear manuel indir. ~30 dk elektrik, land as soon as possible" }
        ] }] },
        { title: "FUEL IMBAL", category: "ADVISORY", groups: [{ items: [
          { label: "Ne zaman:", val: "Yakıt dengesiz — tank farkı 10 galdan fazla" },
          { label: "Ne yapılır:", val: "POH'ta checklist yok" }
        ] }] },
        { title: "PFD FAN FAIL", category: "ADVISORY", groups: [{ items: [
          { label: "Ne zaman:", val: "PFD fanı çalışmıyor (acil bataryada da çıkar)" },
          { label: "Ne yapılır:", val: "Yerdeyse uçma, sorun çözülene kadar. Uçuştaysa sonraki uçuştan önce düzelt" }
        ] }] },
        { title: "MFD FAN FAIL", category: "ADVISORY", groups: [{ items: [
          { label: "Ne zaman:", val: "MFD fanı çalışmıyor" },
          { label: "Ne yapılır:", val: "Yerdeyse uçma, sorun çözülene kadar. Uçuştaysa sonraki uçuştan önce düzelt" }
        ] }] },
        { title: "AV FAN FAIL", category: "ADVISORY", groups: [{ items: [
          { label: "Ne zaman:", val: "Avionics fanı çalışmıyor (transponder ve GIA soğutması)" },
          { label: "Ne yapılır:", val: "Yerdeyse uçma, sorun çözülene kadar. Uçuştaysa sonraki uçuştan önce düzelt. Sıcaklık limitleri aşılabilir, ekranlar kendiliğinden kısılabilir" }
        ] }] }
      ]
    },

    /* ======================= LİMİTLER VE ÖZELLİKLER ======================= */
    {
      key: "pa44180.limits",
      name: "PA-44 Limitler",
      menuTitle: "Limitler ve Özellikler",
      icon: "⚙️",
      unit: "Konu",
      cards: [
        {
          title: "YAKLAŞMA SÜRATLERİ",
          groups: [
            { items: [
              { label: "Flapsız:", val: "90 kt" },
              { label: "10° Flap:", val: "85 kt" },
              { label: "25° Flap:", val: "80 kt" },
              { label: "40° Flap:", val: "75 kt (Short field) = Vref" }
            ] }
          ]
        },
        {
          title: "AIRSPEED INDICATOR ARCS",
          groups: [
            { items: [
              { label: "WHITE ARC:", val: "55 - 111 kt (Flap down)" },
              { label: "RED LINE 1:", val: "56 kt (Vmc)" },
              { label: "GREEN ARC:", val: "57 - 169 kt (Normal operating)" },
              { label: "BLUE LINE:", val: "88 kt (Vyse — one engine inop best rate)" },
              { label: "YELLOW ARC:", val: "169 - 202 kt (Smooth air only)" },
              { label: "RED LINE 2:", val: "202 kt (Never exceed)" }
            ] }
          ]
        },
        {
          title: "HIZ LİMİTLERİ",
          groups: [
            { items: [
              { label: "Vso:", val: "55 kt (x 1.3 = Vref)" },
              { label: "Vs:", val: "57 kt" },
              { label: "Vfe:", val: "111 kt" },
              { label: "Vle:", val: "140 kt" },
              { label: "Vlo Uzatma:", val: "140 kt" },
              { label: "Vlo Toplama:", val: "109 kt" },
              { label: "Va (3800 lbs):", val: "135 kt" },
              { label: "Va (2870 lbs):", val: "115 kt" },
              { label: "Vno:", val: "169 kt" },
              { label: "Vne:", val: "202 kt" }
            ] }
          ]
        },
        {
          title: "ÇİFT MOTOR HIZLARI",
          groups: [
            { items: [
              { label: "Vr:", val: "75 kt" },
              { label: "Vmc:", val: "56 kt (Red line)" },
              { label: "Vsse:", val: "82 kt (Intentional one engine inop)" },
              { label: "Vx / Vxse:", val: "82 kt" },
              { label: "Vy / Vyse:", val: "88 kt (Blue line)" }
            ] }
          ]
        },
        {
          title: "DİĞER HIZLAR VE BİLGİLER",
          groups: [
            { items: [
              { label: "Vglide:", val: "82 kt (1000 ft'de 1.6 NM süzülüş)" },
              { label: "Cam Açma:", val: "129 kt" },
              { label: "Kapı Kapatma:", val: "82 kt (Reduce to)" },
              { label: "Emergency Gear Açma:", val: "100 kt" },
              { label: "Emergency Descent:", val: "140 kt" },
              { label: "Max Crosswind:", val: "17 kt" }
            ] },
            { items: [
              { label: "Landing Gear Açılma Süresi:", val: "10 saniye (16 sn'den uzun sürerse Master Caution HYDR PUMP uyarısı)" },
              { label: "Stall Düdüğü:", val: "Stall'dan 5-10 kt önce öter" },
              { label: "Master Bat. Çalışmazsa:", val: "Stall düdüğü çalışmaz" },
              { label: "Stall Sensörleri:", val: "İki tane — dışarıdaki 0°-10° flap / motora yakın 25°-40° flap" }
            ] }
          ]
        },
        {
          title: "GÜÇ AYARLARI",
          groups: [
            { items: [
              { label: "Takeoff:", val: "Full thrust / Full RPM / 88 kt (75 kt Vr)" },
              { label: "Tırmanış:", val: "24 inHg / 2400 RPM / 88 kt" },
              { label: "Düz Uçuş:", val: "20-22 inHg / 2300 RPM / 110 kt" },
              { label: "Alçalış:", val: "14-15 inHg / Full RPM" },
              { label: "Hava Hareketi:", val: "14-15 inHg / Full RPM" }
            ] }
          ]
        },
        {
          title: "STALLAR",
          groups: [
            { items: [
              { label: "Güç:", val: "14 inHg" },
              { label: "Landing Gear Koyma Sürati:", val: "100 kt altı" },
              { label: "Kurtarmadan Çıkış Hızı:", val: "88 kt" },
              { label: "Gear Topla:", val: "Positive Rate" }
            ] }
          ]
        },
        {
          title: "LANDING GEAR HORN ÇALDIĞI 3 DURUM",
          groups: [
            { items: [
              "14 inHg altına düşülürse",
              "Gearsız flap koyulursa",
              "Yerdeyken UP yapılırsa"
            ] }
          ]
        },
        {
          title: "STALL VE BANK ANGLE İLİŞKİSİ",
          groups: [
            { header: "CLEAN:", items: [
              { label: "0°:", val: "57 kt" },
              { label: "15°:", val: "58 kt" },
              { label: "20°:", val: "59 kt" },
              { label: "25°:", val: "60 kt" },
              { label: "30°:", val: "61.5 kt" },
              { label: "35°:", val: "63 kt" },
              { label: "40°:", val: "64.5 kt" },
              { label: "45°:", val: "67.5 kt" },
              { label: "50°:", val: "70.5 kt" },
              { label: "55°:", val: "73.5 kt" },
              { label: "60°:", val: "79.5 kt" }
            ] },
            { header: "FLAPS 40°:", items: [
              { label: "0°:", val: "55 kt" },
              { label: "15°:", val: "56 kt" },
              { label: "20°:", val: "57 kt" },
              { label: "25°:", val: "58 kt" },
              { label: "30°:", val: "59.5 kt" },
              { label: "35°:", val: "61 kt" },
              { label: "40°:", val: "62.5 kt" },
              { label: "45°:", val: "65.5 kt" },
              { label: "50°:", val: "68.5 kt" },
              { label: "55°:", val: "71.5 kt" },
              { label: "60°:", val: "77.5 kt" }
            ] }
          ],
          notes: [
            "NOT: Artış — 25°'ye kadar her 5° için +1 kt / 25°-40° +1.5 kt / 40°-55° +3 kt / 55°-60° +6 kt"
          ]
        },
        {
          title: "TEK MOTOR PERFORMANS CEZALARI",
          groups: [
            { items: [
              { label: "Landing Gear Ext. / Flaps Up:", val: "-250 fpm" },
              { label: "Flaps 25° / Gear Down:", val: "-490 fpm" },
              { label: "Flaps Full / Gear Down:", val: "-525 fpm" },
              { label: "Windmilling (Gear & Flaps Up):", val: "-200 fpm" }
            ] }
          ],
          notes: [
            "NOT: Fig. 5-19 Climb Performance - One Engine Operating - Gear Up; feathered prop ve temiz konfigürasyon içindir."
          ]
        },
        {
          title: "SERVİS TAVANLARI",
          groups: [
            { items: [
              { label: "Twin Service Ceiling:", val: "15.000 ft" },
              { label: "Twin Absolute Ceiling:", val: "16.500 ft" },
              { label: "Single Service Ceiling:", val: "4.000 ft" },
              { label: "Single Absolute Ceiling:", val: "5.000 ft" }
            ] }
          ]
        },
        {
          title: "ZERO THRUST RPM (SIMULATED FEATHER)",
          groups: [
            { items: [
              { label: "Ayar:", val: "Propeller ve Mixture FULL INCREASE, Throttle ile ayarlanır" }
            ] },
            { items: [
              { label: "Vyse 88 kt için:", val: "2180 RPM" },
              { label: "100 kt için:", val: "2510 RPM" },
              { label: "110 kt için:", val: "2690 RPM" }
            ] }
          ]
        },
        {
          title: "TCAS",
          groups: [
            { items: [
              { label: "Yatayda:", val: "40 NM" },
              { label: "Dikeyde:", val: "10.000 ft" },
              { label: "Takip:", val: "30 uçak" }
            ] }
          ]
        },
        {
          title: "RULE OF THUMB (Pratik Hesaplama Kuralları)",
          groups: [
            { items: [
              { label: "Baz Değerler:", val: "Düz uçuş 120 kt / Alçalış-Tırmanış 90 kt — Tırmanış 30 gal/h, Düz 20 gal/h, Alçalış 10 gal/h" }
            ] },
            { items: [
              { label: "KAÇ DK GİDECEĞİM:", val: "Gideceğim mesafe / 2" },
              { label: "KAÇ NM GİDECEĞİM:", val: "Süre x 2" },
              { label: "DÜZ UÇUŞTA KAÇ GAL YAKACAĞIM (MESAFEDEN):", val: "Mesafe / 6" },
              { label: "DÜZ UÇUŞTA KAÇ GAL YAKACAĞIM (SÜREDEN):", val: "Dakika / 3" }
            ] },
            { header: "TOP OF DESCENT / TOP OF CLIMB:", mask: "TOD / TOC:", items: [
              { label: "ALÇALIŞ İÇİN YAKIT:", val: "İrtifa farkı / 3" },
              { label: "TIRMANIŞ İÇİN YAKIT:", val: "İrtifa farkı" },
              { label: "KAÇ NM SÜRECEK:", val: "İrtifa farkı x 3" },
              { label: "KAÇ DK SÜRECEK:", val: "İrtifa farkı x 2" }
            ] }
          ]
        },
        {
          title: "MOTOR ÖZELLİKLERİ",
          groups: [
            { items: [
              { label: "Marka / Model:", val: "Textron Lycoming O-360-A1H6" },
              { label: "Güç:", val: "180 HP / 2700 RPM" },
              { label: "Tipi:", val: "4 silindirli / Direct drive / Boksör" },
              { label: "Soğutma:", val: "Hava ile" },
              { label: "Yakıt Sistemi:", val: "Karbüratörlü (enjeksiyonsuz)" },
              { label: "Hacim:", val: "360 inç küp" },
              { label: "Sıkıştırma Oranı:", val: "8.5 : 1" }
            ] },
            { items: [
              { label: "RPM Green Arc:", val: "500 - 2700 RPM" },
              { label: "Warm Up:", val: "1200 RPM" },
              { label: "Max Drop:", val: "175 RPM" },
              { label: "Max Diff:", val: "50 RPM" }
            ] },
            { items: [
              { label: "CHT:", val: "200 - 500 °F" },
              { label: "EGT:", val: "1100 - 1700 °F" }
            ] }
          ]
        },
        {
          title: "YAĞ",
          groups: [
            { items: [
              { label: "Kapasite:", val: "5 - 8 Quarts" }
            ] },
            { items: [
              { label: "Oil Pressure Green Arc:", val: "55 - 95 PSI" },
              { label: "Min Oil Pressure:", val: "25 PSI" },
              { label: "Max Oil Pressure:", val: "115 PSI" }
            ] },
            { items: [
              { label: "Oil Temp Green Arc:", val: "75 - 245 °F" },
              { label: "Max Oil Temp:", val: "245 °F" }
            ] }
          ]
        },
        {
          title: "YAKIT",
          groups: [
            { items: [
              { label: "Türü:", val: "AVGAS 100LL" },
              { label: "1 usGal:", val: "6 lbs" },
              { label: "1 litre:", val: "0.72 kg" }
            ] },
            { items: [
              { label: "Total:", val: "110 usGal" },
              { label: "Usable:", val: "108 usGal" },
              { label: "Unusable:", val: "2 usGal (Basic Empty Mass'e dahil)" }
            ] },
            { items: [
              { label: "Fuel Flow Green Arc:", val: "3 GPH - 25 GPH" },
              { label: "Saatlik Tüketim (Cruise):", val: "20 gal" },
              { label: "Saatlik Tüketim (Climb):", val: "30 gal" },
              { label: "Saatlik Tüketim (Descent):", val: "10 gal" },
              { label: "Tek Motor Durumunda:", val: "Yarısı + 2 gal" }
            ] },
            { items: [
              { label: "Heater Saatlik Tüketimi:", val: "1.5 usGal" },
              { label: "İki Depo Arası Fark:", val: "Max 10 usGal" }
            ] }
          ]
        },
        {
          title: "PERVANE ÖZELLİKLERİ",
          groups: [
            { items: [
              { label: "Marka:", val: "Hartzell" },
              { label: "Pitch:", val: "Variable pitch / Constant speed" },
              { label: "Blade:", val: "2 blades" },
              { label: "Çapı:", val: "74 inç" },
              { label: "Feather:", val: "Full feathering" },
              { label: "Dönüş Yönü:", val: "Sol pervane SAĞA / Sağ pervane SOLA döner" }
            ] }
          ]
        },
        {
          title: "ELEKTRİK",
          groups: [
            { items: [
              { label: "Alternatörler:", val: "L / R ALTR — 28 V / 80 A" },
              { label: "Alternatör Max Ground:", val: "60 amp" },
              { label: "Alternatör Max Flight:", val: "80 amp" }
            ] },
            { items: [
              { label: "Main Battery:", val: "24 V / 13.6 Ah — Min 25 V / Max 32 V" },
              { label: "Emergency Battery:", val: "Min 20 V / Min for flight 23.3 V / Max 32 V" },
              { label: "Hatırlatma:", val: "23.3 V sabah göreceğiz" }
            ] }
          ]
        },
        {
          title: "ELEKTRİK BUSLARI",
          groups: [
            { items: [
              { label: "Hot Batt Bus:", val: "Clock, ELT, Hobbs" },
              { label: "Essential Bus:", val: "PFD, COM1, NAV1, ADC, AHRS, GEA, Audio/MKR, Stby instr., XPDR, Pitot heat, Gear pump, L/R Fuel pump, Ltng prot." },
              { label: "Non-Essential Bus:", val: "Eng start, Cabin heater, Vent fan, Pitch trim" },
              { label: "Lighting Bus:", val: "Cabin lights, Panel dimmer, Avionics dimmer, Recog lights, Nav lights, Landing light, Anti coll" },
              { label: "Avionics Bus (AVION MASTER):", val: "Autopilot, Turn coord., MFD, NAV2, COM2, DME, TAS, XM, ADF" },
              { label: "Emergency Bus (EMERG BATT):", val: "PFD, COM1, NAV1, ADC, AHRS, GEA, Audio/MKR, Stby instr., Avionics lts" }
            ] }
          ]
        },
        {
          title: "GÖVDE",
          groups: [
            { items: [
              { label: "Yapısı:", val: "Semi-Monocoque" },
              { label: "Kuyruk:", val: "T-Wing with anti servo tab" },
              { label: "Kanat Açıklığı:", val: "38 ft" },
              { label: "Uzunluk:", val: "27 ft" },
              { label: "Yükseklik:", val: "6 ft" },
              { label: "Kanat Alanı:", val: "183 sq ft" }
            ] },
            { items: [
              { label: "Nose Gear Pressure:", val: "50 PSI" },
              { label: "Main Gear Pressure:", val: "55 PSI" }
            ] }
          ]
        },
        {
          title: "AĞIRLIK",
          groups: [
            { items: [
              { label: "Basic Empty Mass:", val: "2589 lbs" },
              { label: "Max Useful Load:", val: "1211 lbs (Yakıt + Yolcular + Bagaj + Diğer sıvılar)" },
              { label: "Max Baggage Mass:", val: "200 lbs" },
              { label: "Max Takeoff / Landing Weight:", val: "3800 lbs" }
            ] },
            { items: [
              { label: "Wing Loading:", val: "21 lbs / sq ft" },
              { label: "Power Loading:", val: "10.5 lbs / hp" },
              { label: "Max G:", val: "+3.8 G (Clean) / +2 G (Flaps down) / -1.5 G" }
            ] }
          ]
        },
        {
          title: "CG",
          groups: [
            { items: [
              { label: "Datum:", val: "Leading edge'in 78.4 inç önünde (Wing station 106)" }
            ] },
            { items: [
              { label: "3400 lbs için:", val: "85 - 93 inç" },
              { label: "3600 lbs için:", val: "87 - 93 inç" },
              { label: "3800 lbs için:", val: "89 - 93 inç" }
            ] }
          ]
        },
        {
          title: "OTOPİLOT (GFC 700)",
          groups: [
            { items: [
              { label: "Max Hız:", val: "190 kt" },
              { label: "Min Hız:", val: "80 kt" },
              { label: "Min Hız (Approach):", val: "90 kt" },
              { label: "Min İrtifa:", val: "AGL + 1000 ft" }
            ] }
          ]
        },
        {
          title: "ALTIN KURALLAR",
          groups: [
            { items: [
              { label: "Cowl Flap:", val: "HEP ON (açık)" },
              { label: "Carb Heat:", val: "HEP OFF" }
            ] }
          ]
        },
        {
          title: "POH BÖLÜMLERİ",
          groups: [
            { items: [
              { label: "1:", val: "General" },
              { label: "2:", val: "Limitations" },
              { label: "3:", val: "Emergency Procedures" },
              { label: "4:", val: "Normal Procedures" },
              { label: "5:", val: "Performance" },
              { label: "6:", val: "Weight and Balance" },
              { label: "7:", val: "System Descriptions" },
              { label: "8:", val: "Handling" },
              { label: "9:", val: "Supplements" },
              { label: "10:", val: "Operating Tips" }
            ] }
          ]
        }
      ]
    },

    /* ======================= MANEVRALAR & STANDART PROSEDÜRLER ======================= */
    {
      key: "pa44180.maneuvers",
      name: "PA-44 Manevralar",
      menuTitle: "Manevralar & Standart Prosedürler",
      icon: "✈️",
      unit: "Konu",
      cards: [
        {
          title: "BRIEFING",
          groups: [
            { items: [
              "NOTAM / Kontroller",
              "Yangın Söndürücü",
              "Görev / Süre",
              "10 Flap / Koşu Mesafesi (FT) / 75 Rotate",
              "Gear / Flap T",
              "Emergency durumlar",
              "Kumandalar / COM / Checklist"
            ] }
          ]
        },
        {
          title: "SORTİ AKIŞI",
          groups: [
            { items: [
              "BRIEFING",
              "UÇUŞ BİLGİLERİ",
              "GROUND CHECK",
              "BEFORE T/O CHECKLIST",
              "PİST GİRİŞ ÖNCESİ KONTROLLER"
            ] }
          ]
        },
        {
          title: "MEYDAN FREKANSLARI",
          groups: [
            { items: [
              { label: "TWR:", val: "119.25" },
              { label: "Şirket:", val: "136.2" },
              { label: "ATIS:", val: "119.375" },
              { label: "NDB:", val: "371" },
              { label: "VOR:", val: "115.3" },
              { label: "ILS:", val: "110.7" }
            ] }
          ]
        },
        {
          title: "ATC UÇUŞ BİLGİLERİ (VFR)",
          groups: [
            { items: [
              "ATIS “_” — bilgileri aktarmak isterim",
              "SHGM kontrol, 1 saat",
              "3 adet touch and go",
              "__ ile __ radyalleri arası __ NM çalışma talep",
              "Max 7500 / XPNDR “____”"
            ] }
          ]
        },
        {
          title: "ATC UÇUŞ BİLGİLERİ (IFR)",
          groups: [
            { items: [
              "ATIS “_” — bilgileri aktarmak isterim",
              "SHGM kontrol, 1 saat",
              "“_” SID ile kalkış, VOR üstü HOLD",
              "VOR U ile minimumlardan pas geçiş",
              "Ardından ILS Y ile tam iniş",
              "Max 6600 / XPNDR “____”"
            ] }
          ]
        },
        {
          title: "KOKPİT ALET KONTROLÜ",
          groups: [
            { items: [
              "Frekans SET",
              "CDI = NAV 1",
              "BRG 1 = NAV 1 / BRG 2 = ADF"
            ] },
            { items: [
              "NAV 1 dinle (2 kere) — Push Vol ID → %100 → SPKR NAV 1",
              "CRS dot / Flag kontrol"
            ] },
            { items: [
              "ADF dinle (2 kere) — SPKR → ADF",
              "ADF antene al (90° kayıp)"
            ] }
          ]
        },
        {
          title: "PİST GİRİŞ ÖNCESİ KONTROLLER",
          groups: [
            { items: [
              "Devre Kesiciler İÇERİDE",
              "Landing Light ON"
            ] },
            { items: [
              "Mixtures FULL RICH",
              "Propellers FULL INCREASE"
            ] },
            { items: [
              "Alternatörler ON",
              "Batarya ON"
            ] },
            { items: [
              "Fuel Pumps ON",
              "Manyetolar ON"
            ] },
            { items: [
              "Selectors ON",
              "Engine ALL GREEN"
            ] }
          ]
        },
        {
          title: "MEYDAN TURU",
          groups: [
            { items: [
              "HSI 11 / Sulu Pusula 11 / Heading Bug SET",
              "Takeoff Flap",
              "2000 RPM (Gaz ile)",
              "All Green",
              "Speed Alive",
              "Takeoff Thrust / Full RPM SET",
              "Forty / Fifty / Sixty / Seventy / Seventy Five",
              "ROTATE",
              "Positive Rate / Brakes APPLY / Landing Gear UP",
              "88 KT için burnu ezdim"
            ] },
            { items: [
              "3400 FT geldi / Flaps UP / Landing Lights OFF",
              "24 inHg / 2400 RPM / 88 KT tırmanışa devam"
            ] },
            { items: [
              "3600 FT geldi, dönüşe başladım",
              "Rüzgar altı için nirengi gelince tekrar döndüm",
              "4200 FT geldi, burnu ezdim / 100 KT bekliyorum",
              "Hız geldi: 20 inHg / 2300 RPM / 110 KT ile düz uçuş"
            ] },
            { header: "RÜZGAR ALTININ ORTALARINDAYIZ / BEFORE LANDING CHECKLIST:", mask: "RÜZGAR ALTI…:", items: [
              "Devre Kesiciler İÇERİDE",
              "Landing Light ON",
              "Mixtures FULL RICH",
              "Propellers FULL INCREASE",
              "Alternatörler ON",
              "Batarya ON",
              "Fuel Pumps ON",
              "Manyetolar ON",
              "Selectors ON",
              "Engine ALL GREEN"
            ] },
            { items: [
              "15-17 inHg",
              "Landing Gear DOWN / 3 yeşil / İniş takımları aşağıda ve kilitli",
              "BEFORE LANDING CHECKLIST HAS BEEN COMPLETED"
            ] },
            { items: [
              "Speed Check / Flap 10°",
              "85-80 KT ile düz uçuş",
              "ATC: “__ pisti için __ rüzgar altı sonu. 3 yeşil. İniş takımları aşağıda ve kilitli.”"
            ] },
            { items: [
              "Esas bacağa döndük",
              "Speed Check / Flap 25°",
              "80-75 KT devam ediyorum",
              "Pist 45°'de gazı azalttım, süzülüş"
            ] },
            { items: [
              "Son yaklaşmaya döndük",
              "ATC: “__ pisti için son yaklaşma. 3 yeşil. İniş takımları aşağıda ve kilitli.”",
              "Speed Check / 40° Flap",
              "75-70 KT yaklaş"
            ] }
          ]
        },
        {
          title: "DAHİLİ KONTROLLER",
          groups: [
            { items: [
              "Devre Kesiciler İÇERİDE"
            ] },
            { items: [
              "Mixtures FULL RICH",
              "Propellers FULL INCREASE"
            ] },
            { items: [
              "Alternatörler ON",
              "Batarya ON"
            ] },
            { items: [
              "Fuel Pumps ON",
              "Manyetolar ON"
            ] },
            { items: [
              "Selectors ON",
              "Engine ALL GREEN"
            ] }
          ]
        },
        {
          title: "TEMİZLEME DÖNÜŞÜ",
          groups: [
            { items: [
              "Rüzgarın tersine 90° DÖN",
              "Geri 180° DÖN",
              "Rüzgarı KARŞILA"
            ] },
            { items: [
              "Altımızda / üstümüzde çalışan uçak",
              "Yerleşim yeri",
              "Mecburi iniş için uygun arazi",
              "Meydan X yönünde"
            ] }
          ]
        },
        {
          title: "YAVAŞ UÇUŞ",
          groups: [
            { items: [
              "Amacı: Stall süratine yakın hızlardaki uçuş karakteristiğini öğrenmek.",
              "Heading Bug SET",
              "Nirengi ALDIM"
            ] },
            { items: [
              "14-15 inHg",
              "100 KT bekle",
              "Landing Gear DOWN",
              "3 yeşil / İniş takımları aşağıda ve kilitli"
            ] },
            { items: [
              "Burnu tut",
              "Flapsız: 90-85 / 10°: 85-80 / 25°: 80-75 / 40°: 75-70 KT",
              "Flap geçişleri: SPEED CHECK"
            ] },
            { items: [
              "Çıkıyoruz, gaz FULL!",
              "Speed Check / Flap UP / 1001 - 1002 - 1003"
            ] },
            { items: [
              "10° Flap ile 88 KT bekledim",
              "Landing Gear UP",
              "Speed Check / Flap UP",
              "110 KT geldi / 20-22 inHg / 2300 RPM"
            ] }
          ]
        },
        {
          title: "KESKİN DÖNÜŞ",
          groups: [
            { items: [
              "Amacı: Yüksek hız / yüksek yatış açısındaki uçak karakteristiğini anlamak.",
              "Heading Bug SET",
              "Nirengi ALDIM"
            ] },
            { items: [
              "23 inHg — 120 KT",
              "45° yatış",
              "20° kala çık"
            ] }
          ]
        },
        {
          title: "TEMİZ KONF. STALL (Gazlı)",
          groups: [
            { items: [
              "Amacı: Tırmanış esnasında girilebilecek anormal durumları tespit etmek ve çıkış manevralarını öğrenmek.",
              "Heading Bug SET",
              "Nirengi ALDIM"
            ] },
            { items: [
              "14-15 inHg",
              "90 KT geldi, burnu 20° kaldır",
              "22 inHg"
            ] },
            { items: [
              "Düdük (60 KT) ile burun aşağıya / Gaz FULL",
              "82 KT ile düz uçuş",
              "88 KT geldi, tırmanışa başla"
            ] },
            { items: [
              "110 KT geldi, irtifa geldi / 20-22 inHg / 2300 RPM"
            ] }
          ]
        },
        {
          title: "20° YATIŞLI YAKLAŞMA STALL (Gazsız)",
          groups: [
            { items: [
              "Amacı: Yatışlı bir alçalma durumunda girilebilecek anormal durumları tespit etmek ve çıkış manevralarını öğrenmek.",
              "Heading Bug SET",
              "Nirengi ALDIM",
              "Landing Light ON"
            ] },
            { items: [
              "14-15 inHg",
              "100 KT bekle",
              "Landing Gear DOWN",
              "3 yeşil / İniş takımları aşağıda ve kilitli"
            ] },
            { items: [
              "90 KT bekle",
              "3 sn süzülüş",
              "Sağa / sola 20° yatır (GAZSIZ'da yatış yok)",
              "Burnu 20° kaldır"
            ] },
            { items: [
              "Düdük (60 KT) ile burun aşağıya / Gaz FULL / Aksi rudder",
              "82 KT ile düz uçuş",
              "88 KT geldi, tırmanışa başla",
              "POSITIVE RATE = Landing Gear UP / Landing Light OFF"
            ] },
            { items: [
              "110 KT geldi, irtifa geldi / 20-22 inHg / 2300 RPM"
            ] }
          ]
        },
        {
          title: "İNİŞ KONF. STALL (Karakteristik)",
          groups: [
            { items: [
              "Amacı: İniş esnasında yüksek palye durumunda girilebilecek anormal durumları tespit etmek ve çıkış manevralarını öğrenmek.",
              "Heading Bug SET",
              "Nirengi ALDIM"
            ] },
            { items: [
              "500 FT altımız pist",
              "Landing Light ON"
            ] },
            { items: [
              "14-15 inHg",
              "100 KT bekle",
              "Landing Gear DOWN",
              "3 yeşil / İniş takımları aşağıda ve kilitli"
            ] },
            { items: [
              "Speed Check / Flap DOWN",
              "10° Flap — 85 KT ile süzülüş"
            ] },
            { items: [
              "100 FT kala palyeye geçtim (Gaz IDLE)",
              "Düdük (60 KT) ile Gaz FULL"
            ] },
            { items: [
              "88 KT tırman",
              "Positive Rate / Gear UP"
            ] },
            { items: [
              "300 FT yukarıda Flap UP / Landing Light OFF",
              "24 inHg / 2400 RPM / 90 KT tırmanış devam",
              "110 KT geldi, irtifa geldi / 20-22 inHg / 2300 RPM"
            ] }
          ]
        },
        {
          title: "EMERGENCY DESCENT (Manevra)",
          groups: [
            { items: [
              "Amacı: Olası bir acil durumda en kısa sürede irtifa kaybetmektir.",
              "Heading Bug SET",
              "Nirengi ALDIM"
            ] },
            { items: [
              "Flaps UP",
              "Cowl Flaps CLOSED",
              "Carb Heat OPEN"
            ] },
            { items: [
              "Throttle IDLE",
              "RPM 1000",
              "Landing Gear DOWN",
              "3 yeşil / İniş takımları aşağıda ve kilitli"
            ] },
            { items: [
              "140 KT için pitch down",
              "30° yatış"
            ] },
            { items: [
              "180° dönüp çıkıyorum",
              "Burnu tuttum, hız düşüyor",
              "110 KT geldi, irtifa geldi / 20-22 inHg / 2300 RPM",
              "Landing Gear UP"
            ] }
          ]
        },
        {
          title: "ONE ENGINE INOP (Hava Hareketi)",
          keepGroups: true,
          groups: [
            { header: "IDENTIFY:", items: [
              "Mixtures BOTH FULL",
              "Propellers BOTH FULL",
              "Throttle (Çalışan motor) FULL",
              "DEAD ENGINE — DEAD LEG",
              "LIVE ENGINE — FULL RUDDER",
              "88 KT",
              "Flaps UP",
              "Landing Gear UP"
            ] },
            { header: "ENGINE RESTART:", restart: true, items: [
              "Fuel Pump ON",
              "Mixture FULL RICH",
              "Carb Heat ON",
              "Mag Left / Right OPEN (ON)",
              "Eng Start CRANK x 2"
            ] },
            { header: "FEATHERING:", restart: true, items: [
              "Throttle CLOSED",
              "Propeller FEATHER",
              "Mixture CUT OFF",
              "Cowl Flap CLOSED",
              "Mag Left / Right OFF",
              "Fuel Pump OFF",
              "Alternator (ALTR) OFF",
              "Fuel Selector OFF"
            ] },
            { header: "UNFEATHERING:", restart: true, items: [
              "Fuel Selector ON",
              "Mag Left / Right ON",
              "Fuel Pump ON",
              "Mixture FULL RICH",
              "Propeller FULL INCREASE",
              "Throttle 1/4 INCH",
              "Eng Start CRANK",
              "Alternator (ALTR) ON"
            ] }
          ],
          notes: [
            "NOT 1: Döneceğin motoru kapat.",
            "NOT 2: İniş 25° flap."
          ]
        }
      ]
    }
  ],

  /* ---------- AĞIRLIK & DENGE (W&B) ----------
     Kollar: POH Fig. 6-9 / 6-11 (ön koltuk 80.5, arka 118.1, bagaj 142.8, yakıt 95.0 — 108 gal usable)
     Zarf: POH Fig. 6-15 C.G. Range and Weight.
     Boş ağırlık / kol: okulun "Mass and Balance" uygulaması — 2779.17 lbs @ 89.42" (moment 248525.39). */
  wb: {
    emptyLabel: "Basic Empty Mass",
    emptyWeight: 2779.17,
    emptyArm: 89.42,
    maxWeight: 3800,
    stations: [
      { id: "pilot", label: "Pilot", arm: 80.5, placeholder: "Örn: 175" },
      { id: "fi",    label: "FI / DPE", arm: 80.5, placeholder: "Örn: 185" },
      { id: "rear",  label: "Arka Koltuklar (toplam)", arm: 118.1, placeholder: "Örn: 0" },
      { id: "bag",   label: "Bagaj", arm: 142.8, max: 200, placeholder: "Örn: 25" },
      { id: "fuel",  label: "Yakıt", arm: 95.0, unit: "gal", lbsPerUnit: 6, max: 108, placeholder: "Örn: 108 (Full Usable)", wide: true }
    ],
    envelope: [[84, 2300], [84, 2800], [85, 3400], [86, 3500], [87, 3600], [88, 3700], [89, 3800], [93, 3800], [93, 2300]],
    note: "Datum: kanadın leading edge'inin 78.4 inç önünde (WS 106). Ön limit 2800 lbs'ye kadar 84\", 3800 lbs'de 89\". Arka limit her ağırlıkta 93\". Max ramp 3816 lbs (start, taxi & runup için 16 lbs yakıt düşülür). Boş ağırlık ve kol okulun Mass and Balance uygulamasından: 2779.17 lbs @ 89.42\"."
  }
});
