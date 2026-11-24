/* ============================================================
   TEORİK BİLGİLER
   Bu dosya sadece VERİ içerir. Uygulamanın kodu app.js'te.
   Kart formatı:
     - "Metin"                       → numaralı adım (numara otomatik)
     - { label: "Vx:", val: "72 kt" } → etiket + gizlenen değer
     - header / mask                 → grup başlığı / gizliyken görünen hali
   ============================================================ */

registerTheory({
  decks: [
    {
      key: "theory.formulas",
      name: "Formulas",
      menuTitle: "Formulas",
      icon: "📐",
      unit: "Kart",
      cards: [
        {
          title: "LIFT (TAŞIMA KUVVETİ)",
          groups: [
            { items: [
              { label: "Lift =", val: "1/2rho x V² x CL x S", sub: "Hava yoğunluğunun yarısı x Hızın karesi x kaldırma katsayısı x kullanılabilir kanat yüzeyi" }
            ] }
          ]
        },
        {
          title: "STANDART ATMOSFER (ISA)",
          groups: [
            { items: [
              { label: "Standart Atmosfer =", val: "1013 hPa & 15°C & 1225 gr/m³" }
            ] }
          ]
        },
        {
          title: "STANDART RATE OF TURN",
          groups: [
            { items: [
              { label: "Rate 1 Turn =", val: "(TAS / 10) + 7" }
            ] }
          ]
        },
        {
          title: "HYDROPLANING",
          groups: [
            { items: [
              { label: "Hydroplaning Sürati =", val: "9 x √PSI (Lastik Basıncı)" }
            ] }
          ]
        },
        {
          title: "VHF RANGE (MENZİL)",
          groups: [
            { items: [
              { label: "VHF Range =", val: "1.25 x (√Alıcı İrtifası + √Verici İrtifası)" }
            ] }
          ]
        },
        {
          title: "TRUE AIRSPEED (TAS)",
          groups: [
            { items: [
              { label: "TAS =", val: "IAS x (√Standart Yoğunluk / √Mevcut Yoğunluk)" }
            ] }
          ]
        },
        {
          title: "MACH NUMBER",
          groups: [
            { items: [
              { label: "MACH =", val: "TAS / (39 x √Kelvin Cinsinden Sıcaklık)" }
            ] }
          ]
        },
        {
          title: "KELVIN CONVERSION",
          groups: [
            { items: [
              { label: "Kelvin =", val: "Celsius + 273" }
            ] }
          ]
        },
        {
          title: "RÜZGAR DÜZELTMESİ (WCA)",
          groups: [
            { items: [
              { label: "WCA Yaklaşık =", val: "(Rüzgar Şiddeti x 2) / 3" }
            ] }
          ]
        },
        {
          title: "HOLD OUTBOUND SÜRESİ",
          groups: [
            { items: [
              { label: "Yeni Outbound Süresi =", val: "3600 / Inbound Süresi (Saniye Olarak)" }
            ] }
          ]
        },
        {
          title: "DEPARTURE FORMULA",
          groups: [
            { items: [
              { label: "Departure =", val: "Boylam Değişikliği (derece) x 60 NM x cos(Enlem Ortalaması)" }
            ] }
          ]
        },
        {
          title: "CONVERGENCY FORMULA",
          groups: [
            { items: [
              { label: "Convergency =", val: "Boylam Değişikliği (derece) x sin(Enlem Ortalaması)" }
            ] }
          ]
        },
        {
          title: "HEADWIND & TAILWIND",
          groups: [
            { items: [
              { label: "Headwind / Tailwind =", val: "cos(HDG ile Rüzgar Açı Farkı) x Rüzgar Şiddeti" }
            ] }
          ]
        },
        {
          title: "CROSSWIND",
          groups: [
            { items: [
              { label: "Crosswind =", val: "sin(HDG ile Rüzgar Açı Farkı) x Rüzgar Şiddeti" }
            ] }
          ]
        },
        {
          title: "MOMENT",
          groups: [
            { items: [
              { label: "Moment =", val: "Mass x Distance (Ağırlık x Kol)" }
            ] }
          ]
        },
        {
          title: "ARM (KOL)",
          groups: [
            { items: [
              { label: "Arm =", val: "Moment / Mass" }
            ] }
          ]
        },
        {
          title: "TAKEOFF MASS (TOM)",
          groups: [
            { items: [
              { label: "Takeoff Mass =", val: "Dry Operating Mass + Takeoff Fuel + Traffic Load" }
            ] }
          ]
        },
        {
          title: "DRY OPERATING MASS (DOM)",
          groups: [
            { items: [
              { label: "Dry Operating Mass =", val: "Basic Empty Mass + Variable Load" }
            ] }
          ]
        },
        {
          title: "OPERATING MASS (OM)",
          groups: [
            { items: [
              { label: "Operating Mass =", val: "Dry Operating Mass + Takeoff Fuel" }
            ] }
          ]
        },
        {
          title: "USEFUL LOAD",
          groups: [
            { items: [
              { label: "Useful Load =", val: "Takeoff Fuel + Traffic Load" }
            ] }
          ]
        },
        {
          title: "BASIC EMPTY MASS (BEM)",
          groups: [
            { items: [
              { label: "Basic Empty Mass =", val: "Standart Empty Mass + Unusable Fluids + Modifications" }
            ] }
          ]
        },
        {
          title: "DENSITY ALTITUDE (DA)",
          groups: [
            { items: [
              { label: "Density Altitude =", val: "Pressure Altitude + (ISA Deviation x 120 ft)" }
            ] }
          ]
        }
      ]
    },
    {
      key: "theory.knowledge",
      name: "Aviation Knowledge",
      menuTitle: "Aviation Knowledge",
      icon: "🌐",
      unit: "Kart",
      cards: [
        {
          title: "ALDIS LIGHTS",
          groups: [
            { header: "YERDEKİ SİNYALLER:", mask: "YERDEKİ SİNYALLER…:", items: [
              { label: "Yerde Çakarlı Yeşil:", val: "Cleared to TAXI" },
              { label: "Yerde Sürekli Yeşil:", val: "Cleared to TAKEOFF" },
              { label: "Yerde Sürekli Kırmızı:", val: "STOP" },
              { label: "Yerde Çakarlı Kırmızı:", val: "LEAVE the runway" },
              { label: "Yerde Çakarlı Beyaz:", val: "RETURN to apron" }
            ] },
            { header: "HAVADAKİ SİNYALLER:", mask: "HAVADAKİ SİNYALLER…:", items: [
              { label: "Havada Çakarlı Beyaz:", val: "You can land on this aerodrom" },
              { label: "Havada Çakarlı Yeşil:", val: "RETURN for Landing" },
              { label: "Havada Sürekli Yeşil:", val: "Cleared to LAND" },
              { label: "Havada Sürekli Kırmızı:", val: "Trafiğe yol ver ve HOLD" },
              { label: "Havada Çakarlı Kırmızı:", val: "İniş YASAK" }
            ] }
          ]
        },
        {
          title: "HIZLAR (I-C-E-T)",
          groups: [
            { items: [
              { label: "I:", val: "IAS" },
              { label: "C:", val: "CAS (Instrument & Position + IAS)" },
              { label: "E:", val: "EAS (Compressibility + CAS)" },
              { label: "T:", val: "TAS (Density + EAS)" }
            ] }
          ]
        },
        {
          title: "UÇAKTA OLMASI GEREKEN EVRAKLAR (ARROW LAND)",
          groups: [
            { header: "ARROW:", mask: "ARROW…:", items: [
              { label: "A:", val: "Airworthiness Certificate" },
              { label: "R:", val: "Radio Certificate" },
              { label: "R:", val: "Registration Certificate" },
              { label: "O:", val: "Operating Limitations (POH & MEL)" },
              { label: "W:", val: "Weight and Balance" }
            ] },
            { header: "LAND:", mask: "LAND…:", items: [
              { label: "L:", val: "Liability Insurance" },
              { label: "A:", val: "Air Operator Certificate" },
              { label: "N:", val: "Noise Certificate" },
              { label: "D:", val: "Defect Report Form" }
            ] }
          ]
        },
        {
          title: "DAY VFR EQUIPMENTS (ATOMATOFLAMES)",
          groups: [
            { items: [
              { label: "A:", val: "Airspeed Indicator" },
              { label: "T:", val: "Tachometer" },
              { label: "O:", val: "Oil Pressure" },
              { label: "M:", val: "Manifold Pressure" },
              { label: "A:", val: "Altimeter" },
              { label: "T:", val: "Temperature" },
              { label: "O:", val: "Oil Temperature" },
              { label: "F:", val: "Fuel" },
              { label: "L:", val: "Landing Gear Position" },
              { label: "A:", val: "Anti Collision L." },
              { label: "M:", val: "Magnetic Compass" },
              { label: "E:", val: "ELT" },
              { label: "S:", val: "Safety Belts" }
            ] }
          ]
        },
        {
          title: "SİS ÇEŞİTLERİ (SOFRA)",
          groups: [
            { items: [
              { label: "S:", val: "Steam" },
              { label: "O:", val: "Orographic" },
              { label: "F:", val: "Frontal" },
              { label: "R:", val: "Radiation" },
              { label: "A:", val: "Advection" }
            ] }
          ]
        },
        {
          title: "TÜRBÜLANS ÇEŞİTLERİ",
          groups: [
            { items: [
              { label: "C:", val: "Clear" },
              { label: "W:", val: "Wake" },
              { label: "C:", val: "Convective" },
              { label: "W:", val: "Windshear" },
              { label: "F:", val: "Frontal" },
              { label: "T:", val: "Thermal" },
              { label: "M:", val: "Mechanic" },
              { label: "M:", val: "Mountain" }
            ] }
          ]
        },
        {
          title: "BUZLANMA ÇEŞİTLERİ",
          groups: [
            { items: [
              { label: "I:", val: "Induction (-7 / +21°C)" },
              { label: "S:", val: "Structural" },
              { label: "SC:", val: "Clear Structural (0 / -10°C)" },
              { label: "SM:", val: "Mixed Structural (-10 / -15°C)" },
              { label: "SR:", val: "Rime Structural (-15 / -20°C)" }
            ] }
          ]
        },
        {
          title: "BULUT ÇEŞİTLERİ (İRTİFALAR)",
          groups: [
            { items: [
              { label: "S:", val: "Strato AGL - 6.500 ft" },
              { label: "A:", val: "Alto 6.500 ft - 23.000 ft" },
              { label: "C:", val: "Cirrus 23.000 ft - 35.000 ft" }
            ] }
          ]
        },
        {
          title: "BULUT OKTASLARI",
          groups: [
            { items: [
              { label: "FEW:", val: "1-2 (Az)" },
              { label: "SCT:", val: "3-4 (Parçalı)" },
              { label: "BKN:", val: "5-7 (Çok Bulutlu - Ceiling)" },
              { label: "OVC:", val: "8 (Kapalı - Ceiling)" },
              { label: "Ölçüm Nasıl Yapılır:", val: "Ceilometer ve çıplak göz" }
            ] }
          ]
        },
        {
          title: "BİRİM ÇEVİRİLERİ",
          groups: [
            { items: [
              { label: "1 NM =", mask: "_____ FT", val: "6000 FT" },
              { label: "1 NM =", mask: "_____ KM", val: "1.85 KM" },
              { label: "1 MT =", mask: "_____ FT", val: "3.28 FT" },
              { label: "1 KG =", mask: "_____ LBS", val: "2.20 LBS" },
              { label: "1 USGAL =", mask: "_____ LBS", val: "6 LBS" }
            ] }
          ]
        },
        {
          title: "TÜRKİYE ENLEM / BOYLAM",
          groups: [
            { items: [
              { label: "Koordinatlar:", val: "36-42 Kuzey / 26-45 Doğu" }
            ] }
          ]
        },
        {
          title: "TÜRKİYE MAX VFR İRTİFASI",
          groups: [
            { items: [
              { label: "Max İrtifa:", val: "19.500 FT" }
            ] }
          ]
        },
        {
          title: "TÜRKİYE MAX VFR HIZI",
          groups: [
            { items: [
              { label: "10.000 ft Altı:", val: "250 KT" },
              { label: "10.000 ft Üstü:", val: "Hız Sınırı Yok" }
            ] }
          ]
        },
        {
          title: "SEMICIRCULAR RULE",
          groups: [
            { items: [
              { label: "Neye Göre Belirlenir:", val: "Magnetic Track" }
            ] }
          ]
        },
        {
          title: "TÜRKİYE TRANSITION ALTITUDE",
          groups: [
            { items: [
              { label: "Transition Altitude:", val: "10.000 FT" }
            ] }
          ]
        },
        {
          title: "AIP (AERONAUTICAL INFORMATION PUBLICATION)",
          groups: [
            { items: [
              { label: "Döngü:", val: "28 günlük döngülerle güncellenir" },
              { label: "1- General:", val: "Uluslararası kurallardan farklılıkları ele alır." },
              { label: "2- Enroute:", val: "Havasahaları, yasaklı bölgeler ve seyrüsefer cihazlarını ele alır." },
              { label: "3- Aerodromes:", val: "Havaalanlarının chartlarına ve teknik altyapısına dair bilgileri ele alır." }
            ] }
          ]
        },
        {
          title: "DÜNYA ÇEVRESİ",
          groups: [
            { items: [
              { label: "Dünya Çevresi:", val: "40.000 KM" }
            ] }
          ]
        },
        {
          title: "DÜNYA ÇAPI",
          groups: [
            { items: [
              { label: "Dünya Çapı:", val: "12.700 KM" }
            ] }
          ]
        },
        {
          title: "DÜNYA EĞİKLİĞİ",
          groups: [
            { items: [
              { label: "Eksen Eğikliği:", val: "23.5 Derece" }
            ] }
          ]
        },
        {
          title: "OTTO CYCLE",
          groups: [
            { items: [
              { label: "Dört Zaman:", val: "Intake - Compression - Power - Exhaust" },
              { label: "Krank Mili:", val: "1 Cycle = 2 Crankshaft Dönüşü" }
            ] }
          ]
        },
        {
          title: "NAV LIGHT DERECELERİ",
          groups: [
            { items: [
              { label: "Kanat Uçları:", val: "110 Derece (Sol Kırmızı / Sağ Yeşil)" },
              { label: "Kuyruk:", val: "140 Derece (Beyaz)" }
            ] }
          ]
        },
        {
          title: "CDMVTDTT",
          groups: [
            { items: [
              { label: "Açılımı:", val: "Compass - Deviation - Magnetic H. - Variation - True H. - Drift - True T." }
            ] }
          ]
        },
        {
          title: "WARM FRONT (SICAK CEPHE)",
          groups: [
            { items: [
              { label: "Özellikleri:", val: "Geniş alana yayılır, eğimi azdır (1:150). Stratiform bulutlar, devamlı ve sakin yağış, düşük görüş ve geniş sis alanları yaratır." }
            ] }
          ]
        },
        {
          title: "COLD FRONT (SOĞUK CEPHE)",
          groups: [
            { items: [
              { label: "Özellikleri:", val: "Dar bir hatta ilerler, eğimi diktir (1:50). Cumuliform bulutlar (CB, TCU), sağanak yağış, oraj, kuvvetli rüzgar hamleleri (Squall line) yaratır; arkasından hava hızla açar ve görüş netleşir." }
            ] }
          ]
        },
        {
          title: "İDEAL YAKIT / HAVA KARIŞIMI",
          groups: [
            { items: [
              { label: "Stokiyometrik Oran:", val: "14 / 1 (Hava / Yakıt Kütlesi)" }
            ] }
          ]
        },
        {
          title: "PROPELLER LEVER ÇALIŞMA PRENSİBİ",
          groups: [
            { items: [
              { label: "Lever Gerideyken:", val: "Havaya kulaç atar - Yağ ile çekilir - Düşük RPM - Yüksek Pitch Açısı" },
              { label: "Lever İlerideyken:", val: "Havayı bıçak gibi keser - Yay ile itilir - Yüksek RPM - Düşük Pitch Açısı" }
            ] }
          ]
        },
        {
          title: "KALKIŞTA SOLA KAÇMA NEDENLERİ",
          groups: [
            { items: [
              { label: "4 Aerodinamik Faktör:", val: "1. P-Factor | 2. Torque Effect | 3. Spiraling Slipstream | 4. Gyroscopic Precession" }
            ] }
          ]
        }
      ]
    },
    {
      key: "theory.met",
      name: "Meteorological Reports & Forecasts",
      menuTitle: "Meteorological Reports and Forecasts",
      icon: "🌦️",
      unit: "Kart",
      cards: [
        {
          title: "RAPOR & TAHMİN TANIMLARI",
          groups: [
            { header: "RAPORLAR:", mask: "RAPORLAR…:", items: [
              { label: "METAR:", val: "Meteorological Terminal Air Report. 50 ve 20 geçe yayınlanır." },
              { label: "TAF:", val: "Terminal Aerodrome Forecast 40 geçe. 6 yada 9 saat aralıkla yayınlanır." },
              { label: "SIGMET:", val: "Significant Meteorological Information" },
              { label: "GAMET:", val: "General Aviation Meteorological Information" },
              { label: "AIRMET:", val: "Airmen's Meteorological Information" }
            ] },
            { header: "NOTAM TİPLERİ:", mask: "NOTAM…:", items: [
              { label: "NOTAM:", val: "Notice to Airman" },
              { label: "NotamC:", val: "Canceling (İptal)" },
              { label: "NotamN:", val: "New (Yeni)" },
              { label: "NotamR:", val: "Replacing (Yerine Geçen)" }
            ] }
          ]
        },
        {
          title: "CAVOK",
          groups: [
            { items: [
              { label: "Görüş:", val: "10 km ve üzeri" },
              { label: "Ceiling:", val: "AGL + 5000 ft yada Min. Sec. Alt. + 1000 ft altında bulut yok" },
              { label: "Şart:", val: "No Significant Weather (Önemli hava hadisesi yok, CB/TCU yok)" }
            ] }
          ]
        },
        {
          title: "VFR LİMİTLERİ",
          groups: [
            { items: [
              { label: "Görüş:", val: "10.000 ft altı min 5 km / 10.000 ft üstü min 8 km" },
              { label: "Ceiling:", val: "AGL + 3000 ft" },
              { label: "Bulut Ayrımı:", val: "Dikeyde 1000 ft / Yatayda 1500 m" }
            ] }
          ]
        },
        {
          title: "MVFR (MARGINAL VFR)",
          groups: [
            { items: [
              { label: "Görüş:", val: "5 - 8 km" },
              { label: "Ceiling:", val: "AGL + 1000 ft ile 3000 ft arası" }
            ] }
          ]
        },
        {
          title: "IFR LİMİTLERİ",
          groups: [
            { items: [
              { label: "Görüş:", val: "5 km - 1.6 km arası" },
              { label: "Ceiling:", val: "AGL + 500 ft ile 1000 ft arası" }
            ] }
          ]
        },
        {
          title: "LIFR (LOW IFR)",
          groups: [
            { items: [
              { label: "Görüş:", val: "1.6 km'den düşük" },
              { label: "Ceiling:", val: "AGL + 500 ft'den düşük" }
            ] }
          ]
        },
        {
          title: "KISALTMALAR (TREND & DEĞİŞİM)",
          groups: [
            { items: [
              { label: "SPECI:", val: "Special, planlanan dışında ani değişim sonucu yayınlanır" },
              { label: "BECMG:", val: "Becoming, o saatten sonra kalıcı değişiklik" },
              { label: "TEMPO:", val: "Saat aralığında geçici değişiklik, 1 saatten uzun sürmez" },
              { label: "PROB 30/40:", val: "%30 veya %40 ihtimal ile" },
              { label: "NOSIG:", val: "No Significant Change (Önemli değişiklik yok)" },
              { label: "FM:", val: "From (İtibaren)" },
              { label: "RMK:", val: "Remarks / Ek açıklama" },
              { label: "AMD:", val: "Amended / Düzeltilmiş tahmin" },
              { label: "CNL:", val: "Cancelled / İptal" },
              { label: "NC:", val: "No Change" },
              { label: "VC:", val: "Vicinity (Meydanın 8-16 km civarında)" },
              { label: "INTER:", val: "Intermittent / Aralıklı" },
              { label: "OCNL:", val: "Occasional / Ara sıra" },
              { label: "NIL:", val: "No forecast available" },
              { label: "RVR:", val: "Runway Visual Range (Pist Görüş Mesafesi)" }
            ] }
          ]
        },
        {
          title: "RÜZGAR VE TEHLİKELİ HAVA",
          groups: [
            { items: [
              { label: "VRB:", val: "Değişken rüzgar (10 dk içinde, 3 kt üstü ve 60°'den fazla değişim)" },
              { label: "G (Gust):", val: "Hamle (10 dk içinde ortalama rüzgardan 10 kt fazla değişim)" },
              { label: "WS:", val: "Windshear (Rüzgar kırılması)" },
              { label: "SQ:", val: "Squall / Bora / 1 dakikalık şiddetli rüzgar patlaması" },
              { label: "CAT:", val: "Clear Air Turbulence" },
              { label: "MTW:", val: "Mountain Waves (Dağ dalgaları)" }
            ] }
          ]
        },
        {
          title: "ŞİDDET VE NİTELİK",
          groups: [
            { items: [
              { label: "- :", val: "Light (Hafif)" },
              { label: "+ :", val: "Heavy (Kuvvetli)" },
              { label: "TS:", val: "Thunderstorm (Orajlı)" },
              { label: "SH:", val: "Showering (Sağanak)" },
              { label: "FZ:", val: "Freezing (Donan)" }
            ] }
          ]
        },
        {
          title: "YAĞIŞ TİPLERİ",
          groups: [
            { items: [
              { label: "DZ:", val: "Drizzle / Çisenti" },
              { label: "RA:", val: "Rain / Yağmur" },
              { label: "SN:", val: "Snow / Kar" },
              { label: "GR:", val: "Grele / Hail / Dolu (5 mm ve üstü)" },
              { label: "GS:", val: "Small Grele / Küçük Dolu" },
              { label: "SG:", val: "Snow Grains / Karlı Dolu" },
              { label: "IC:", val: "Ice Crystals / Elmas Tozu" },
              { label: "PL:", val: "Ice Pellets / Buz Taneleri" }
            ] }
          ]
        },
        {
          title: "BULUT ÖRTÜSÜ VE ÖZEL BULUTLAR",
          groups: [
            { items: [
              { label: "SKC / CLR:", val: "Sky Clear (Açık gökyüzü)" },
              { label: "FEW:", val: "1/2 oktas" },
              { label: "SCT:", val: "3/4 oktas (Scattered)" },
              { label: "BKN:", val: "5/6/7 oktas (Broken - Tavan oluşturur)" },
              { label: "OVC:", val: "8 oktas (Overcast - Tavan oluşturur)" },
              { label: "CB:", val: "Cumulonimbus (Kümülonimbus)" },
              { label: "TCU:", val: "Towering Cumulus" },
              { label: "FC:", val: "Funnel Clouds (Hortum / Tromp)" },
              { label: "ISOL:", val: "İzole" },
              { label: "EMBD:", val: "Embedded (Gömülü / Bulut içi gizli)" },
              { label: "NSC:", val: "No Significant Cloud" }
            ] }
          ]
        },
        {
          title: "BULUT TİPLERİ",
          groups: [
            { items: [
              { label: "AC:", val: "Altocumulus" },
              { label: "AS:", val: "Altostratus" },
              { label: "CI:", val: "Cirrus" },
              { label: "CS:", val: "Cirrostratus" },
              { label: "CC:", val: "Cirrocumulus" },
              { label: "SC:", val: "Stratocumulus" },
              { label: "ST:", val: "Stratus" }
            ] }
          ]
        },
        {
          title: "GÖRÜŞ ENGELLEYİCİ HADİSELER",
          groups: [
            { items: [
              { label: "BR:", val: "Brume / Mist / Pus (1-5 km görüş)" },
              { label: "FG:", val: "Fog / Sis (1 km'den az görüş)" },
              { label: "HZ:", val: "Haze / Toz pusu (kuru duman/kirli hava)" },
              { label: "SA:", val: "Sand / Kum bulutu" },
              { label: "SS:", val: "Sand Storm / Kum Fırtınası" },
              { label: "DU:", val: "Dust / Geniş toz tabakası" },
              { label: "DS:", val: "Dust Storm / Toz Fırtınası" },
              { label: "FU:", val: "Fumee / Smoke / Duman" },
              { label: "VA:", val: "Volcanic Ash / Volkanik Kül" }
            ] }
          ]
        },
        {
          title: "NİTELEYİCİLER / ÖN EKLER",
          groups: [
            { items: [
              { label: "PRFG:", val: "Partial / Kısmi Sis" },
              { label: "BCFG:", val: "Bancs / Patchy / Kümeli Parça Sis" },
              { label: "MIFG:", val: "Mince / Shallow / Sığ Sis (2 metre altı)" },
              { label: "DRSA:", val: "Drifting / Savrulan yer tozu/kumu (max 2 m)" },
              { label: "BLSA:", val: "Blowing / Havalanan kum/toz/kar (min 2 m)" }
            ] }
          ]
        }
      ]
    }
  ],
  comingSoon: [
    { title: "Interview - ATPL", icon: "💼" },
    { title: "CRM & MCC", icon: "👥" }
  ]
});
