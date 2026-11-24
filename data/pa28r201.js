/* ============================================================
   PA-28R-201 ARROW III
   Bu dosya sadece VERİ içerir. Uygulamanın kodu app.js'te.
   Kart formatı:
     - "Metin"                       → numaralı adım (numara otomatik)
     - { label: "Vx:", val: "72 kt" } → etiket + gizlenen değer
     - header / mask                 → grup başlığı / gizliyken görünen hali
   ============================================================ */

registerAircraft({
  id: "pa28r201",
  name: "PA-28R-201 ARROW",
  icon: "🛩️",
  footer: "PA-28R-201 Arrow III • Operations & Memory Suite",

  decks: [
    {
      key: "pa28r201.checklist",
      name: "PA-28 Checklist",
      menuTitle: "Checklist",
      icon: "📋",
      unit: "Konu",
      filters: [{ id: "EMERGENCY", label: "Acil" }, { id: "NORMAL", label: "Normal" }],
      cards: [
        {
          title: "ENGINE FAILURE DURING FLIGHT",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Airspeed TRIM FOR 79 KT"
            ] },
            { header: "IF ALTITUDE PERMITS:", mask: "IF…:", items: [
              "Fuel Selector SWITCH",
              "Fuel Pump ON",
              "Mixture FULL RICH",
              "Alternate Air ON",
              "Ignition CRANK X 2",
              "Engine Parameters CHECK"
            ] },
            { header: "WHEN POWER IS RESTORED:", mask: "WHEN…:", items: [
              "Alternate Air OFF",
              "Fuel Pump OFF"
            ] },
            { header: "IF POWER IS NOT RESTORED:", mask: "IF…:", items: [
              "Prepare for FORCED LANDING",
              "MAYDAY",
              "XPNDR 7700",
              "ELT ON"
            ] }
          ]
        },
        {
          title: "FORCED LANDING",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Airspeed TRIM FOR 79 KT (WHEN FIELD CAN BE REACHED, SLOW DOWN TO 72 KT)"
            ] },
            { header: "AFTER LOCATING SUITABLE FIELD AND COMMITTED TO LAND:", mask: "AFTER…:", items: [
              "Landing Gear DOWN",
              "Flaps AS DESIRED"
            ] },
            { items: [
              "Throttle CLOSED",
              "Mixture IDLE CUTOFF",
              "Ignition OFF"
            ] },
            { items: [
              "Batt OFF",
              "Alt OFF",
              "Fuel Selector OFF"
            ] },
            { items: [
              "Seat Belts TIGHT"
            ] }
          ]
        },
        {
          title: "ENGINE FAILURE DURING TAKEOFF",
          category: "EMERGENCY",
          groups: [
            { header: "IF REMAINING RUNWAY IS SUFFICIENT:", mask: "IF…:", items: [
              "Land STRAIGHT AHEAD"
            ] },
            { header: "IF NOT AND IT IS NECESSARY TO CLEAR OBSTRUCTIONS:", mask: "IF NOT…:", items: [
              "Landing Gear UP"
            ] },
            { header: "IF ALTITUDE PERMITS, RESTART:", mask: "IF…:", items: [
              "Fuel Selector SWITCH",
              "Fuel Pump ON",
              "Mixture FULL RICH",
              "Alternate Air ON",
              "Ignition CRANK X 2",
              "Engine Parameters CHECK"
            ] },
            { header: "IF POWER IS NOT RESTORED:", mask: "IF…:", items: [
              "Prepare for FORCED LANDING",
              "MAYDAY",
              "XPNDR 7700",
              "ELT ON"
            ] }
          ]
        },
        {
          title: "ENGINE ROUGHNESS",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Mixture ADJUST FOR MAX SMOOTHNESS",
              "Alternate Air ON",
              "Fuel Pump ON",
              "Fuel Selector SWITCH",
              "Ignition L-R-BOTH"
            ] }
          ]
        },
        {
          title: "EMERGENCY LANDING GEAR EXTENSION",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Batt CHECK ON",
              "Alt CHECK ON",
              "Circuit Breakers CHECK",
              "Nav Light OFF (IN DAYTIME)",
              "Landing Gear Indication Bulbs CHECK"
            ] },
            { header: "IF LANDING GEAR DOES NOT CHECK DOWN AND LOCK:", mask: "IF…:", items: [
              "Airspeed REDUCE TO 87 KT",
              "Emergency Landing Gear DOWN"
            ] }
          ]
        },
        {
          title: "HIGH OIL TEMP",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Land as soon as possible, prepare for FORCED LANDING"
            ] }
          ]
        },
        {
          title: "LOSS OF OIL PRESSURE",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Land as soon as possible, prepare for FORCED LANDING"
            ] }
          ]
        },
        {
          title: "LOSS OF FUEL PRESSURE",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Fuel Pump ON",
              "Fuel Selector SWITCH"
            ] }
          ]
        },
        {
          title: "ENGINE FIRE DURING START",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Ignition CRANK",
              "Mixture IDLE CUTOFF",
              "Throttle OPEN",
              "Fuel Pump OFF",
              "Fuel Selector OFF"
            ] }
          ],
          notes: [
            "NOT: Yerde olduğumuz için marş ile beraber DİREKT YAKITI KESTİM KOL İLE!"
          ]
        },
        {
          title: "ENGINE FIRE DURING FLIGHT",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Fuel Selector OFF",
              "Throttle CLOSED",
              "Mixture IDLE CUTOFF",
              "Fuel Pump OFF",
              "Heater and Defroster OFF",
              "FORCED LANDING"
            ] }
          ],
          notes: [
            "NOT 1: Havada olduğumuz için direkt KANATLARDAKİ DEPOLARI KAPATIP GAZI ALDIM!",
            "NOT 2: HAVADA DİREKT SOLDAN SAĞA!"
          ]
        },
        {
          title: "SMOKE IN CABIN AND ELECTRICAL FIRE",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Bat OFF",
              "Alt OFF",
              "Cabin Vents OPEN",
              "Heater and Defroster OFF",
              "LAND AS SOON AS POSSIBLE"
            ] }
          ]
        },
        {
          title: "ELECTRICAL FAILURE (LOW VOLT)",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Ammeter CHECK"
            ] },
            { header: "IF AMMETER SHOWS ZERO:", mask: "IF…:", items: [
              "Alt OFF",
              "Electrical Load REDUCE",
              "Alt Field Circuit Breaker RESTART",
              "Alt ON"
            ] },
            { header: "IF POWER IS NOT RESTORED:", mask: "IF…:", items: [
              "Alt OFF",
              "LAND AS SOON AS POSSIBLE"
            ] }
          ]
        },
        {
          title: "ELECTRICAL OVERLOAD (HIGH VOLT)",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Bat OFF"
            ] },
            { header: "IF AMMETER DOES NOT DECREASE:", mask: "IF…:", items: [
              "Alt OFF",
              "LAND AS SOON AS POSSIBLE"
            ] },
            { header: "IF AMMETER DOES DECREASE:", mask: "IF…:", items: [
              "Bat ON",
              "Ammeter MONITOR"
            ] },
            { header: "IF AMMETER INCREASES AGAIN:", mask: "IF…:", items: [
              "Bat OFF",
              "LAND AS SOON AS POSSIBLE"
            ] },
            { header: "IF AMMETER DOES NOT INCREASES AGAIN:", mask: "IF…:", items: [
              "PROCEED WITH FLIGHT",
              "Ammeter MONITOR"
            ] }
          ]
        },
        {
          title: "PROPELLER OVERSPEED",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Throttle CLOSED",
              "Oil Pressure CHECK",
              "Propeller Lever FULL DECREASE",
              "Airspeed REDUCE",
              "Throttle ADJUST FOR BELOW 2700 RPM"
            ] }
          ]
        },
        {
          title: "OPEN DOOR",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Airspeed REDUCE TO 87 KT",
              "Cabin Vents CLOSED",
              "Storm Window OPEN",
              "Upper and Side Latch PULL AND LATCH"
            ] }
          ]
        },
        {
          title: "LOST COMMUNICATION",
          category: "EMERGENCY",
          groups: [
            { items: [
              "AVIATE"
            ] },
            { items: [
              "Kulaklık Ses Seviyesi CHECK",
              "Kulaklık Kablo Girişleri CHECK",
              "Audio Panel CHECK",
              "Frekans CHECK",
              "ACCEPT"
            ] },
            { items: [
              "XPNDR 7600",
              "Transmission BLIND (Current and 121.5)"
            ] },
            { items: [
              "Meydana DIVERT",
              "VMC KORU",
              "Meydanı Telefonla ARA"
            ] },
            { items: [
              "Meydan Turu AT",
              "ALDIS BEKLE",
              "İnince RAPOR ET"
            ] }
          ]
        },
        {
          title: "LOST PROCEDURE",
          category: "EMERGENCY",
          groups: [
            { items: [
              "ACCEPT",
              "AVIATE"
            ] },
            { items: [
              "Turn BACK",
              "CLIMB",
              "Bildiği nirengiye UÇ",
              "Orbit AT",
              "Harita ile EŞLEŞTİR",
              "Aviyonikleri KULLAN"
            ] },
            { items: [
              "ATC ile iletişim KUR (Current and 121.5)"
            ] }
          ]
        },
        {
          title: "BULUT İÇİ",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Turn BACK",
              "Pitot Heat ON",
              "CLIMB"
            ] },
            { items: [
              "Cabin Heat and Defroster ON",
              "Alt Static ON"
            ] }
          ]
        },
        {
          title: "ICING",
          category: "EMERGENCY",
          groups: [
            { items: [
              "Turn BACK",
              "Pitot Heat ON",
              "CHANGE ALTITUDE"
            ] },
            { items: [
              "Cabin Heat and Defroster ON",
              "Alt Static ON"
            ] }
          ]
        },
        {
          title: "ENGINE START",
          category: "NORMAL",
          groups: [
            { items: [
              "Cabin Door CLOSED",
              "Seat Belts FASTEN",
              "Parking Brake SET",
              "Electrical Equipments OFF",
              "Circuit Breakers ALL IN",
              "Mixture IDLE CUT OFF",
              "Trim NATUREL"
            ] },
            { items: [
              "Alt ON",
              "Bat ON",
              "Recognition Light ON",
              "Radio Master ON",
              "ATC REQUEST",
              "Radio Master OFF"
            ] },
            { items: [
              "Fuel Selector DESIRED TANK",
              "Throttle 1/2 INCH OPEN",
              "Propeller FULL INCREASE"
            ] },
            { items: [
              "Fuel Pump ON",
              "Mixture RICH AND IDLE",
              "Fuel Pump OFF"
            ] },
            { items: [
              "Propeller Area CLEAR",
              "Ignition START",
              "Mixture FULL RICH",
              "Throttle ADJUST FOR 1000 RPM",
              "Oil Pressure CHECK"
            ] }
          ],
          notes: [
            "NOT: Flooded olduğunda, Throttle FULL, Mixture IDLE CUTOFF marş basılır. Motor çalıştığında Mixture FULL RICH, Throttle IDLE!"
          ]
        },
        {
          title: "TAXIING",
          category: "NORMAL",
          groups: [
            { items: [
              "Taxi Area CLEAR",
              "Parking Brake RELEASE",
              "Propeller FULL INCREASE",
              "Throttle APPLY SLOWLY",
              "Brake CHECK",
              "Steering CHECK"
            ] }
          ]
        },
        {
          title: "GROUND CHECK",
          category: "NORMAL",
          groups: [
            { items: [
              "Parking Brake SET",
              "Brakes APPLY"
            ] },
            { items: [
              "Propeller FULL INCREASE",
              "Throttle ile 2000 RPM",
              "KOORDİNASYON VAR"
            ] },
            { items: [
              "L/R/BOTH",
              "DÜŞÜŞ 175 RPM ALTINDA FARK 50 RPM ALTINDA",
              "OIL PRESSURE GREEN 60-90",
              "OIL TEMP GREEN 75-245",
              "AMPERMETRELER POZİTİF"
            ] },
            { items: [
              "Annunciator Panel PUSH"
            ] },
            { items: [
              "Propeller Lever İLERİ GERİ X 3",
              "RPM 200 DÜŞECEK",
              "MANİFOLD 2 ARTACAK",
              "OIL PRESSURE 15 DÜŞECEK"
            ] },
            { items: [
              "Throttle IDLE (800 RPM)",
              "SARSINTI VURUNTU DURMA EMARESİ YOK"
            ] },
            { items: [
              "Throttle 1000 RPM"
            ] }
          ]
        },
        {
          title: "BEFORE TAKEOFF",
          category: "NORMAL",
          groups: [
            { items: [
              "Bat ON",
              "Alt ON",
              "Fuel Pump ON",
              "Landing Light ON",
              "Mixture FULL RICH",
              "PROPELLER FULL INCREASE",
              "Selector DOLU TANKTA",
              "Flaps TAKEOFF POSITION",
              "ALL GREEN",
              "BEFORE TAKEOFF CHECKLIST COMPLETED"
            ] }
          ]
        },
        {
          title: "NORMAL TAKEOFF",
          category: "NORMAL",
          groups: [
            { items: [
              "Flaps 10",
              "Trim SET (Natural)",
              "Accelerate (65-75 KT)",
              "Control Wheel BACK PRESSURE TO ROTATE"
            ] }
          ]
        },
        {
          title: "SHORT FIELD TAKEOFF",
          category: "NORMAL",
          groups: [
            { items: [
              "Flaps 25",
              "Trim SET (Natural)",
              "Full Power Brakes HOLD"
            ] },
            { items: [
              "Accelerate (55-65 KT)",
              "Control Wheel BACK PRESSURE TO ROTATE",
              "Climb with VX Landing C. 72 KT",
              "Negative Runway GEAR UP",
              "Flaps UP SLOWLY",
              "Climb with VX Clean C. 78 KT",
              "After Obstacles VY Clean C. 90 KT"
            ] }
          ]
        },
        {
          title: "CLIMB",
          category: "NORMAL",
          groups: [
            { items: [
              "Best Angle of Climb Gear Down Flaps Down 72 KT",
              "Best Angle of Climb Gear Up Flap Up 78 KT",
              "Best Rate of Climb Gear Down Flaps Down 78 KT",
              "Best Rate of Climb Gear Up Flap Up 90 kt"
            ] }
          ]
        },
        {
          title: "APPROACH AND LANDING",
          category: "NORMAL",
          groups: [
            { items: [
              "Circuit Breakers ALL IN",
              "Landing Light ON",
              "Fuel Pump ON",
              "Mixture FULL RICH",
              "Propeller FULL INCREASE",
              "Fuel Selector PROPER TANK",
              "Landing Gear DOWN (Max 129 KT)",
              "Flaps DOWN (Max 103 KT)"
            ] }
          ]
        },
        {
          title: "STOPPING ENGINE",
          category: "NORMAL",
          groups: [
            { items: [
              "Fuel Pump OFF",
              "Electrical Equipments OFF",
              "Propeller FULL INCREASE",
              "Throttle CLOSED",
              "Mixture IDLE CUTOFF",
              "Ignition OFF",
              "Alt OFF",
              "Bat OFF"
            ] }
          ]
        }
      ]
    },
    {
      key: "pa28r201.limits",
      name: "PA-28 Limitler",
      menuTitle: "Limitler ve Özellikler",
      icon: "⚙️",
      unit: "Konu",
      cards: [
        {
          title: "YAKLAŞMA SÜRATLERİ",
          groups: [
            { items: [
              { label: "Flapsız:", val: "90 - 85 kt" },
              { label: "10° Flap:", val: "85 - 80 kt" },
              { label: "25° Flap:", val: "80 - 75 kt" },
              { label: "40° Flap:", val: "75 - 70 kt" }
            ] }
          ]
        },
        {
          title: "AIRSPEED INDICATOR ARCS",
          groups: [
            { items: [
              { label: "WHITE ARC:", val: "55 - 103 kt (Flap Down)" },
              { label: "GREEN ARC:", val: "60 - 146 kt (Normal Operating)" },
              { label: "YELLOW ARC:", val: "146 - 183 kt (Smooth Air Only)" },
              { label: "RED LINE:", val: "183 kt (Never Exceed)" }
            ] }
          ]
        },
        {
          title: "HIZ LİMİTLERİ",
          groups: [
            { items: [
              { label: "Vso:", val: "55 kt" },
              { label: "Vs:", val: "60 kt" },
              { label: "Vfe:", val: "103 kt" },
              { label: "Vlo:", val: "107 kt" },
              { label: "Vle:", val: "129 kt" },
              { label: "Va (1865 lbs):", val: "96 kt" },
              { label: "Va (2750 lbs):", val: "118 kt" },
              { label: "Turbulent Air Operating:", val: "118 kt" },
              { label: "Vno:", val: "146 kt" },
              { label: "Vne:", val: "183 kt" }
            ] }
          ]
        },
        {
          title: "TIRMANIŞ HIZLARI",
          groups: [
            { items: [
              { label: "Vx Gear/Flap:", val: "72 kt" },
              { label: "Vx Clean:", val: "78 kt" },
              { label: "Vy Gear/Flap:", val: "78 kt" },
              { label: "Vy Clean:", val: "90 kt" }
            ] }
          ]
        },
        {
          title: "ROTATE HIZLARI",
          groups: [
            { items: [
              { label: "Vr 0° Flap:", val: "70 kt" },
              { label: "Vr 10° Flap:", val: "65 kt" },
              { label: "Vr 25° Flap:", val: "60 kt" }
            ] }
          ]
        },
        {
          title: "DİĞER HIZLAR VE BİLGİLERİ",
          groups: [
            { items: [
              { label: "Vglide:", val: "79 kt (1000 ft irtifa kaybında 1.6 NM süzülüş)" },
              { label: "Vglide Landing Conf.:", val: "72 kt" },
              { label: "Kapı Kapanma Sürati:", val: "87 kt" },
              { label: "Emergency Gear Açma:", val: "87 kt" },
              { label: "Max Crosswind:", val: "17 kt" },
              { label: "Landing Gear Hareket Süresi:", val: "7 saniye" },
              { label: "Stall Düdüğü Ne Zaman Öter:", val: "Stall süratinden 5 - 10 kt önce ötmeye başlar" }
            ] }
          ]
        },
        {
          title: "LANDING GEAR HORN ÇALDIĞI 3 DURUM",
          groups: [
            { items: [
              "Yerdeyken UP yapılırsa",
              "DOWN yapılmadan Flap koyulursa",
              "DOWN yapılmadan 14 Manifold altına düşülürse"
            ] }
          ]
        },
        {
          title: "STALL VE BANK ANGLE İLİŞKİSİ",
          groups: [
            { items: [
              { label: "0° - 25° yatış:", val: "Her 5° yatış açısı için +1 kt stall sürati artışı" },
              { label: "25° - 40° yatış:", val: "Her 5° yatış açısı için +1.5 kt stall sürati artışı" },
              { label: "40° - 55° yatış:", val: "Her 5° yatış açısı için +3 kt stall sürati artışı" },
              { label: "55° - 60° yatış:", val: "+6 kt stall sürati artışı" }
            ] }
          ]
        },
        {
          title: "RULE OF THUMB (Pratik Hesaplama Kuralları)",
          groups: [
            { items: [
              { label: "DÜZ UÇUŞ MESAFEM, KAÇ DK:", val: "(Gideceğim Mesafe / 2) + 1" },
              { label: "DÜZ UÇUŞ SÜREM, KAÇ NM:", val: "(Gideceğim Süre x 2) - 1" }
            ] },
            { items: [
              { label: "ALÇALIŞTA YAKILACAK YAKIT:", val: "İrtifa Farkı / 4" },
              { label: "TIRMANIŞTA YAKILACAK YAKIT:", val: "İrtifa Farkı / 2" }
            ] },
            { items: [
              { label: "TIRMANIŞ / ALÇALIŞ KAÇ NM SÜRECEK:", val: "İrtifa Farkı x 3" },
              { label: "TIRMANIŞ / ALÇALIŞ KAÇ DK SÜRECEK:", val: "İrtifa Farkı x 2" }
            ] }
          ]
        },
        {
          title: "MOTOR ÖZELLİKLERİ",
          groups: [
            { items: [
              { label: "Marka:", val: "Textron Lycoming" },
              { label: "Model:", val: "IO-360" },
              { label: "Tipi:", val: "Direct Drive Boksör" },
              { label: "Soğutma:", val: "Hava ile" },
              { label: "Yakıt sistemi:", val: "Enjeksiyonlu" }
            ] },
            { items: [
              { label: "Silindir Sayısı:", val: "4" },
              { label: "Hacim:", val: "360 inç küp" },
              { label: "Horse Power:", val: "200" }
            ] },
            { items: [
              { label: "RPM Green Arc:", val: "500-2700" },
              { label: "Magneto Check Max Drop:", val: "175" },
              { label: "Magneto Check Max Diff:", val: "50" }
            ] },
            { items: [
              { label: "CHT Green Arc:", val: "200 - 500 F" },
              { label: "CHT Max Diff:", val: "100 F" },
              { label: "EGT:", val: "1250 - 1650 f" }
            ] }
          ]
        },
        {
          title: "YAĞ",
          groups: [
            { items: [
              { label: "Kapasite:", val: "5-8 Quarts" }
            ] },
            { items: [
              { label: "Oil Pressure Green Arc:", val: "60-90 PSI" },
              { label: "Min Pressure:", val: "25 PSI" },
              { label: "Max Pressure:", val: "100 PSI" }
            ] },
            { items: [
              { label: "Temp Green Arc:", val: "75-245 F" },
              { label: "Max Temp:", val: "245 F" }
            ] }
          ]
        },
        {
          title: "YAKIT",
          groups: [
            { items: [
              { label: "Türü:", val: "AVGAS 100LL" },
              { label: "Rengi:", val: "Mavi" }
            ] },
            { items: [
              { label: "Total:", val: "77 usGal" },
              { label: "Total Usable:", val: "72 usGal" },
              { label: "Unusable:", val: "5 usGal" }
            ] },
            { items: [
              { label: "Fuel Flow Green Arc:", val: "2 g/h - 21,4 g/h" },
              { label: "Fuel Pressure Green Arc:", val: "0,05 PSI - 12 PSI" }
            ] },
            { items: [
              { label: "Tırmanışta saatlik yakıt tüketimi:", val: "16 gal / h" },
              { label: "Cruise saatlik yakıt tüketimi:", val: "12 gal / h" },
              { label: "Alçalışta saatlik yakıt tüketimi:", val: "8 gal / h" }
            ] },
            { items: [
              { label: "1 usGal:", val: "6 lbs" },
              { label: "1 litre:", val: "720 gr" }
            ] }
          ]
        },
        {
          title: "PERVANE ÖZELLİKLERİ",
          groups: [
            { items: [
              { label: "Marka:", val: "McCauley" },
              { label: "Pitch:", val: "Variable Pitch / Constant Speed" },
              { label: "Blade:", val: "2 bıçaklı" },
              { label: "Çapı:", val: "74 inç" }
            ] }
          ]
        },
        {
          title: "ELEKTRİK",
          groups: [
            { items: [
              { label: "Birincil Güç Kaynağı (V / AMP):", val: "Alternatör / 14 Volt / 60-70 Amp)" },
              { label: "İkincil Güç Kaynağı (V / AMP):", val: "Batarya / 12 Volt / 35 Amp)" },
              { label: "Sistem overload ne zaman olur?:", val: "+20amp üstü" }
            ] }
          ]
        },
        {
          title: "GÖVDE",
          groups: [
            { items: [
              { label: "Yapısı:", val: "Semi-Monocoque" },
              { label: "Kanat açıklığı:", val: "35 ft" },
              { label: "Uzunluk:", val: "24 ft" },
              { label: "Yükseklik:", val: "7 ft" }
            ] },
            { items: [
              { label: "Nose gear pressure:", val: "27 PSI" },
              { label: "Main gear pressure:", val: "30 PSI" }
            ] }
          ]
        },
        {
          title: "AĞIRLIK",
          groups: [
            { items: [
              { label: "Standart Empty Mass:", val: "1603 lbs" },
              { label: "Max Useful Load :", val: "1147 lbs" },
              { label: "Max Baggage:", val: "200 lbs" },
              { label: "MTOW:", val: "2750 lbs" }
            ] },
            { items: [
              { label: "Wing Loading:", val: "16.1 lbs / sq ft" },
              { label: "Power Loading:", val: "13.7 lbs / hp" },
              { label: "Maksimum G Limiti:", val: "+3.8 G" }
            ] }
          ]
        },
        {
          title: "CG",
          groups: [
            { items: [
              { label: "Datum:", val: "Kanadın Leading Edge’nin 78.4 inç önündedir (Pervane)" }
            ] },
            { items: [
              { label: "2375 lbs veya daha az için CG sınırları:", val: "82.0 - 91.5 inç" },
              { label: "2450 lbs için CG sınırları:", val: "83,3 - 91,5 inç" },
              { label: "2750 lbs CG sınırları:", val: "88.9 - 91.5 inç" }
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
    {
      key: "pa28r201.maneuvers",
      name: "PA-28 Manevralar",
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
              "10 Flaps / Koşu Mesafesi / 65 Rotate",
              "Emergency durumlar",
              "Kumanda - Com sizde / Checklist bende",
              "Emniyetli uçuşlar"
            ] }
          ]
        },
        {
          title: "ATC UÇUŞ BİLGİLERİ",
          groups: [
            { items: [
              "ATIS information “_” alındı, uçuş bilgilerini aktarmak isterim",
              "Sivil Havacılık kontrol uçuşu maksatlı, Tuzköy kalkışın ardından 3 touch and go çalışmamız olacak",
              "Ardından; Hacınbektaş - Mucur - Kırşehir - Evren - Ortaköy ve geri dönüş ile Tuzköy’e lokal seyrüsefer gerçekleştireceğiz",
              "Rota boyunca Doğulu başlar tek 500 / Batılı başlar çift 500 olacak, max irtifa 7500 talep eder",
              "Bağlı XPNDR “____”"
            ] }
          ]
        },
        {
          title: "BEFORE TAKEOFF CHECKLIST",
          groups: [
            { items: [
              "Devre kesiciler İÇERİDE",
              "Fuel Pump ON",
              "Landing Lights ON",
              "Mixture FULL RICH",
              "Propeller FULL INCREASE",
              "Selector DOLU TANKTA",
              "Engine ALL GREEN",
              "Flaps TAKEOFF POSITION",
              "BEFORE TAKEOFF CHECKLIST COMPLETED",
              "Left CLEAR / Right CLEAR"
            ] }
          ]
        },
        {
          title: "MEYDAN TURU",
          groups: [
            { items: [
              "Heading Bug SET",
              "Takeoff Flaps SET",
              "2000 RPM (Throttle)",
              "All Green",
              "Speed Alive",
              "Takeoff Thrust SET",
              "40 / 50 / 60 / 65 V1 - ROTATE",
              "Positive Rate / Brakes APPLY",
              "78 KT için burnu ezdim TRIMLEDİM"
            ] },
            { items: [
              "Pist kat edildi / Gear UP",
              "3400 FT geldi / Flaps UP / Landing Lights OFF",
              "25 Manifold / 2500 RPM / 90 KT ile tırmanış"
            ] },
            { items: [
              "3600 FT geldi yan bacağa dönüşe başladım",
              "Tırmanmaya devam ederken rüzgar altında dönüşe başladım",
              "4200 FT geldi / Burnu ezdim 95 KT bekliyorum",
              "Hız geldi, 22 Manifold / 2200 RPM / 100-110 KT düz uçuş"
            ] },
            { items: [
              "Rüzgar altının ortalarındayız, Before Landing Checkliste başlıyorum",
              "Devre K. / Fuel P. / Landing L. / Mixture / Prop. / Gazı gerektiği kadar azalttım / Selector / All Green",
              "15/17 Manifolda gazı azalttım",
              "Speed checked Landing Gear DOWN / İniş takımlarım aşağıda ve kilitli üç yeşil",
              "Speed checked Flaps 10.",
              "85 KT için gerektiği kadar gaz ekledim.",
              "Before Landing Check List Completed",
              "Rüzgar altı ortaları ATC ara (3 yeşil)"
            ] },
            { items: [
              "Threshold ile abeam olunca gazı 15-17 Manifolda azalttım",
              "Eksi 200 FPMler ile yavaşça alçalmaya başladım 85 KT muhafaza ederek.",
              "Esas bacağa döndüm speed checked Flaps 25",
              "80 KTl ile 500 FPM alçalmaya başladım."
            ] },
            { items: [
              "Son yaklaşmaya döndüm",
              "Speed Checked 40 Flaps, 75 KT ile alçalış devam ediyorum",
              "Son yaklaşma ATC ara (3 yeşil)"
            ] }
          ],
          notes: [
            "NOT: Piste girmeden önce Before Takeoff Check List"
          ]
        },
        {
          title: "ROTA WAYPOINT CHECKED",
          groups: [
            { items: [
              "Waypointe ULAŞ",
              "Yeni rotaya DÖN",
              "Timer RESETLE",
              "ATC SESLEN",
              "Navlog YAZ",
              "Dahili KONTROL YAP"
            ] }
          ]
        },
        {
          title: "DAHİLİ KONTROLLER",
          groups: [
            { items: [
              "Devre kesiciler İÇERİDE",
              "Fuel Pump ON",
              "Mixture FULL RICH",
              "Propeller FULL INCREASE",
              "Selector DOLU TANKTA",
              "Engine ALL GREEN"
            ] }
          ]
        },
        {
          title: "TEMİZLEME DÖNÜŞLERİ",
          groups: [
            { items: [
              "Amacı: Çalışmalarımızı gerçekleştireceğimiz alanın emniyetli olduğundan emin olmaktır.",
              "Rüzgarın geldiği yerin tersine 90 derece DÖN",
              "Döndüğün yere geri 180 derece DÖN"
            ] },
            { items: [
              "Altımızda ve üstümüzde çalışan uçak YOK",
              "Yerleşim yerleri MEVCUT DEĞİL / MEVCUT",
              "Mecburi iniş için araziler MEVCUT",
              "Meydan saat “__” İSTİKAMETİNDE"
            ] }
          ]
        },
        {
          title: "YAVAŞ UÇUŞ",
          groups: [
            { items: [
              "Amacı: Uçağın stall hızına yakın süratlerdeki uçuş karakteristiğini anlamaktır.",
              "Rüzgarı karşıladım, Heading Bug SET",
              "Nirengimi ALDIM"
            ] },
            { items: [
              "15-17 Manifold",
              "100 KT altında hızın düşmesini bekliyorum",
              "Landing Gear DOWN",
              "İniş takımlarım aşağıda ve kilitli ÜÇ YEŞİL",
              "Gerektiği kadar gaz ekledim"
            ] },
            { items: [
              "Flapsız: 90 / 10 Flap 85 / 25 Flap 80 / 40 Flap 75 KT ile uçuş",
              "Her flap eklediğimizde; burnu EZ, gaz EKLE ve TRIMLE"
            ] },
            { items: [
              "Hareketten çıkıyorum, FULL THRUST",
              "Speed checked Flaps UP (Flap’ı 25’e aldım)",
              "1001 1002 1003 Speed checked Flaps UP (Flap’ı 10’a aldım)",
              "90 KT gelirken, Speed checked Landing Gear UP",
              "1001 1002 1003 Speed checked Flaps UP (Clean)",
              "100 KT gelirken; 22 Manifold / 2200 RPM"
            ] }
          ]
        },
        {
          title: "KESKİN DÖNÜŞ",
          groups: [
            { items: [
              "Amacı: Uçağın yüksek sürat ve yüksek yatış açılarındaki uçuş karakteristiğini anlamaktır",
              "Rüzgarı karşıladım, Heading Bug SET",
              "Nirengimi ALDIM"
            ] },
            { items: [
              "23 Manifold / 100 KT üzeri hız",
              "30 derece YATIRDIM",
              "Lövye BACK PRESSURE",
              "60 dereceye kadar daha da YATIRDIM",
              "20 derece kala çıktım",
              "100 KT gelirken; 22 Manifold / 2200 RPM"
            ] }
          ]
        },
        {
          title: "TEMİZ KONF. STALL (Gazlı Stall)",
          groups: [
            { items: [
              "Amacı: Uçağın gazlı bir tırmanış esnasında girebileceği anormal durumları tespit etmek ve kurtarma manevralarını öğrenmektir.",
              "Rüzgarı karşıladım, Heading Bug SET",
              "Nirengimi ALDIM"
            ] },
            { items: [
              "15-17 Manifold",
              "90 KT geldi",
              "Burnu 20 derece KALDIR",
              "Gazı 22 Manifold AÇ"
            ] },
            { items: [
              "Düdük yada 60 KT bekle",
              "Lövye İLERİ (10 dereceyi geçme)",
              "Gaz İLERİ",
              "78 KT gelince UÇAK LEVEL",
              "İrtifa ve 100 KT gelince; 22 Manifold / 2200 RPM"
            ] }
          ]
        },
        {
          title: "20 DERECE YATIŞLI YAKLAŞMA STALLI (Flaplı)",
          groups: [
            { items: [
              "Amacı: Uçağın yatışlı bir süzülüş esnasında girebileceği anormal durumları tespit etmek ve kurtarma manevralarını öğrenmektir.",
              "Rüzgarı karşıladım, Heading Bug SET",
              "Nirengimi ALDIM"
            ] },
            { items: [
              "Landing Lights ON"
            ] },
            { items: [
              "15-17 Manifold",
              "90 KT geldi",
              "Landing Gear DOWN",
              "İniş takımlarım aşağıda ve kilitli ÜÇ YEŞİL",
              "Gerektiği kadar gaz ekledim"
            ] },
            { items: [
              "Flapsız: 90 / 10 Flap 85 / 25 Flap 80 / 40 Flap 75 KT ile gaz ekleyerek bekle",
              "Her flap eklediğimizde; burnu EZ, gaz EKLE ve TRIMLE"
            ] },
            { items: [
              "Hedef hız gelince 15-17 Manifold",
              "3 saniye SÜZÜLÜŞE VER"
            ] },
            { items: [
              "Burnu tuttum",
              "20 derece YATIRDIM",
              "20 derece KALDIRDIM"
            ] },
            { items: [
              "Düdük yada 60 KT bekle",
              "Lövye İLERİ (10 dereceyi geçme)",
              "Gaz İLERİ",
              "Yatışı RUDDER İLE AL",
              "78 KT gelince UÇAK LEVEL"
            ] },
            { items: [
              "Speed checked Flaps UP (Flap’ı 25’e aldım)",
              "1001 1002 1003 Speed checked Flaps UP (Flap’ı 10’a aldım)",
              "78 KT ile tırmanışa başladım",
              "Positive Rate, Landing Gear UP",
              "İniş takımları KİLİTLİ / Speed checked Flaps UP (Clean)",
              "Landing Lights OFF",
              "90 KT ile tırmanıyorum",
              "İrtifa ve 100 KT gelince; 22 Manifold / 2200 RPM"
            ] }
          ]
        },
        {
          title: "20 DERECE YATIŞLI YAKLAŞMA STALLI (Flapsız)",
          groups: [
            { items: [
              "Amacı: Uçağın yatışlı bir süzülüş esnasında girebileceği anormal durumları tespit etmek ve kurtarma manevralarını öğrenmektir.",
              "Rüzgarı karşıladım, Heading Bug SET",
              "Nirengimi ALDIM"
            ] },
            { items: [
              "Landing Lights ON"
            ] },
            { items: [
              "15-17 Manifold",
              "90 KT geldi",
              "Landing Gear DOWN",
              "İniş takımlarım aşağıda ve kilitli ÜÇ YEŞİL",
              "Gerektiği kadar gaz ekledim"
            ] },
            { items: [
              "90 KT bekle",
              "90 KT ile 3 saniye SÜZÜLÜŞE VER"
            ] },
            { items: [
              "Burnu tuttum",
              "20 derece YATIRDIM",
              "20 derece KALDIRDIM"
            ] },
            { items: [
              "Düdük yada 60 KT bekle",
              "Lövye İLERİ (10 dereceyi geçme)",
              "Gaz İLERİ",
              "Yatışı RUDDER İLE AL",
              "78 KT gelince UÇAK LEVEL"
            ] },
            { items: [
              "78 KT ile tırmanışa başladım",
              "Positive Rate, Landing Gear UP",
              "İniş takımları KİLİTLİ",
              "Landing Lights OFF",
              "90 KT ile tırmanıyorum",
              "İrtifa ve 100 KT gelince; 22 Manifold / 2200 RPM"
            ] }
          ]
        },
        {
          title: "İNİŞ KONF. STALL (Karakteristik)",
          groups: [
            { items: [
              "Amacı: İniş esnasında yüksek palyeye girilmesi durumundaki anormal durumları tespit etmek ve kurtarma manevralarını öğrenmektir.",
              "Rüzgarı karşıladım, Heading Bug SET",
              "Nirengimi ALDIM"
            ] },
            { items: [
              "Landing Lights ON",
              "500 FT altımız pist"
            ] },
            { items: [
              "15-17 Manifold",
              "90 KT geldi",
              "Landing Gear DOWN",
              "İniş takımlarım aşağıda ve kilitli ÜÇ YEŞİL",
              "Gerektiği kadar gaz ekledim"
            ] },
            { items: [
              "Flapsız: 90 / 10 Flap 85 / 25 Flap 80 / 40 Flap 75 KT ile gaz ekleyerek bekle",
              "Her flap eklediğimizde; burnu EZ, gaz EKLE ve TRIMLE"
            ] },
            { items: [
              "Hedef hız gelince 15-17 Manifold",
              "SÜZÜLÜŞE BAŞLA"
            ] },
            { items: [
              "100 FT kala PALYE / Gaz IDLE"
            ] },
            { items: [
              "Düdük yada 60 KT bekle",
              "Gaz İLERİ",
              "78 KT bekle"
            ] },
            { items: [
              "Speed checked Flaps UP (Flap’ı 25’e aldım)",
              "1001 1002 1003 Speed checked Flaps UP (Flap’ı 10’a aldım)",
              "78 KT ile tırmanışa başladım",
              "Positive Rate, Landing Gear UP",
              "İniş takımları KİLİTLİ / Speed checked Flaps UP (Clean)",
              "Landing Lights OFF",
              "90 KT ile tırmanıyorum",
              "İrtifa ve 100 KT gelince; 22 Manifold / 2200 RPM"
            ] }
          ],
          notes: [
            "NOT 1: Flaplar pistten 300 ft yukarıda toplanacak.",
            "NOT 2: 10 Flap ile yapıldığı takdirde, 78 KT gelince direkt tırmanış ve Gear UP"
          ]
        },
        {
          title: "MECBURİ İNİŞ",
          groups: [
            { items: [
              "Airspeed TRIM FOR 79 KT",
              "Rüzgara DÖN ve Arazi SEÇ"
            ] },
            { header: "ENGINE RESTART PROCEDURE:", items: [
              "Fuel Selector SWITCH",
              "Fuel Pump ON",
              "Mixture FULL RICH",
              "Alternate Air ON",
              "Ignition CRANK X 2",
              "Engine Parameters CHECK"
            ] },
            { header: "ATC:", items: [
              "MAYDAY",
              "XPNDR 7700",
              "ELT ON"
            ] },
            { header: "FORCED LANDING:", items: [
              "Landing Gear DOWN",
              "Flaps AS DESIRED"
            ] },
            { items: [
              "Throttle CLOSED",
              "Mixture IDLE CUTOFF",
              "Ignition OFF"
            ] },
            { items: [
              "Batt OFF",
              "Alt OFF",
              "Fuel Selector OFF"
            ] },
            { items: [
              "Seat Belts TIGHT"
            ] }
          ]
        }
      ]
    }
  ],

  /* ---------- AĞIRLIK & DENGE (W&B) ----------
     arm: datumdan inç cinsinden kol
     envelope: zarfın köşe noktaları [C.G. (inç), ağırlık (lbs)], saat yönünde */
  wb: {
    emptyLabel: "Basic Empty Mass",
    emptyWeight: 1603,
    emptyArm: 85.0,
    maxWeight: 2750,
    stations: [
      { id: "pilot", label: "Pilot", arm: 80.5, placeholder: "Örn: 175" },
      { id: "fi",    label: "FI / DPE", arm: 80.5, placeholder: "Örn: 185" },
      { id: "rear",  label: "Arka Koltuklar (toplam)", arm: 118.1, placeholder: "Örn: 0" },
      { id: "bag",   label: "Bagaj", arm: 142.8, max: 200, placeholder: "Örn: 25" },
      { id: "fuel",  label: "Yakıt", arm: 95.0, unit: "gal", lbsPerUnit: 6, max: 72, placeholder: "Örn: 72 (Full Usable)", wide: true }
    ],
    envelope: [[82.0, 1400], [82.0, 2375], [88.9, 2750], [91.5, 2750], [91.5, 1400]],
    note: "2375 lbs üzerinde ağırlık arttıkça ön limit geriye kayar: 2750 lbs'de 88.9\". Arka limit her ağırlıkta 91.5\"."
  }
});
